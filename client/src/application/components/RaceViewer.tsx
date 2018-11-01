import * as React from "react";
import { RacesOnMapFactory } from "../../containers/components/RacesOnMapFactory";
import { Race } from "../common_files/interfaces";

interface Props {
  readonly downloadRaces: () => Promise<ReadonlyArray<Race>>;
}

interface State {
  readonly races: ReadonlyArray<Race>;
  readonly downloadInProgress: boolean;
  readonly fetchingErrorMessage?: string;
}

export class RaceViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      races: [],
      downloadInProgress: false
    };
  }

  public async componentDidMount() {
    let races: ReadonlyArray<Race>;
    this.setState({ downloadInProgress: true });
    try {
      races = await this.props.downloadRaces();
      this.setState({ races, downloadInProgress: false });
    } catch (e) {
      this.setState({
        fetchingErrorMessage: e.message,
        downloadInProgress: false
      });
      return;
    }
  }

  public render() {
    if (this.state.fetchingErrorMessage) {
      return <p>{this.state.fetchingErrorMessage}</p>;
    }
    if (this.state.downloadInProgress) {
      return <p>Races are being downloaded at the moment</p>;
    }
    if (this.state.races.length === 0) {
      return <p>No races are available</p>;
    }
    return (
      <RacesOnMapFactory
        races={this.state.races}
        size={{ width: 1000, height: 1000 }}
      />
    );
  }
}
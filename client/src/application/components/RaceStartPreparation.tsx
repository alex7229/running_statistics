import * as React from "react";
import { PathWatcherFactory } from "../../containers/components/Path/PathWatcherFactory";
import { FinishRaceContainer } from "../../containers/logic/finishRaceContainer";

interface Props {
  readonly minimumDistanceDiff: number;
  readonly delaySecs: number;
  readonly saveRace: FinishRaceContainer;
  readonly setSaveResult: (message: string) => void;
}

interface State {
  readonly raceTypeChosen?: string;
}

export class RaceStartPreparation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.startWatcher = this.startWatcher.bind(this);
  }

  public startWatcher(type: string) {
    this.setState({ raceTypeChosen: type });
  }

  public render() {
    if (!this.state.raceTypeChosen) {
      return (
        <div>
          <button
            className="blue"
            id="start_running"
            onClick={this.startWatcher.bind(null, "running")}
          >
            Running
          </button>
          <button
            className="blue"
            id="start_walking"
            onClick={this.startWatcher.bind(null, "walking")}
          >
            Walking
          </button>
          <button
            className="blue"
            id="start_cycling"
            onClick={this.startWatcher.bind(null, "cycling")}
          >
            Cycling
          </button>
          <button
            className="green back"
            onClick={this.props.setSaveResult.bind(null, "")}
          >
            Back
          </button>
        </div>
      );
    }
    return (
      <PathWatcherFactory
        raceType={this.state.raceTypeChosen}
        minimumDistanceDiff={this.props.minimumDistanceDiff}
        delaySecs={this.props.delaySecs}
        saveRace={this.props.saveRace}
        setSaveResult={this.props.setSaveResult}
      />
    );
  }
}
import { PositionInTime } from './PathFetcher';
import * as GeoLib from 'geolib';
import { getAverageSpeed } from './getAverageSpeed';
import { PathFetcherView } from './PathFetcherView';
import * as React from 'react';

interface Props {
  path: PositionInTime[];
  initWatcher: () => void;
  stopWatcher: () => void;
  geoLocationStarted: boolean;
}

const toLocaleTime = (time: number) => new Date(time).toLocaleTimeString();

export const PathFetcherViewFactory = (props: Props) => {
  return (
    <PathFetcherView
      path={props.path}
      initWatcher={props.initWatcher}
      stopWatcher={props.stopWatcher}
      getPath={GeoLib.getPathLength}
      getAverageSpeed={getAverageSpeed}
      geoLocationStarted={props.geoLocationStarted}
      toLocaleTime={toLocaleTime}
    />
  );
};
import { Race } from '../common_files/interfaces';
import * as React from 'react';
import { GetRaceInfoFactory } from '../../factories/Path/pathUtilsFactories';
import { OngoingRaceInfo } from './OngoingRaceInfo';
import { GetReadableDateFactory } from '../../factories/utilsFactories';

interface Props {
  race: Race;
  getRaceInfo: GetRaceInfoFactory;
  stopWatcher: () => Promise<{}>;
  toLocaleTime: GetReadableDateFactory;
}

export const PathWatcherView = (props: Props) => {
  const stopButton =  <button className="blue" onClick={props.stopWatcher}>Finish</button>;
  if (props.race.path.length === 0) {
    return (
      <div>
        <div>geo location is initializing</div>
        {stopButton}
      </div>
    );
  }
  const lastPosition = props.race.path[props.race.path.length - 1];
  const raceInfo = props.getRaceInfo(props.race);
  const raceTypeUpperCase = props.race.type
    .split('')
    .map((letter, index) => index === 0 ? letter.toUpperCase() : letter)
    .join('');
  return (
    <div>
      <OngoingRaceInfo
        raceType={raceTypeUpperCase}
        lastTimeCheck={lastPosition.time}
        totalDistance={raceInfo.distance}
        totalTimeSecs={raceInfo.timeSecs}
        avgSpeed={raceInfo.averageSpeed}
        toLocaleTime={props.toLocaleTime}
      />
      {stopButton}
    </div>
  );
};
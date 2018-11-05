import { AnyAction, RaceType } from "../actions/actions";

interface State {
  readonly raceInProgress: boolean;
  readonly raceType: RaceType;
  readonly gpsId: number;
}

export type StartRaceReducer = (state: State, action: AnyAction) => State;

export const startRaceReducer: StartRaceReducer = (state, action) => {
  if (action.type !== "START_RACE") {
    return state;
  }
  return {
    raceInProgress: true,
    raceType: action.payload.raceType,
    gpsId: action.payload.gpsId
  };
};
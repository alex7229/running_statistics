import { AnyAction } from "../actions/actions";
import { Race } from "../common_files/interfaces";

interface State {
  readonly currentRaceIndex: number;
  readonly downloadedRaces: ReadonlyArray<Race>;
}

export type DecrementRaceReducer = (state: State, action: AnyAction) => State;

export const decrementRaceReducer: DecrementRaceReducer = (state, action) => {
  if (action.type !== "DECREMENT_RACE") {
    return state;
  }
  let nextIndex = state.currentRaceIndex - 1;
  if (nextIndex === -1) {
    nextIndex = state.downloadedRaces.length - 1;
  }
  return {
    ...state,
    currentRaceIndex: nextIndex
  };
};

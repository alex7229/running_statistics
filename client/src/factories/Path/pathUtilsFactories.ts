import { Race } from '../../application/common_files/interfaces';
import {
  DividedPathPart,
  dividePath,
  divideRace,
  getActiveParts,
  getAverageSpeed,
  getRaceInfo
} from '../../application/Path/pathUtils';
import * as Geolib from 'geolib';
import { raceSettings } from '../../application/common_files/config';

export interface GetRaceInfoFactory {
  (race: Race): { timeSecs: number, distance: number, averageSpeed: number };
}

export interface DivideRaceFactory {
  (race: Race): DividedPathPart[];
}

export const divideRaceFactory: DivideRaceFactory = (race) =>
  divideRace(race, raceSettings, getAverageSpeed, Geolib.getPathLength, dividePath);

export const getRaceInfoFactory: GetRaceInfoFactory = (race) =>
  getRaceInfo(race, divideRaceFactory, Geolib.getPathLength, getActiveParts);
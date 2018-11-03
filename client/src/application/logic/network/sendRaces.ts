import { Axios, Race, Response } from "../../common_files/interfaces";

// todo: implement request cancel after timeout from axios documentation

export type SendRaces = (
  races: ReadonlyArray<Race>,
  axios: Axios
) => Promise<boolean>;

export const sendRaces: SendRaces = async (races, axios) => {
  if (races.length === 0) {
    return false;
  }
  let response: Response;
  try {
    response = await axios.post("/saveRaces", races);
  } catch (e) {
    response = e.response;
  }
  // todo: change boolean
  // this function should reject on fail
  return (
    response.status === 200 && response.data && response.data.saved === true
  );
};

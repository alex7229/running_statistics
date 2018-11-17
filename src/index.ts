import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import { Race } from "../client/src/application/common_files/interfaces";
import { fetchRacesContainer } from "./containers/database/queries/fetchRacesContainer";
import { saveRacesContainer } from "./containers/database/queries/saveRacesContainer";
import { regularRegistrationContainer } from "./containers/routes/regularRegistationContainer";

dotenv.load();

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

app.post("/registration", regularRegistrationContainer);

// todo: add some kind of tests here (probably integration)
app.post("/saveRaces", async (req, res) => {
  const races = req.body;
  try {
    // todo: why there are no validation?Races can by anything
    await saveRacesContainer(races);
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
    return;
  }
  const response = { saved: true };
  res.status(200).end(JSON.stringify(response));
});

app.post("/fetchRaces", async (req, res) => {
  let races: ReadonlyArray<Race> = [];
  try {
    races = await fetchRacesContainer();
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
  }
  res.status(200).end(JSON.stringify(races));
});

app.listen(PORT);

import { stopAndSaveRaceFactory } from "../../../application/actions/async/stopAndSaveRace";
import { MESSAGES } from "../../../application/common_files/config";
import { Race } from "../../../application/common_files/interfaces";
const defaultRace: Race = {
  type: "walking",
  path: []
};

it("should dispatch toggle saving and clear gps actions immediately", () => {
  const dispatch = jest.fn();
  stopAndSaveRaceFactory(jest.fn(), jest.fn())(defaultRace)(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "STOP_GPS"
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "TOGGLE_SAVING"
  });
});

it("should dispatch toggle saving action and show message on successful save", async done => {
  const dispatch = jest.fn();
  const finishRace = jest.fn().mockResolvedValue(MESSAGES[1]);
  const setMessageUrl = jest.fn().mockReturnValue("new url");
  await stopAndSaveRaceFactory(finishRace, setMessageUrl)(defaultRace)(
    dispatch
  );
  // two for sync actions and two after request
  expect(dispatch.mock.calls.length).toBe(4);
  expect(dispatch.mock.calls[2][0]).toEqual({ type: "TOGGLE_SAVING" });
  expect(dispatch.mock.calls[3][0].payload).toEqual({
    args: ["new url"],
    method: "push"
  });
  expect(setMessageUrl.mock.calls.length).toBe(1);
  expect(setMessageUrl.mock.calls[0][0]).toEqual({
    message: MESSAGES[1],
    isError: false
  });
  done();
});

it("should dispatch url push and toggle saving action on fail", async done => {
  const dispatch = jest.fn();
  const message = MESSAGES[3];
  const finishRace = jest.fn().mockRejectedValue(new Error(message));
  const setMessageUrl = jest.fn().mockReturnValue("new url");
  await stopAndSaveRaceFactory(finishRace, setMessageUrl)(defaultRace)(
    dispatch
  );
  // two for sync actions and two afer request
  expect(dispatch.mock.calls.length).toBe(4);
  expect(dispatch.mock.calls[2][0]).toEqual({ type: "TOGGLE_SAVING" });
  expect(dispatch.mock.calls[3][0].payload).toEqual({
    args: ["new url"],
    method: "push"
  });
  expect(setMessageUrl.mock.calls.length).toBe(1);
  expect(setMessageUrl.mock.calls[0][0]).toEqual({
    message: MESSAGES[3],
    isError: true
  });
  done();
});

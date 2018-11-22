import { validatePassword } from "../../../application/common_files/validators/validatePassword";

it("password should be longer than 4 chars and shorter than 128", () => {
  expect(validatePassword("abs")).toBe(false);
  expect(validatePassword("absaka")).toBe(true);
  expect(validatePassword("a".repeat(170))).toBe(false);
});

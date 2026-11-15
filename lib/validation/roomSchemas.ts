import * as Yup from "yup";

export const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .strict(false)
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name is too long")
    .required("Name is required"),
});

export const RoomCodeSchema = Yup.object().shape({
  roomCode: Yup.string()
    .strict(false)
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .test("no-spaces", "Spaces are not allowed", (value) => !/\s/.test(value ?? ""))
    .length(6, "Room code must be exactly 6 characters")
    .required("Room code is required"),
});
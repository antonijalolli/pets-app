import * as yup from "yup";

export const CreateGroupValidator = yup.object().shape({
  name: yup.string().required("Group name is required"),
  code: yup
    .string()
    .required("Group code is required")
    .max(5, "The group code must have maximum of 5 characters")
    .matches(/[A-Z]/, "Must be all capital letters"),
});

export const UpdateGroupValidator = yup.object().shape({
  name: yup.string().required("Group name is required"),
  code: yup
    .string()
    .required("Group code is required")
    .max(5, "The group code must have maximum of 5 characters")
    .matches(/[A-Z]/, "Must be all capital letters"),
});

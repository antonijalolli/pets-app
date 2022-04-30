import * as yup from "yup";

export const CreatePetValidator = yup.object().shape({
  description: yup
    .string()
    .min(10, "Description must have at least 10 characters")
    .required("Description is required"),
  name: yup.string().required("Name is required"),
});

export const UpdatePetValidator = yup.object().shape({
  description: yup
    .string()
    .min(10, "Description must have at least 10 characters")
    .required("Description is required"),
  name: yup.string().required("Name is required"),
});

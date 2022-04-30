import * as yup from "yup";

export const CreateCountryValidator = yup.object().shape({
  name: yup.string().required("Name of country is required"),
});

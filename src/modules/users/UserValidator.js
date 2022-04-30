import * as yup from "yup";

export const CreateUserValidator = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First Name must have at least 2 characters")
    .max(20, "First Name must have maximum of 20 characters")
    .test(
      "is-first-upper",
      "First Name must start with capital letter",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(2, "Last Name must have at least 2 characters")
    .max(30, "Last Name must have maximum of 30 characters")
    .test(
      "is-first-upper",
      "Last Name must start with capital letter",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("Last Name is required"),
  username: yup
    .string()
    .min(2, "Username must have at least 2 characters")
    .max(20, "Username must have maximum of 20 characters")
    .required("Username is required"),
  newPassword: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password must have maximum of 20 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must have at least 1 uppercase letter, at least 1 digit and at least 1 special character(@$!%*#?&)"
    ),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone Number is not valid"
    )
    .required("Phone number is required"),
});
export const ChangePasswordUserValidator = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password must have maximum of 20 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must have at least 1 uppercase letter, at least 1 digit and at least 1 special character(@$!%*#?&)"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const UpdateUserValidator = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First Name must have at least 2 characters")
    .max(20, "First Name must have maximum of 20 characters")
    .test(
      "is-first-upper",
      "First Name must start with capital letter",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(2, "Last Name must have at least 2 characters")
    .max(30, "Last Name must have maximum of 30 characters")
    .test(
      "is-first-upper",
      "Last Name must start with capital letter",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("Last Name is required"),
  username: yup
    .string()
    .min(2, "Username must have at least 2 characters")
    .max(20, "Username must have maximum of 20 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone Number is not valid"
    )
    .required("Phone number is required"),
});

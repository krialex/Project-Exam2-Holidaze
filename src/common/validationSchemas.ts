import * as yup from "yup";

// Regex for name and URL
const nameRegex = /^[a-zA-Z0-9_]+$/; 
const noroffEmailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;

// Schema for register modal
export const registerSchema = yup.object({
  name: yup
    .string()
    .matches(nameRegex, "Name can only contain letters, numbers and underscores.")
    .required("Name is required"),
  email: yup
    .string()
    .matches(noroffEmailRegex, "Must be a valid stud.noroff.no email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  isManager: yup.boolean(),
});

// Schema for login modal
export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(noroffEmailRegex, "Must be a valid stud.noroff.no email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Schema for edit profile modal
export const editProfileSchema = yup.object({
  bio: yup
    .string()
    .max(160, "Bio must be less than 160 characters")
    .notRequired(),
  avatarUrl: yup
    .string()
    .url("Avatar must be a valid URL")
    .notRequired(),
  avatarAlt: yup
    .string()
    .max(120, "Alt text must be less than 120 characters")
    .notRequired()
    .default(""),
});


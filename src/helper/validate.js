import toast from "react-hot-toast";

export async function loginValidate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = toast.error("Username cannot be empty");
  } else if (!values.password) {
    errors.password = toast.error("Password cannot be empty.");
  }
  return errors;
}

export async function userUpdateValidate(values) {
  const errors = {};
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
    values.email !== ""
  ) {
    errors.email = toast.error("Invalid email id...!");
  } else if (
    (values.phone.length < 10 || values.phone.length > 11) &&
    values.phone !== ""
  ) {
    errors.phone = toast.error("Invalid phone number...!");
  }
  return errors;
}

export async function documentValidate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = toast.error("Title name cannot be empty");
  } else if (!values.document) {
    errors.document = toast.error("Document cannot be empty");
  }
  return errors;
}

export async function documentFileValidate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = toast.error("Title name cannot be empty");
  }
}


export async function resetValidation(values) {
  const errors = {};
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  if(!values.password) {
      errors.password = toast.error("Password cannot be empty..");
  } else if(values.password.includes(" ")) {
      errors.password = toast.error("Password cannot contain spaces");
  } else if(values.password.length < 4) {
      errors.password = toast.error("Password must be more than 4 characters..!");
  }else if(!specialChars.test(values.password)) {
      errors.password = toast.error("Password must contain atleast on special char..!");
  } else if(values.password !== values.confirm_pwd) {
      errors.exist = toast.error("Password not match...!");
  }
  return errors;
}
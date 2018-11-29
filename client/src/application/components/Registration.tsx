import React from "react";
import {
  RegistrationFieldName,
  RegistrationFieldPayload
} from "../actions/actions";
import { RegularRegistrationInfo } from "../common_files/interfaces";
import {
  ValidateEmail,
  validateEmail
} from "../common_files/validators/validateEmail";
import {
  ValidateLogin,
  validateLogin
} from "../common_files/validators/validateLogin";
import {
  ValidatePassword,
  validatePassword
} from "../common_files/validators/validatePassword";
import { Input } from "./Input";

interface Validators {
  validateLogin: ValidateLogin;
  validateEmail: ValidateEmail;
  validatePassword: ValidatePassword;
}

export interface RegistrationProps {
  readonly login: string;
  readonly email: string;
  readonly password: string;
  readonly passwordCopy: string;
  readonly changeRegistrationField: (payload: RegistrationFieldPayload) => void;
  readonly register: (userInfo: RegularRegistrationInfo) => void;
}

export const RegistrationFactory = (props: RegistrationProps & Validators) => {
  const changeField = (fieldName: RegistrationFieldName, value: string) => {
    props.changeRegistrationField({ fieldName, value });
  };
  const userInfo = {
    name: props.login,
    email: props.email,
    password: props.password
  };
  const isLoginValid = props.validateLogin(userInfo.name);
  const isEmailValid = props.validateEmail(userInfo.email);
  const isPasswordValid = props.validatePassword(userInfo.password);
  const isPasswordCopyValid = props.passwordCopy === userInfo.password;
  const userInfoValid =
    isLoginValid && isEmailValid && isPasswordValid && isPasswordCopyValid;
  return (
    <div>
      <Input
        id="login"
        label="Login"
        errorMessage={
          isLoginValid ? undefined : "login should be in range from 2 to 128"
        }
        onChange={changeField.bind(null, "login")}
      />
      <Input
        id="email"
        label="Email"
        errorMessage={isEmailValid ? undefined : "email is invalid"}
        onChange={changeField.bind(null, "email")}
      />
      <Input
        id="password"
        label="Password"
        errorMessage={
          isPasswordValid
            ? undefined
            : "password should be in range from 5 to 128"
        }
        onChange={changeField.bind(null, "password")}
      />
      <Input
        id="passwordCopy"
        label="Repeat your password"
        errorMessage={
          isPasswordCopyValid ? undefined : "passwords do not match"
        }
        onChange={changeField.bind(null, "passwordCopy")}
      />
      <button
        onClick={
          userInfoValid ? props.register.bind(null, userInfo) : undefined
        }
      >
        Register
      </button>
    </div>
  );
};

export const Registration = (props: RegistrationProps) => (
  <RegistrationFactory
    {...props}
    validateLogin={validateLogin}
    validateEmail={validateEmail}
    validatePassword={validatePassword}
  />
);

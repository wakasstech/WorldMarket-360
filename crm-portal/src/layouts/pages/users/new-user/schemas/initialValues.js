/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import checkout from "layouts/pages/users/new-user/schemas/form";

const {
  formField: {
    name ,
    company,
    email,
    password,
    repeatPassword,
    address1,
    address2,
    city,
    zip,
    twitter,
    facebook,
    instagram,
    publicEmail,
    bio,
  },
} = checkout;

const initialValues = {
  [name.name] : '',
  [email.name]: "",
  [password.name]: "",
  [repeatPassword.name]: "",
};

export default initialValues;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

import { register } from "../app/slices/auth";
import { clearMessage } from "../app/slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 4 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 4 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
  <div className="flex flex-col items-center w-full min-h-screen p-20">
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
    <img
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="mx-auto w-24 h-24 rounded-full"
    />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      <Form>
        {!successful && (
          <div>
            <div className="my-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              <Field name="username" type="text" className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500" />
              <ErrorMessage
                name="username"
                component="div"
                className="mt-1 text-red-600 dark:text-red-400 text-sm"
              />
            </div>

            <div className="my-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <Field name="email" type="email" className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500" />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-red-600 dark:text-red-400 text-sm"
              />
            </div>

            <div className="my-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Field
                name="password"
                type="password"
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-red-600 dark:text-red-400 text-sm"
              />
            </div>

            <div className="my-2">
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
            </div>
          </div>
        )}
      </Form>
    </Formik>
  </div>

  {message && (
    <div className="my-2">
      <div
        className={successful ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 border border-green-400 dark:border-green-700 px-4 py-3 rounded relative" : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 border border-red-400 dark:border-red-700 px-4 py-3 rounded relative"}
        role="alert"
      >
        {message}
      </div>
    </div>
  )}
</div>

  );
};

export default Register;

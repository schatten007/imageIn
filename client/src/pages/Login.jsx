import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../app/slices/auth";
import { clearMessage } from "../app/slices/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

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
    username: Yup.string().required("Username is required!"),  
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
  <div className="flex flex-col items-center w-full min-h-screen p-20">
  <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 lg:w-1/3">
    <img
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="h-24 w-24 mx-auto mb-4 rounded-full"
    />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">
            Username
          </label>
          <Field name="username" type="text" className="border-2 w-full p-3 rounded-md" />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <Field name="password" type="password" className="border-2 w-full p-3 rounded-md" />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white bg-blue-500 hover:bg-blue-700 ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading && (
              <span className="animate-spin inline-block mr-2">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    stroke="currentColor"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-1.647z"
                  ></path>
                </svg>
              </span>
            )}
            <span>Login</span>
          </button>
        </div>
      </Form>
    </Formik>
  </div>

  {message && (
    <div className="w-full md:w-1/2 lg:w-1/3 mt-4">
      <div className="bg-red-500 text-white p-3 rounded-md" role="alert">
        {message}
      </div>
    </div>
  )}
</div>

  );
};

export default Login;

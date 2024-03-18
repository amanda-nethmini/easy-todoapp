import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";

const Signup = ({
  openRegisterModal,
  setopenRegisterModal,
  setOpenLoginModal,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setEmailError("Please enter your email!");
      } else {
        setEmailError("");
      }
    }
    if (e.target.name === "password") {
      if (e.target.value === "") {
        setPasswordError("Please enter your password!");
      } else {
        setPasswordError("");
      }
    }
    if (e.target.name === "username") {
      if (e.target.value === "") {
        setUsernameError("Please enter your username!");
      } else {
        setUsernameError("");
      }
    }
    if (e.target.name === "confirmPassword") {
      if (e.target.value === "") {
        setConfirmPasswordError("Please enter your confirm password!");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (e.target.name === "confirmPassword") {
      if (e.target.value !== formData.password) {
        setConfirmPasswordError("Passwords do not match!");
      } else {
        setConfirmPasswordError("");
      }
    }

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFinish = async () => {
    try {
      setLoading(true);

      if (
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.username
      ) {
        if (!formData.username) {
          setUsernameError("Username is required");
        }
        if (!formData.email) {
          setEmailError("Email is required");
        }
        if (!formData.password) {
          setPasswordError("Password is required");
        }
        if (!formData.confirmPassword) {
          setConfirmPasswordError("Confirm password is required");
        }
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        return;
      }

      const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
      if (!emailRegex.test(formData.email)) {
        setEmailError("Invalid email address");
        return;
      }

      if (formData.password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        return;
      }

      const res = await axios.post("user/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res.data) {
        message.success("Signup successful!");
        setopenRegisterModal(false);
        setOpenLoginModal(true);
      }
    } catch (err) {
      console.log(err);
      message.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setopenRegisterModal(false);
  };

  return (
    <Modal
      title={
        <p>
          <span className="text-2xl font-bold">Sign Up</span>
        </p>
      }
      visible={openRegisterModal}
      onCancel={handleCancel}
      footer={null}
    >
      <hr />
      <form className="mt-4">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          {usernameError && (
            <p class="text-red-500 text-xs italic mt-2">{usernameError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {emailError && (
            <p class="text-red-500 text-xs italic mt-2">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {passwordError && (
            <p class="text-red-500 text-xs italic mt-2">{passwordError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {confirmPasswordError && (
            <p class="text-red-500 text-xs italic mt-2">
              {confirmPasswordError}
            </p>
          )}
        </div>
        <p className="mb-7">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setOpenLoginModal(true);
              setopenRegisterModal(false);
            }}
          >
            Sign In
          </span>
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button size="large" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={onFinish}
            loading={loading}
            style={{
              backgroundColor: "#34d399",
              borderColor: "#34d399",
            }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Signup;

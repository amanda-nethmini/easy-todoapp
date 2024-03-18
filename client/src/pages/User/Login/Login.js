import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";
const Login = ({ openLoginModal, setOpenLoginModal, setopenRegisterModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setEmailError("Please enter your email!");
      } else {
        setEmailError("");
      }
    } else if (e.target.name === "password") {
      if (e.target.value === "") {
        setPasswordError("Please enter your password!");
      } else {
        setPasswordError("");
      }
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFinish = async () => {
    console.log(formData.email, formData.password);

    try {
      setloading(true);
      if (!formData.email || !formData.password) {
        if (!formData.email) {
          setEmailError("Please enter your email!");
        }
        if (!formData.password) {
          setPasswordError("Please enter your password!");
        }
        return;
      }
      const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
      if (!emailRegex.test(formData.email)) {
        setEmailError("Please enter a valid email!");
        return;
      }

      if (formData.password.length < 8) {
        setPasswordError("Password must be at least 8 characters long!");
        return;
      }

      const res = await axios.post("user/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        message.success("Login successful!");
        setOpenLoginModal(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      message.error("Email or password is incorrect!");
    } finally {
      setloading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenLoginModal(false);
  };
  return (
    <>
      <Modal
        title={[
          <p>
            <span className="text-2xl font-bold">Login</span>
          </p>,
        ]}
        open={openLoginModal}
        onCancel={handleCancel}
        footer={null}
      >
        <hr />
        <form className="mt-4">
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

          <p className="mb-7">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                setOpenLoginModal(false);
                setopenRegisterModal(true);
              }}
            >
              Sign Up
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
              Sign In
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Login;

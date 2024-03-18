import React, { useEffect, useState } from "react";
import { message, Dropdown, Modal, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const NavBar = ({ setOpenLoginModal, setOpenRegisterModal }) => {
  const [user, setUser] = useState("");
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLoginClick = () => {
    setOpenLoginModal(true);
  };

  const handleRegisterClick = () => {
    setOpenRegisterModal(true);
  };

  const handleLogout = () => {
    setOpenLogoutModal(true);
  };

  const handleCancel = () => {
    setOpenLogoutModal(false);
  };

  const onFinish = () => {
    localStorage.removeItem("user");
    window.location.reload();
    message.success("Logged out successfully!");
  };

  return (
    <nav className="sticky top-0 z-10 p-4 text-white bg-gray-800">
      <Modal
        title="Logout from Todo"
        visible={openLogoutModal}
        onCancel={handleCancel}
        footer={null}
      >
        <hr />
        <form className="mt-4 ">
          <p className="text-gray-700 mb-7">
            Are you sure you want to logout from Todo App?
          </p>

          <div className="flex items-center justify-end gap-3">
            <Button onClick={handleCancel} size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={onFinish}
              style={{
                backgroundColor: "#34d399",
                borderColor: "#34d399",
              }}
            >
              Logout Now
            </Button>
          </div>
        </form>
      </Modal>
      <div className="flex items-center justify-between mx-auto px-14">
        <div className="text-lg font-bold">
          <p className="text-2xl font-bold cursor-pointer"> Easy TODO</p>
        </div>
        <div className="hidden space-x-8 md:flex">
          {user.userId ? (
            <Dropdown
              menu={{
                items: [{ key: "1", label: "Logout" }],
                onClick: ({ key }) => {
                  if (key === "1") {
                    handleLogout();
                  }
                },
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <UserOutlined />
                {user?.username || "User"}
              </div>
            </Dropdown>
          ) : (
            <>
              <button
                className={`p-2 rounded-xl hover:bg-slate-200 hover:text-black `}
                onClick={handleLoginClick}
              >
                Login
              </button>

              <button
                className={`p-2 px-3 rounded-xl hover:bg-slate-200 hover:text-black `}
                onClick={handleRegisterClick}
              >
                Sign up
              </button>
            </>
          )}
        </div>
        <div className="md:hidden"></div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";
const AddTodo = ({ openAddTodoModal, setOpenAddTodoModal, getTodos }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "#E0FFE1",
    priority: "",
  });
  const [loading, setloading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    if (e.target.name === "title") {
      if (e.target.value === "") {
        setTitleError("Please enter your Todo Title!");
      } else {
        setTitleError("");
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
      setloading(true);
      if (!formData.title) {
        setTitleError("Please enter your Todo Title !");
        return;
      }

      const res = await axios.post("todo/add", {
        title: formData.title,
        description: formData.description,
        color: formData.color,
        priority: formData.priority,
        date: new Date(),
        userId: user.userId,
      });
      if (res.data) {
        message.success("Todo created!");
        setOpenAddTodoModal(false);
        getTodos();
        setFormData({
          title: "",
          description: "",
          color: "",
          priority: "",
        });
      }
    } catch (err) {
      message.error("Something went wrong, please try again!");
    } finally {
      setloading(false);
    }
  };

  const handleCancel = () => {
    setOpenAddTodoModal(false);
  };

  return (
    <>
      <Modal
        title={[
          <p>
            <span className="text-2xl font-bold">Add New Todo</span>
          </p>,
        ]}
        open={openAddTodoModal}
        onCancel={handleCancel}
        footer={null}
      >
        <hr />
        <form className="mt-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Todo Title"
              required
            />
            {titleError && (
              <p class="text-red-500 text-xs italic mt-2">{titleError}</p>
            )}
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="Description"
            >
              Description
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm  focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="Description"
            >
              Select Priority
            </label>
            <div>
              <select
                className="w-full px-3 py-2.5 leading-tight cursor-pointer text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="low" className="text-gray-700">
                  Low
                </option>
                <option value="medium" className="text-gray-700">
                  Medium
                </option>
                <option value="high" className="text-gray-700">
                  High
                </option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="Description"
            >
              Select background Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={handleChange}
              name="color"
              className="w-20 h-10 cursor-pointer"
            />
          </div>

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
              Create Todo
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default AddTodo;

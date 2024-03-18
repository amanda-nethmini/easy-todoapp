import React, { useState, useEffect } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";

const EditTodo = ({
  openEditTodoModal,
  setOpenEditTodoModal,
  todoData,
  getTodos,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todoData) {
      setFormData({
        title: todoData.title,
        description: todoData.description,
        color: todoData.color,
        priority: todoData.priority,
      });
    }
  }, [todoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFinish = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`todo/update-todo/`, {
        todoId: todoData._id,
        title: formData.title,
        description: formData.description,
        color: formData.color,
        priority: formData.priority,
      });
      if (res.data) {
        message.success("Todo updated successfully!");
        setOpenEditTodoModal(false);
        getTodos();
      }
    } catch (error) {
      console.log(error);
      message.error("Error updating todo");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenEditTodoModal(false);
  };

  return (
    <Modal
      title={[
        <p>
          <span className="text-2xl font-bold">Edit Todo</span>
        </p>,
      ]}
      visible={openEditTodoModal}
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
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            rows="6"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="priority"
          >
            Select Priority
          </label>
          <select
            className="w-full px-3 py-2.5 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-7">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="color"
          >
            Select background Color
          </label>
          <input
            type="color"
            value={formData.color}
            name="color"
            className="w-20 h-10 cursor-pointer"
            onChange={handleChange}
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
            Update Todo
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodo;

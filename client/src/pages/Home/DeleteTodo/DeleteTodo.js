import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";

const DeleteTodo = ({
  openDeleteTodoModal,
  setOpenDeleteTodoModal,
  getTodos,
  todoData,
}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`todo/delete-todo/`, {
        todoId: todoData._id,
      });
      if (res.data) {
        message.success("Todo deleted successfully!");
        setOpenDeleteTodoModal(false);
        getTodos();
      }
    } catch (error) {
      console.log(error);
      message.error("Error deleting todo");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenDeleteTodoModal(false);
  };

  return (
    <Modal
      title={[
        <p>
          <span className="text-2xl font-bold">Delete Todo</span>
        </p>,
      ]}
      visible={openDeleteTodoModal}
      onCancel={handleCancel}
      footer={null}
    >
      <hr />
      <form className="mt-4">
        <p className="text-gray-700 mb-7">
          Are you sure you want to delete this todo?
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
              backgroundColor: "#aa0000",
              borderColor: "#aa0000",
            }}
          >
            Delete Todo
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteTodo;

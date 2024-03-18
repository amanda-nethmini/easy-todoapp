import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { Checkbox, message, Dropdown } from "antd";
import axios from "axios";
import EditTodo from "../EditTodo/EditTodo";
import DeleteTodo from "../DeleteTodo/DeleteTodo";

const Card = ({ todo, getTodos }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [openEditTodoModal, setOpenEditTodoModal] = useState(false);
  const [openDeleteTodoModal, setOpenDeleteTodoModal] = useState(false);

  const onChange = async (e) => {
    const completedStatus = e.target.checked;
    setCompleted(completedStatus);

    try {
      const response = await axios.put(`todo/complete-todo/`, {
        todoId: todo._id,
        completed: completedStatus,
      });
      message.success("Todo updated!");
    } catch (error) {
      message.error("Error updating todo completion");
    }
  };

  let borderColor;

  switch (todo?.priority) {
    case "high":
      borderColor = "#fe2020";
      break;
    case "medium":
      borderColor = "#fbbf24";
      break;
    case "low":
      borderColor = "#34d399";
      break;
    default:
      borderColor = "#34d399";
      break;
  }

  const handleEditClick = () => {
    setOpenEditTodoModal(true);
  };

  const handleDeleteClick = () => {
    setOpenDeleteTodoModal(true);
  };

  return (
    <div className="px-2">
      <EditTodo
        openEditTodoModal={openEditTodoModal}
        setOpenEditTodoModal={setOpenEditTodoModal}
        todoData={todo}
        getTodos={getTodos}
      />

      <DeleteTodo
        openDeleteTodoModal={openDeleteTodoModal}
        setOpenDeleteTodoModal={setOpenDeleteTodoModal}
        getTodos={getTodos}
        todoData={todo}
      />

      <div
        className={`max-w-2xl p-4 mx-auto mb-4 border-l-8 border-blue-900 rounded-md shadow-md hover:shadow-lg md:max-h-36`}
        style={{
          backgroundColor: todo?.color,
          borderColor: borderColor,
        }}
      >
        <div className="flex justify-center ">
          <div>
            <label className="flex justify-center sm:px-1 md:px-3 mt-0.5">
              <Checkbox
                onChange={onChange}
                checked={completed}
                style={{ zoom: "1.3" }}
              ></Checkbox>
            </label>
          </div>
          <div className="w-full px-4" onClick={handleEditClick}>
            <div className="flex flex-col md:items-center md:justify-between md:flex-row">
              <h3 className="text-xl font-semibold text-gray-800 truncate cursor-pointer">
                {todo?.title}
              </h3>
              <div className="mt-1 text-xs text-gray-600 truncate cursor-pointer md:mt-0">
                {moment(todo?.date).format("lll")}
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-600 cursor-pointer md:text-sm line-clamp-3">
              {todo?.description}
            </p>
          </div>
          <div className="items-center mt-1">
            <Dropdown
              menu={{
                items: [
                  { key: "1", label: "Edit Todo" },
                  { key: "2", label: "Delete Todo" },
                ],
                onClick: ({ key }) => {
                  if (key === "1") {
                    handleEditClick();
                  }
                  if (key === "2") {
                    handleDeleteClick();
                  }
                },
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="cursor-pointer"
              >
                <MoreOutlined style={{ fontSize: "25px" }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

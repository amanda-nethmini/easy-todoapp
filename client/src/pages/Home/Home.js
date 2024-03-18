import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import { message, Empty, Spin } from "antd";
import AddTodo from "./AddTodo/AddTodo";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";

const Home = ({ setOpenLoginModal }) => {
  const [openAddTodoModal, setOpenAddTodoModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (JSON.parse(localStorage.getItem("user"))) {
      setUser(user);
      getTodos();
    }
  }, []);

  const getTodos = async () => {
    try {
      setTodos([]);
      setLoading(true);
      if (JSON.parse(localStorage.getItem("user"))) {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `todo/get-todo-by-userId?userId=${user.userId}`
        );
        if (res.data.result) {
          setTodos(res.data.result);
        }
      }
    } catch (err) {
      console.log(err);
      message.error("Error fetching todos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <Spin size="large" />{" "}
        </div>
      ) : (
        <div className="flex flex-col justify-center py-5 ">
          <div className="flex justify-end max-w-2xl p-4 mx-auto mb-4 max-h-28">
            {user && (
              <div
                type="primary"
                onClick={() => {
                  setOpenAddTodoModal(true);
                }}
                className="w-full flex gap-2 p-2 px-3 text-white rounded-xl bg-[#34d399] cursor-pointer hover:bg-[#2bbf8a] justify-center items-center"
              >
                <PlusCircleOutlined />
                Create New Todo
              </div>
            )}
          </div>
          <AddTodo
            openAddTodoModal={openAddTodoModal}
            setOpenAddTodoModal={setOpenAddTodoModal}
            getTodos={getTodos}
          />
          <div>
            {user ? (
              <>
                {todos.length === 0 ? (
                  <div className="flex items-center justify-center h-96">
                    <Empty
                      description={
                        <span className="text-lg text-gray-500 cursor-pointer hover:text-gray-700">
                          No Todos Found, Please{" "}
                          <span
                            className="font-medium text-blue-500"
                            onClick={() => {
                              setOpenAddTodoModal(true);
                            }}
                          >
                            Create New Todo
                          </span>{" "}
                          to Get Started
                        </span>
                      }
                    ></Empty>
                  </div>
                ) : (
                  <>
                    {todos &&
                      todos.map((todo) => (
                        <Card todo={todo} key={todo?._id} getTodos={getTodos} />
                      ))}
                  </>
                )}{" "}
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <Empty
                  description={
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-gray-700">
                      Please{" "}
                      <span
                        className="font-medium text-blue-500"
                        onClick={() => {
                          setOpenLoginModal(true);
                        }}
                      >
                        Login
                      </span>{" "}
                      to View Your Todos
                    </span>
                  }
                ></Empty>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

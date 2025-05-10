import { useState } from "react";
import useTodoStore from "../store/todoStore";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const [searchKeyword, setSearchKeyword] = useState("");

  const groupMap = {
    today: "今天的任務",
    week: "本週的任務",
    done: "已完成的任務",
  };

  const filteredTodos =
    searchKeyword.trim() === ""
      ? todos
      : todos.filter((todo) =>
          todo.quest.toLowerCase().includes(searchKeyword.toLowerCase())
        );

  const groupedTodos = {
    today: filteredTodos.filter((todo) => todo.group === "today"),
    week: filteredTodos.filter((todo) => todo.group === "week"),
    done: filteredTodos.filter((todo) => todo.group === "done"),
  };

  return (
    <div className="container text-light list-bg my-3 mx-auto p-4 d-flex flex-column justify-content-center position-relative">
      <h1 className="mt-3 text-center">TodoList</h1>
      <TodoForm />
      <div className="row mt-5">
        {["today", "week", "done"].map((groupKey) => (
          <div key={groupKey} className="col-md-4">
            <h4 className="text-center">{groupMap[groupKey]}</h4>
            <ul className="list-unstyled mt-3">
              {groupedTodos[groupKey].length > 0 ? (
                groupedTodos[groupKey].map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))
              ) : (
                <li className="text-center text-secondary">
                  {searchKeyword.trim() ? "無符合的任務" : "目前無任務"}
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="position-absolute form-floating"
        style={{ top: "30px", right: "20px" }}
      >
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="搜尋任務..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <label htmlFor="search">搜尋</label>
      </div>
    </div>
  );
}

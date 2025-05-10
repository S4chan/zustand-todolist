import { useState } from "react";
import useTodoStore from "../store/todoStore";
import TodoComment from "./TodoComment";

export default function TodoItem({ todo }) {
  const { deleteTodo, editTodo, checkTodo } = useTodoStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editQuest, setEditQuest] = useState(todo.quest);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    if (!editQuest || !editDueDate) return alert("請填寫完整內容");
    editTodo(todo.id, { quest: editQuest, dueDate: editDueDate });
    setIsEditing(false);
  };

  return (
    <>
      <li className="p-2 border rounded mt-2">
        <div className="mt-2 d-flex justify-content-evenly align-items-center">
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => checkTodo(todo.id)}
          />
          {isEditing ? (
            <div className="d-flex flex-column">
              <input
                type="text"
                value={editQuest}
                onChange={(e) => setEditQuest(e.target.value)}
                placeholder="任務內容"
              />
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
              <div className="mt-2 d-flex justify-content-between">
                <button onClick={handleSave} className="btn btn-success btn-sm">
                  儲存
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary btn-sm"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <h3
                className={`quest-name mx-3 mb-2 py-2 text-center ${
                  todo.checked ? "text-decoration-line-through" : ""
                }`}
              >
                {todo.quest}
              </h3>
              <div className="mt-2 mx-3 d-flex justify-content-evenly align-items-center">
                <p className="mx-3 my-0">
                  <small>{todo.dueDate}</small>
                </p>
                <p className="mx-3 my-0">{todo.group}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mx-3 btn btn-info btn-sm"
                >
                  edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="mx-3 btn-close btn-close-white"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          )}
        </div>
        <div className="accordion mt-2" id={`accordion-${todo.id}`}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading-${todo.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${todo.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${todo.id}`}
              >
                留言
              </button>
            </h2>
            <div
              id={`collapse-${todo.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${todo.id}`}
              data-bs-parent={`#accordion-${todo.id}`}
            >
              <div className="accordion-body">
                <TodoComment todo={todo} />
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

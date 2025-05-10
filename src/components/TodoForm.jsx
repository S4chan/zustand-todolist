import { useState } from "react";
import useTodoStore from "../store/todoStore";

export default function TodoForm() {
  const { addTodo } = useTodoStore();

  const [quest, setQuest] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [group, setGroup] = useState("today");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quest || !dueDate || !group) return alert("請完整填寫表單");
    addTodo({ quest, dueDate, group });
    setQuest("");
    setDueDate("");
    setGroup("today");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 row g-3 align-items-end">
      <div className="col-md-3">
        <label htmlFor="quest" className="form-label">
          任務描述
        </label>
        <input
          id="quest"
          type="text"
          className="form-control"
          value={quest}
          onChange={(e) => setQuest(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <label htmlFor="dueDate" className="form-label">
          截止日期
        </label>
        <input
          id="dueDate"
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <label htmlFor="group" className="form-label">
          任務分組
        </label>
        <select
          id="group"
          className="form-select"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="today">今天的任務</option>
          <option value="week">本週的任務</option>
          <option value="done">已完成的任務</option>
        </select>
      </div>

      <div className="col-md-3 d-flex align-items-end">
        <button type="submit" className="btn btn-primary w-100">
          新增任務
        </button>
      </div>
    </form>
  );
}

import TodoList from "./components/TodoList";
import "./style/App.css";

function App() {
  return (
    <div className="todo-container d-flex justify-content-center align-items-center">
      <TodoList />
    </div>
  );
}

export default App;

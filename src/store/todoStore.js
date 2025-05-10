import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: ({ quest, dueDate, group }) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), quest, dueDate, group, checked: false, comments: [] },
      ],
    })),

  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),

  editTodo: (id, updatedData) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      ),
    })),

  checkTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      ),
    })),

  addComment: (todoId, text) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              comments: [...todo.comments, { id: Date.now(), text }],
            }
          : todo
      ),
    })),

  editComment: (todoId, commentId, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              comments: todo.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, text: newText }
                  : comment
              ),
            }
          : todo
      ),
    })),

  deleteComment: (todoId, commentId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              comments: todo.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : todo
      ),
    })),
}));

export default useTodoStore;

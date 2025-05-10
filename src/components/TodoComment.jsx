import { useRef, useState } from "react";
import useTodoStore from "../store/todoStore";

export default function TodoComment({ todo }) {
  const { addComment, editComment, deleteComment } = useTodoStore();
  const inputRef = useRef(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const addSubmit = (e) => {
    e.preventDefault();
    const comment = inputRef.current.value.trim();
    if (!comment) return;
    addComment(todo.id, comment);
    inputRef.current.value = "";
  };

  const handleEditComment = (commentId) => {
    const target = todo.comments.find((comment) => comment.id === commentId);
    setEditingCommentId(commentId);
    setEditText(target.text);
  };

  const handleUpdateComment = () => {
    if (!editText.trim()) return;
    editComment(todo.id, editingCommentId, editText);
    setEditingCommentId(null);
    setEditText("");
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(todo.id, commentId);
  };

  return (
    <>
      <form onSubmit={addSubmit}>
        <div className=" form-floating">
          <input
            id="comment"
            type="text"
            className="form-control"
            placeholder="輸入留言"
            ref={inputRef}
          />
          <label htmlFor="comment">留言</label>
        </div>
      </form>
      {todo.comments.length > 0 && (
        <ul className="list-unstyled mt-2">
          {todo.comments.map((comment) => (
            <li key={comment.id}>
              {editingCommentId === comment.id ? (
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleUpdateComment}
                  >
                    更新
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span onDoubleClick={() => handleEditComment(comment.id)}>
                    {comment.text}
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    刪除
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

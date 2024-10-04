import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";

const AddToDo = () => {
  const [todo, setTodo] = useState("");
  const { handleAddToDo } = useTodos();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToDo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Write your todo"
      />
      <button
        type="submit"
        disabled={!todo.trim()} // Disable button if input is empty or spaces
      >
        Add
      </button>
    </form>
  );
};

export default AddToDo;

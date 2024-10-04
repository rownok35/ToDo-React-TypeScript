import AddToDo from "./components/addtodo";
import Navbar from "./components/navbar";
import Todos from "./components/todos";
import "./App.css";
import { FaBook } from "react-icons/fa"; // Importing a notebook icon

const App = () => {
  return (
    <main>
      <h1 className="header">
        <FaBook className="header-icon" /> TODO REACT + TYPESCRIPT
      </h1>
      <Navbar />
      <AddToDo />
      <Todos />
    </main>
  );
};

export default App;

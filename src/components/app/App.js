import HeaderNav from "../headerNav/HeaderNav";
import ToDoContainer from "../toDoContainer/ToDoContainer";
import ToDoForm from "../toDoForm/ToDoForm";
import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <HeaderNav />
      <ToDoContainer todos={todos} setTodos={setTodos} />
      <ToDoForm todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  letter-spacing: 1.2px;
  margin-bottom: 25px;
  line-height: 32px;
  background: #32a852;
  color: #fff;
  padding: 10px;
`;

const SectionInner = styled.div`
  width: 100%;
  height: 100%;
`;

const ToDoInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Label = styled.label`
  margin-left: 10px;
  display: flex;
  align-items: center;

  li {
    margin-left: 10px;
  }
`;

const RemoveButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  padding: 0 4px;
  cursor: pointer;
`;

const ToDoContainer = ({ todos, setTodos }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { request } = useHttp();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    request("https://jsonplaceholder.typicode.com/todos/?&_limit=5")
      .then(onToDoLoaded)
      .catch(onError);
  };

  const onToDoLoaded = (newTodos) => {
    setTodos([...todos, ...newTodos]);
    setError(false);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    alert("ERROR");
  };

  const changeCompleted = (id) => {
    const todoElements = todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos([...todoElements]);
  };

  const deleteTodo = (id) => {
    request(`https://jsonplaceholder.typicode.com/todos/${id}`, "DELETE");
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const View = ({ todos }) => {
    const todoTasks = todos.map((todo, i) => {
      return (
        <ToDoInner key={i}>
          <Label
            htmlFor={todo.id}
            style={
              todo.completed
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            <input
              type="checkbox"
              name=""
              id={todo.id}
              onChange={() => changeCompleted(todo.id)}
              checked={todo.completed}
            />
            <li>{todo.title}</li>
          </Label>
          <RemoveButton onClick={() => deleteTodo(todo.id)}>X</RemoveButton>
        </ToDoInner>
      );
    });
    return <Ul>{todoTasks}</Ul>;
  };

  const setDate = () => {
    const date = new Date();
    const nameMonth = getMonth();
    const day = getDay();
    const numberOfDay = date.getDate();
    const currentDate = day + ", " + nameMonth + " " + numberOfDay;
    return currentDate;
  };

  const getMonth = () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    const nameMonth = month[date.getMonth()];
    return nameMonth;
  };

  const getDay = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();
    const day = weekday[date.getDay()];
    return day;
  };

  const date = setDate();
  const errorMessage = error ? "Error" : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || spinner || !todos) ? <View todos={todos} /> : null;

  return (
    <main>
      <SectionTitle>{date}</SectionTitle>
      <SectionInner>
        {errorMessage}
        {spinner}
        {content}
      </SectionInner>
    </main>
  );
};

export default ToDoContainer;

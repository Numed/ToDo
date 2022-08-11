import styled from "styled-components";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputAdd = styled.input`
  padding: 4px 12px;
  background: transparent;
  font-size: 16px;
  letter-spacing: 1.2px;
  color: #222;
  border: 1px solid #333;

  &:focus {
    outline: #32a852;
  }
`;

const AddButton = styled.button`
  background: #32a852;
  color: #fff;
  padding: 7px 12px;
  border: none;
  cursor: pointer;
`;

const ToDoForm = ({ todos, setTodos }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { request } = useHttp();

  const addTodo = (e) => {
    e.preventDefault();
    setLoading(true);
    request(
      "https://jsonplaceholder.typicode.com/todos",
      "POST",
      JSON.stringify({
        title: inputValue,
      })
    )
      .then(onAddNewTodo)
      .catch(new Error("Якась помилка"));
  };

  const onAddNewTodo = (newTodo) => {
    return setTodos([...todos, newTodo]), setLoading(false), setInputValue("");
  };

  const onChangeHandler = (value) => {
    setInputValue(value);
  };

  return (
    <Form onSubmit={(e) => addTodo(e)}>
      <InputAdd
        type="text"
        placeholder="New task"
        value={inputValue}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <AddButton
        type="submit"
        disabled={loading}
        style={
          loading
            ? { background: "rgba(50,168,82, .6)" }
            : { background: "#32a852" }
        }
      >
        +
      </AddButton>
    </Form>
  );
};

export default ToDoForm;

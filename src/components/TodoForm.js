import React, { useState } from "react";

function Todoform(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update the todo..."
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo..."
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
          />
          <button className="todo-button">Add Todo</button>
        </>
      )}
    </form>
  );
}

export default Todoform;

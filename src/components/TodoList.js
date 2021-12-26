import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [quote, setQuote] = useState("");

  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  useEffect(() => {
    const data = localStorage.getItem("data");

    if (data) {
      setTodos(JSON.parse(data));
    }
    async function fetchData() {
      await fetch("https://type.fit/api/quotes")
        .then((response) => response.json())
        .then((quoteArr) => {
          console.log(quoteArr);
          let randomQuoteitem = quoteArr.random();
          let quote = randomQuoteitem.author
            ? `${randomQuoteitem.text} - ${randomQuoteitem.author}`
            : `${randomQuoteitem.text}`;
          setQuote(quote);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  });

  const completeTodo = (id) => {
    console.log("completeTodo is called");
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  return (
    <div>
      <h1>{quote}</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;

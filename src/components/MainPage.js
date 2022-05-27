import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteToDo, todoIsDone } from "../redux/action";
function MainPage() {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todolist);
  const filterToDo = useSelector((state) => state.filter);
  const [mytodo, setMyToDo] = useState("");
  const saveHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo({ id: todo.length + 1, name: mytodo, isDone: false }));
    e.target.elements[0].value = ''
  };
  const checkToDo = (data) => {
    dispatch(todoIsDone(data));
  };

  return (
    <div className="container my-3 card">
        <Form onSubmit={(e) => saveHandler(e)} className="d-flex justify-content-center align-items-star my-3 ">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your todo"
              defaultValue=""
              onChange={(e) => setMyToDo(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-primary"
            className="ms-3"
            type="submit"
          >
            Save
          </Button>
        </Form>
      {filterToDo.length < todo.length
        ? filterToDo?.map((el) => (
            <div className="todo d-flex justify-content-center align-items-center mb-3">
              <li className={el.isDone ? "done" : "notDone"}>{el.name}</li>
              <Button
               variant={el.isDone ? 'success' :'outline-success'}
                className="ms-3"
                onClick={() => checkToDo({ ...el, isDone: !el.isDone })}
              >
                <i class="fas fa-check"></i>
              </Button>
              <Button
                variant="outline-danger"
                className="ms-3"
                onClick={() => dispatch(deleteToDo(el.id))}
              >
                <i class="fas fa-times"></i>
              </Button>
            </div>
          ))
        : todo?.map((el) => (
            <div className="todo d-flex justify-content-center align-items-center mb-3">
              <li className={el.isDone ? "done" : "notDone"}>{el.name}</li>
              <Button
                variant={el.isDone ? 'success' :'outline-success'}
                className="ms-3"
                onClick={() => checkToDo({ ...el, isDone: !el.isDone })}
              >
                <i class="fas fa-check"></i>
              </Button>
              <Button
                variant="outline-danger"
                className="ms-3"
                onClick={() => dispatch(deleteToDo(el.id))}
              >
                <i class="fas fa-times"></i>
              </Button>
            </div>
          ))}
    </div>
  );
}

export default MainPage;

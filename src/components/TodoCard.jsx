import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../redux/reducers/actionTypes/actionTypes";
import { deleteTodo, updateTodo } from "../redux/actions/todoActions";
import axios from "axios";

const TodoCard = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);

  //dispatch kurulumu yapma
  const dispatch = useDispatch();

  //tamamlandı değeri true ise false false ise true ya çevir
  const toggleIsDone = () => {
    //todo objesinin is_done değerini tersine çevir
    const updated = { ...todo, is_done: !todo.is_done };

    //apıdaki todoyu  güncelle
    axios
      .put(`/todos/${updated.id}`, updated)
      //store güncelle
      .then(() => dispatch(updateTodo(updated)));
  };

  //silme  işlemini gerçekleştir
  const handleDelete = () => {
    axios
      .delete(`/todos/${todo.id}`)
      //store güncelle
      .then(() => dispatch(deleteTodo(todo.id)));
  };

  return (
    <div className="border shadow-lg p-4 my-5">
      <h5>{todo.text}</h5>
      <h6>{todo.is_done ? "Tamamlandı" : "Devam Ediyor"}</h6>
      <p>{todo.created_at}</p>
      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">
        Düzenle
      </button>
      <button onClick={toggleIsDone} className="btn btn-success mx-3">
        {todo.is_done ? "Geri Al" : "Tamamlandı"}
      </button>
      <button onClick={handleDelete} className="btn btn-danger">
        Sil
      </button>

      {isOpen && <Modal close={() => setIsOpen(false)} todo={todo} />}
    </div>
  );
};

export default TodoCard;

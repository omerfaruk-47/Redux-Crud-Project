import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { ActionTypes } from "../redux/reducers/actionTypes/actionTypes";
import { addTodo } from "../redux/actions/todoActions";
import axios from "axios";

const AddForm = () => {
  //dispatch kurulumu
  const dispatch = useDispatch();

  //form gönderilince
  const handleSubmit = (e) => {
    //1)sayfanın  yenilenmesini engellemek için
    e.preventDefault();

    //2)store kaydedilecek veriyi hazırla
    const newTodo = {
      id: v4(),
      text: e.target[0].value,
      is_done: false,
      create_at: new Date().toLocaleDateString(),
    };
    //3)veriyi api a gönder
    axios
      .post("/todos", newTodo)
      //4)reducer a aksiyonu ilet
      .then(() => dispatch(addTodo(newTodo)))
      .catch((err) => alert("Sorun oluştu"));

    //5)formu temizle
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-3 my-5">
      <input
        className="form-control"
        placeholder="örn:bir şeyler yazınız..."
        type="text"
      />
      <button className="btn btn-warning">Gönder</button>
    </form>
  );
};

export default AddForm;

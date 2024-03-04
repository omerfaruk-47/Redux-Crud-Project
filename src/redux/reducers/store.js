/*
! store oluşturma
* 1. redux kütüphanesinden "createStore" methodu import edilir
* 2. store içerisinde ttuutlacak olan veirilir ve herbibiri için reducer oluşturulur
* 3. oluşturulan reducerlar "combineReducers" ile birleştirilir.
* 4. store'a oluşturlan reducerlar tanıtlır
*/

import { combineReducers, createStore } from "redux";
import todoReducer from "./todoReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  todoReducer,
  userReducer,
});

//store oluştur
const store = createStore(rootReducer);

export default store;

import { extendObservable } from "mobx";

class MyStore {
  constructor(props) {
      extendObservable(this, {
        username: "",
        token:"",
        loaded:false,
        authenticated:false,
      }
    )
  }
}
export default new MyStore()

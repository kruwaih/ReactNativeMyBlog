import { extendObservable } from "mobx";

class MyStore {
  constructor(props) {
      extendObservable(this, {
        username: "",
        token:"",
        loaded:false,
        authenticated:false,
        nextUrl:"",
        previousUrl:"",
        detailUrl:"",
      }
    )
  }
}
export default new MyStore()

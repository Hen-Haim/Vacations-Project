import { createStore, compose } from "redux";
import reducer from "./Reducers/reducer"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers());
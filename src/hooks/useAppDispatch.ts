import { useDispatch } from "react-redux";

import store from "../services/redux";

type DispatchTyped = typeof store.dispatch;

const useAppDispatch = () => useDispatch<DispatchTyped>();

export default useAppDispatch;

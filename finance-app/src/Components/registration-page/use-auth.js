import { useSelector } from "react-redux";

export function useAuth() {
  const { token } = useSelector((state) => state.user);

  return {
    isAuth: !!token,
    token,
  };
}

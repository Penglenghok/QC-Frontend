import { useDispatch, useSelector } from "react-redux";
import { IReducers } from "../redux/store";
import { useEffect } from "react";
import Router from "../routes";
import AuthRouter from "../routes/auth-router";
import { checkAuthenticationAction } from "../redux/action/auth.action";
import { isEmpty } from "lodash";

type Props = {};

export default function Layout({}: Props) {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state: IReducers) => state.auth);

  useEffect(() => {
    dispatch(checkAuthenticationAction() as any);
  }, []);

  if (loading) return <p>Loading....</p>;
  return !isEmpty(user) ? <Router /> : <AuthRouter />;
}

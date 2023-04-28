import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthorizeAdmin = (props) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  let { type } = jwt_decode(token);
  if (type !== "Admin") {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return props.children;
};


export const Authorize = (props) => {
  const token = localStorage.getItem("token");
  if(!token) {
      return <Navigate to={"/login"} replace={true}></Navigate>
  }
  return props.children;
}
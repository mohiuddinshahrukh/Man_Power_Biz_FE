import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let Authorization = localStorage.getItem("adminDataToken");
  return Authorization ? <Outlet /> : <Navigate to="/auth" />;
};
export default PrivateRoutes;

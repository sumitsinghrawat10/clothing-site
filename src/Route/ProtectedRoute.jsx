// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router";
// import { useSelector } from "react-redux";

// export default function ProtectedRoute({ children }) {
//   const { user, token } = useSelector((state) => state.auth);

//   const persistedToken = token || localStorage.getItem("authToken");

//   if (persistedToken) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const persistedUser = localStorage.getItem("authUser");

  //  Redirect to login only when NO token AND NO session
  if (!token && !persistedUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
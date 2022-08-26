import "./App.css";
import React, {useEffect} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Index from "./components";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("JWT")) {
      const JWT = localStorage.getItem("JWT");
      const parseJWT = parseJwt(JWT);
      //const expiryDate = new Date(parseJWT.exp*1000);
      const unixDateJWT = parseJWT.exp;
      const unixDateNow = Math.round(Date.now() / 1000);
      if (unixDateJWT < unixDateNow) {
        localStorage.removeItem("JWT");
        alert("Expired session. Re-signIn");
      }
    }
    return () => {};
  }, []);

  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  return <Index />;
}

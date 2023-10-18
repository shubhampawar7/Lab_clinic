import React ,{ useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";

const Protected = ({component:Component}) => {
  const history = useHistory();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let login = localStorage.getItem("email");

    if (login) {
      setIsAuthorized(true);
    } else {
      history.push('/admin');
    }
  }, []);

  return (
    <>
      {isAuthorized && <Component />}
    </>
  );
}

export default Protected;

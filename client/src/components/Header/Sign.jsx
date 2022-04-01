import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";

const Sign = () => {
  const user = useSelector((state) => state.application.token);

  return (
    <div className="sign">
      {user ? (
        <>
          <Card />
          <div>
            <Link className="user__icon" to="/user">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </>
      ) : (
        <div>
          <Link className="sign__icon" to="/signup">
            <FontAwesomeIcon icon={faSignIn} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sign;

import React from "react";

export const Protected = ({ roles, userRole, children }) => {
  let visible = false;

  if (roles.includes(userRole)) {
    visible = true;
  } else if (roles === undefined) {
    visible = false;
  } else {
    visible = false;
  }

  return <>{visible && children}</>;
};
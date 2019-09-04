import React, { useState } from "react";
import "../styles/Notifications.css";

const Notifications = props => {
  return <div className={props.type}>{props.message}</div>;
};

export default Notifications;

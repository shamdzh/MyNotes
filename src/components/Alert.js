import React, { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);


  if(!alert.visible) {
    return null;
  }

  return (
    <div class={`alert alert-${alert.type || 'warning'} alert-dismissible fade show`} role="alert">
      {alert.text}
      <button
        onClick = {hide}
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

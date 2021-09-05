import React, { useContext, useState } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { useTransition, animated } from "react-spring";

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  const transitions = useTransition(alert.visible, {
    from: {opacity: 0},
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 400 }
    
  })

  return transitions (
    (styles, item) => 
    item && <animated.div style={styles}>
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
    </animated.div>
  )

  // return (

    // <div class={`alert alert-${alert.type || 'warning'} alert-dismissible fade show`} role="alert">
    //   {alert.text}
    //   <button
    //     onClick = {hide}
    //     type="button"
    //     class="btn-close"
    //     data-bs-dismiss="alert"
    //     aria-label="Close"
    //   ></button>
    // </div>
  // );
};

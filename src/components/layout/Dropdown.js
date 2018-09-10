import React from "react";
import classnames from "classnames";

const Dropdown = props => {
  return (
    <div
      className={classnames("focus:border-transparent", {
        hidden: !props.show
      })}
    >
      <div className="fixed z-10 pin cursor-default" onClick={props.toggle} />

      <div className="absolute z-20 w-48 mt-20 pin-t pin-r bg-white rounded-lg border border-grey-lighter shadow">
        <div>
          <div
            className="absolute w-0 h-0"
            style={{
              borderStyle: "solid",
              borderWidth: "0 17px 17px 17px",
              borderColor: "transparent transparent #F1F5F8 transparent",
              right: "0.9rem",
              bottom: "100%"
            }}
          />
          <div
            className="absolute w-0 h-0"
            style={{
              borderStyle: "solid",
              borderWidth: "0 15px 15px 15px",
              borderColor: "transparent transparent white transparent",
              right: "1rem",
              bottom: "100%"
            }}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Dropdown;

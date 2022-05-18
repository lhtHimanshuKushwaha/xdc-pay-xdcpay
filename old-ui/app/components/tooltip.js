import React from "react";
import ReactTooltip from "react-tooltip";

export default function Tooltip({ message, value, children }) {
  const randomnumber = Math.floor(Math.random() * 1000000);
  return (
    <div className="App" data-tip data-for={`${randomnumber}`}>

      {children}
      <ReactTooltip id={`${randomnumber}`} place={value || "bottom"} effect="solid">
        {message}
      </ReactTooltip>
    </div>
  );
}
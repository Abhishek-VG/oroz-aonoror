import React from "react";
import { HooksLifeCycle } from "./HooksLifeCycle";
import { ClassLifeCycle } from "./ClassLifeCycle";

export const Toggle = () => {
  const [count, setCount] = React.useState(0);
  const [off, setOff] = React.useState(false);
  return (
    <div>
      {!off && <ClassLifeCycle count={count} />}<br/>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count + {count}
      </button>
      <button
        onClick={() => {
          setOff(!off);
        }}
      >
        {off ? "ON" : "OFF"}
      </button>
    </div>
  );
};

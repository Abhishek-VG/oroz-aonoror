import React from "react";
import { HooksLifeCycle } from "./HooksLifeCycle";
import { ClassLifeCycle } from "./ClassLifeCycle";
import { AsyncAwait } from "./AsyncAwait";

export const Toggle = () => {
  const [count, setCount] = React.useState(0);
  const [off, setOff] = React.useState(false);
  return (
    <div>
      <AsyncAwait />
      {/* {!off && <ClassLifeCycle count={count} />}<br/> */}
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

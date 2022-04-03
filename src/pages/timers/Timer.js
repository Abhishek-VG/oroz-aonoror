import React from "react";

const Timer = () => {
  const count = React.useRef();

  React.useEffect(() => {
    count.current += 1;
  });
  return <div>{count.current}</div>;
};

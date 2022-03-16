import React from "react";

export const HooksLifeCycle = ({ count }) => {
  // this is mount cycle
  React.useEffect(() => {
    console.log("I am mount");
    return () => {
        console.log("I'm unmount")
    }
  }, []);

  React.useEffect(() => {
    console.log("I am update");
  });
  

  return <span>Papu is emme = {count}</span>;
};

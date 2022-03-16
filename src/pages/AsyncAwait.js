import React from "react";

export const AsyncAwait = () => {
  const [title, setTitle] = React.useState("");
  // this is mount cycle
  //   React.useEffect(() => {
  //     console.log(1);
  //     fetch("https://jsonplaceholder.typicode.com/todos/2")
  //       .then((response) => response.json())
  //       .then((res) => {
  //         console.log(2);
  //         setTitle(res.title);
  //     });
  //     console.log(3);
  //   }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    try {
      console.log(1);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/3"
      );
      console.log(2);
      const res = response.json();
      console.log(res);
      setTitle(res.title);
    } catch {
    } finally {
    }
  }, []);

  return <span>Papu is emme, {title}</span>;
};

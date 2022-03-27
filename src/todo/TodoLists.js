import React from "react";

export const TodoLists = () => {
  const [value, setValue] = React.useState("");

  const [list, setList] = React.useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleAdd = () => {
    // const newVal = { label: value, isCompleted: false };
    setList([...list, value]);
    setValue("");
  };

  const toggleTask = (index) => {
    const obj = list[index];
    obj.isCompleted = !obj.isCompleted;
    setList([...list]);
  };
  const deleteTask = (index) => {
    const newList = [...list.slice(0, index), ...list.slice(index + 1)];
    setList(newList);
  };
  console.log("lists", list);

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
      <div>
        {list.map((obj) => {
          return <div>{obj.label}</div>;
        })}
        {/* {list.map((obj, index) => { 
        obj.label

      <button onClick={() => deleteTask(index)}>Del</button>)} */}
      </div>
    </>
  );
};

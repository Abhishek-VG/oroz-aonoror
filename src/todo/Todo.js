import React from "react";

export const Todo = () => {
  const [value, setValue] = React.useState("");
  const [list, setList] = React.useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleAdd = () => {
    const newVal = { label: value, isCompleted: false };
    setList([...list, newVal]);
    setValue("");
  };
  const toggletask = (index) => {
    // const obj = list[index];
    // obj.isCompleted = !obj.isCompleted;
    // setList([...list]);
    const deleteTask = (index) => {
      // list.splice(index, 1);
      // setList([...list]);
      const newList = [...list.slice(0, index), ...list.slice(index + 1)];
      setList(newList);
    };

    console.log("list", list);
    return (
      <div className="App">
        <input value={value} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
        <div style={{ marginTop: "20px" }} />
        {list.map((obj, index) => (
          <div>
            <div
              style={{
                display: "inline-block",
                paddingRight: "10px",
                cursor: "pointer",
                textDecoration: obj.isCompleted ? "line-through" : "none",
              }}
              onClick={() => toggletask(index)}
            >
              {obj.label}
            </div>
            <button onClick={() => deleteTask(index)}>Del</button>
          </div>
        ))}
      </div>
    );
  };
};

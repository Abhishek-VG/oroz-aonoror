export const fetchApi = (URL, config={}) => {
  const { method = "GET", body } = config;
  tokenCheck(URL, config);
  let data;
  switch (method) {
    case "GET":
      data = getFromLocalStorage(URL);
      return Promise.resolve({ json: () => data });
    case "POST":
      data = addToLocalStorage(URL, body);
      return Promise.resolve({ json: () => data });
    case "DELETE":
      data = deleteFromLocalStorage(URL);
      return Promise.resolve({ json: () => data });
    case "PUT":
      data = updateToLocalStorage(URL, body);
      return Promise.resolve({ json: () => data });
    default:
      throw Promise.reject("Unsupported method ", method);
  }
};

const getData = (table) => {
  let data;
  if (table === "movieDataBase") {
    data = JSON.parse(localStorage.getItem("movieDataBase"));
  } else if (table === "theaterDataBase") {
    data = JSON.parse(localStorage.getItem("theaterDataBase"));
  } else if (table === "userDataBase") {
    data = JSON.parse(localStorage.getItem("userDataBase"));
  } else {
    throw Error("INVALID ROUTE");
  }

  if (!Array.isArray(data)) {
    postData([], table);
    data = [];
  }
  return data;
};

const postData = (data, table) => {
  if (table === "movieDataBase") {
    return localStorage.setItem("movieDataBase", JSON.stringify(data));
  } else if (table === "theaterDataBase") {
    return localStorage.setItem("theaterDataBase", JSON.stringify(data));
  } else if (table === "userDataBase") {
    return localStorage.setItem("userDataBase", JSON.stringify(data));
  } else {
    throw Error("INVALID ROUTE");
  }
};

const getFromLocalStorage = (URL) => {
  if (getId(URL) === "logout") {
    localStorage.removeItem("access-token");
    return true;
  }
  const parsedData = getData(getDb(URL));
  const id = getId(URL);
  if (!isNaN(id)) {
    return parsedData.find((obj) => +obj.id === +id);
  } else {
    return parsedData;
  }
};

const deleteFromLocalStorage = (URL) => {
  if (getId(URL) === "logout") {
    localStorage.removeItem("access-token");
    return true;
  }
  if (getId(URL) === "flush") {
    deleteAll();
    return true;
  }
  const parsedData = getData(getDb(URL));
  const id = getId(URL);
  const index = parsedData.findIndex((obj) => +obj.id === +id);
  if (index === -1) {
    return false;
  } else {
    parsedData.splice(index, 1);
    postData(parsedData, getDb(URL));
    return true;
  }
};

const addToLocalStorage = (URL, data) => {
  const parsedData = getData(getDb(URL));
  if (URL.includes("login")) {
    const obj = parsedData.find(({ username }) => username === data.username);
    if (
      obj &&
      obj.username === data.username &&
      obj.password === data.password
    ) {
      return {username: obj.username, time: Date.now(), "access-token": tokenGenerate(obj)};
    } else {
      return Promise.reject("Invalid user")
      // throw Error("Invalid user");
    }
  } else {
    parsedData.push({ ...data, id: Date.now() });
    postData(parsedData, getDb(URL));
    return true;
  }
};

const updateToLocalStorage = (URL, data) => {
  const parsedData = getData(getDb(URL));
  const id = getId(URL);
  const index = parsedData.findIndex(
    (obj) => obj.id.toString() === id.toString()
  );
  if (index === -1) {
    return false;
  } else {
    parsedData.splice(index, 1, { ...data, id });
    postData(parsedData, getDb(URL));
    return true;
  }
};

const deleteAll = () => {
  localStorage.removeItem("movieDataBase");
  localStorage.removeItem("theaterDataBase");
  localStorage.removeItem("userDataBase");
};

const getDb = (URL) => {
  if (URL.includes("movie")) {
    return "movieDataBase";
  } else if (URL.includes("theater")) {
    return "theaterDataBase";
  } else if (URL.includes("user")) {
    return "userDataBase";
  } else throw Error("INVALID ROUTE");
};
const getId = (URL) => URL.split("/").pop();

// fetchApi("http://localhost:8080/movie", {method: "GET"}).then(a=>a.json()).then(aa=>console.log(aa))
// fetchApi("http://localhost:8080/movie", {method: "GET"}).then(a=>a.json()).then(aa=>console.log(aa))

const tokenCheck = (URL, config) => {
  if (!URL.includes("user")) {
    try {
      const token = config?.headers.get("X-Auth-token");
      const [username, password, id] = atob(token).split("-");
      const db = getData("userDataBase");
      const userObj = db.find((obj) => +obj.id === +id);
      if (userObj.username === username && userObj.password === password) {
        console.log("AUTH SUCCESS");
      } else {
        throw new Error("Loggin madu");
      }
    } catch {
      throw new Error("Loggin madu");
    }
  }
};

const tokenGenerate = (obj) => {
  const token = btoa(`${obj.username}-${obj.password}-${obj.id}`);
  // localStorage.setItem("access-token", token);
  return token;
};

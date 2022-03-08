export const fetchApi = (URL, config) => {
  const { method = "GET", body } = config;
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
  if(table === "movieDataBase") {
    data = JSON.parse(localStorage.getItem("movieDataBase"));
  } else {
    data = JSON.parse(localStorage.getItem("theaterDataBase"));
  }

  if (!Array.isArray(data)) {
    postData([], table);
    data = [];
  }
  return data;
};

const postData = (data, table) => {
  if(table === "movieDataBase") {
    return localStorage.setItem("movieDataBase", JSON.stringify(data));
  } else {
    return localStorage.setItem("theaterDataBase", JSON.stringify(data));
  }
};

const getFromLocalStorage = (URL) => {
  const parsedData = getData(getDb(URL));
  const id = getId(URL);
  if(!isNaN(id)) {
    return parsedData.find((obj) => +obj.id === +id);
  } else {
    return parsedData;
  }
};

const deleteFromLocalStorage = (URL) => {
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
  parsedData.push({ ...data, id: Date.now() });
  postData(parsedData, getDb(URL));
  return true;
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
}

const getDb = (URL) => URL.includes("movie") ? "movieDataBase" : "theaterDataBase";

const getId = (URL) => URL.split("/").pop();

// fetchApi("http://localhost:8080/movie", {method: "GET"}).then(a=>a.json()).then(aa=>console.log(aa))
// fetchApi("http://localhost:8080/movie", {method: "GET"}).then(a=>a.json()).then(aa=>console.log(aa))

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

const getData = () => {
  let data = JSON.parse(localStorage.getItem("movieDataBase"));
  if (!Array.isArray(data)) {
    postData([]);
    data = [];
  }
  return data;
};

const postData = (data) => {
  return localStorage.setItem("movieDataBase", JSON.stringify(data));
};

const getFromLocalStorage = (URL) => {
  const parsedData = getData();
  if (URL === "http://localhost:8080/movie") {
    return parsedData;
  } else {
    const id = URL.replace("http://localhost:8080/movie/", "");
    return parsedData.find((obj) => obj.id == id);
  }
};

const deleteFromLocalStorage = (URL) => {
  if (URL === "http://localhost:8080/movie/flush") {
    deleteAll();
    return true;
  }
  const parsedData = getData();
  const id = URL.replace("http://localhost:8080/movie/", "");
  const index = parsedData.findIndex((obj) => obj.id == id);
  if (index === -1) {
    return false;
  } else {
    parsedData.splice(index, 1);
    postData(parsedData);
    return true;
  }
};

const addToLocalStorage = (URL, data) => {
  const parsedData = getData();
  parsedData.push({ ...data, id: Date.now() });
  postData(parsedData);
  return true;
};

const updateToLocalStorage = (URL, data) => {
  const parsedData = getData();
  const id = URL.replace("http://localhost:8080/movie/", "");
  const index = parsedData.findIndex(
    (obj) => obj.id.toString() === id.toString()
  );
  if (index === -1) {
    return false;
  } else {
    parsedData.splice(index, 1, { ...data, id });
    postData(parsedData);
    return true;
  }
};

const deleteAll = () => localStorage.removeItem("movieDataBase");

// fetchApi("http://localhost:8080/movie", {method: "GET"}).then(a=>a.json()).then(aa=>console.log(aa))
// fetchApi("http://localhost:8080/movie", {method: "GET"}).then(a=>a.json()).then(aa=>console.log(aa))

### cloning the project

`git clone <project_Link>`

### change the directory to project

`cd <project_directory>`

### install the libraries

`npm install`

### start the application

`npm start`

### shortcut to open the project in vscode

in cmd, go to the main directory,
run `code .`

### API MOCK

1. To add an movie object
   `fetchApi("http://localhost:8080/movie", {method: "POST", body: { name: "jyo12" }, headers: { X-Auth-token: "access token" }})`

2. To delete an movie object
   `fetchApi("http://localhost:8080/movie/{id}", {method: "DELETE", headers: { X-Auth-token: "access token" }})`

3. To fetch an movie object
   `fetchApi("http://localhost:8080/movie/{id}", {method: "GET", headers: { X-Auth-token: "access token" }})`

4. to update a movie object
   `fetchApi("http://localhost:8080/movie/{id}", {method: "PUT", body: {name: "MJ"}, headers: { X-Auth-token: "access token" }})`

5. to get all the list
   `fetchApi("http://localhost:8080/movie", {method: "GET", headers: { X-Auth-token: "access token" }})`

6. to flush/delete database
   `fetchApi("http://localhost:8080/movie/flush", {method: "DELETE", headers: { X-Auth-token: "access token" }})`

append
`.then(resp => resp.json()).then(obj => console.log(obj))`
example
`fetchApi("http://localhost:8080/movie", {method: "GET", headers: { X-Auth-token: "access token" }}).then(resp => resp.json()).then(obj => console.log(obj))`

## API MOCK FOR THEATERS

add "/theater" in place of "/movie"

## API mock for use creation

`fetchApi("http://localhost:8080/user/register", {method: "POST", body: { username: "jyo12", password: "passw" }})`
`fetchApi("http://localhost:8080/user/login", {method: "POST", body: { username: "jyo12", password: "passw" }})`



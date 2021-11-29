const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

const route = require("./routes"); // sẽ tự tìm đến file index.js trong folder routes

const db = require("./config/db");

//connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

//middleware de xu ly request gui len tu form
app.use(
  express.urlencoded({
    extended: true, // la thu vien body-parser dc tich hop san trong expressJS
  })
);
//middleware de xu ly request gui len tu code js
app.use(express.json());

app.use(methodOverride("_method"));

//HTTP logger
app.use(morgan("combined"));

//template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b, // sử dụng hàm này để gen ra số thứ tự của khoá học trong stored-courses
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

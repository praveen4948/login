const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/database");
const Student = require("./model/coll");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const relative_path = path.join(__dirname, "../template/views");
const partiPath = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", relative_path);
hbs.registerPartials(partiPath);

// get method handel
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/ragister", (req, res) => {
  res.render("ragister");
});

// post method handel
app.post("/ragister", async (req, res) => {
  try {
    const pass = req.body.password;
    const cpass = req.body.cpassword;
    if (pass === cpass) {
      const ragister = new Student({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: pass,
        confirmPassword: cpass,
      });

      const check = await ragister.save();
      console.log(check);

      res.render("logedin");
    } else {
      res.send("password does not match..");
    }
  } catch (e) {
    res.send(`the error occur due to ${e}`);
  }
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;
    const find = await Student.findOne({ email: email });
    if (pass === find.password) {
      res.render("logedin");
    } else {
      res.send("invalid input");
    }
  } catch (e) {
    res.send(`error occur due to ${e}`);
  }
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

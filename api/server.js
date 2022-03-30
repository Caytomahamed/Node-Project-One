// BUILD YOUR SERVER HERE

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const model = require("./users/model");

const server = express();
server.use(cors());
//PORT
const PORT = 4000;

//RES HSON
server.use(express.json());

module.exports = {}; // EXPORT YOUR SERVER instead of {}

// GET api/users
server.get("/api/users", (req, res) => {
  model
    .find()
    .then((users) => res.json(users))
    .catch(() =>
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" })
    );
});

//Get one User
server.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  model
    .findById(id)
    .then((user) => {
      console.log(user.id);
      if (id !== user.id) {
        res
          .status(500)
          .json({ message: `The user information could not be retrieved` });
      }
      res.json(user);
    })
    .catch((user) => {
      res
        .status(404)
        .json({ message: `The user with the specified ${id} does not exist` });
    });
});

//POST api/users
server.post("/api/users", (req, res) => {
  let body = req.body;
  model
    .insert(body)
    .then((user) => {
      console.log(user);
      if (body.name === null || body.bio === null) {
        res.status(404).json("Bad Request");
      } else {
        res.status(201).json({ id: user.id, name: user.name, bio: user.bio });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Please provide name and bio for the user" });
    });
});

//Update
server.put("/api/users/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let body = req.body;
    let newUser = await model.update(id, body);

    if (body.name === null || body.bio === null) {
      res
        .status(404)
        .json({ message: "Please provide name and bio for the user" });
      return;
    } else {
      res.status(201).json({ id, name: body.name, bio: body.bio });
    }

    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  } catch {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  }
});

server.listen(PORT, () => {
  console.log("SERVER STARTED");
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  let { id } = req.params;
  model
    .remove(id)
    .then((user) => {
      if (user === null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be modified" });
    });
});

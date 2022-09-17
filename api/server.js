// BUILD YOUR SERVER HERE

const express = require("express");
const cors = require("cors");
const model = require("./users/model");

const server = express();
server.use(cors());
//PORT
const PORT = 4000;

//RES HSON
server.use(express.json());

// UTILITY FUCNTIONS

const checkBodyInNameandBoi = function (body, res) {
  body.name === null || body.bio === null
    ? res
        .status(404)
        .json({ message: "Please provide name and bio for the user" })
    : "";
};

const erroChecker = function (res, statusCode, textMessage, id = null) {
  return res
    .status(statusCode)
    .json({ message: `${textMessage} ${id ? id : ""}` });
};

// GET api/users
server.get("/api/users", async (_, res) => {
  try {
    const users = await model.find();
    res.json(users);
  } catch (error) {
    erroChecker(res, 500, "The users information could not be retrieved");
  }
});

//Get one User
server.get("/api/users/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const user = await model.findById(id);
    user && res.json(user);

    erroChecker(res, 404, `The user with the specified ${id} does not exist`);
  } catch (error) {
    erroChecker(res, 500, `The user information could not be retrieved`);
  }
});

//POST api/users
server.post("/api/users", async (req, res) => {
  checkBodyInNameandBoi(req.body, res);

  try {
    let { body } = req;

    if (body.name === null || body.bio === null) {
      erroChecker(res, 404, "Please provide name and bio for the user");
    }

    const newUser = await model.insert(body);
    res.status(201).json(newUser);
  } catch (error) {
    erroChecker(
      res,
      500`There was an error while saving the user to the database`
    );
  }
});

//Update
server.put("/api/users/:id", async (req, res) => {
  let {
    params: { id },
    body,
  } = req.params;

  checkBodyInNameandBoi(body, res);

  try {
    let updateUser = await model.update(id, body);

    !updateUser.id &&
      erroChecker(res, 404, "The user with the specified ID does not exist");

    res.status(200).json(updateUser);
  } catch {
    erroChecker(res, 500, "The user information could not be modified");
  }
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

module.exports = server;

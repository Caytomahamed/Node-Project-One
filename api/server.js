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

// NOTE: UTILITY FUCNTIONS
/**
 * checked If the request body is missing the `name` or `bio` property:
 * @param {object} body - is the userInput
 * @param {*} res - is response object
 */
const checkBodyInNameandBoi = function (body, res) {
  body.name === null || body.bio === null
    ? res
        .status(404)
        .json({ message: "Please provide name and bio for the user" })
    : "";
};

/**
 * Genarating a error message
 * @param {object} res - respose object
 * @param {number} statusCode - is http status code
 * @param {string} textMessage - respose erro message
 * @returns - message
 */
const genarateErro = function (res, statusCode, textMessage) {
  return res.status(statusCode).json({ message: `${textMessage}` });
};

// NOTE: END POINT

// GET api/users
server.get("/api/users", async (_, res) => {
  try {
    const users = await model.find();
    res.json(users);
  } catch (error) {
    genarateErro(res, 500, "The users information could not be retrieved");
  }
});

//Get one User
server.get("/api/users/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const user = await model.findById(id);
    user && res.json(user);

    genarateErro(res, 404, `The user with the specified ${id} does not exist`);
  } catch (error) {
    genarateErro(res, 500, `The user information could not be retrieved`);
  }
});

//POST api/users
server.post("/api/users", async (req, res) => {
  checkBodyInNameandBoi(req.body, res);
  console.log(req.body);
  try {
    let { body } = req;

    if (body.name === null || body.bio === null) {
      genarateErro(res, 404, "Please provide name and bio for the user");
    }

    const newUser = await model.insert(body);
    res.status(201).json(newUser);
  } catch (error) {
    genarateErro(
      res,
      500`There was an error while saving the user to the database`
    );
  }
});

//Update
server.put("/api/users/:id", async (req, res) => {
  let {params: { id },body,} = req;
  checkBodyInNameandBoi(body, res);
  try {
    let updateUser = await model.update(id, body);
    !updateUser &&
      genarateErro(res, 404, "The user with the specified ID does not exist");

    res.status(200).json(updateUser);
  } catch (erro) {
    genarateErro(res, 500, "The user information could not be modified");
  }
});  

//Delete
server.delete("/api/users/:id", async (req, res) => {
  let { id } = req.params;

  try {  
    const deleteUser = await model.remove(id);

    !deleteUser &&  
      genarateErro(res, 404, "The user with the specified ID does not exist");

    res.status(200).json(deleteUser); 
  } catch (error) {
    genarateErro(res, 500, "The user could not be removed");
  }
});

module.exports = server;

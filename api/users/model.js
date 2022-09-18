// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
const { nanoid } = require("nanoid");

function getId() {
  return nanoid().slice(0, 5);
}

const initializeUsers = () => [
  {
    id: getId(),
    name: "Yusuf Jamac",
    bio: "hero",
    image:
      "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
  },
  {
    id: getId(),
    name: "Hawo Tako",
    bio: "super hero",
    image:
      "https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  },
  {
    id: getId(),
    name: "Mahamed Faraha",
    bio: "teacher ",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: getId(),
    name: "Hames Hassan",
    bio: "student !",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
];

// FAKE IN-MEMORY USERS "TABLE"
let users = initializeUsers();

// DATABASE ACCESS FUNCTIONS
const find = () => {
  // SELECT * FROM users;
  return Promise.resolve(users);
};

const findById = (id) => {
  // SELECT * FROM users WHERE id = 1;
  const user = users.find((d) => d.id === id);
  return Promise.resolve(user);
};

const insert = ({ name, bio, image }) => {
  // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
  const newUser = { id: getId(), name, bio, image };
  console.log(newUser);
  users.push(newUser);
  return Promise.resolve(newUser);
};

const update = (id, changes) => {
  // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
  const user = users.find((user) => user.id === id);
  if (!user) return Promise.resolve(null);

  const updatedUser = { ...changes, id };
  users = users.map((d) => (d.id === id ? updatedUser : d));
  return Promise.resolve(updatedUser);
};

const remove = (id) => {
  // DELETE FROM users WHERE id = 1;
  const user = users.find((user) => user.id === id);
  if (!user) return Promise.resolve(null);

  users = users.filter((d) => d.id !== id);
  return Promise.resolve(user);
};

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

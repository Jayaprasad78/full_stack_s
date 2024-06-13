const M = require('mongoose');

M.connect('mongodb://localhost:27017/p')
  .then(() => {
    console.log("server is connected to database");
  })
  .catch((err) => {
    console.log("database is not connected", err);
  });

console.log("my server is running on 3000 port");

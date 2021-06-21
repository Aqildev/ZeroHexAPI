require('custom-env').env();
var config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};
module.exports = {
  secret: '6ubr]h%d{Te(yWBe5T5`kk=.hH}^?T*V',
  config
};
// exports.config = config;
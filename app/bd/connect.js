const {Pool} = require('pg');
const configBD = require('../config/config_server').bd;

module.exports.pool = new Pool({
    host: configBD.bd_host,
    port: configBD.bd_port,
    database: configBD.bd_name,
    user: configBD.bd_user,
    password: configBD.bd_password,
});
const Pool = require("pg").Pool
const pool = new Pool({
    user: "db",
    password: "t812mohbnmsdy1k0",
    host: "app-0f8c23d9-9334-44b2-9db6-388ab2329cf2-do-user-3099063-0.b.db.ondigitalocean.com",
    port: 25060,
    database: "db",
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = pool
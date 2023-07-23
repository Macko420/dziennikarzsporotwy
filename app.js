const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 3500;
const verifyDB = require("./middleware/verifyDB");
const admin = require("./middleware/admin.js");

//database
const db = require("./database/models");

//syncing database
db.sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log("db synced");
  })
  .catch((err) => {
    console.log("Failed to sync DB: " + err.message);
  });

// app.use(credentials); // z jakich portów można
//middle fot cookie
app.use(cookieParser());

//middle for json
app.use(express.json());

//cors possible to change
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// app.use(cors(corsOptions)); //'Access-Control-Allow-Credentials', true

//middleware for db
app.use(verifyDB);
//routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/loginEmail"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/article/", require("./routes/article.js"));
app.use("/search", require("./routes/search.js"));
app.use("/comment", require("./routes/addComment.js"));
app.use("/pass", require("./routes/changePasswd.js"));
app.use("/verify", require("./routes/verify.js"));

app.use("/admin", require("./routes/admin.js"));

app.listen(port, () => console.log(`http://localhost:${port}`));

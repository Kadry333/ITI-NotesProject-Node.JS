const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     console.log("hello from middleware");
//     next();
// });

const notesRouter = require("./src/routes/notesRoutes");
const authRouter = require("./src/routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/notes", notesRouter);
app.use("/auth", authRouter);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

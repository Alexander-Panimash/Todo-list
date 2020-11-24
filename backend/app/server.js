import routes from './routes/index.js';
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import db from './models/index.js'


const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

db.sequelize.sync()
    .then(() => {
        console.log("Drop and re-sync db.");
    });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger("dev"));
app.use(routes);

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to bezkoder application."});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
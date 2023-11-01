import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

//Todays date
const date = new Date();

//Array for storing the list
var personalItems = [];
var workItems = [];

//Keep track of the angle of the gradient
var angle;

//Data to pass to the ejs template
var data ={
    date: date.toDateString(),
    personalItems: personalItems,
    workItems: workItems,
    angle: angle,
};

//Add our static files
app.use(express.static("public"));

//Add our middleware (body-parser) so that we can process inputs from ejs forms
app.use(bodyParser.urlencoded({extended: true}));

//Start our server on port 3000
app.listen(port, () =>{
    console.log(`Server running on port:${port}`);
});

//Load our initial page on the root endpoint.
app.get("/", (req, res) => {
    res.render("index.ejs", data);
});

//Add new item to lists
app.post("/", (req, res) => {
    if(req.body["newPersonal"])
    {
        data.angle = false;
        personalItems.push(req.body["newPersonal"]);
    }
    else if(req.body["newWork"])
    {
        data.angle = true;
        workItems.push(req.body["newWork"]);
    }
    res.render("index.ejs", data);
});


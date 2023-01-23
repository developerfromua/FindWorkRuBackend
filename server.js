const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const app = express();
var corsOptions = {
    origin: "http://192.168.0.107"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.json({message: '/api/vacancies/page/{page} just use the GET request'});
});

 require("./app/routes/vacancies.routes.js")(app);
// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
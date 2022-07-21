const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1000;
const DataBaseURL = process.env.DataBaseURL || `mongodb+srv://internldhdev:Trident2022@cluster0.b0vqy.mongodb.net/?retryWrites=true&w=majority`;
const LoginRouter = require('./routes/loginRouter.js');
const hbs = require('hbs');
var cookieParser = require('cookie-parser');

const static_path = path.join(__dirname, "./public");
const views_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");


app.use(express.json());
app.use(express.static(static_path));

app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);

app.use(cookieParser());
// console.log(path.join(__dirname, "./public"));
mongoose.connect(DataBaseURL, {useNewUrlParser : true})
.then(() => {
    console.log("DataBase Connected ...!! ");
})
.catch((err) => {
    console.log("DataBase Could not be connected due to ",err);
});

const db = mongoose.connection;
db.on('error' , error => console.error(error));
db.once('open' , () => console.log("DataBase Connection Established Successfully..!!"));


app.use('/',LoginRouter);

app.listen(PORT , () => {
    console.log(`Server listening on PORT number ${PORT} ...`);
})
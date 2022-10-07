const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const { hostname } = require("os");
let contact = undefined;

main().catch((err) => console.log(err));


async function main() {
    await mongoose.connect("mongodb://localhost:27017/contactDance");

    const contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String,
    });

    contact = mongoose.model("contact", contactSchema);
    console.log('in main');
}

//create an express app
const app = express();
const port = 80;

//express related stuff
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

//pug related stuff
app.set('view engin', 'pug'); //sets template engine as pug
app.set('views', path.join(__dirname, "views")) //set views directory

app.get("/", (req, res) => {
    console.log("in get");
    res.status(200).render("home.pug");
})

app.get("/contact", (req, res) => {
    console.log("in get");
    res.status(200).render("contact.pug");
})

app.post("/contact", (req, res) => {


    const ct = new contact(req.body);
    console.log("in post " + ct);
    ct.save();

    res.status(200).render("contact.pug");
})


app.listen(port, hostname, () => {
    console.log(`App has successfully started on port : ${port}`)
})
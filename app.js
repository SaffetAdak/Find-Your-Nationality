    const axios = require('axios');
    const express = require("express");
    const bodyParser = require("body-parser");

    const app = express();

    app.set("view engine", "ejs");
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", async (req, res) => {
        try {
        const response = await axios.get("https://api.nationalize.io?name=michael");
        const result = response.data;
        res.render("index.ejs", { data: result });
        } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
        }
    });

    app.post("/", async (req, res)=> {
        try {
            let name = req.body.name;
            const response = await axios.get(`https://api.nationalize.io?name=${name}`);
            const country = response.data.country;
            console.log("Name:", name, "\nCountry:", country);
            res.render("index.ejs", { country: country , name: name})
        }catch(error){
            console.error("Failed to make request:", error.message);
            res.render("index.ejs", {
            error: error.message,
        });
        }
    });

    app.listen(3000, function(){
        console.log("Server is running on port 3000");
    });

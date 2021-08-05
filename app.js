const express = require("express");
const request = require("request");
const bpsyparser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    
    const firstName = req.body.fName;
    const lastName = req.body.LName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/fd300966ff";

    const options = {
        method: "POST",
        auth: "stealth:ea003b6f94c6237a554a6e85293e656a-us5"
    }

    const request = https.request(url, options, function(response){
            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
    })
    
    request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


//API Key
// ea003b6f94c6237a554a6e85293e656a-us5

//List ID
// fd300966ff





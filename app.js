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

    const url = URL;

    const options = {
        method: "POST",
        auth: AUTH_TOKEN
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
            response.on("data", function(data){
                console.log(response.statusCode);
            })
    })
    
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})


//API Key
// ea003b6f94c6237a554a6e85293e656a-us5

//List ID
// fd300966ff





const express = require('express');
const app = express();

const axios = require('axios');
var qs = require('qs');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(express.json());
app.use(cors(corsOptions))

app.post("/compile", cors(), (req, res)=>{
    const {code, language, input} = req.body;

    var data = qs.stringify({
        'code': code,
        'language': language,
        'input': input
    });
    var config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    axios(config)
      .then(function (response) {
        const outputData = response.data

        if(outputData.error !== ""){
          // res.send(200, {output: outputData.error, error: true})
          res.status(200).send({output: outputData.error, error: true});
        }
        else{
            // res.send(200, {output: outputData.output, error: false})
            res.status(200).send({output: outputData.output, error: false});
        }
      })
      .catch(function (error) {
        // res.send(408, {output: error.response.data.error, error: true})
        res.status(408).send({output: error.response.data.error, error: true});
      });
})

app.listen(3000);
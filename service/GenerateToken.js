var axios =require("axios").default
require("dotenv").config()

async function generateToken() {
    
    var data = {
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "audience": process.env.AUDIENCE,
        "grant_type": process.env.GRANT_TYPE
    };
    var options = {
        method: 'POST',
        "url": process.env.URL,
        headers:  { 'content-type': 'application/json' },
        data: JSON.stringify(data)

    
    };
    var a = axios.request(options).then(function (response) {
        return response;
      }).catch(function (error) {
        console.error(error);
      });
      return a;
}

module.exports.generateToken=generateToken;
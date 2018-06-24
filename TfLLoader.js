const axios = require('axios');



function TfLGet(url, params) {

    return {
        url: url,
        baseURL: 'https://api.tfl.gov.uk/',
        
        params: {
            app_id: process.env.TFLID,
            app_key: process.env.TFLKEY,
            ...params
        }
    }
}

function sendRequest(url, params, callback) {
    axios(
        TfLGet(url, params))
        .then( (response) => {
            // console.log(response);
            callback(response);
        })
        .catch( (error) => {
            console.log("GET Error: " + error);
        });
}


module.exports = {
    getModes: function() {
        sendRequest(
            '/Line/Meta/Modes', 
            {}, 
            (response) => {console.log(response.data)}
        );
    },

    getLinesForMode: function(mode) {
        sendRequest(
            'Line/Mode/' + mode, 
            {},
            (response) => {
                let lines = response.data.map(mode => mode.id)
                // console.log(response.data[0].id);
                console.log(lines);
            }
        ); 
    }

}
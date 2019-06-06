var http = require("http");

// Data = l'url
var request = function (data, callback) {
    //Si l'url n'existe pas
    if (!data.url) return callback(new Error("Insert image url in data.url"));
    console.log("Start downloading :", data.url);

    http.get(data.url, function (response) {
        var body = '';
        //Event data
        response.on('data', function (d) {
            body += d; //somme de la taille des images téléchargées
        });
        //Ds l'Event end, on retourne le body
        response.on('end', function () {
            console.log("Finish", data.url, "size : " + body.length);
            return callback(null, body);
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
};

//Exporter la fn (cad la variable request)
module.exports = request;

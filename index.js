var async = require("./libs/async.js");
var request = require("./libs/request.js");
var config = require("./config.json"); // Array d'images
var underscore = require("./node_modules/undescore");

// Arguments: tableau d'images, fn de téléchargement, le callback exécuté une fois le téléchargement des 3 images terminé
async.map(config.images, request, function (err, results) {
    if (err) console.error(err);
    var totalSize = 0;
    for (var i = 0; i < results.length; i++){
        totalSize += results[i].length; //results[i] c l'image
    }
    console.log("All Download ended, results : " + totalSize);
});

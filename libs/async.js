// On crée une Classe Async pr pouvoir mettre ttes nos fn async
var Async = function (){
    var self = this; //pr le differencier des autres this par la suite
    self.map = function (array, func, callback) {
    // array => liste d'images
    // func => downloadImage
    // callback => function anonyme

    var count = array.length;
    var errors = [];
    var results = [];

    for (var i = 0; i < array.length; i++){
        //englober la fn afin de ne pas écraser les closures à cause du pb lié aux boucles sur NodeJS, sinon i=au maximum
        (function (i) {
            // L'image et la callback
            func(array[i], function (error, result) {
                count--;

                if (error) errors.push(error); // stock error
                else results.push(result); // stock résultat

                //Error-First
                if (count < 1) return callback((errors.length > 0) ? errors : null, results);
            });
        })(i);
    }
};


this.waterfall = function () {
    var jobs = arguments[0]; //récupère le 1er élt passé en argument
    var callback = (arguments.length > 2) ? arguments[2] : arguments[1];

    //La récursion pour appeler une fn et puis après l'autre. Une fois qu'il n'y a plus de fn, on appelle la callback.
    //on récupère le début du tableau
    var job = jobs.shift();

    //Callback exécutée après la fn
    var after = function (error, result) {
        if (error) return callback(error); //S'il y a une erreur
        if (jobs.length < 1) return callback(null, result); //retourner le résultat

        var args = []; //pr rendre le nombre d'arguments dynamique
        args.push(jobs); //1er argument: les fn
        if (result == undefined) args.push(result); //2e argument: le résultat
        //3e argument: la callback
        args.push(function (error, result) {
            if (error) return callback(error);
            else return callback(null, result);
        });

        //S'il y a encore une fn je l'appelle en injectant le résultat que je viens juste de recevoir.
        self.waterfall.apply(this, args);
    };

    //sans précédent résulat: fn(callback)
    //Avec précédent résultat: fn(result, callback)
    var args = []; //pr rendre le nombre d'arguments dynamique
    if (arguments.length > 2) args.push(arguments[1]); //S'il y a des résultats, je les rajoute aux arguments
    args.push(after); //la callback vient en dernier

    //Appel de la fn avec notre tableau d'arguments
    job.apply(this, args); //arguments[0][0].toString();

    var jobs = [function1, function2];

    //On lance fn1 puis fn2, une fois que c terminé on lance la Callback
    asyncWaterfall(jobs, function (err, result) {
        if (err) console.error(err);
        console.log("Content length : ", result.length);
    });
};

};

////Exporter la fn (cad la classe Async)
module.exports = new Async();

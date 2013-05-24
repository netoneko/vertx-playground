load('vertx.js');
load('./lib/contrib/underscore.js');

var router = new vertx.RouteMatcher();

var get = function (path, callback) {
    return router.get(path, function (req) {
        return req.response.end(callback(req));
    });
};

var template = _.memoize(function (filename) {
    var source = vertx.fileSystem.readFileSync(filename).toString();
    return _.template(source);
});

get("/", function (req) {
    var attributes = {cat: "Azshara", feels: "very much"};
    return template("public/index.html")(attributes);
});

vertx.createHttpServer().requestHandler(router).listen(8080, "0.0.0.0");

load('vertx.js');
load('./lib/contrib/underscore.js');

var router = new vertx.RouteMatcher();

var md5 = function (input) {
    var md = java.security.MessageDigest.getInstance("MD5");
    var bytes = java.lang.String(input).getBytes("UTF-8");
    var result = java.math.BigInteger(1, md.digest(bytes)).toString(16);
    console.log(result);
    return result;
};

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

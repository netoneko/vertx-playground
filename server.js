load('vertx.js');
load('./lib/contrib/underscore.js');

var router = new vertx.RouteMatcher();
var get = router.get;

var render = function(req, filename, attributes) {
    vertx.fileSystem.readFile(filename, function(err, res) {
        if (!err) {
            var source = res;
            var html = _.template(source.toString())(attributes);
            return req.response.end(html);
        }
    });
};

get("/", function(req) {
    render(req, "public/index.html", {
        cat: "Azshara", feels: "very much"
    });
});

vertx.createHttpServer().requestHandler(router).listen(8080, "0.0.0.0");

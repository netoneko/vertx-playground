load('vertx.js');
load('./lib/contrib/underscore.js');
load('./lib/utils.js');

var router = new vertx.RouteMatcher();
var get = router.get;


get("/", function(req) {
    render(req, "public/index.html", {
        cat: "Azshara", feels: "very much"
    });
});

vertx.createHttpServer().requestHandler(router).listen(8080, "0.0.0.0");

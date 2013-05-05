load('vertx.js');

var router = new vertx.RouteMatcher();
var get = router.get;

get("/", function(req) {
    req.response.sendFile("public/index.html");
});

vertx.createHttpServer().requestHandler(router).listen(8080, "0.0.0.0");

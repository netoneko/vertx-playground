var Template = {
    get: _.memoize(function(filename) {
          var source = vertx.fileSystem.readFileSync(filename).toString();
          return _.template(source);
        })
};

var render = function (req, filename, attributes) {
    return req.response.end(Template.get(filename)(attributes));
};
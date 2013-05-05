var Template = {
    cache: {},
    get: function (filename) {
        var template = null;

        if (_.isUndefined(template = this.cache[filename])) {
            var source = vertx.fileSystem.readFileSync(filename).toString();
            template = this.cache[filename] = _.template(source);
        }

        return template;
    }
};

var render = function (req, filename, attributes) {
    return req.response.end(Template.get(filename)(attributes));
};
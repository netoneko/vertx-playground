var TemplateCache = {};

var getTemplate = function (filename) {
    var template = null;

    if ((template = TemplateCache[filename]) === undefined) {
        source = vertx.fileSystem.readFileSync(filename).toString();
        template = TemplateCache[filename] = _.template(source);
    }

    return template;
};

var render = function (req, filename, attributes) {
    return req.response.end(getTemplate(filename)(attributes));
};
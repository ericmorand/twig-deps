const fs = require('fs');
const path = require('path');
const Transform = require('stream').Transform;

class Depper extends Transform {
    constructor(options) {
        options = options || {};
        options.objectMode = true;

        super(options);

        this.twig = require('twig');
        this.visited = new Map();
        this.namespaces = options.namespaces;
    }

    _transform(chunk, encoding, callback) {
        let self = this;

        let resolve = function (file) {
            self.push(file);

            self.visited.set(file, {
                file: file
            });

            let processToken = function (token, template) {
                if (token.type === 'logic') {
                    token = token.token;

                    switch (token.type) {
                        case 'Twig.logic.type.include':
                        case 'Twig.logic.type.import':
                        case 'Twig.logic.type.extends':
                        case 'Twig.logic.type.embed':
                        case 'Twig.logic.type.use': {
                            token.stack.forEach(function (stackEntry) {
                                switch (stackEntry.type) {
                                    case 'Twig.expression.type.string':
                                        let dep = self.twig.path.parsePath(template, stackEntry.value);

                                        if (!self.visited.has(dep)) {
                                            let missing = false;

                                            try {
                                                fs.statSync(dep);
                                            }
                                            catch (err) {
                                                missing = true;
                                            }

                                            if (missing) {
                                                self.emit('missing', dep, file);
                                            }
                                            else {
                                                resolve(dep);
                                            }
                                        }

                                        break;
                                }
                            });

                            break;
                        }
                        case 'Twig.logic.type.if':
                        case 'Twig.logic.type.for':
                        case 'Twig.logic.type.macro':
                        case 'Twig.logic.type.setcapture': {
                            token.output.forEach(function (token) {
                                processToken(token, template);
                            });
                        }
                    }
                }
            };
            let template = null;

            try {
                template = self.compile(file);
            }
            catch (err) {
                throw({
                    file: file,
                    error: err
                });
            }

            template.tokens.forEach(function (token) {
                processToken(token, template);
            });
        };

        try {
            resolve(chunk);

            callback();
        }
        catch (err) {
            callback(err);
        }
    }

    compile(file) {
        return this.twig.twig({
            path: file,
            async: false,
            rethrow: true,
            namespaces: this.namespaces
        });
    }
}

module.exports = Depper;
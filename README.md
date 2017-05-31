# twig-deps
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

Walk the dependency graph of a [Twig](http://twig.sensiolabs.org/)
template.

## Installation

```bash
npm install twig-deps
```

# Example

``` js
var TwigDeps = require('twig-deps');

var depper = new TwigDeps();
var entry = '/path/to/your/template.twig';

depper.on('data', function (dependency) {
    // do something with dependency
});

depper.on('missing', function (dependency) {
    // do something with missing dependency
});

depper.on('error', function (error) {
    // do something on error
});

depper.end(entry);
```

## Contributing

* Fork the main repository
* Code
* Implement tests using [node-tap](https://github.com/tapjs/node-tap)
* Issue a pull request keeping in mind that all pull requests must reference an issue in the issue queue

## License

Apache-2.0 © [Eric MORAND]()

[npm-image]: https://badge.fury.io/js/twig-deps.svg
[npm-url]: https://npmjs.org/package/twig-deps
[travis-image]: https://travis-ci.org/ericmorand/twig-deps.svg?branch=master
[travis-url]: https://travis-ci.org/ericmorand/twig-deps
[daviddm-image]: https://david-dm.org/ericmorand/twig-deps.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ericmorand/twig-deps
[coveralls-image]: https://coveralls.io/repos/github/ericmorand/twig-deps/badge.svg
[coveralls-url]: https://coveralls.io/github/ericmorand/twig-deps

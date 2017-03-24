const Depper = require('../src');
const tap = require('tap');
const fs = require('fs');
const path = require('path');

tap.test('depper', function (test) {
    test.plan(8);

    test.test('should handle Twig.logic.type.include', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/include/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/include/entry.twig'),
                path.join(__dirname, '/fixtures/include/import.twig'),
                path.join(__dirname, '/fixtures/include/partial.twig'),
                path.join(__dirname, '/fixtures/include/sub/partial.twig'),
                path.join(__dirname, '/fixtures/include/sub/sub/partial.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle Twig.logic.type.import', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/import/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/import/entry.twig'),
                path.join(__dirname, '/fixtures/import/import.twig'),
                path.join(__dirname, '/fixtures/import/partial.twig'),
                path.join(__dirname, '/fixtures/import/sub/partial.twig'),
                path.join(__dirname, '/fixtures/import/sub/sub/partial.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle Twig.logic.type.for', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/for/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/for/entry.twig'),
                path.join(__dirname, '/fixtures/for/partial.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle Twig.logic.type.macro', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/macro/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/macro/entry.twig'),
                path.join(__dirname, '/fixtures/macro/partial.twig'),
                path.join(__dirname, '/fixtures/macro/partial-2.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle Twig.logic.type.setcapture', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/setcapture/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/setcapture/entry.twig'),
                path.join(__dirname, '/fixtures/setcapture/foo.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should emit "error" event', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/error/entry.twig');

        let rows = [];

        d.on('error', function (err) {
            rows.push(err);
        });

        d.on('finish', function () {
            test.ok(rows.length); // todo: update this once twig returns the name of the file where the error occured

            test.end();
        });

        d.end(entry);
    });

    test.test('should emit "missing" event', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/missing/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('missing', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/missing/entry.twig'),
                path.join(__dirname, '/fixtures/missing/missing.twig'),
                path.join(__dirname, '/fixtures/missing/partial.twig'),
                path.join(__dirname, '/fixtures/missing/partial-2.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle circular dependencies', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/circular/entry.twig');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, '/fixtures/circular/entry.twig'),
                path.join(__dirname, '/fixtures/circular/partial.twig')
            ].sort());

            test.end();
        });

        d.end(entry);
    });
});
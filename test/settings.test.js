var assert = require('assert');
var process = require('process');
var settings = require('../src/settings')
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;

describe('run settings.js', function () {

    describe('#updateServers', function () {
        it('<server/> should be not be changed when input.server is missing', function () {
            // given input
            process.env['INPUT_SERVERS'] = '';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><servers/></settings>");

            // when
            settings.updateServers(xml);

            // then
            var expectedXml = '<settings><servers/></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);
        });
    });

    describe('#updateServers', function () {
        it('<server/> should be appended with <server> when input.server is present', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar" }]';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><servers/></settings>");

            // when
            settings.updateServers(xml);

            // then
            var expectedXml = '<settings><servers><server><id>foo</id><username>fu</username><password>bar</password></server></servers></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);
        });
    });

    describe('#updateRepositories', function () {
        it('<repositories> should not be changed when input.repositories is missing', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "foo", "url": "http://foo.bar" }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/></profile></profiles></settings>");

            // when
            settings.updateRepositories(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories><repository><id>foo</id><url>http://foo.bar</url></repository></repositories></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);
        });
    });

    describe('#updateRepositories', function () {
        it('<repositories> should be appended with <repository> when input.repositories is present', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "foo", "url": "http://foo.bar" }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/></profile></profiles></settings>");

            // when
            settings.updateRepositories(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories><repository><id>foo</id><url>http://foo.bar</url></repository></repositories></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);
        });
    });

});


var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate proxies', function () {

    describe('when empty input', function () {
        it('<proxy/> should be not be changed when input.proxy is missing', function () {
            // given input
            process.env['INPUT_PROXIES'] = '';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-proxies-missing.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_PROXIES'] = '';
        });
    });

    describe('when custom input', function () {
        it('<proxy/> should be appended with <proxy> when input.proxy is present', function () {
            // given input
            process.env['INPUT_PROXIES'] = '[{ "id": "foo", "active": "true", "protocol": "http", "host": "https://proxy.example.com", "port": "443", "username": "foo", "password": "bar", "nonProxyHosts": "noproxy1.example.com|noproxy2.example.com" }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-proxies-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_PROXIES'] = '';
        });
    });

});


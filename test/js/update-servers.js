var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate servers', function () {

    describe('when empty input', function () {
        it('<server/> should be not be changed when input.server is missing', function () {
            // given input
            process.env['INPUT_SERVERS'] = '';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-servers-missing.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('when custom input', function () {
        it('<server/> should be appended with <server> when input.server is present', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar" }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-servers-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('when extended configuration input', function () {
        it('<server/> should be appended with <server><configuration> when extended configuration is provided', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar", "configuration": { "httpConfiguration": { "all" : { "usePreemptive": "true" }}}}]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-servers-with-extended-configuration.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('when extended properties input', function () {
        it('<server/> should be appended with <server> and include all maven server properties', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar", "privateKey": "${user.home}/.ssh/id_dsa", "passphrase": "some_passphrase", "filePermissions": "664", "directoryPermissions": "775" }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-servers-with-extended-properties.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('when environment variables are present', function () {
        it('<server/> should be appended with <server> and include all environment variables', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "${env.USERNAME}", "password": "${env.PASSWORD}" }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-servers-with-env-variables.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_SERVERS'] = '';
        });
    });

});


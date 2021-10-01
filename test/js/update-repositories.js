var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate repositories', function () {

    describe('when input missing', function () {
        it('<repositories> should be appended with default <repository> when input.repositories is missing', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-repositories-missing.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_REPOSITORIES'] = '';
        });
    });

    describe('when input empty', function () {
        it('<repositories> should be appended with default <repository> when input.repositories is empty', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-repositories-missing.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_REPOSITORIES'] = '';
        });
    });

    describe('when input present', function () {
        it('<repositories> should be appended with <repository> when input.repositories is present', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "foo", "name": "foo", "url": "http://foo.bar", "releases": { "enabled": "true" }, "snapshots": { "enabled": "true" } }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-repositories-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            // tear down
            process.env['INPUT_REPOSITORIES'] = '';
        });
    });

    describe('when configuring updatePolicy on repositories', function () {
        it('<repositories><releases> should be appended with <updatePolicy>', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "foo", "name": "foo", "url": "http://foo.bar", "releases": { "enabled": "true", "updatePolicy": "always" }, "snapshots": { "enabled": "true" } }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-repositories-update-policy.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_REPOSITORIES'] = '';
        });
    });

});


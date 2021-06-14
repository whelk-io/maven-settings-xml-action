var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate plugin repositories', function () {

    describe('when input missing', function () {
        it('<pluginRepositories> should not be appended with <pluginRepository> when input.pluginRepositories is missing', function () {
            // given input
            process.env['INPUT_PLUGIN_REPOSITORIES'] = '';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-plugin-repositories-missing.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_PLUGIN_REPOSITORIES'] = '';
        });
    });

    describe('when input empty', function () {
        it('<pluginRepositories> should not be appended with <pluginRepository> when input.pluginRepositories is empty', function () {
            // given input
            process.env['INPUT_PLUGIN_REPOSITORIES'] = '[]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-plugin-repositories-empty.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_PLUGIN_REPOSITORIES'] = '';
        });
    });

    describe('when input present', function () {
        it('<pluginRepositories> should be appended with <pluginRepository> when input.pluginRepositories is present', function () {
            // given input
            process.env['INPUT_PLUGIN_REPOSITORIES'] = '[{ "id": "foo.plugin", "name": "foo.plugin", "url": "http://foo.bar.plugin", "releases": { "enabled": "true" }, "snapshots": { "enabled": "true" } }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-plugin-repositories-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_PLUGIN_REPOSITORIES'] = '';
        });
    });

});


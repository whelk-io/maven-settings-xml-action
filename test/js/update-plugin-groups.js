var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate plugin groups', function () {

    describe('when input present', function () {
        it('<pluginGroups/> should be appended with <pluginGroup> when input.pluginGroups is present', function () {
            // given input
            process.env['INPUT_PLUGIN_GROUPS'] = '[ "some.plugin.group.id" ]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-plugin-groups-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_PLUGIN_GROUPS'] = '';
        });
    });

});


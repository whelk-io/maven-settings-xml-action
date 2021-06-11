var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate profiles', function () {

    describe('when input present', function () {
        it('<profiles> should be appended with <profile> when input.profiles is present', function () {
            // given input
            process.env['INPUT_PROFILES'] = '[{ "id": "foo.profile", "name": "foo.profile", "properties": { "foo": "property-1", "bar": "property-2"} }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-profiles-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_PROFILES'] = '';
        });
    });

});


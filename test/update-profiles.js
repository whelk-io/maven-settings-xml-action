var assert = require('assert');
var process = require('process');
var settings = require('../src/settings')
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;

describe('validate profiles', function () {

    describe('when profile input', function () {
        it('<profiles> should be appended with <profile> when input.profiles is present', function () {
            // given input
            process.env['INPUT_PROFILES'] = '[{ "id": "foo.profile", "name": "foo.profile", "properties": { "foo": "property-1", "bar": "property-2"} }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/resources/', 'when-profiles-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_PROFILES'] = '';
        });
    });

});


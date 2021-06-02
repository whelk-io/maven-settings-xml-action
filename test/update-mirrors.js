var assert = require('assert');
var process = require('process');
var settings = require('../src/settings')
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;

describe('validate mirrors', function () {

    describe('when mirrors input', function () {
        it('<mirrors/> should be appended with <mirror> when input.mirror is present', function () {
            // given input
            process.env['INPUT_MIRRORS'] = '[{ "id": "nexus", "mirrorOf": "!my-org-snapshots,*", "url": "http://redacted/nexus/content/groups/public" }]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/resources/', 'when-mirrors-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_MIRRORS'] = '';
        });
    });

});


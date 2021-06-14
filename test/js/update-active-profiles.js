var assert = require('assert');
var process = require('process');
var settings = require('../../src/settings')

describe('validate active profiles', function () {

    describe('when input present', function () {
        it('<activeProfiles/> should be appended with <activeProfile> when input.active_profiles is present', function () {
            // given input
            process.env['INPUT_ACTIVE_PROFILES'] = '[ "foo-bar" ]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-active-profiles-present.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_ACTIVE_PROFILES'] = '';
        });
    });

    describe('when empty input', function () {
        it('<activeProfiles/> should be appended with default <activeProfile> when input.active_profiles is empty', function () {
            // given input
            process.env['INPUT_ACTIVE_PROFILES'] = '[]';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-active-profiles-empty.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_ACTIVE_PROFILES'] = '';
        });
    });

    describe('when empty missing', function () {
        it('<activeProfiles/> should be appended with default <activeProfile> when input.active_profiles is missing', function () {
            // given input
            process.env['INPUT_ACTIVE_PROFILES'] = '';

            // when
            var actualXml = settings.getSettingsTemplate();
            settings.update(actualXml);
            var actual = settings.formatSettings(actualXml);

            // then
            var expectedXml = settings.getTemplate('../test/js/resources/', 'when-active-profiles-missing.xml');
            expected = settings.formatSettings(expectedXml);
            assert.equal(actual, expected);

            process.env['INPUT_ACTIVE_PROFILES'] = '';
        });
    });

});


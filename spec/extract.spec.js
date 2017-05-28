'use strict';

const fs = require('fs');
const cheerio = require('cheerio');
const extract = require('../index');

describe("extract", function() {
    let messages;
    let units;

    beforeEach(() => {
        const messageData = fs.readFileSync(
          './sample/messages.xlf', { encoding: 'utf-8' });

        messages = cheerio.load(
          messageData, { xmlMode: true, decodeEntities: false });

        units = extract(messages);
    });

    it("extracts source messages", function() {
        expect(units[0].source).toBe('Hello!');
        expect(units[1].source).toBe('Good bye!');
    });

    it("extracts only messages with ID in meaning", function() {
        expect(units.length).toBe(2);
    });

    it("extracts source description", function() {
        expect(units[0].description).toBe('A hello world message for the localized component');
        expect(units[1].description).toBe('A goodbye message for the localized component');
    });
});


'use strict';

const yml = require('js-yaml');
const format = require('../src/format-yaml');

const units = [{
    description: 'A hello world message for the localized component',
    id: 'localized.component.hello',
    source: 'Hello!'
}, {
    description: 'A goodbye message for the localized component',
    id: 'localized.component.goodbye',
    source: 'Good bye!'
}];

describe("formatYaml", function() {
    let output = format(units);

    it("sorts members", () => {
        expect(output.indexOf('hello'))
            .toBeGreaterThan(output.indexOf('goodbye'));
    });

    it("outputs comments", () => {
        expect(output).toMatch(/^    # A hello world/m);
    });

    it("outputs valid YAML", () => {
        const data = yml.safeLoad(output);
        expect(data.localized.component.hello).toEqual(units[1].source);
    });
});


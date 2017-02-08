'use strict';

const idParts = unit => unit.id.split('.');
const leaf = Symbol();

// Expands unit keys into nested objects
const expand = units => units.reduce((dict, unit) => {
    const unitRoot = idParts(unit).reduce((root, part) =>
        root[part] ? root[part] : root[part] = {},
    dict);

    unitRoot[leaf] = unit;

    return dict;
}, {});

const indent = depth => depth == 0 ? '' : '  ' + indent(depth - 1);

const last = arr => arr[arr.length - 1];

const source = unit => last(idParts(unit)) + ': ' + unit.source;

const comment = unit => unit.description ?
    `# ${unit.description}` : null;

const formatLine = (unit, depth) =>
    [comment(unit), source(unit)]
    .filter(line => line)
    .map(line => indent(depth) + line)
    .join('\n') + '\n';

const formatKey = (root, key, depth) =>
    indent(depth) + key + ':\n' + format(root[key], depth + 1);

const format = (root, depth) =>
    Object.keys(root).map(key =>
        root[key][leaf] ?
            formatLine(root[key][leaf], depth) :
            formatKey(root, key, depth)
        )
        .join('\n');

const formatYaml = units => {
    const sorted = units.sort((a, b) => a.id.localeCompare(b.id));
    const expanded = expand(sorted);
    return format(expanded, 0);
};

module.exports = formatYaml;


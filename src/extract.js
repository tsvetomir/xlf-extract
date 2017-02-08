'use strict';

const jp = require('jsonpath');

/**
 * Extracts translations from XLIFF files.
 *
 * @param messages an XLIFF document parsed with xml2js
 * @return a tree of keys and their source messages and descriptions
 */
const extract = messages => {
    const units = jp.query(messages, '$..["trans-unit"]')[0];

    return units
        .filter(hasNotes)
        .map(unit => ({
            description: description(unit),
            id: meaning(unit),
            source: unit.source[0]
        }))
        .filter(d => isKey(d.id));
};

const isKey = val => !!val.match(/^[a-zA-Z0-9.]*$/);
const hasNotes = u => !!u.note;
const noteField = (note, field) =>
    note.find(note => note['$'].from === field)['_'];
const meaning = unit => noteField(unit.note, 'meaning');
const description = unit => noteField(unit.note, 'description');

module.exports = extract;


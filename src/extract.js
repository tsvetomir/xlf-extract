'use strict';

/**
 * Extracts translations from XLIFF files.
 *
 * @param doc object an XLIFF document parsed with cheerio
 * @return object a tree of keys and their source messages and descriptions
 */
const extract = doc => {
    const units = doc('trans-unit').toArray();
    const hasNotes = unit => doc(unit).find('note').length > 0;
    const noteField = (unit, field) =>
      doc(unit).find(`note[from=${ field }]`).text();
    const description = unit => noteField(unit, 'description');
    const meaning = unit => noteField(unit, 'meaning');

    return units
        .filter(hasNotes)
        .map(unit => ({
            description: description(unit),
            id: meaning(unit),
            source: doc(unit).find('source').text()
        }))
        .filter(d => isKey(d.id));
};

const isKey = val => !!val.match(/^[^.\s]*\.\S*$/);

module.exports = extract;


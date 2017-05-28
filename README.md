[![Build Status](https://travis-ci.org/tsvetomir/xlf-extract.svg?branch=master)](https://travis-ci.org/tsvetomir/xlf-extract)
[![npm version](https://badge.fury.io/js/xlf-extract.svg)](https://badge.fury.io/js/xlf-extract)

# xlf-extract

Extracts source messages from XLIFF (.xlf) files into a translation bundle. This is a simple YAML file that can be copied and translated for different locales.

The translated messages can be populated back into the XLIFF files using [xlf-translate](https://www.npmjs.com/package/xlf-translate).

These tools are intended to simplify the localization of [Angular 2 i18n](https://angular.io/docs/ts/latest/cookbook/i18n.html) - enabled apps.

In Angular 2 each change in the application may alter the unit IDs in the message file. Normally, you'd have to track each unit and update its translation.

With this set of tools the correct translations can be filled-in automatically from the YAML message bundles based on your unique keys.

See the [sample i18n Angular app](https://github.com/tsvetomir/angular-cli-i18n-sample) for more details.

## Installation

`npm install -g xlf-extract`

## Usage

`xlf-extract messages.xlf --lang-file=lang/en.yml`

This will extract all source elements from the `messages.xlf` file into the language file.

## Description

Normally, you'd localize an attribute using the following syntax:

```html
<span i18n="A hello world message for the localized component">Hello!</span>
```

This utility makes use of the optional meaning tag to associate the message with an unique key.
```html
<span i18n="localized.component.hello|A hello world message for the localized component">Hello!</span>
```

The key will be persisted in the messages file as a "meaning":
```xml
<trans-unit id="cb5fabf68b14f52c0d7cbc2b90393f8897310ba7" datatype="html">
  <source>Hello!</source>
  <target/>
  <note priority="1" from="description">A hello world message for the localized component</note>
  <note priority="1" from="meaning">localized.component.hello</note>
</trans-unit>
```

This utility will extract the source messages along with descriptions into a message bundle. This file is then copied and translated for different locales.

The message bundle is an YAML file that lists all messages as a tree. For example, the `localized.component.hello` key and its translation are represented as:

```yaml
localized:
    component:
        # A hello world message for the localized component
        hello: Bonjour!
```

To populate the message file with the translations from the message bundle, use the [xlf-translate companion tool](https://www.npmjs.com/package/xlf-translate).

## See Also

* [xlf-translate companion tool](https://www.npmjs.com/package/xlf-translate)
* [Sample usage in an i18n Angular app](https://github.com/tsvetomir/angular-cli-i18n-sample)
* [Angular 2 - Internationalization (i18n)](https://angular.io/docs/ts/latest/cookbook/i18n.html)
* [Deploying an i18n Angular app with angular-cli](https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358#.2qlq8lfad)


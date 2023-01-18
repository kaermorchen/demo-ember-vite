# Ember Vite

<img align="right" width="24" height="24"
     alt="Vite logo"
     src="./public/vite.svg">
<img align="right" width="95" height="95"
     alt="Ember.js logo"
     src="./public/ember.svg">

This is Ember application running only on `Vite`, without `ember-cli` and `embroider`.

* It's `TypeScript`'ed by default.
* It uses `vite` to build the app.
* `tailwind` used for styling.

## Table of Contents

* [Description](#description)
* [Motivation](#motivation)
* [Features](#features)
* [Unsupported](#unsupported)
* [Installation](#installation)
* [Addons](#in-scope-of-this-app-we-able-to-run-this-addons)
* [Why?](#why)
* [Disclaimer](#disclaimer)


## Description

Main difference with classic Ember application, is that we don't trying to automatically resolve addons and it's dependencies - we just import them directly, only once needed.


## Motivation

Why this library/application exists, main bullets

- ⚡️ Lightning Fast Build process
- 💡 Instant Server Start
- 🛠️ Rich Features
- 📦 Optimized Build
- 🔩 A lot of supported addons
- 🔑 TypeScripted by default

## Features

1. Strict mode
1. Lazy-loading for routes
1. Template-only components
1. Style imports from components
1. Ember Inspector
1. Template imports support (`.gts` & `.gjs`)
1. Glint support
1. Testing support (QUnit)

## Unsupported

1. `ember-data` not supported yet


## Installation

```bash
yarn install
yarn dev
# open http://localhost:4200
```

## In scope of this app we able to run this addons

1. `ember-simple-auth`
1. `ember-bootstrap`
1. `ember-concurrency`
1. `ember-intl`
1. `ember-concurrency-decorators`
1. `ember-render-modifiers`
1. `ember-truth-helpers`
1. `ember-basic-dropdown`
1. `ember-power-select`
1. `ember-style-modifier`
1. `ember-assign-helper`
1. `ember-element-helper`
1. `ember-page-title`

[(see code for samples)](https://github.com/lifeart/demo-ember-vite/tree/master/src/addons)


*This is not complete list, and you could add `any` ember addon you want (if it don't have `ember-cli` logic)*

## Why?

I would like to bulletproof opinion, that modern ember application could be statically resolvable by default, and I would like to use `Vite` for that. It give as ability to use `TypeScript` and `ESM` by default, and it's very fast.

## Disclaimer

I'm not planning to actively maintain this repo, but if you have any questions, feel free to ask.

In addition, if you looking for options to improve speed of your ember project and you open for contracts - don't shy to contact me.

---

PR's are welcome.

---


## Licence
[MIT](./LICENCE.md)
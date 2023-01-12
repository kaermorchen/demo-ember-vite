import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import fs from 'node:fs';
import { fileURLToPath, URL } from "node:url";


const emberPackages = fs.readdirSync('node_modules/ember-source/dist/packages/@ember');

export default defineConfig(({ mode }) => {
    const isProd = mode === 'production';
    const isDev = mode === 'development';
    return {
        define: {
            ENV_DEBUG: isProd ? false : true,
            ENV_CI: false,
        },
        resolve: {
            alias: [
                { find: '@glimmer/tracking', replacement: fileURLToPath(new URL("./src/config/ember.ts", import.meta.url)) },
                { find: 'ember', replacement: 'ember-source/dist/packages/ember' },
                { find: 'ember-component-manager', replacement: '@glimmer/component/addon/-private/ember-component-manager'},
                { find: '@glimmer/component', replacement: '@glimmer/component/addon/-private/component' },
                {
                    find: '@glimmer/env',
                    replacement: './glimmer-env/index.ts',
                },
                {
                    find: 'backburner',
                    replacement: 'backburner.js/dist/es6/backburner.js',
                },
                ...emberPackages.map((pkg) => ({
    
                    find: `@ember/${pkg}`,
                    replacement: `ember-source/dist/packages/@ember/${pkg}`
                }))
            ],
        },
        plugins: [
            !isDev ? babel({
                filter: /^.*@(ember|glimmer)\/.*\.(ts|js)$/,
                babelConfig: {
                    babelrc: false,
                    configFile: false,
                    plugins: [
                        ['babel-plugin-unassert', {
                            variables: [
                                'assert',
                               'info',
                               'warn',
                               'debug',
                               'deprecate',
                               'debugSeal',
                               'debugFreeze',
                               'runInDebug'
                            ],
                            modules: [
                                '@ember/debug'
                            ]
                        }],
                        ['@babel/plugin-proposal-decorators', {
                            legacy: true
                       }],
                       ['@babel/plugin-proposal-class-properties', { loose: false }],
                    ],
                    "presets": ["@babel/preset-typescript"]
                }
            }) : null,
            babel({
                // regexp to match files in src folder
                filter: /^.*src\/.*\.(ts|js)$/,
                babelConfig: {
                    babelrc: false,
                    configFile: false,
                    plugins: [
                        ['@babel/plugin-proposal-decorators', {
                             legacy: true
                        }],
                        ['@babel/plugin-proposal-class-properties', { loose: false }],
                        ['babel-plugin-ember-template-compilation/node', {
                            compilerPath: "ember-source/dist/ember-template-compiler.js",
                            targetFormat: 'wire',
                            outputModuleOverrides: {
                                '@ember/template-factory': {
                                    createTemplateFactory: ['createTemplateFactory', 'ember-source/dist/packages/@ember/template-factory/index.js'],
                                }
                            }
                        
                        }]
                        
                    ],
                    "presets": ["@babel/preset-typescript"]
                }
            }),
            // ...
        ].filter(el => el !== null),
    
        // ...
    };
});
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import fs from 'node:fs';
import { fileURLToPath, URL } from "node:url";
import { resolve } from 'node:path'
import hbsResolver from './plugins/hbs-resolver';


const emberPackages = fs.readdirSync('node_modules/ember-source/dist/packages/@ember');

export default defineConfig(({ mode }) => {
    const isProd = mode === 'production';
    const isDev = mode === 'development';
    return {
        build: {
            rollupOptions: {
              input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'tests/index.html'),
              },
            },
        },
        define: {
            ENV_DEBUG: isProd ? false : true,
            ENV_CI: false,
        },
        resolve: {
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.hbs'],
            alias: [
                // { find: '@glimmer/manager', replacement: '@glimmer/manager/dist/modules/es2017' },
                { find: 'ember-testing', replacement: 'ember-source/dist/packages/ember-testing' },
                { find: 'ember-cli-htmlbars', replacement: fileURLToPath(new URL("./compat/ember-cli-htmlbars/index.ts", import.meta.url)) },
                { find: 'ember-qunit-styles/container.css', replacement: fileURLToPath(new URL("./node_modules/ember-qunit/vendor/ember-qunit/test-container-styles.css", import.meta.url)) },
                { find: '@/config', replacement: './src/config' },
                { find: '@/components', replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
                { find: 'ember-cli-test-loader/test-support/index', replacement: fileURLToPath(new URL("./compat/ember-cli-test-loader/index.ts", import.meta.url)) },
                { find: '@ember/test-helpers', replacement: '@ember/test-helpers/addon-test-support/@ember/test-helpers'},
                { find: '@ember/test-waiters', replacement: '@ember/test-waiters/addon/@ember/test-waiters'},
                { find: 'ember-qunit', replacement: 'ember-qunit/addon-test-support' },
                { find: 'qunit-dom', replacement: 'qunit-dom/dist/addon-test-support/index.js' },
                { find: '@glimmer/tracking', replacement: fileURLToPath(new URL("./src/config/ember.ts", import.meta.url)) },
                { find: '@embroider/macros', replacement: fileURLToPath(new URL("./compat/embroider-macros/index.ts", import.meta.url)) },
                { find: '@embroider/util', replacement: fileURLToPath(new URL("./compat/embroider-util/index.ts", import.meta.url)) },
                { find: 'ember', replacement: 'ember-source/dist/packages/ember' },
                { find: 'ember-component-manager', replacement: '@glimmer/component/addon/-private/ember-component-manager'},
                { find: '@glimmer/component', replacement: '@glimmer/component/addon/-private/component' },
                {
                    find: '@glimmer/env',
                    replacement: './compat/glimmer-env/index.ts',
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
            hbsResolver(),
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
                filter: /^.*src\/.*\.(ts|js|hbs)$/,
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
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("eslint/config");
var eslint_config_typescript_1 = require("@vue/eslint-config-typescript");
var eslint_plugin_vue_1 = require("eslint-plugin-vue");
var eslint_plugin_1 = require("@vitest/eslint-plugin");
var eslint_plugin_playwright_1 = require("eslint-plugin-playwright");
var eslint_plugin_oxlint_1 = require("eslint-plugin-oxlint");
var skip_formatting_1 = require("@vue/eslint-config-prettier/skip-formatting");
// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
exports.default = eslint_config_typescript_1.defineConfigWithVueTs.apply(void 0, __spreadArray(__spreadArray([{
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },
    (0, config_1.globalIgnores)(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
    eslint_plugin_vue_1.default.configs['flat/essential'],
    eslint_config_typescript_1.vueTsConfigs.recommended, __assign(__assign({}, eslint_plugin_1.default.configs.recommended), { files: ['src/**/__tests__/*'] }), __assign(__assign({}, eslint_plugin_playwright_1.default.configs['flat/recommended']), { files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'] })], eslint_plugin_oxlint_1.default.configs['flat/recommended'], false), [skip_formatting_1.default], false));

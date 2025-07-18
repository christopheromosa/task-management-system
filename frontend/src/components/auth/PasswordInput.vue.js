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
var vue_1 = require("vue");
var lucide_vue_next_1 = require("lucide-vue-next");
var input_1 = require("@/components/ui/input");
var showPassword = (0, vue_1.ref)(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "relative" }));
var __VLS_0 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
    } }, { type: "button" }), { class: "absolute right-2 top-1/2 -translate-y-1/2" }));
if (__VLS_ctx.showPassword) {
    var __VLS_4 = {}.Eye;
    /** @type {[typeof __VLS_components.Eye, ]} */ ;
    // @ts-ignore
    var __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(__assign({ class: "h-4 w-4 text-muted-foreground" })));
    var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([__assign({ class: "h-4 w-4 text-muted-foreground" })], __VLS_functionalComponentArgsRest(__VLS_5), false));
}
else {
    var __VLS_8 = {}.EyeOff;
    /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
    // @ts-ignore
    var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ class: "h-4 w-4 text-muted-foreground" })));
    var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ class: "h-4 w-4 text-muted-foreground" })], __VLS_functionalComponentArgsRest(__VLS_9), false));
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            Eye: lucide_vue_next_1.Eye,
            EyeOff: lucide_vue_next_1.EyeOff,
            Input: input_1.Input,
            showPassword: showPassword,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

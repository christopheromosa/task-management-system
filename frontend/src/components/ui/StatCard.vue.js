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
var lucide_vue_next_1 = require("lucide-vue-next");
var __VLS_props = defineProps();
var icons = {
    users: lucide_vue_next_1.Users,
    clock: lucide_vue_next_1.Clock,
    activity: lucide_vue_next_1.Activity,
    'check-circle': lucide_vue_next_1.CheckCircle
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_5 = {}.CardHeader;
/** @type {[typeof __VLS_components.CardHeader, typeof __VLS_components.CardHeader, ]} */ ;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ class: "flex flex-row items-center justify-between pb-2" })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ class: "flex flex-row items-center justify-between pb-2" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
__VLS_8.slots.default;
var __VLS_9 = {}.CardTitle;
/** @type {[typeof __VLS_components.CardTitle, typeof __VLS_components.CardTitle, ]} */ ;
// @ts-ignore
var __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9(__assign({ class: "text-sm font-medium" })));
var __VLS_11 = __VLS_10.apply(void 0, __spreadArray([__assign({ class: "text-sm font-medium" })], __VLS_functionalComponentArgsRest(__VLS_10), false));
__VLS_12.slots.default;
(__VLS_ctx.title);
var __VLS_12;
var __VLS_13 = ((__VLS_ctx.icons[__VLS_ctx.icon]));
// @ts-ignore
var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13(__assign({ class: "h-4 w-4 text-muted-foreground" })));
var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([__assign({ class: "h-4 w-4 text-muted-foreground" })], __VLS_functionalComponentArgsRest(__VLS_14), false));
var __VLS_8;
var __VLS_17 = {}.CardContent;
/** @type {[typeof __VLS_components.CardContent, typeof __VLS_components.CardContent, ]} */ ;
// @ts-ignore
var __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_18), false));
__VLS_20.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-2xl font-bold" }));
(__VLS_ctx.value);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-xs text-muted-foreground mt-1" }));
if (__VLS_ctx.trend === 'up') {
}
else if (__VLS_ctx.trend === 'down') {
}
else {
}
var __VLS_20;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            icons: icons,
        };
    },
    __typeProps: {},
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */

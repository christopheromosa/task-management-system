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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var bootstrap_1 = require("bootstrap");
var UserDetailsPage_vue_1 = require("./UserDetailsPage.vue");
var users_1 = require("../../stores/users");
var AddUserDialog_vue_1 = require("../../components/users/AddUserDialog.vue");
var vue_2 = require("vue");
var emit = defineEmits(['closed']);
var usersStore = (0, users_1.useUsersStore)();
var selectedUserId = (0, vue_1.ref)(null);
var modalRef = (0, vue_1.ref)(null);
var modalInstance = null;
var showAddUser = (0, vue_1.ref)(false);
var nonAdminUsers = (0, vue_2.computed)(function () {
    return usersStore.users.filter(function (user) { return user.is_admin !== 1; });
});
(0, vue_1.onUnmounted)(function () {
    emit('closed'); // ← emit this when modal is closed/unmounted
});
function reloadUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, usersStore.fetchUsers()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleAddUser() {
    showAddUser.value = true;
}
function openUserDetails(userId) {
    selectedUserId.value = userId;
    if (modalRef.value) {
        modalInstance = new bootstrap_1.Modal(modalRef.value);
        modalInstance.show();
    }
}
function handleModalClose() {
    selectedUserId.value = null;
    reloadUsers(); // ← force re-fetch after modal closes
}
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersStore.fetchUsers()];
            case 1:
                _a.sent();
                if (modalRef.value) {
                    // Attach event listener for when modal is hidden (dismissed or closed)
                    modalRef.value.addEventListener('hidden.bs.modal', handleModalClose);
                }
                return [2 /*return*/];
        }
    });
}); });
(0, vue_1.onUnmounted)(function () {
    // Remove event listener to avoid memory leaks
    if (modalRef.value) {
        modalRef.value.removeEventListener('hidden.bs.modal', handleModalClose);
    }
});
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}
function formatName(name) {
    return name.toLocaleUpperCase();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "container-fluid mt-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "d-flex justify-content-between align-items-center mb-3" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "fw-bold" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.handleAddUser) }, { class: "btn btn-primary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "bi bi-person-plus me-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-responsive" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)(__assign({ class: "table table-striped table-hover shadow-sm rounded" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)(__assign({ class: "table-light" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)(__assign({ class: "text-end" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
var _loop_1 = function (user) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (user.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.formatName(user.name));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.position);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge" }, { class: (user.is_admin ? 'bg-success' : 'bg-secondary') }));
    (user.is_admin ? 'Admin' : 'User');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.formatDate(user.created_at));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "text-end" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.openUserDetails(user.id);
        } }, { class: "btn btn-sm btn-outline-secondary" }));
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.nonAdminUsers)); _i < _a.length; _i++) {
    var user = _a[_i][0];
    _loop_1(user);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal fade" }, { id: "userModal", tabindex: "-1", 'aria-labelledby': "userModalLabel", 'aria-hidden': "true", ref: "modalRef" }));
/** @type {typeof __VLS_ctx.modalRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-dialog modal-lg modal-dialog-scrollable" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)(__assign({ class: "modal-title" }, { id: "userModalLabel" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button)(__assign(__assign({ type: "button" }, { class: "btn-close" }), { 'data-bs-dismiss': "modal", 'aria-label': "Close" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-body" }));
if (__VLS_ctx.selectedUserId !== null) {
    /** @type {[typeof UserDetailsPage, ]} */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(UserDetailsPage_vue_1.default, new UserDetailsPage_vue_1.default(__assign({ 'onClosed': {} }, { userId: (__VLS_ctx.selectedUserId), key: (__VLS_ctx.selectedUserId) })));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([__assign({ 'onClosed': {} }, { userId: (__VLS_ctx.selectedUserId), key: (__VLS_ctx.selectedUserId) })], __VLS_functionalComponentArgsRest(__VLS_0), false));
    var __VLS_3 = void 0;
    var __VLS_4 = void 0;
    var __VLS_5 = void 0;
    var __VLS_6 = {
        onClosed: (__VLS_ctx.reloadUsers)
    };
    var __VLS_2;
}
if (__VLS_ctx.showAddUser) {
    /** @type {[typeof AddUserDialog, ]} */ ;
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent(AddUserDialog_vue_1.default, new AddUserDialog_vue_1.default(__assign({ 'onClose': {} })));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ 'onClose': {} })], __VLS_functionalComponentArgsRest(__VLS_7), false));
    var __VLS_10 = void 0;
    var __VLS_11 = void 0;
    var __VLS_12 = void 0;
    var __VLS_13 = {
        onClose: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.showAddUser))
                return;
            __VLS_ctx.showAddUser = false;
        }
    };
    var __VLS_9;
}
/** @type {__VLS_StyleScopedClasses['container-fluid']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-person-plus']} */ ;
/** @type {__VLS_StyleScopedClasses['me-1']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-striped']} */ ;
/** @type {__VLS_StyleScopedClasses['table-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['table-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['fade']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog-scrollable']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-close']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            UserDetailsPage: UserDetailsPage_vue_1.default,
            AddUserDialog: AddUserDialog_vue_1.default,
            selectedUserId: selectedUserId,
            modalRef: modalRef,
            showAddUser: showAddUser,
            nonAdminUsers: nonAdminUsers,
            reloadUsers: reloadUsers,
            handleAddUser: handleAddUser,
            openUserDetails: openUserDetails,
            formatDate: formatDate,
            formatName: formatName,
        };
    },
    emits: {},
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
    emits: {},
});
; /* PartiallyEnd: #4569/main.vue */

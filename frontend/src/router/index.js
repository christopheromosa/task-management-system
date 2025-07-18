"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
// Auth pages
var LoginForm_vue_1 = require("@/components/auth/LoginForm.vue");
var RegisterForm_vue_1 = require("@/components/auth/RegisterForm.vue");
// Admin pages
var DashboardPage_vue_1 = require("@/pages/admin/DashboardPage.vue");
var UsersPage_vue_1 = require("@/pages/admin/UsersPage.vue");
var TasksPage_vue_1 = require("@/pages/admin/TasksPage.vue");
var ProfilePage_vue_1 = require("@/pages/admin/ProfilePage.vue");
// User pages
// import UserDashboard from '@/pages/user/DashboardPage.vue'
// Store
var auth_1 = require("@/stores/auth");
var UserDashboardPage_vue_1 = require("@/pages/user/UserDashboardPage.vue");
var NotificationsPage_vue_1 = require("@/pages/user/NotificationsPage.vue");
var UserProfilePage_vue_1 = require("@/pages/user/UserProfilePage.vue");
var UserTasksPage_vue_1 = require("@/pages/user/UserTasksPage.vue");
var routes = [
    { path: '/', redirect: '/login' },
    // Auth Routes
    {
        path: '/login',
        component: LoginForm_vue_1.default,
        meta: { layout: 'auth' },
    },
    {
        path: '/register',
        component: RegisterForm_vue_1.default,
        meta: { layout: 'auth' },
    },
    // Admin Routes
    {
        path: '/admin',
        meta: { requiresAuth: true, role: 'admin', layout: 'admin' },
        children: [
            { path: '', redirect: '/admin-dashboard' },
            { path: 'admin-dashboard', component: DashboardPage_vue_1.default, meta: { layout: 'admin' } },
            { path: 'users', component: UsersPage_vue_1.default, meta: { layout: 'admin' } },
            { path: 'tasks', component: TasksPage_vue_1.default, meta: { layout: 'admin' } },
            { path: 'profile', component: ProfilePage_vue_1.default, meta: { layout: 'admin' } },
        ],
    },
    {
        path: '/user',
        meta: { requiresAuth: true, role: 'user', layout: 'user' },
        children: [
            { path: '', redirect: '/user-dashboard' },
            { path: 'user-dashboard', component: UserDashboardPage_vue_1.default, meta: { layout: 'user' } },
            { path: 'notifications', component: NotificationsPage_vue_1.default, meta: { layout: 'user' } },
            { path: 'tasks', component: UserTasksPage_vue_1.default, meta: { layout: 'user' } },
            { path: 'user-profile', component: UserProfilePage_vue_1.default, meta: { layout: 'user' } },
        ],
    },
    // Catch-All Route
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/ErrorPage.vue'); }); },
        meta: { layout: 'auth' },
    },
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes,
});
// Global Route Guard
router.beforeEach(function (to, from, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, token, requiredRole, userRole;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth = (0, auth_1.useAuthStore)();
                token = localStorage.getItem('token');
                if (!(token && !auth.isAuthenticated)) return [3 /*break*/, 2];
                return [4 /*yield*/, auth.fetchUser()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                // If route requires authentication
                if (to.meta.requiresAuth) {
                    if (!auth.isAuthenticated) {
                        return [2 /*return*/, next('/login')];
                    }
                    requiredRole = to.meta.role;
                    userRole = auth.role // either 'admin' or 'user'
                    ;
                    if (requiredRole && requiredRole !== userRole) {
                        // Redirect to respective dashboard if role mismatch
                        return [2 /*return*/, next(userRole === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard')];
                    }
                }
                // If already logged in and trying to access login/register
                if ((to.path === '/login' || to.path === '/register') && auth.isAuthenticated) {
                    return [2 /*return*/, next(auth.role === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard')];
                }
                next();
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;

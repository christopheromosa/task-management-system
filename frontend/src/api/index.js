"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var client_1 = require("./client");
var auth_1 = require("@/stores/auth");
var axios_1 = require("axios");
// Request Interceptor
client_1.default.interceptors.request.use(function (config) {
    var token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
});
// Response Interceptor
client_1.default.interceptors.response.use(function (response) { return response; }, function (error) {
    var _a, _b;
    var authStore = (0, auth_1.useAuthStore)();
    // Optional: Handle 401 Unauthorized by resetting auth state
    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        authStore.resetAuthState();
        // Optionally redirect to login page
        // router.push('/login')
    }
    return Promise.reject(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error);
});
// Now export API methods (same as before, no changes needed here)
exports.default = {
    auth: {
        login: function (credentials) {
            return client_1.default.post('/api/login', credentials);
        },
        logout: function () { return client_1.default.post('/api/logout'); },
        register: function (userData) { return client_1.default.post('/api/register', userData); },
        me: function () { return client_1.default.get('api/user'); },
    },
    users: {
        list: function (params) { return client_1.default.get('api/users', { params: params }); },
        create: function (userData) { return client_1.default.post('api/users', userData); },
        get: function (id) { return client_1.default.get("api/users/".concat(id)); },
        update: function (id, userData) { return client_1.default.put("api/users/".concat(id), userData); },
        delete: function (id) { return client_1.default.delete("/users/".concat(id)); },
    },
    tasks: {
        list: function (params) { return client_1.default.get('/tasks', { params: params }); },
        create: function (taskData) { return client_1.default.post('/tasks', taskData); },
        get: function (id) { return client_1.default.get("/tasks/".concat(id)); },
        update: function (id, taskData) { return client_1.default.put("/tasks/".concat(id), taskData); },
        updateStatus: function (id, status) {
            return client_1.default.patch("/tasks/".concat(id, "/status"), { status: status });
        },
        delete: function (id) { return client_1.default.delete("/tasks/".concat(id)); },
        userTasks: function (userId) { return client_1.default.get("/user/".concat(userId, "/tasks")); },
    },
    notifications: {
        list: function () { return client_1.default.get('/notifications'); },
        markAsRead: function (id) { return client_1.default.patch("/notifications/".concat(id, "/read")); },
    },
    handleError: function (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return {
                message: error.response.data.message || 'An error occurred',
                errors: error.response.data.errors,
                status: error.response.status,
            };
        }
        return {
            message: error.message || 'Network Error',
            status: 500,
        };
    },
};

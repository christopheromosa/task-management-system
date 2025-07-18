"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/main.css");
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
require("bootstrap-icons/font/bootstrap-icons.css");
var vue_1 = require("vue");
var pinia_1 = require("pinia");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var auth_1 = require("./stores/auth");
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use((0, pinia_1.createPinia)());
app.use(router_1.default);
app.mount('#app');
// main.ts
var auth = (0, auth_1.useAuthStore)();
auth.initAuth();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/client.ts
var axios_1 = require("axios");
var api = axios_1.default.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
exports.default = api;

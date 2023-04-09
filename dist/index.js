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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
const process_1 = require("process");
function mimetype(requestPath) {
    switch ((0, path_1.extname)(requestPath)) {
        case ".js": return "text/javascript";
        case ".html": return "text/html";
        case ".css": return "text/css";
        case ".svg": return "image/svg+xml";
        case ".json": return "application/json";
        case ".png": return "image/png";
        case ".ico": return "image/png";
        default: throw new Error("mimetype not found: " + requestPath);
    }
}
function main() {
    let app = (0, express_1.default)();
    app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (req.path.includes("/healthy") || req.path.includes("/api")) {
            next();
        }
        else {
            if (req.path == "" || req.path == "/") {
                res.status(200);
                res.contentType("html");
                res.send(yield (0, promises_1.readFile)("./app/dist/index.html"));
            }
            else {
                try {
                    let bytes = yield (0, promises_1.readFile)((0, path_1.join)((0, process_1.cwd)(), "/app/dist", req.path));
                    res.status(200);
                    res.contentType(mimetype(req.path));
                    res.send(bytes);
                }
                catch (err) {
                    console.log("unable to load", err);
                    res.status(404);
                    res.contentType("html");
                    res.send("<p>not found</p>");
                }
            }
        }
    }));
    app.get("/healthy", (req, res) => {
        res.status(200);
        res.contentType("json");
        res.send({ "healthy": "ok" });
    });
    app.get("/health", (req, res) => {
        res.status(200);
        res.contentType("json");
        res.send({ "healthy": "ok" });
    });
    if (process_1.env.SMARTBONDS_PROD) {
        app.listen(80, () => {
            console.log("api listening in port 80");
        });
    }
    else {
        app.listen(8080, () => {
            console.log("api listening in port 8080");
        });
    }
}
main();

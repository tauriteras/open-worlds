import express from "express";
import path from "path";
import http from "http";

import * as fs from 'fs';

import { Server } from "socket.io";
import { on } from "events";
import { generateWorld } from "./worldgenerator.js";

const port = 3069;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3069"]
    },
});

app.use(express.static("dist"));

const indexPath = path.join(process.cwd(), "dist", "index.html");
//const indexPath = path.join("../BUILD", "dist", "index.html");


app.get("*", (req, res) => {
    res.sendFile(indexPath);

    req.on("error", (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });

});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on("getworld", () => {

        console.log("World data requested!")

        let worldData = generateWorld();

        socket.emit('worldData', worldData)

    })

});



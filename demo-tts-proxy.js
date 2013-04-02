/*!
Demo tts proxy.

Copyright 2013 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.
*/

"use strict";

var http = require("http");
var url = require("url");
var spawn = require("child_process").spawn;

http.createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    var echo = spawn("echo", [query.q], {stdio: ["pipe", "pipe", "pipe"]});
    var text2wave = spawn("/usr/bin/text2wave", [],
        {stdio: ["pipe", "pipe", "pipe"]});
    echo.stdout.pipe(text2wave.stdin, {end: true});
    text2wave.stdout.pipe(res, {end: true});
}).listen(8080);
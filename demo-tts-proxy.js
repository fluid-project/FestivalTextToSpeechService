/*!
Demo tts proxy.

Copyright 2013 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.
*/

"use strict";

var http = require("http");
var url = require("url");
var process = require("child_process");

http.createServer(function (req, res) {
    var query = url.parse(req.url, true);
    var cmd = ["echo", query.q, "|", "/usr/bin/text2wave"];
    process.spawn(cmd).pipe(res, {end: true});
    /*
    var request = http.request({
        host: "translate.google.com",
        path: "/translate_tts" + req.url.substr(1)
    }, function (resp) {
        resp.pipe(res, {end: true});
    });
    req.pipe(request, {end: true});
    */
}).listen(8080);
/*!
Demo tts proxy.

Copyright 2013 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.
*/

"use strict";

var http = require("http");

http.createServer(function (req, res) {
    var request = http.request({
        host: "translate.google.com",
        path: "/translate_tts" + req.url.substr(1)
    }, function (resp) {
        resp.pipe(res, {end: true});
    });
    req.pipe(request, {end: true});
}).listen(8080);
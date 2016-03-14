This repository has been archived and is now read-only. Please contact one of the fluid-project maintainers if you’d like to request it be unarchived for further development. 
https://wiki.fluidproject.org/display/fluid/Get+Involved

FestivalTextToSpeechService
==============

FestivalTextToSpeechService is a proxy server that performs a text to speach
conversion.

Dependencies
------------

* Festival Speech Synthesis System

    It must be installed on the same server as the one that deploys
    FestivalTextToSpeechService.

    It can be downloaded from: [Festival Source Distribution](http://www.cstr.ed.ac.uk/projects/festival/download.html)

    Installation instricutions can be found here: [Installation](http://festvox.org/docs/manual-1.4.3/festival_6.html#SEC12)

* Node.js
    The server is built using Node.js

    It can be downloaded and installed from [nodejs.org](http://nodejs.org/)

Run
---

Run the following command:

    node FestivalTextToSpeechService.js

The application will be running on port 8083 by default.

    curl -o hello.wav http://localhost:8083/?q=hello%20world

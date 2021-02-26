# ddosprotect

Just a simple program for the DDoS attack of websites or your own system.

Use the "antiddos" function like this : 

```
var ddosprotect = require("ddosprotect")
var express = require("express");
var fs = require("fs-extra");

const app = express()

app.use(function (req, res) {
  ddosprotect.antiddos(req, res, 15000, 10); 
  // interval: interval of requests refreshing in miliseconds | maxrequests: max requests accepted into the time interval.
});
```

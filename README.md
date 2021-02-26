# ddosprotect

Just a simple program for the DDoS attack of websites or your own system.

Use the "antiddos" function like this : 

```
const ddosprotect = require("ddosprotect");
app.use(function (req, res) {
  ddosprotect.antiddos(req, res, interval, maxrequests); 
  // interval: interval of requests refreshing in miliseconds | maxrequests: max requests accepted into the time interval.
});
```

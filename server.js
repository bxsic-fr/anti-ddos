const express = require("express");
const fs = require("fs-extra")

//EDIT HERE
let irq = 15; //Number of seconds of the requests interval.
let maxrq = 10 //Number of requests accepted in the "irq" time interval.

//DON'T TOUCH AFTER THAT
const app = express();
irq = irq*1000;

console.log("--> Cool ddos protection by Bxsic <--");

app.get("/", (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ip = ip.split(",");
  ip = ip['0'];
  fs.appendFileSync("listconnections.txt", ip + "+");
  let listip = fs.readFileSync("listconnections.txt", "utf-8").split('+');
  let nbrq = getnbrequests(listip, ip);
  if(nbrq > maxrq){
    res.redirect("http://" + ip);
    console.log("❌" + ip + ", number of requests last " + irq/1000 + "s : " + nbrq + "/" + maxrq);
  } else {
    res.sendFile(__dirname + "/views/index.html");
    console.log("✅ " + ip + ", number of requests last " + irq/1000 + "s : " + nbrq + "/" + maxrq);
  }
});

function getnbrequests(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

setInterval(function() {
  fs.writeFileSync("listconnections.txt", " ");
}, irq);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const express = require("express");
const fs = require("fs-extra")

exports.antiddos = function (request, response, interval, maxrequests) { 
  // request & response = get/post function data | interval = user requests interval (seconds) | maxrequests = Number of requests (max) accepted in the time interval
  console.log("--> Cool ddos protection by Bxsic <--");
  interval = interval*1000;
  
  function getnbrequests(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }
  
  setInterval(function() {
    fs.writeFileSync("listconnections.txt", " ");
  }, interval);
  
  var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  ip = ip.split(",");
  ip = ip['0'];
  fs.appendFileSync("listconnections.txt", ip + "+");
  let listip = fs.readFileSync("listconnections.txt", "utf-8").split('+');
  let nbrq = getnbrequests(listip, ip);
  if(nbrq > maxrequests){
    response.redirect("http://" + ip);
    console.log("❌" + ip + ", number of requests last " + interval/1000 + "s : " + nbrq + "/" + maxrequests);
  } else {
    response.sendFile(__dirname + "/views/index.html");
    console.log("✅ " + ip + ", number of requests last " + interval/1000 + "s : " + nbrq + "/" + maxrequests);
  }
}
function setorder() {
var order = []
var apps = document.getElementsByClassName("app")

for (app in apps) {
if (apps[app].id) {
order.push(apps[app].id)
}
}

localStorage.setItem("order", JSON.stringify(order))
}

async function getapps() {
var appsjson = await fetch("/apps.json")
var apps = await appsjson.json()
var orderjson = await fetch("/order.json")
var order = await orderjson.json()
for (app in order) {
var appelm = document.createElement("div")
appelm.className = "app"
appelm.id = apps[app].id
appelm.setAttribute("onclick", 'new Nightmare({"id":' + apps[app].id + ', "title": "' + apps[app].title + '", "type": "' + apps[app].type + '", "' + apps[app].type + '": "' + apps[app][apps[app].type] + '", "width": 800, "height": 600, "theme": "dark"})')

var appimg = document.createElement("img")
appimg.className = "appimg"
appimg.src = apps[app].icon
appelm.appendChild(appimg)

var apptitle = document.createElement("div")
apptitle.className = "apptitle"
apptitle.innerText = apps[app].title
appelm.appendChild(apptitle)

/* whats this?
if (apps[app].click) {
  appelm.addEventListener('click', function() {eval(apps[app].click)})
}
*/

document.getElementById("apps").appendChild(appelm)
}
}

async function getappslocal() {
var appsjson = await fetch("/apps.json")
var apps = await appsjson.json()
var order = JSON.parse(localStorage.getItem("order"))
for (app in order) {
var appelm = document.createElement("div")
appelm.className = "app"
appelm.id = apps[app].id
appelm.setAttribute("onclick", 'new Nightmare({"id":' + apps[order[app]].id + ', "title": "' + apps[order[app]].title + '", "type": "' + apps[app].type + '", "' + apps[app].type + '": "' + apps[order[app]][apps[app].type] + '", "width": 800, "height": 600})')

var appimg = document.createElement("img")
appimg.className = "appimg"
appimg.src = apps[order[app]].icon
appelm.appendChild(appimg)

var apptitle = document.createElement("div")
apptitle.className = "apptitle"
apptitle.innerText = apps[order[app]].title
appelm.appendChild(apptitle)

document.getElementById("apps").appendChild(appelm)
}
}

if (localStorage.getItem("order") !== null) {
getappslocal()
} else {
getapps()
}

window.onload = function() {
$("#apps").sortable({stop: function() {
setorder()
}});
}


window.addEventListener("load", function() {
  setTimeout(() => {
      document.getElementById("splash").style.display = 'none'
  }, 2000)
})

function setTime() {
  var today = new Date();
  var hour = today.getHours() % 12  || 12;
  var minute = today.getMinutes();
  var period = today.toLocaleString([], { hour12: true});
  period = period.split(" ")[2];
  if (hour < 10) {hour = "0" + hour}
  if (minute < 10) {minute = "0" + minute}
  document.getElementById("navtime").innerText = hour + ":" + minute + " " + period
  setTimeout(setTime, 1000);
}

window.onload = function() {
setTime()
}
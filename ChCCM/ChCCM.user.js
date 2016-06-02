// ==UserScript==
// @name ChCCM
// @description Chrome Cast Card Mangler for pretend you're xyzzy
// @version 0.0.1
// @run-at document-end
// @include *://pyx-1.pretendyoure.xyz/zy/game.jsp*
// @noframes
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

"use strict";
/*
var unsafeWindow;
var GM_setValue;
var GM_getValue;
*/

var nm = GM_getValue("ChCl", "").split("\n");

var obj = [];

obj[0] = document.createElement("input");
obj[0].type = "button";
obj[0].value = "Apply cards";
obj[0].className = "game_menu_bar";
obj[0].addEventListener("click", applyC);

obj[1] = document.createElement("input");
obj[1].type = "button";
obj[1].value = "Edit cards";
obj[1].className = "game_menu_bar";
obj[1].addEventListener("click", editC);


obj[2] = document.createElement("div");
obj[2].style.position = "fixed";
obj[2].style.top = "50%";
obj[2].style.left = "50%";
obj[2].style.transform = "translate(-50%, -50%)";
obj[2].style.backgroundColor = "#bbb";
obj[2].style.padding = "0.5em"
obj[2].style.boxShadow = "#222 0 0 3em";
obj[2].style.borderRadius = "5px";
obj[2].style.zIndex = "99999999";
obj[2].style.width = "6em";
obj[2].style.height = "15em";


(() => {
  var kk = document.createElement("textarea");
  kk.style.resize = "none";
  kk.style.width = "100%";
  kk.style.height = "12em";
  kk.style.padding = "0";
  kk.wrap = false;
  kk.addEventListener("change", (ev) => {
    var t = ev.target.value;
    var co = 0;
    var o = "";
    t.split("").map((c) => {
      if(c != "\n")
        co++;
      else
        co = 0;
      if(co == 6) {
        o += "\n";
        co = 1;
      }
      o += c;
    });
    ev.target.value = o;
  });
  obj[2].appendChild(kk);
  kk = document.createElement("input");
  kk.type = "button";
  kk.value = "ok";
  kk.style.width = "100%";
  kk.style.padding = "0";
  kk.addEventListener("click", () => {
    nm = obj[2].children[0].value.split("\n");
    GM_setValue("ChCl", obj[2].children[0].value);
    document.body.removeChild(obj[2]);
  });
  obj[2].appendChild(kk);
})();

var displayed = false;
setInterval(()=>{
  for(var a in unsafeWindow.cah.currentGames)
    if(unsafeWindow.cah.currentGames[a].state_ == "l" && unsafeWindow.cah.currentGames[a].host_ == unsafeWindow.cah.nickname)
      if(!displayed)
        display();
      else;
    else if(displayed)
      undisplay();
}, 200);

function display() {
  var k = document.getElementsByClassName("game_top")[0];
  if(k.getElementsByClassName("game_message")[0].innerHTML != "Wait for players then click Start Game.")
    return;
  k.appendChild(obj[0]);
  k.appendChild(obj[1]);
  displayed = true;
}

function undisplay() {
  var k = document.getElementsByClassName("game_top")[0];
  displayed = false;
  try {
    k.removeChild(obj[0]);
    k.removeChild(obj[1]);
  } catch (err) {

  }
}

function applyC() {
  var chatElem;
  var a;
  for(a in unsafeWindow.cah.currentGames)
    chatElem = unsafeWindow.cah.currentGames[a].chatElement_;
  var tNs = [];
  for(a in chatElem.children)
    switch(chatElem.children[a].type) {
      case "text":
       tNs[0] = chatElem.children[a];
       break;
      case "button":
       tNs[1] = chatElem.children[a];
       break;
    }
  a = nm.length;
  var sned = function() {
    a--;
    tNs[0].value = "/addcardcast " + nm[a];
    tNs[1].click();
    if(a)
     setTimeout(sned, 50);
  };
  if(a)
    sned();
}

function editC() {
  obj[2].children[0].value = nm.join("\n");
  document.body.appendChild(obj[2]);
}

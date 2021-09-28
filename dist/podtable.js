!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).Podtable=t()}(this,function(){function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return function(e,n){void 0===n&&(n={});var r,o,l=document.querySelector(e);!function(e){var t=!0;if(null===e)throw new Error("Unable to access target HTMLTableElement");if(!(e instanceof HTMLTableElement))throw new Error("Element is not an HTMLTableElement");if(null===e.tHead)throw new Error("Table should have only one THEAD");if(e.tHead.rows.length<=0)throw new Error("tHead doesnt contain HTMLTableRowElement");if(e.tHead.rows[0].cells.length<2)throw new Error("tHead HTMLTableRowElement should have atleast 2 cells");if(e.tBodies.length<=0||e.tBodies.length>1)throw new Error("Table should have only one TBODY");e.tBodies[0].rows.length<=0&&(t=-1),c(t),h()}(l);var i=[],a=[],s=[0],d=this;function c(e){-1==e?r=l.tHead.rows[0]:1==e&&(r=l.tBodies[0].rows[0])}function h(){(o=document.createElement("div")).setAttribute("id","podtable-container"),l.parentNode.insertBefore(o,l),o.appendChild(l)}function u(e){var t=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("div");n.colSpan=a.length,r.classList.add("child-grid-row"),t.classList.add("child");for(var o=0;o<e.length;o++)r.append(e[o]);return n.append(r),t.append(n),t}function f(e){var t=document.createElement("div");t.classList.add("child-grid-col");var n=document.createElement("div"),r=document.createElement("div");return n.innerHTML=l.tHead.rows[0].cells[e.cellIndex].innerHTML,r.innerHTML=e.innerHTML,t.append(n),t.append(r),t}function v(e){if(!(i.length<=0)){var t=e.currentTarget.parentElement;if(t.classList.contains("has-child"))t.classList.remove("has-child"),t.nextElementSibling.remove();else{t.classList.add("has-child");for(var n=[],r=0;r<t.cells.length;r++)t.cells[r].classList.contains("hidden")&&n.push(f(t.cells[r]));t.parentNode.insertBefore(u(n),t.nextSibling)}}}function m(){i.length>0?l.classList.add("show-toggle"):(document.querySelectorAll(".has-child").forEach(function(e){e.classList.remove("has-child")}),l.classList.remove("show-toggle"),l.tHead.rows[0].cells[l.tHead.rows[0].cells.length-1].classList.remove("expanded"))}function g(){var e=document.querySelectorAll(".child");if(e.length>0){for(var n=[],r=0;r<e.length;r++)n.push(e[r].previousElementSibling);for(var o=0;o<n.length;o++){for(var l,a=[],s=t(n[o].cells);!(l=s()).done;){var d=l.value;d.classList.contains("hidden")&&a.push(f(d))}n[o].nextElementSibling.remove(),i.length>0&&n[o].after(u(a)),m()}}}function p(e,n){void 0===n&&(n=l),i.push(e);for(var r,o=t(n.rows);!(r=o()).done;){var a=r.value;a.classList.contains("child")||a.cells[e].classList.add("hidden")}w(e)}function y(){for(var e=0;e<i.length;e++)for(var n,r=t(l.rows);!(n=r()).done;){var o=n.value;o.classList.contains("child")||o.cells[i[e]].classList.remove("hidden")}i=[]}function L(){i=[];for(var e=a.length,t=0;t<e;t++)r.clientWidth>o.clientWidth&&(i.includes(a[t])||s.includes(a[t])||p(a[t]));m()}function w(e){d.current=e,n.event&&E()}function E(){if(n.event)try{n.method(d)}catch(e){console.error(e)}}if(function(e){for(var t=[],n=0;n<r.cells.length;n++)t.push(n);if(a=Object.prototype.hasOwnProperty.call(e,"priority")&&Array.isArray(e.priority)&&e.priority.length>0?Array.from(new Set(e.priority.concat(t.reverse()))):t.reverse(),s.push(t.length-1),Object.prototype.hasOwnProperty.call(e,"keepCell")){if(!Array.isArray(e.keepCell))throw TypeError("keep cell must be of type array");s=[].concat(s,e.keepCell)}}(n),function(e){e.tHead.rows[0].lastElementChild.classList.add("main-toggle");for(var n,r=t(e.tBodies[0].rows);!(n=r()).done;)n.value.lastElementChild.classList.add("toggle")}(l),L(),function(){for(var e=document.querySelectorAll(".toggle"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){v(e)});document.querySelector(".main-toggle").addEventListener("click",function(e){!function(e){if(!(i.length<=0)){var t=document.querySelectorAll(".toggle"),n=e.currentTarget;if(n.classList.contains("expanded")){for(var r=0;r<t.length;r++)t[r].parentElement.classList.contains("has-child")&&t[r].click();n.classList.remove("expanded")}else{for(var o=0;o<t.length;o++)t[o].parentElement.classList.contains("has-child")||t[o].click();n.classList.add("expanded")}}}(e)})}(),window.addEventListener("resize",function(){return function(){y();for(var e=0;e<a.length;e++)r.clientWidth>o.clientWidth&&(i.includes(a[e])||s.includes(a[e])||(p(a[e]),g()));m()}(),void(i.length<=0&&(w(-1),g()))}),function(e){var n=e.tBodies[0];new MutationObserver(function(n){for(var o,l=t(n);!(o=l()).done;){var i=o.value;"childList"===i.type&&1===i.addedNodes.length?"TR"!=i.addedNodes[0].tagName||i.addedNodes[0].classList.contains("child")||((a=i.addedNodes[0]).lastElementChild.classList.add("toggle"),a.lastElementChild.addEventListener("click",function(e){return v(e)}),E()):"childList"===i.type&&1===i.removedNodes.length&&"TR"==i.removedNodes[0].tagName&&!i.removedNodes[0].classList.contains("child")&&i.removedNodes[0].classList.contains("has-child")&&i.nextSibling.remove()}var a;r=e.tBodies[0].rows.length<=0?e.tHead.rows[0]:e.tBodies[0].rows[0],y(),L()}).observe(n,{childList:!0})}(l),n.event)return d}});
//# sourceMappingURL=podtable.js.map

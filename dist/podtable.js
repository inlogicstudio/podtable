!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).Podtable=t()}(this,function(){function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}return function(t,n){void 0===n&&(n={});var r,l,o=document.querySelector(t);if(!1===h(o))throw new Error(l);-1===h(o)?r=document.querySelector(t+" thead tr"):h(o)&&(r=document.querySelector(t+" tbody tr"));var i=document.createElement("div");i.setAttribute("id","podtable-container"),o.parentNode.insertBefore(i,o),i.appendChild(o);var c=[],d=[],a=[0],s=window.innerWidth,u=this;function h(e){return null===e?(l="Unable to access target HTMLTableElement",!1):e instanceof HTMLTableElement?null===e.tHead?(l="Table should have only one THEAD",!1):e.tBodies.length<=0?(l="Table should have only one TBODY",!1):!(e.tBodies[0].rows.length<=0)||-1:(l="Element is not a HTMLTableElement",!1)}function f(e){var t=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("div");n.colSpan=d.length,r.classList.add("child-grid-row"),t.classList.add("child");for(var l=0;l<e.length;l++)r.append(e[l]);return n.append(r),t.append(n),t}function m(e){var t=document.createElement("div");t.classList.add("child-grid-col");var n=document.createElement("div"),r=document.createElement("div");return n.innerHTML=e.dataset.gridColname,r.innerHTML=e.innerHTML,t.append(n),t.append(r),t}function v(e){var t=e.target.parentElement;if(t.classList.contains("has-child"))t.classList.remove("has-child"),t.nextElementSibling.remove();else{t.classList.add("has-child");for(var n=[],r=0;r<t.cells.length;r++)t.cells[r].classList.contains("hidden")&&n.push(m(t.cells[r]));t.parentNode.insertBefore(f(n),t.nextSibling)}}function g(){c.length>0?o.classList.add("show-toggle"):(document.querySelectorAll(".has-child").forEach(function(e){e.classList.remove("has-child")}),o.classList.remove("show-toggle"),document.querySelector(".main-toggle").classList.remove("expanded"))}function p(){var e=document.querySelectorAll(".child");if(e.length>0){for(var t=[],n=0;n<e.length;n++)t.push(e[n].previousElementSibling);for(var r=0;r<t.length;r++){var l=[];for(var o in t[r].children)void 0!==t[r].children[o].classList&&t[r].children[o].classList.contains("hidden")&&l.push(m(t[r].children[o]));t[r].nextElementSibling.remove(),c.length>0&&t[r].after(f(l)),g()}}}function y(e){c.push(e),document.querySelectorAll('[data-cell-index="'+e+'"]').forEach(function(e){e.classList.add("hidden")}),S(e)}function b(){L();for(var e=0;e<d.length;e++)r.clientWidth>i.clientWidth&&(c.includes(d[e])||a.includes(d[e])||(y(d[e]),p()));g()}function L(){for(var e=0;e<c.length;e++)document.querySelectorAll('[data-cell-index="'+c[e]+'"]').forEach(function(e){e.classList.remove("hidden")});c=[]}function E(){c=[];for(var e=window.innerWidth,t=d.length,n=0;n<t;n++)r.clientWidth>i.clientWidth&&(c.includes(d[n])||a.includes(d[n])||y(d[n])),s=e;g()}function S(e){u.current=e,n.event&&w()}function w(){if(n.event)try{n.method(u)}catch(e){console.error(e)}}if(function(e){if(Object.prototype.hasOwnProperty.call(e,"keepCell")){if(!Array.isArray(e.keepCell))throw TypeError("keep cell must be of type array");a=[].concat(a,e.keepCell)}}(n),function(e){document.querySelector(e+" thead tr > th:last-child").classList.add("main-toggle"),document.querySelectorAll(e+" tbody tr:not(tr.child) > td:last-child").forEach(function(e){e.classList.add("toggle")})}(t),function(e){for(var t=document.querySelectorAll(e+" tr"),l=[],o=0;o<r.children.length;o++)l.push(o);for(var i=0;i<t.length;i++)for(var c=t[i].children,s=0;s<c.length;s++)c[s].setAttribute("data-cell-index",c[s].cellIndex);d=Object.prototype.hasOwnProperty.call(n,"priority")&&Array.isArray(n.priority)&&n.priority.length>0?Array.from(new Set(n.priority.concat(l.reverse()))):l.reverse(),a.push(l.length-1)}(t),E(),function(){for(var e=document.querySelectorAll(".toggle"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){v(e)});document.querySelector(".main-toggle").addEventListener("click",function(e){!function(e){var t=document.querySelectorAll(".toggle"),n=e.currentTarget;if(n.classList.contains("expanded")){for(var r=0;r<t.length;r++)t[r].parentElement.classList.contains("has-child")&&t[r].click();n.classList.remove("expanded")}else{for(var l=0;l<t.length;l++)t[l].parentElement.classList.contains("has-child")||t[l].click();n.classList.add("expanded")}}(e)})}(),window.addEventListener("resize",function(){return(e=window.innerWidth)<s?b():e>s&&(b(),c.length<=0&&(S(-1),p())),void(s=e);var e}),function(t){var n=document.querySelector(t+" tbody");function l(e){e.lastElementChild.classList.add("toggle"),e.lastElementChild.addEventListener("click",function(e){return v(e)});for(var t=0;t<e.children.length;t++)e.children[t].setAttribute("data-cell-index",e.children[t].cellIndex)}new MutationObserver(function(n,o){for(var i,c=function(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))){r&&(t=r);var l=0;return function(){return l>=t.length?{done:!0}:{done:!1,value:t[l++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(n);!(i=c()).done;){var d=i.value;"childList"===d.type&&1===d.addedNodes.length?"TR"!=d.addedNodes[0].tagName||d.addedNodes[0].classList.contains("child")||(l(d.addedNodes[0]),w()):"childList"===d.type&&1===d.removedNodes.length&&"TR"==d.removedNodes[0].tagName&&!d.removedNodes[0].classList.contains("child")&&d.removedNodes[0].classList.contains("has-child")&&d.nextSibling.remove()}r=document.querySelector(t+" tbody").rows.length<=0?document.querySelector(t+" thead tr"):document.querySelector(t+" tbody tr"),L(),E()}).observe(n,{childList:!0})}(t),n.event)return u}});
//# sourceMappingURL=podtable.js.map

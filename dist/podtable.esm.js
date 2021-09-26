function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var l=0;return function(){return l>=t.length?{done:!0}:{done:!1,value:t[l++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,n){void 0===n&&(n={});var r,l,o=document.querySelector(e);if(!1===u(o))throw new Error(l);-1===u(o)?r=document.querySelector(e+" thead tr"):u(o)&&(r=document.querySelector(e+" tbody tr"));var i=document.createElement("div");i.setAttribute("id","podtable-container"),o.parentNode.insertBefore(i,o),i.appendChild(o);var c=[],a=[],d=[0],s=this;function u(e){return null===e?(l="Unable to access target HTMLTableElement",!1):e instanceof HTMLTableElement?null===e.tHead?(l="Table should have only one THEAD",!1):e.tBodies.length<=0?(l="Table should have only one TBODY",!1):!(e.tBodies[0].rows.length<=0)||-1:(l="Element is not a HTMLTableElement",!1)}function h(e){var t=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("div");n.colSpan=a.length,r.classList.add("child-grid-row"),t.classList.add("child");for(var l=0;l<e.length;l++)r.append(e[l]);return n.append(r),t.append(n),t}function f(e){var t=document.createElement("div");t.classList.add("child-grid-col");var n=document.createElement("div"),r=document.createElement("div");return n.innerHTML=o.tHead.rows[0].cells[e.cellIndex].innerHTML,r.innerHTML=e.innerHTML,t.append(n),t.append(r),t}function m(e){if(!(c.length<=0)){var t=e.target.parentElement;if(t.classList.contains("has-child"))t.classList.remove("has-child"),t.nextElementSibling.remove();else{t.classList.add("has-child");for(var n=[],r=0;r<t.cells.length;r++)t.cells[r].classList.contains("hidden")&&n.push(f(t.cells[r]));t.parentNode.insertBefore(h(n),t.nextSibling)}}}function v(){c.length>0?o.classList.add("show-toggle"):(document.querySelectorAll(".has-child").forEach(function(e){e.classList.remove("has-child")}),o.classList.remove("show-toggle"),o.tHead.rows[0].cells[o.tHead.rows[0].cells.length-1].classList.remove("expanded"))}function g(){var e=document.querySelectorAll(".child");if(e.length>0){for(var n=[],r=0;r<e.length;r++)n.push(e[r].previousElementSibling);for(var l=0;l<n.length;l++){for(var o,i=[],a=t(n[l].cells);!(o=a()).done;){var d=o.value;d.classList.contains("hidden")&&i.push(f(d))}n[l].nextElementSibling.remove(),c.length>0&&n[l].after(h(i)),v()}}}function p(e){c.push(e),document.querySelectorAll('[data-cell-index="'+e+'"]').forEach(function(e){e.classList.add("hidden")}),b(e)}function y(){for(var e=0;e<c.length;e++)document.querySelectorAll('[data-cell-index="'+c[e]+'"]').forEach(function(e){e.classList.remove("hidden")});c=[]}function L(){c=[];for(var e=a.length,t=0;t<e;t++)r.clientWidth>i.clientWidth&&(c.includes(a[t])||d.includes(a[t])||p(a[t]));v()}function b(e){s.current=e,n.event&&E()}function E(){if(n.event)try{n.method(s)}catch(e){console.error(e)}}if(function(e){if(Object.prototype.hasOwnProperty.call(e,"keepCell")){if(!Array.isArray(e.keepCell))throw TypeError("keep cell must be of type array");d=[].concat(d,e.keepCell)}}(n),function(e){document.querySelector(e+" thead tr > th:last-child").classList.add("main-toggle"),document.querySelectorAll(e+" tbody tr:not(tr.child) > td:last-child").forEach(function(e){e.classList.add("toggle")})}(e),function(e){for(var t=document.querySelectorAll(e+" tr"),l=[],o=0;o<r.children.length;o++)l.push(o);for(var i=0;i<t.length;i++)for(var c=t[i].children,s=0;s<c.length;s++)c[s].setAttribute("data-cell-index",c[s].cellIndex);a=Object.prototype.hasOwnProperty.call(n,"priority")&&Array.isArray(n.priority)&&n.priority.length>0?Array.from(new Set(n.priority.concat(l.reverse()))):l.reverse(),d.push(l.length-1)}(e),L(),function(){for(var e=document.querySelectorAll(".toggle"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){m(e)});document.querySelector(".main-toggle").addEventListener("click",function(e){!function(e){if(!(c.length<=0)){var t=document.querySelectorAll(".toggle"),n=e.currentTarget;if(n.classList.contains("expanded")){for(var r=0;r<t.length;r++)t[r].parentElement.classList.contains("has-child")&&t[r].click();n.classList.remove("expanded")}else{for(var l=0;l<t.length;l++)t[l].parentElement.classList.contains("has-child")||t[l].click();n.classList.add("expanded")}}}(e)})}(),window.addEventListener("resize",function(){return function(){y();for(var e=0;e<a.length;e++)r.clientWidth>i.clientWidth&&(c.includes(a[e])||d.includes(a[e])||(p(a[e]),g()));v()}(),void(c.length<=0&&(b(-1),g()))}),function(e){var n=document.querySelector(e+" tbody");function l(e){e.lastElementChild.classList.add("toggle"),e.lastElementChild.addEventListener("click",function(e){return m(e)});for(var t=0;t<e.children.length;t++)e.children[t].setAttribute("data-cell-index",e.children[t].cellIndex)}new MutationObserver(function(n){for(var o,i=t(n);!(o=i()).done;){var c=o.value;"childList"===c.type&&1===c.addedNodes.length?"TR"!=c.addedNodes[0].tagName||c.addedNodes[0].classList.contains("child")||(l(c.addedNodes[0]),E()):"childList"===c.type&&1===c.removedNodes.length&&"TR"==c.removedNodes[0].tagName&&!c.removedNodes[0].classList.contains("child")&&c.removedNodes[0].classList.contains("has-child")&&c.nextSibling.remove()}r=document.querySelector(e+" tbody").rows.length<=0?document.querySelector(e+" thead tr"):document.querySelector(e+" tbody tr"),y(),L()}).observe(n,{childList:!0})}(e),n.event)return s}export{n as default};
//# sourceMappingURL=podtable.esm.js.map

function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},e.apply(this,arguments)}const t=new Set,o=(e,o,r)=>{t.has(e)||(t.add(e),document.querySelector(`a[href='${e}']`).style.color="red",o(()=>{(e=>new Promise((t,o)=>{const r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=t,r.onerror=o,document.head.appendChild(r)}))(e).then(r).catch(r)}))},r=window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,n=navigator.connection&&(navigator.connection.saveData||(navigator.connection.effectiveType||"").includes("2g")),i=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);function a(t){if(n||!r||!(()=>{const e=document.createElement("link");return e.relList&&e.relList.supports&&e.relList.supports("prefetch")})())return;t=e({},{throttle:3,desktopPreloadMethod:"nearby-mouse",mobilePreloadMethod:"all-in-viewport",mouseProximity:200,excludeKeywords:[]},t);const a=new Set,[s,c]=(e=>{e=e||1;var t=[],o=0;function r(){o<e&&t.length>0&&(t.shift()(),o++)}return[function(e){t.push(e)>1||r()},function(){o--,r()}]})(t.throttle),l=i?t.mobilePreloadMethod:t.desktopPreloadMethod,d=new IntersectionObserver((e,t)=>{e.forEach(e=>{"all-in-viewport"===l&&e.isIntersecting&&o(e.target.href,s,c),"nearby-mouse"===l&&(e.isIntersecting?a.add(e.target):a.delete(e.target))})});var h,u;document.querySelectorAll(`a[href^='${window.location.origin}']`).forEach(e=>{const o=new RegExp(t.excludeKeywords.join("|"));t.excludeKeywords.length&&o.test(e.href)||d.observe(e)}),"nearby-mouse"===l&&document.addEventListener("mousemove",(h=e=>{[...a].forEach(r=>{var n,i;n=r,i=e.pageY,Math.floor(Math.sqrt(Math.pow(e.pageX-(n.offsetLeft+n.offsetWidth/2),2)+Math.pow(i-(n.offsetTop+n.offsetHeight/2),2)))<t.mouseProximity&&(o(r.href,s,c),r.style.color="red")})},u=!1,function(){u||(h.apply(null,arguments),u=!0,setTimeout(()=>{u=!1},300))}))}export{a as listen};

if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),c={module:{uri:t},exports:o,require:d};i[t]=Promise.all(n.map((e=>c[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CQiU5hKj.js",revision:null},{url:"assets/index-Dca7Ik7g.css",revision:null},{url:"index.html",revision:"40d97aba378aef2220c0b4b13bedcdc4"},{url:"registerSW.js",revision:"b6b8198077caeedd7a7d889e7ca57c80"},{url:"manifest.webmanifest",revision:"7ba7e1fb3dea2c7d317412437b1dca15"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

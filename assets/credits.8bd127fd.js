import{c as j,o as W,g as q,h as L,j as X,i as u,a as d,k as y,m as A,b as S,s as x,t as p,d as T,F as I,T as Y}from"./vendor.bae5e718.js";function Z(e){const t=e.indexOf("_of_");if(t===-1)return{name:e,n:1};const c=parseInt(e.slice(t+4),10);return{name:e.slice(0,t-2),n:c}}async function ee(e){const c=await(await fetch(e)).text(),b=new DOMParser().parseFromString(c,"image/svg+xml"),h=new Map;return b.querySelectorAll("symbol").forEach(v=>{const{name:_,n:a}=Z(v.getAttribute("id"));h.set(`${e}#${_}`,a)}),Array.from(h)}function te(e){const t=(e==null?void 0:e.api)?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),c=(e==null?void 0:e.prefix)?`${e.prefix}.`:"",r=new Map,b=new Proxy({},{get(l,n){let s=r.get(n);s||(s=j(void 0,{equals:!1}),r.set(n,s)),s[0]();const i=t.reduce((o,N)=>o!==null||!N?o:N.getItem(`${c}${n}`),null);return i!==null&&(e==null?void 0:e.deserializer)?e.deserializer(i,n,e==null?void 0:e.options):i}}),h=(l,n,s)=>{const i=(e==null?void 0:e.serializer)?e.serializer(n,l,s??(e==null?void 0:e.options)):n;t.forEach(N=>N.setItem(`${c}${l}`,i));const o=r.get(l);o&&o[1]()},v=l=>t.forEach(n=>n.removeItem(l)),_=()=>t.forEach(l=>{var n;return(n=l==null?void 0:l.clear)==null?void 0:n.call(l)}),a=()=>{const l={},n=(s,i)=>{if(!l.hasOwnProperty(s)){const o=i&&(e==null?void 0:e.deserializer)?e.deserializer(i,s,e==null?void 0:e.options):i;o&&(l[s]=o)}};return t.forEach(s=>{if(typeof s.getAll=="function"){const i=s.getAll();for(const o of i)n(o,i[o])}else{let i=0,o;for(;o=s.key(i++);)l.hasOwnProperty(o)||n(o,s.getItem(o))}}),l};return W(()=>{const l=n=>{var s;let i=!1;t.forEach(o=>{o!==n.storageArea&&n.key&&n.newValue!==o.getItem(n.key)&&(n.newValue?o.setItem(n.key,n.newValue):o.removeItem(n.key),i=!0)}),i&&n.key&&((s=r.get(n.key))==null||s[1]())};"addEventListener"in globalThis?(globalThis.addEventListener("storage",l),q(()=>globalThis.removeEventListener("storage",l))):(t.forEach(n=>{var s;return(s=n.addEventListener)==null?void 0:s.call(n,"storage",l)}),q(()=>t.forEach(n=>{var s;return(s=n.removeEventListener)==null?void 0:s.call(n,"storage",l)})))}),[b,h,{clear:_,remove:v,toJSON:a}]}const[ne,G,{remove:re,toJSON:le}]=te();function se(){const e=le(),t={};let c;for(c in e)t[c]=JSON.parse(e[c]);return t}const[k,H]=j(se());function ie(e,t){G(e,JSON.stringify(t));const c={...k()};c[e]=t,H(c)}function V(e){re(e);const t={...k()};delete t[e],H(t)}function oe(e){return k()[e]!==void 0}function ce(){return ne._bodyType||0}function ue(e){G("_bodyType",e)}const ae=p('<ul class="flex items-center"><li class="flex-1"><button class="p-2 text-white bg-indigo-600 rounded-full">\u2B05 Previous</button></li><li class="flex-1 text-right"><button class="p-2 text-white bg-indigo-600 rounded-full">Next \u27A1</button></li></ul>'),de=p("<span>[remove]</span>"),B=p("<svg><use></use></svg>",4,!0),ge=p('<div><div><p>Name: </p><p>Layers: </p><p>Item: <!> (<!> of <!>)</p></div><svg viewBox="0 0 560 560" class="bg-white"><use></use></svg></div>'),fe=p('<div class="border-solid border-4 border-teal-600"></div>');function he(e){const[t,c]=j(0),[r]=L(e.partsFileName,ee);X(()=>console.log("v... layers",e.layers.loading?"Loading..":"Ready",e.layers()));function b(){return r()[t()][1]>1?`${r()[t()][0]}_1_of_${r()[t()][1]}`:r()[t()][0]}function h(){return r()[t()][1]>1?`${r()[t()][0]}_2_of_${r()[t()][1]}`:""}function v(){return r()[t()][1]>2?`${r()[t()][0]}_3_of_${r()[t()][1]}`:""}function _(){return r()[t()][1]>3?`${r()[t()][0]}_4_of_${r()[t()][1]}`:""}function a(){return r()[t()][1]>4?`${r()[t()][0]}_5_of_${r()[t()][1]}`:""}function l(){return r()[t()][1]>5?`${r()[t()][0]}_6_of_${r()[t()][1]}`:""}function n(){r().length!==1&&(t()+1===r().length?c(0):c(t()+1))}function s(){r().length!==1&&(t()===0?c(r().length-1):c(t()-1))}function i(){const m=r()[t()][0].split("#");return{type:m[0].slice(15,-4),item:m[1]}}function o(m){ie(m,[b(),h(),v(),_(),a(),l()].filter(Boolean))}function N(m){V(m)}return(()=>{const m=fe.cloneNode(!0);return u(m,d(y,{get when(){return!r.loading},get children(){const P=ge.cloneNode(!0),g=P.firstChild,$=g.firstChild;$.firstChild;const w=$.nextSibling;w.firstChild;const C=w.nextSibling,O=C.firstChild,M=O.nextSibling,K=M.nextSibling,J=K.nextSibling,Q=J.nextSibling,D=Q.nextSibling;D.nextSibling;const E=g.nextSibling,F=E.firstChild;return u(P,d(y,{get when(){return r().length>1},get children(){const f=ae.cloneNode(!0),R=f.firstChild,U=R.nextSibling;return R.$$click=s,U.$$click=n,f}}),g),u($,()=>i().type,null),u($,d(y,{get when(){return oe(i().type)},get children(){const f=de.cloneNode(!0);return A(f,"click",N.bind(null,i().type),!0),f}}),null),u(w,()=>r()[t()][1],null),u(C,()=>i().item,M),u(C,()=>t()+1,J),u(C,()=>r().length,D),A(E,"click",o.bind(null,i().type),!0),u(E,d(y,{get when(){return l()},get children(){const f=B.cloneNode(!0);return S(()=>x(f,"href",l())),f}}),F),u(E,d(y,{get when(){return a()},get children(){const f=B.cloneNode(!0);return S(()=>x(f,"href",a())),f}}),F),u(E,d(y,{get when(){return _()},get children(){const f=B.cloneNode(!0);return S(()=>x(f,"href",_())),f}}),F),u(E,d(y,{get when(){return v()},get children(){const f=B.cloneNode(!0);return S(()=>x(f,"href",v())),f}}),F),u(E,d(y,{get when(){return h()},get children(){const f=B.cloneNode(!0);return S(()=>x(f,"href",h())),f}}),F),S(()=>x(F,"href",b())),P}})),m})()}T(["click"]);const $e=p('<svg viewBox="0 0 560 560" class="bg-white"><use></use><use></use><use></use><use></use></svg>'),ve=p('<div><ul class="flex items-center"></ul><p>Number of parts: </p></div>'),_e=p('<div class="border-solid border-4 border-teal-600"></div>'),me=p('<li class="flex-1"><button class="p-2 text-white bg-red-600 rounded-full"></button></li>'),z=p("<svg><use></use></svg>",4,!0);function be(e){const t=e.split("_");return t.length===2&&(t[1]==="left"||t[1]==="right")?{name:void 0,more:e}:{name:t.slice(-1)[0],more:t.slice(0,-1).join("_")}}async function we(e){const c=await(await fetch(e)).text(),b=new DOMParser().parseFromString(c,"image/svg+xml"),h=new Map;return b.querySelectorAll("symbol").forEach(v=>{const{name:_,more:a}=be(v.getAttribute("id")),l=h.get(_);l?(l.push(a),h.set(_,l)):h.set(_,[a])}),Array.from(h)}function ye(e){const[t,c]=j(ce()),[r]=L(e.partsFileName,we);function b(){ue(t());const[a,l]=r()[t()];return l.map(n=>`${n}_${a}`)}function h(a,l){return`${a}_${l.slice(21+a.length)}`}function v(a,l){const n=h(a,l);return e.layers().bodyBack.find(s=>s===n)!==void 0}function _(a,l){const n=h(a,l);return e.layers().bodyFront.find(s=>s===n)!==void 0}return(()=>{const a=_e.cloneNode(!0);return u(a,d(y,{get when(){return!r.loading&&!e.layers.loading},get children(){const l=ve.cloneNode(!0),n=l.firstChild,s=n.nextSibling;return s.firstChild,u(n,d(I,{get each(){return r()},children:(i,o)=>d(y,{get when(){return i[0]},get children(){const N=me.cloneNode(!0),m=N.firstChild;return A(m,"click",c.bind(null,o()),!0),u(m,()=>i[0]),N}})})),u(s,()=>Object.keys(k()).length,null),u(l,d(y,{get when(){return b().length>0},fallback:"Pick a body type",get children(){const i=$e.cloneNode(!0),o=i.firstChild,N=o.nextSibling,m=N.nextSibling,P=m.nextSibling;return u(i,d(I,{get each(){return Object.keys(k())},children:g=>d(I,{get each(){return k()[g]},children:$=>d(y,{get when(){return v(g,$)},get children(){const w=z.cloneNode(!0);return A(w,"click",V.bind(null,g),!0),x(w,"href",$),w}})})}),o),u(i,d(I,{get each(){return b().reverse()},children:g=>(()=>{const $=z.cloneNode(!0);return S(()=>x($,"href",`${e.partsFileName}#${g}`)),$})()}),o),u(i,d(I,{get each(){return Object.keys(k())},children:g=>d(I,{get each(){return k()[g]},children:$=>d(y,{get when(){return _(g,$)},get children(){const w=z.cloneNode(!0);return A(w,"click",V.bind(null,g),!0),x(w,"href",$),w}})})}),null),S(g=>{const $=`${e.partsFileName}#ifoot_left`,w=`${e.partsFileName}#ifoot_right`,C=`${e.partsFileName}#ihand_left`,O=`${e.partsFileName}#ihand_right`;return $!==g._v$&&x(o,"href",g._v$=$),w!==g._v$2&&x(N,"href",g._v$2=w),C!==g._v$3&&x(m,"href",g._v$3=C),O!==g._v$4&&x(P,"href",g._v$4=O),g},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),i}}),null),l}})),a})()}T(["click"]);function xe(e){return d(ye,{get layers(){return e.layers},partsFileName:"/sprites/whole-body.svg"})}const pe=p('<section class="bg-pink-100 text-gray-700 p-8"><h1 class="text-2xl font-bold">Credits</h1><details><summary>PRE </summary><pre></pre></details><div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></div></section>'),Ne=p("<div>Loading...</div>"),Se=p("<div><button></button></div>"),ke=["/sprites/whole-armband.svg","/sprites/whole-belt.svg","/sprites/whole-button.svg","/sprites/whole-cloak.svg","/sprites/whole-coat.svg","/sprites/whole-gloves.svg","/sprites/whole-holster.svg","/sprites/whole-jacket.svg","/sprites/whole-kneepads.svg","/sprites/whole-necklace.svg","/sprites/whole-pants.svg","/sprites/whole-pet.svg","/sprites/whole-scarf.svg","/sprites/whole-scar.svg","/sprites/whole-shirt.svg","/sprites/whole-shoes.svg","/sprites/whole-shoulderpads.svg","/sprites/whole-socks.svg","/sprites/whole-suit.svg","/sprites/whole-tatoo.svg","/sprites/whole-tie.svg","/sprites/whole-underwear.svg","/sprites/whole-vest.svg","/sprites/whole-watch.svg","/sprites/whole-wings.svg"];function Ce(e){return e.slice(15,-4)}async function Ee(e){return await(await fetch(e)).json()}function Fe(){const[e,t]=j(0),[c]=L("/sprites/male-body_front_swaying.json",Ee);return(()=>{const r=pe.cloneNode(!0),b=r.firstChild,h=b.nextSibling,v=h.firstChild;v.firstChild;const _=v.nextSibling,a=h.nextSibling;return u(r,d(Y,{children:"Credits page"}),b),u(v,()=>c.loading?"loading...":"ready",null),u(_,()=>JSON.stringify(c(),null,2)),u(r,d(xe,{layers:c}),a),u(a,d(I,{each:ke,get fallback(){return Ne.cloneNode(!0)},children:(l,n)=>(()=>{const s=Se.cloneNode(!0),i=s.firstChild;return A(i,"click",t.bind(null,n()),!0),u(i,()=>Ce(l)),u(s,d(y,{get when(){return n()===e()},get children(){return d(he,{layers:c,partsFileName:l})}}),null),s})()})),r})()}T(["click"]);export{Fe as default};

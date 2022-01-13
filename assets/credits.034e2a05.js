import{c as B,o as X,g as G,h as V,i as u,a,j as y,k as F,b as C,s as S,t as x,d as z,m as Y,F as j,T as Z}from"./vendor.0edfad09.js";import{p as h}from"./index.79085b1e.js";function ee(e){const t=e.indexOf("_of_");if(t===-1)return{name:e,n:1};const c=parseInt(e.slice(t+4),10);return{name:e.slice(0,t-2),n:c}}async function te(e){const c=await(await fetch(`${h}${e}`)).text(),p=new DOMParser().parseFromString(c,"image/svg+xml"),f=new Map;return p.querySelectorAll("symbol").forEach($=>{const{name:v,n:_}=ee($.getAttribute("id"));f.set(`${e}#${v}`,_)}),Array.from(f)}function ne(e){const t=(e==null?void 0:e.api)?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),c=(e==null?void 0:e.prefix)?`${e.prefix}.`:"",r=new Map,p=new Proxy({},{get(l,n){let s=r.get(n);s||(s=B(void 0,{equals:!1}),r.set(n,s)),s[0]();const o=t.reduce((i,N)=>i!==null||!N?i:N.getItem(`${c}${n}`),null);return o!==null&&(e==null?void 0:e.deserializer)?e.deserializer(o,n,e==null?void 0:e.options):o}}),f=(l,n,s)=>{const o=(e==null?void 0:e.serializer)?e.serializer(n,l,s??(e==null?void 0:e.options)):n;t.forEach(N=>N.setItem(`${c}${l}`,o));const i=r.get(l);i&&i[1]()},$=l=>t.forEach(n=>n.removeItem(l)),v=()=>t.forEach(l=>{var n;return(n=l==null?void 0:l.clear)==null?void 0:n.call(l)}),_=()=>{const l={},n=(s,o)=>{if(!l.hasOwnProperty(s)){const i=o&&(e==null?void 0:e.deserializer)?e.deserializer(o,s,e==null?void 0:e.options):o;i&&(l[s]=i)}};return t.forEach(s=>{if(typeof s.getAll=="function"){const o=s.getAll();for(const i of o)n(i,o[i])}else{let o=0,i;for(;i=s.key(o++);)l.hasOwnProperty(i)||n(i,s.getItem(i))}}),l};return X(()=>{const l=n=>{var s;let o=!1;t.forEach(i=>{i!==n.storageArea&&n.key&&n.newValue!==i.getItem(n.key)&&(n.newValue?i.setItem(n.key,n.newValue):i.removeItem(n.key),o=!0)}),o&&n.key&&((s=r.get(n.key))==null||s[1]())};"addEventListener"in globalThis?(globalThis.addEventListener("storage",l),G(()=>globalThis.removeEventListener("storage",l))):(t.forEach(n=>{var s;return(s=n.addEventListener)==null?void 0:s.call(n,"storage",l)}),G(()=>t.forEach(n=>{var s;return(s=n.removeEventListener)==null?void 0:s.call(n,"storage",l)})))}),[p,f,{clear:v,remove:$,toJSON:_}]}const[re,H,{clear:le,remove:se,toJSON:ie}]=ne();function oe(){const e=ie(),t={};let c;for(c in e)t[c]=JSON.parse(e[c]);return t}const[E,K]=B(oe());function ce(e,t){H(e,JSON.stringify(t));const c={...E()};c[e]=t,K(c)}function M(e){se(e);const t={...E()};delete t[e],K(t)}function ue(e){return E()[e]!==void 0}function ae(){return re._bodyType||0}function de(e){H("_bodyType",e)}const ge=x('<ul class="flex items-center"><li class="flex-1"><button class="p-2 text-white bg-indigo-600 rounded-full">\u2B05 Previous</button></li><li class="flex-1 text-right"><button class="p-2 text-white bg-indigo-600 rounded-full">Next \u27A1</button></li></ul>'),fe=x("<span>[remove]</span>"),L=x("<svg><use></use></svg>",4,!0),he=x('<div><div><p>Name: </p><p>Layers: </p><p>Item: <!> (<!> of <!>)</p></div><svg viewBox="0 0 560 560" class="bg-white"><use></use></svg></div>'),$e=x('<div class="border-solid border-4 border-teal-600"></div>');function ve(e){const[t,c]=B(0),[r]=V(e.partsFileName,te);function p(){return r()[t()][1]>1?`${r()[t()][0]}_1_of_${r()[t()][1]}`:r()[t()][0]}function f(){return r()[t()][1]>1?`${r()[t()][0]}_2_of_${r()[t()][1]}`:""}function $(){return r()[t()][1]>2?`${r()[t()][0]}_3_of_${r()[t()][1]}`:""}function v(){return r()[t()][1]>3?`${r()[t()][0]}_4_of_${r()[t()][1]}`:""}function _(){return r()[t()][1]>4?`${r()[t()][0]}_5_of_${r()[t()][1]}`:""}function l(){return r()[t()][1]>5?`${r()[t()][0]}_6_of_${r()[t()][1]}`:""}function n(){r().length!==1&&(t()+1===r().length?c(0):c(t()+1))}function s(){r().length!==1&&(t()===0?c(r().length-1):c(t()-1))}function o(){const m=r()[t()][0].split("#");return{type:m[0].slice(14,-4),item:m[1]}}function i(m){ce(m,[p(),f(),$(),v(),_(),l()].filter(Boolean))}function N(m){M(m)}return(()=>{const m=$e.cloneNode(!0);return u(m,a(y,{get when(){return!r.loading},get children(){const k=he.cloneNode(!0),P=k.firstChild,d=P.firstChild;d.firstChild;const w=d.nextSibling;w.firstChild;const b=w.nextSibling,T=b.firstChild,O=T.nextSibling,Q=O.nextSibling,R=Q.nextSibling,U=R.nextSibling,D=U.nextSibling;D.nextSibling;const I=P.nextSibling,A=I.firstChild;return u(k,a(y,{get when(){return r().length>1},get children(){const g=ge.cloneNode(!0),q=g.firstChild,W=q.nextSibling;return q.$$click=s,W.$$click=n,g}}),P),u(d,()=>o().type,null),u(d,a(y,{get when(){return ue(o().type)},get children(){const g=fe.cloneNode(!0);return F(g,"click",N.bind(null,o().type),!0),g}}),null),u(w,()=>r()[t()][1],null),u(b,()=>o().item,O),u(b,()=>t()+1,R),u(b,()=>r().length,D),F(I,"click",i.bind(null,o().type),!0),u(I,a(y,{get when(){return l()},get children(){const g=L.cloneNode(!0);return C(()=>S(g,"href",`${h}${l()}`)),g}}),A),u(I,a(y,{get when(){return _()},get children(){const g=L.cloneNode(!0);return C(()=>S(g,"href",`${h}${_()}`)),g}}),A),u(I,a(y,{get when(){return v()},get children(){const g=L.cloneNode(!0);return C(()=>S(g,"href",`${h}${v()}`)),g}}),A),u(I,a(y,{get when(){return $()},get children(){const g=L.cloneNode(!0);return C(()=>S(g,"href",`${h}${$()}`)),g}}),A),u(I,a(y,{get when(){return f()},get children(){const g=L.cloneNode(!0);return C(()=>S(g,"href",`${h}${f()}`)),g}}),A),C(()=>S(A,"href",`${h}${p()}`)),k}})),m})()}z(["click"]);const _e=x('<button class="p-3 bg-red-600 text-white-300">RESET</button>'),me=x('<svg viewBox="0 0 560 560" class="bg-white"><use></use><use></use><use></use><use></use></svg>'),we=x('<div><ul class="flex items-center"></ul><p>Number of parts: </p></div>'),be=x('<div class="border-solid border-4 border-teal-600"></div>'),ye=x('<li class="flex-1"><button class="p-2 text-white bg-red-600 rounded-full"></button></li>'),J=x("<svg><use></use></svg>",4,!0);function pe(e){const t=e.split("_");return t.length===2&&(t[1]==="left"||t[1]==="right")?{name:void 0,more:e}:{name:t.slice(-1)[0],more:t.slice(0,-1).join("_")}}async function xe(e){const c=await(await fetch(`${h}${e}`)).text(),p=new DOMParser().parseFromString(c,"image/svg+xml"),f=new Map;return p.querySelectorAll("symbol").forEach($=>{const{name:v,more:_}=pe($.getAttribute("id")),l=f.get(v);l?(l.push(_),f.set(v,l)):f.set(v,[_])}),Array.from(f)}function Ne(e){const[t,c]=B(ae()),[r]=V(e.partsFileName,xe);Y(()=>{de(t())});function p(){const[l,n]=r()[t()];return n.map(s=>`${s}_${l}`)}function f(l,n){return`${l}_${n.slice(20+l.length)}`}function $(l,n){const s=f(l,n);return e.layers().bodyBack.find(o=>o===s)!==void 0}function v(l,n){const s=f(l,n);return e.layers().bodyFront.find(o=>o===s)!==void 0}function _(){console.log("CLEAR"),le(),c(0),window.location=window.location+"?cleared"}return(()=>{const l=be.cloneNode(!0);return u(l,a(y,{get when(){return!r.loading&&!e.layers.loading},get children(){const n=we.cloneNode(!0),s=n.firstChild,o=s.nextSibling;return o.firstChild,u(s,a(j,{get each(){return r()},children:(i,N)=>a(y,{get when(){return i[0]},get children(){const m=ye.cloneNode(!0),k=m.firstChild;return F(k,"click",c.bind(null,N()),!0),u(k,()=>i[0]),m}})})),u(o,()=>Object.keys(E()).length-1,null),u(o,a(y,{get when(){return Object.keys(E()).length-1},get children(){return[" ",(()=>{const i=_e.cloneNode(!0);return i.$$click=_,i})()]}}),null),u(n,a(y,{get when(){return p().length>0},fallback:"Pick a body type",get children(){const i=me.cloneNode(!0),N=i.firstChild,m=N.nextSibling,k=m.nextSibling,P=k.nextSibling;return u(i,a(j,{get each(){return Object.keys(E())},children:d=>a(j,{get each(){return E()[d]},children:w=>a(y,{get when(){return $(d,w)},get children(){const b=J.cloneNode(!0);return F(b,"click",M.bind(null,d),!0),S(b,"href",`${h}${w}`),b}})})}),N),u(i,a(j,{get each(){return p().reverse()},children:d=>(()=>{const w=J.cloneNode(!0);return C(()=>S(w,"href",`${h}${e.partsFileName}#${d}`)),w})()}),N),u(i,a(j,{get each(){return Object.keys(E())},children:d=>a(j,{get each(){return E()[d]},children:w=>a(y,{get when(){return v(d,w)},get children(){const b=J.cloneNode(!0);return F(b,"click",M.bind(null,d),!0),S(b,"href",`${h}${w}`),b}})})}),null),C(d=>{const w=`${h}${e.partsFileName}#ifoot_left`,b=`${h}${e.partsFileName}#ifoot_right`,T=`${h}${e.partsFileName}#ihand_left`,O=`${h}${e.partsFileName}#ihand_right`;return w!==d._v$&&S(N,"href",d._v$=w),b!==d._v$2&&S(m,"href",d._v$2=b),T!==d._v$3&&S(k,"href",d._v$3=T),O!==d._v$4&&S(P,"href",d._v$4=O),d},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),i}}),null),n}})),l})()}z(["click"]);function Se(e){return a(Ne,{get layers(){return e.layers},partsFileName:"sprites/whole-body.svg"})}const ke=x('<section class="bg-pink-100 text-gray-700 p-8"><h1 class="text-2xl font-bold">Credits</h1><details><summary>PRE </summary><pre></pre></details><div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></div></section>'),Ee=x("<div>Loading...</div>"),Ce=x("<div><button></button></div>"),Ie=["sprites/whole-armband.svg","sprites/whole-belt.svg","sprites/whole-button.svg","sprites/whole-cloak.svg","sprites/whole-coat.svg","sprites/whole-gloves.svg","sprites/whole-holster.svg","sprites/whole-jacket.svg","sprites/whole-kneepads.svg","sprites/whole-necklace.svg","sprites/whole-pants.svg","sprites/whole-pet.svg","sprites/whole-scarf.svg","sprites/whole-scar.svg","sprites/whole-shirt.svg","sprites/whole-shoes.svg","sprites/whole-shoulderpads.svg","sprites/whole-socks.svg","sprites/whole-suit.svg","sprites/whole-tatoo.svg","sprites/whole-tie.svg","sprites/whole-underwear.svg","sprites/whole-vest.svg","sprites/whole-watch.svg","sprites/whole-wings.svg"];function je(e){return e.slice(14,-4)}async function Ae(e){return await(await fetch(e)).json()}function Oe(){const[e,t]=B(0),[c]=V(`${h}sprites/male-body_front_swaying.json`,Ae);return(()=>{const r=ke.cloneNode(!0),p=r.firstChild,f=p.nextSibling,$=f.firstChild;$.firstChild;const v=$.nextSibling,_=f.nextSibling;return u(r,a(Z,{children:"Credits page"}),p),u($,()=>c.loading?"loading...":"ready",null),u(v,()=>JSON.stringify(c(),null,2)),u(r,a(Se,{layers:c}),_),u(_,a(j,{each:Ie,get fallback(){return Ee.cloneNode(!0)},children:(l,n)=>(()=>{const s=Ce.cloneNode(!0),o=s.firstChild;return F(o,"click",t.bind(null,n()),!0),u(o,()=>je(l)),u(s,a(y,{get when(){return n()===e()},get children(){return a(ve,{layers:c,partsFileName:l})}}),null),s})()})),r})()}z(["click"]);export{Oe as default};

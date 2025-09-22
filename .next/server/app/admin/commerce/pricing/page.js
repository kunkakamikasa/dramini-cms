(()=>{var e={};e.id=9265,e.ids=[9265],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},98751:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=s(50482),i=s(69108),a=s(62563),n=s.n(a),o=s(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let d=["",{children:["admin",{children:["commerce",{children:["pricing",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,3)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/commerce/pricing/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,66294)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,82917)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,69361,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/commerce/pricing/page.tsx"],p="/admin/commerce/pricing/page",m={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/admin/commerce/pricing/page",pathname:"/admin/commerce/pricing",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},56740:(e,t,s)=>{Promise.resolve().then(s.bind(s,77605))},77605:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>x,dynamic:()=>u});var r=s(95344),i=s(3729),a=s(16212),n=s(92549),o=s(61351),l=s(69436),d=s(13746),c=s(31498),p=s(55313),m=s(44669);let u="force-dynamic";function x(){let[e,t]=(0,i.useState)([]),[s,u]=(0,i.useState)(!0),[x,f]=(0,i.useState)(null),[g,h]=(0,i.useState)({freeUntilEpisode:"",bundlePriceCoins:"",episodePriceCoins:"100"});(0,i.useEffect)(()=>{b()},[]);let b=async()=>{try{let e=await fetch("/api/movie-library"),s=await e.json();t(s)}catch(e){m.ZP.error("获取影片列表失败")}finally{u(!1)}},y=e=>{f(e.id),h({freeUntilEpisode:e.freeUntilEpisode?.toString()||"",bundlePriceCoins:e.bundlePriceCoins?.toString()||"",episodePriceCoins:"100"})},v=async()=>{if(x)try{if((await fetch(`/api/movie-library/${x}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({freeUntilEpisode:g.freeUntilEpisode?parseInt(g.freeUntilEpisode):null,bundlePriceCoins:g.bundlePriceCoins?parseInt(g.bundlePriceCoins):null})})).ok)m.ZP.success("收费策略更新成功"),f(null),b();else throw Error("更新失败")}catch(e){m.ZP.error("更新收费策略失败")}},j=e=>e<=20?1200:e<=40?2e3:2800;return s?r.jsx("div",{className:"p-6",children:r.jsx("div",{className:"flex items-center justify-center h-64",children:r.jsx("div",{className:"text-lg",children:"加载中..."})})}):(0,r.jsxs)("div",{className:"p-6 space-y-6",children:[r.jsx("div",{className:"flex items-center justify-between",children:(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"收费策略管理"}),r.jsx("p",{className:"text-gray-600",children:"设置影片的金币收费规则"})]})}),r.jsx(o.Zb,{className:"bg-blue-50 border-blue-200",children:(0,r.jsxs)(o.aY,{className:"p-4",children:[r.jsx("h3",{className:"font-semibold text-blue-900 mb-2",children:"收费规则说明"}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4 text-sm text-blue-800",children:[(0,r.jsxs)("div",{children:[r.jsx("strong",{children:"单集收费:"})," 固定100金币/集"]}),(0,r.jsxs)("div",{children:[r.jsx("strong",{children:"整部剧收费:"}),(0,r.jsxs)("ul",{className:"ml-4 mt-1",children:[r.jsx("li",{children:"• 20集内: 1200金币 (约$10)"}),r.jsx("li",{children:"• 40集内: 2000金币 (约$16)"}),r.jsx("li",{children:"• 60集内: 2800金币 (约$22)"})]})]})]})]})}),r.jsx("div",{className:"grid gap-6",children:e.map(e=>(0,r.jsxs)(o.Zb,{children:[r.jsx(o.Ol,{children:(0,r.jsxs)(o.ll,{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[r.jsx("span",{children:e.name}),(0,r.jsxs)(l.C,{variant:"outline",children:[e.episodes.length," 集"]}),(0,r.jsxs)(l.C,{variant:"secondary",children:["推荐: ",j(e.episodes.length)," 金币"]})]}),(0,r.jsxs)(a.z,{size:"sm",onClick:()=>y(e),disabled:x===e.id,children:[r.jsx(d.Z,{className:"w-4 h-4 mr-2"}),"设置收费"]})]})}),r.jsx(o.aY,{children:x===e.id?(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"免费到第几集"}),r.jsx(n.I,{type:"number",min:"0",placeholder:"3 (前3集免费)",value:g.freeUntilEpisode,onChange:e=>h(t=>({...t,freeUntilEpisode:e.target.value}))}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"0表示无免费集数"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"整部剧价格（金币）"}),r.jsx(n.I,{type:"number",min:"0",placeholder:j(e.episodes.length).toString(),value:g.bundlePriceCoins,onChange:e=>h(t=>({...t,bundlePriceCoins:e.target.value}))}),(0,r.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:["推荐: ",j(e.episodes.length)," 金币"]})]})]}),(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsxs)(a.z,{onClick:v,children:[r.jsx(c.Z,{className:"w-4 h-4 mr-2"}),"保存设置"]}),r.jsx(a.z,{variant:"outline",onClick:()=>f(null),children:"取消"})]})]}):(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[(0,r.jsxs)("div",{children:[r.jsx("span",{className:"text-gray-500",children:"免费集数:"}),r.jsx("p",{className:"font-medium flex items-center gap-1",children:e.freeUntilEpisode?`前${e.freeUntilEpisode}集免费`:"无免费集数"})]}),(0,r.jsxs)("div",{children:[r.jsx("span",{className:"text-gray-500",children:"整部剧价格:"}),(0,r.jsxs)("p",{className:"font-medium flex items-center gap-1",children:[r.jsx(p.Z,{className:"w-3 h-3 text-yellow-500"}),e.bundlePriceCoins||j(e.episodes.length)," 金币"]})]}),(0,r.jsxs)("div",{children:[r.jsx("span",{className:"text-gray-500",children:"单集价格:"}),(0,r.jsxs)("p",{className:"font-medium flex items-center gap-1",children:[r.jsx(p.Z,{className:"w-3 h-3 text-yellow-500"}),"100 金币"]})]})]}),(0,r.jsxs)("div",{className:"bg-gray-50 p-3 rounded-lg",children:[r.jsx("h4",{className:"font-medium mb-2",children:"收费策略预览"}),(0,r.jsxs)("div",{className:"text-sm text-gray-600 space-y-1",children:[(0,r.jsxs)("p",{children:["• 前",e.freeUntilEpisode||0,"集: 免费观看"]}),(0,r.jsxs)("p",{children:["• 第",(e.freeUntilEpisode||0)+1,"集起: 100金币/集"]}),(0,r.jsxs)("p",{children:["• 整部剧购买: ",e.bundlePriceCoins||j(e.episodes.length),"金币 (节省",Math.max(0,100*e.episodes.length-(e.bundlePriceCoins||j(e.episodes.length))),"金币)"]})]})]})]})})]},e.id))})]})}},69436:(e,t,s)=>{"use strict";s.d(t,{C:()=>o});var r=s(95344);s(3729);var i=s(49247),a=s(91626);let n=(0,i.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function o({className:e,variant:t,...s}){return r.jsx("div",{className:(0,a.cn)(n({variant:t}),e),...s})}},61351:(e,t,s)=>{"use strict";s.d(t,{Ol:()=>o,SZ:()=>d,Zb:()=>n,aY:()=>c,ll:()=>l});var r=s(95344),i=s(3729),a=s(91626);let n=i.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,a.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));n.displayName="Card";let o=i.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",e),...t}));o.displayName="CardHeader";let l=i.forwardRef(({className:e,...t},s)=>r.jsx("h3",{ref:s,className:(0,a.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));l.displayName="CardTitle";let d=i.forwardRef(({className:e,...t},s)=>r.jsx("p",{ref:s,className:(0,a.cn)("text-sm text-muted-foreground",e),...t}));d.displayName="CardDescription";let c=i.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,a.cn)("p-6 pt-0",e),...t}));c.displayName="CardContent",i.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,a.cn)("flex items-center p-6 pt-0",e),...t})).displayName="CardFooter"},92549:(e,t,s)=>{"use strict";s.d(t,{I:()=>n});var r=s(95344),i=s(3729),a=s(91626);let n=i.forwardRef(({className:e,type:t,...s},i)=>r.jsx("input",{type:t,className:(0,a.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:i,...s}));n.displayName="Input"},31498:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(69224).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},3:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>n,__esModule:()=>a,default:()=>d,dynamic:()=>l});var r=s(86843);let i=(0,r.createProxy)(String.raw`/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/commerce/pricing/page.tsx`),{__esModule:a,$$typeof:n}=i,o=i.default,l=(0,r.createProxy)(String.raw`/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/commerce/pricing/page.tsx#dynamic`),d=o},44669:(e,t,s)=>{"use strict";s.d(t,{ZP:()=>T});var r,i=s(3729);let a={data:""},n=e=>e||a,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",i="";for(let a in e){let n=e[a];"@"==a[0]?"i"==a[1]?s=a+" "+n+";":r+="f"==a[1]?c(n,a):a+"{"+c(n,"k"==a[1]?"":t)+"}":"object"==typeof n?r+=c(n,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=n&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=c.p?c.p(a,n):a+":"+n+";")}return s+(t&&i?t+"{"+i+"}":i)+r},p={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},u=(e,t,s,r,i)=>{let a=m(e),n=p[a]||(p[a]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(a));if(!p[n]){let t=a!==e?e:(e=>{let t,s,r=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);p[n]=c(i?{["@keyframes "+n]:t}:t,s?"":"."+n)}let u=s&&p.g?p.g:null;return s&&(p.g=p[n]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(p[n],t,r,u),n},x=(e,t,s)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==a?"":a)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return u(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let g,h,b,y=f.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function i(a,n){let o=Object.assign({},a),l=o.className||i.className;s.p=Object.assign({theme:h&&h()},o),s.o=/ *go\d+/.test(l),o.className=f.apply(s,r)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),b&&d[0]&&b(o),g(d,o)}return t?t(i):i}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=((()=>{let e;return()=>e})(),"default"),C=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},P=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},S=(e,t=k)=>{$[t]=C($[t]||E,e),P.forEach(([e,s])=>{e===t&&s($[t])})},U=e=>Object.keys($).forEach(t=>S(e,t)),_=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),Z=(e=k)=>t=>{S(t,e)},A={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},q=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),z=e=>(t,s)=>{let r=q(t,e,s);return Z(r.toasterId||_(r.id))({type:2,toast:r}),r.id},I=(e,t)=>z("blank")(e,t);I.error=z("error"),I.success=z("success"),I.loading=z("loading"),I.custom=z("custom"),I.dismiss=(e,t)=>{let s={type:3,toastId:e};t?Z(t)(s):U(s)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let s={type:4,toastId:e};t?Z(t)(s):U(s)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,s)=>{let r=I.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?w(t.success,e):void 0;return i?I.success(i,{id:r,...s,...null==s?void 0:s.success}):I.dismiss(r),e}).catch(e=>{let i=t.error?w(t.error,e):void 0;i?I.error(i,{id:r,...s,...null==s?void 0:s.error}):I.dismiss(r)}),e};var M=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,O=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${O} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),R=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${H} 1s linear infinite;
`,y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),F=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,G=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,v("div")`
  position: absolute;
`,v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,r=i.createElement,c.p=void 0,g=r,h=void 0,b=void 0,f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var T=I}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[1638,312,733,5724,600],()=>s(98751));module.exports=r})();
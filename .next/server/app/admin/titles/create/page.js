(()=>{var e={};e.id=1794,e.ids=[1794],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},47689:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=s(50482),a=s(69108),i=s(62563),o=s.n(i),l=s(68300),n={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>l[e]);s.d(t,n);let d=["",{children:["admin",{children:["titles",{children:["create",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,50652)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/titles/create/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,66294)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,82917)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,69361,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/titles/create/page.tsx"],p="/admin/titles/create/page",m={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/admin/titles/create/page",pathname:"/admin/titles/create",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},55700:(e,t,s)=>{Promise.resolve().then(s.bind(s,60039))},60039:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h,dynamic:()=>f});var r=s(95344),a=s(3729),i=s(22254),o=s(16212),l=s(92549),n=s(61351),d=s(93601),c=s(63024),p=s(42739),m=s(31498),u=s(20783),x=s.n(u),g=s(44669);let f="force-dynamic";function h(){let e=(0,i.useRouter)(),[t,s]=(0,a.useState)(!1),[u,f]=(0,a.useState)({name:"",slug:"",synopsis:"",coverImageId:"",previewImage:"",language:"zh",categoryId:"",tagIds:[]}),h=(e,t)=>{if(f(s=>({...s,[e]:t})),"name"===e&&t){let e=t.toLowerCase().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"");f(t=>({...t,slug:e}))}},y=async t=>{t.preventDefault(),s(!0);try{let t=await fetch("/api/admin/titles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(!t.ok){let e=await t.json();throw Error(e.error?.message||"创建失败")}let s=await t.json();g.ZP.success("标题创建成功"),e.push(`/admin/titles/${s.data.id}/overview`)}catch(e){g.ZP.error(e instanceof Error?e.message:"创建失败")}finally{s(!1)}};return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[r.jsx(x(),{href:"/admin/titles/list",children:(0,r.jsxs)(o.z,{variant:"ghost",size:"sm",children:[r.jsx(c.Z,{className:"h-4 w-4 mr-2"}),"返回列表"]})}),(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"创建标题"}),r.jsx("p",{className:"text-gray-600",children:"创建新的短剧标题"})]})]}),r.jsx("form",{onSubmit:y,children:(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,r.jsxs)("div",{className:"lg:col-span-2 space-y-6",children:[(0,r.jsxs)(n.Zb,{children:[r.jsx(n.Ol,{children:r.jsx(n.ll,{children:"基本信息"})}),(0,r.jsxs)(n.aY,{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"标题名称 *"}),r.jsx(l.I,{value:u.name,onChange:e=>h("name",e.target.value),placeholder:"输入标题名称",required:!0})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"URL别名 *"}),r.jsx(l.I,{value:u.slug,onChange:e=>h("slug",e.target.value),placeholder:"url-slug",required:!0})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"简介"}),r.jsx(d.g,{value:u.synopsis,onChange:e=>h("synopsis",e.target.value),placeholder:"输入标题简介",rows:4})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"语言"}),(0,r.jsxs)("select",{value:u.language,onChange:e=>h("language",e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",children:[r.jsx("option",{value:"zh",children:"中文"}),r.jsx("option",{value:"en",children:"English"})]})]})]})]}),(0,r.jsxs)(n.Zb,{children:[r.jsx(n.Ol,{children:r.jsx(n.ll,{children:"媒体信息"})}),(0,r.jsxs)(n.aY,{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"封面图片 URL"}),r.jsx(l.I,{value:u.coverImageId,onChange:e=>h("coverImageId",e.target.value),placeholder:"https://example.com/cover.jpg",type:"url"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"首页预览图 URL"}),r.jsx(l.I,{value:u.previewImage,onChange:e=>h("previewImage",e.target.value),placeholder:"https://example.com/preview.jpg",type:"url"}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"用于首页大图展示的预览图片"})]})]})]})]}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)(n.Zb,{children:[r.jsx(n.Ol,{children:r.jsx(n.ll,{children:"操作"})}),r.jsx(n.aY,{children:(0,r.jsxs)("div",{className:"space-y-3",children:[(0,r.jsxs)(o.z,{type:"submit",className:"w-full",disabled:t,children:[t&&r.jsx(p.Z,{className:"mr-2 h-4 w-4 animate-spin"}),r.jsx(m.Z,{className:"mr-2 h-4 w-4"}),"创建标题"]}),r.jsx(x(),{href:"/admin/titles/list",className:"block",children:r.jsx(o.z,{variant:"outline",className:"w-full",children:"取消"})})]})})]}),(0,r.jsxs)(n.Zb,{children:[r.jsx(n.Ol,{children:r.jsx(n.ll,{children:"提示"})}),r.jsx(n.aY,{children:(0,r.jsxs)("div",{className:"text-sm text-gray-600 space-y-2",children:[r.jsx("p",{children:"• 标题名称将自动生成 URL 别名"}),r.jsx("p",{children:"• 封面图片用于列表展示"}),r.jsx("p",{children:"• 预览图片用于首页大图展示"}),r.jsx("p",{children:"• 创建后可以继续添加集数"})]})})]})]})]})})]})}},61351:(e,t,s)=>{"use strict";s.d(t,{Ol:()=>l,SZ:()=>d,Zb:()=>o,aY:()=>c,ll:()=>n});var r=s(95344),a=s(3729),i=s(91626);let o=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));o.displayName="Card";let l=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",e),...t}));l.displayName="CardHeader";let n=a.forwardRef(({className:e,...t},s)=>r.jsx("h3",{ref:s,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));n.displayName="CardTitle";let d=a.forwardRef(({className:e,...t},s)=>r.jsx("p",{ref:s,className:(0,i.cn)("text-sm text-muted-foreground",e),...t}));d.displayName="CardDescription";let c=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,i.cn)("p-6 pt-0",e),...t}));c.displayName="CardContent",a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,i.cn)("flex items-center p-6 pt-0",e),...t})).displayName="CardFooter"},92549:(e,t,s)=>{"use strict";s.d(t,{I:()=>o});var r=s(95344),a=s(3729),i=s(91626);let o=a.forwardRef(({className:e,type:t,...s},a)=>r.jsx("input",{type:t,className:(0,i.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:a,...s}));o.displayName="Input"},93601:(e,t,s)=>{"use strict";s.d(t,{g:()=>o});var r=s(95344),a=s(3729),i=s(91626);let o=a.forwardRef(({className:e,...t},s)=>r.jsx("textarea",{className:(0,i.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:s,...t}));o.displayName="Textarea"},63024:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(69224).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},42739:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(69224).Z)("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},31498:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(69224).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},50652:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>o,__esModule:()=>i,default:()=>d,dynamic:()=>n});var r=s(86843);let a=(0,r.createProxy)(String.raw`/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/titles/create/page.tsx`),{__esModule:i,$$typeof:o}=a,l=a.default,n=(0,r.createProxy)(String.raw`/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/titles/create/page.tsx#dynamic`),d=l},44669:(e,t,s)=>{"use strict";s.d(t,{ZP:()=>T});var r,a=s(3729);let i={data:""},o=e=>e||i,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},p={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},u=(e,t,s,r,a)=>{let i=m(e),o=p[i]||(p[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!p[o]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=l.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);p[o]=c(a?{["@keyframes "+o]:t}:t,s?"":"."+o)}let u=s&&p.g?p.g:null;return s&&(p.g=p[o]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(p[o],t,r,u),o},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return u(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}g.bind({g:1});let f,h,y,b=g.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let l=Object.assign({},i),n=l.className||a.className;s.p=Object.assign({theme:h&&h()},l),s.o=/ *go\d+/.test(n),l.className=g.apply(s,r)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),y&&d[0]&&y(l),f(d,l)}return t?t(a):a}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),N=((()=>{let e;return()=>e})(),"default"),C=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},I=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},Z={},$=(e,t=N)=>{Z[t]=C(Z[t]||P,e),I.forEach(([e,s])=>{e===t&&s(Z[t])})},_=e=>Object.keys(Z).forEach(t=>$(e,t)),S=e=>Object.keys(Z).find(t=>Z[t].toasts.some(t=>t.id===e)),z=(e=N)=>t=>{$(t,e)},q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||k()}),O=e=>(t,s)=>{let r=A(t,e,s);return z(r.toasterId||S(r.id))({type:2,toast:r}),r.id},R=(e,t)=>O("blank")(e,t);R.error=O("error"),R.success=O("success"),R.loading=O("loading"),R.custom=O("custom"),R.dismiss=(e,t)=>{let s={type:3,toastId:e};t?z(t)(s):_(s)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let s={type:4,toastId:e};t?z(t)(s):_(s)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,s)=>{let r=R.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?R.success(a,{id:r,...s,...null==s?void 0:s.success}):R.dismiss(r),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?R.error(a,{id:r,...s,...null==s?void 0:s.error}):R.dismiss(r)}),e};var M=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,E=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=(v("div")`
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
    animation: ${E} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),U=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),H=b`
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
}`,F=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
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
`,b`
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
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,r=a.createElement,c.p=void 0,f=r,h=void 0,y=void 0,g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var T=R}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[1638,312,733,5724,600],()=>s(47689));module.exports=r})();
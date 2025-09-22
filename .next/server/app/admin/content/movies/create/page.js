(()=>{var e={};e.id=6599,e.ids=[6599],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},96498:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=r(50482),a=r(69108),i=r(62563),o=r.n(i),n=r(68300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["admin",{children:["content",{children:["movies",{children:["create",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,6419)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/content/movies/create/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,66294)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,82917)),"/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/content/movies/create/page.tsx"],p="/admin/content/movies/create/page",m={require:r,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/admin/content/movies/create/page",pathname:"/admin/content/movies/create",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},44018:(e,t,r)=>{Promise.resolve().then(r.bind(r,99953))},99953:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,dynamic:()=>g});var s=r(95344),a=r(3729),i=r(22254),o=r(16212),n=r(92549),l=r(61351),d=r(93601),c=r(63024),p=r(42739),m=r(31498),u=r(20783),f=r.n(u),x=r(44669);let g="force-dynamic";function h(){let e=(0,i.useRouter)(),[t,r]=(0,a.useState)(!1),[u,g]=(0,a.useState)([]),[h,y]=(0,a.useState)({name:"",slug:"",synopsis:"",categoryId:"",language:"zh",status:"DRAFT"});(0,a.useEffect)(()=>{b()},[]);let b=async()=>{try{let e=await fetch("/api/categories");if(e.ok){let t=await e.json();g(t)}}catch(e){console.error("Failed to fetch categories:",e)}},v=(e,t)=>{if(y(r=>({...r,[e]:t})),"name"===e&&t){let e=t.toLowerCase().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"");y(t=>({...t,slug:e}))}},j=async t=>{if(t.preventDefault(),!h.name.trim()){x.ZP.error("请填写影片名称");return}if(!h.categoryId){x.ZP.error("请选择分类");return}r(!0);try{let t=await fetch("/api/titles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...h,createdById:"admin-user-id",updatedById:"admin-user-id"})});if(t.ok)x.ZP.success("影片创建成功"),e.push("/admin/content/movies");else{let e=await t.text();x.ZP.error("创建失败: "+e)}}catch(e){x.ZP.error("网络错误")}finally{r(!1)}};return(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[s.jsx(f(),{href:"/admin/content/movies",children:(0,s.jsxs)(o.z,{variant:"outline",size:"sm",children:[s.jsx(c.Z,{className:"h-4 w-4 mr-2"}),"返回影片库"]})}),(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"新建影片"}),s.jsx("p",{className:"text-gray-600",children:"创建新的短剧影片"})]})]}),(0,s.jsxs)(l.Zb,{children:[s.jsx(l.Ol,{children:s.jsx(l.ll,{children:"影片信息"})}),s.jsx(l.aY,{children:(0,s.jsxs)("form",{onSubmit:j,className:"space-y-6",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"影片名称 *"}),s.jsx(n.I,{value:h.name,onChange:e=>v("name",e.target.value),placeholder:"输入影片名称",required:!0})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"URL别名 *"}),s.jsx(n.I,{value:h.slug,onChange:e=>v("slug",e.target.value),placeholder:"自动生成或手动输入",required:!0})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"分类 *"}),(0,s.jsxs)("select",{value:h.categoryId,onChange:e=>v("categoryId",e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0,children:[s.jsx("option",{value:"",children:"请选择分类"}),u.map(e=>s.jsx("option",{value:e.id,children:e.name},e.id))]}),0===u.length&&s.jsx("p",{className:"text-xs text-red-500 mt-1",children:"请先在分类管理中创建分类"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"状态"}),(0,s.jsxs)("select",{value:h.status,onChange:e=>v("status",e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",children:[s.jsx("option",{value:"DRAFT",children:"草稿"}),s.jsx("option",{value:"PUBLISHED",children:"已发布"})]})]})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"剧情简介"}),s.jsx(d.g,{value:h.synopsis,onChange:e=>v("synopsis",e.target.value),placeholder:"输入影片的剧情简介...",rows:4})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsxs)(o.z,{type:"submit",disabled:t,children:[t&&s.jsx(p.Z,{className:"mr-2 h-4 w-4 animate-spin"}),s.jsx(m.Z,{className:"h-4 w-4 mr-2"}),"创建影片"]}),s.jsx(f(),{href:"/admin/content/movies",children:s.jsx(o.z,{variant:"outline",type:"button",children:"取消"})})]})]})})]})]})}},61351:(e,t,r)=>{"use strict";r.d(t,{Ol:()=>n,SZ:()=>d,Zb:()=>o,aY:()=>c,ll:()=>l});var s=r(95344),a=r(3729),i=r(91626);let o=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));o.displayName="Card";let n=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",e),...t}));n.displayName="CardHeader";let l=a.forwardRef(({className:e,...t},r)=>s.jsx("h3",{ref:r,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));l.displayName="CardTitle";let d=a.forwardRef(({className:e,...t},r)=>s.jsx("p",{ref:r,className:(0,i.cn)("text-sm text-muted-foreground",e),...t}));d.displayName="CardDescription";let c=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,i.cn)("p-6 pt-0",e),...t}));c.displayName="CardContent",a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,i.cn)("flex items-center p-6 pt-0",e),...t})).displayName="CardFooter"},92549:(e,t,r)=>{"use strict";r.d(t,{I:()=>o});var s=r(95344),a=r(3729),i=r(91626);let o=a.forwardRef(({className:e,type:t,...r},a)=>s.jsx("input",{type:t,className:(0,i.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:a,...r}));o.displayName="Input"},93601:(e,t,r)=>{"use strict";r.d(t,{g:()=>o});var s=r(95344),a=r(3729),i=r(91626);let o=a.forwardRef(({className:e,...t},r)=>s.jsx("textarea",{className:(0,i.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:r,...t}));o.displayName="Textarea"},63024:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(69224).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},42739:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(69224).Z)("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},31498:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(69224).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},6419:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>i,default:()=>d,dynamic:()=>l});var s=r(86843);let a=(0,s.createProxy)(String.raw`/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/content/movies/create/page.tsx`),{__esModule:i,$$typeof:o}=a,n=a.default,l=(0,s.createProxy)(String.raw`/Users/mayingkun/mkwork/cursorproject/H5/DraminiCMS/app/admin/content/movies/create/page.tsx#dynamic`),d=n},44669:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>T});var s,a=r(3729);let i={data:""},o=e=>e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},p={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},u=(e,t,r,s,a)=>{let i=m(e),o=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[o]){let t=i!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(d," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);p[o]=c(a?{["@keyframes "+o]:t}:t,r?"":"."+o)}let u=r&&p.g?p.g:null;return r&&(p.g=p[o]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[o],t,s,u),o},f=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return u(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,o(t.target),t.g,t.o,t.k)}x.bind({g:1});let g,h,y,b=x.bind({k:1});function v(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:h&&h()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),g(d,n)}return t?t(a):a}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),N=((()=>{let e;return()=>e})(),"default"),P=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return P(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},Z={},_=(e,t=N)=>{Z[t]=P(Z[t]||S,e),C.forEach(([e,r])=>{e===t&&r(Z[t])})},I=e=>Object.keys(Z).forEach(t=>_(e,t)),$=e=>Object.keys(Z).find(t=>Z[t].toasts.some(t=>t.id===e)),A=(e=N)=>t=>{_(t,e)},q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||k()}),D=e=>(t,r)=>{let s=z(t,e,r);return A(s.toasterId||$(s.id))({type:2,toast:s}),s.id},M=(e,t)=>D("blank")(e,t);M.error=D("error"),M.success=D("success"),M.loading=D("loading"),M.custom=D("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?A(t)(r):I(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?A(t)(r):I(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let s=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?M.success(a,{id:s,...r,...null==r?void 0:r.success}):M.dismiss(s),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?M.error(a,{id:s,...r,...null==r?void 0:r.error}):M.dismiss(s)}),e};var R=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,O=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,E=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${O} 0.15s ease-out forwards;
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
    animation: ${H} 0.15s ease-out forwards;
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
`),F=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${E} 1s linear infinite;
`,b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),L=b`
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
}`,U=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${L} 0.2s ease-out forwards;
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
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,s=a.createElement,c.p=void 0,g=s,h=void 0,y=void 0,x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var T=M}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[1638,312,733,5724,600],()=>r(96498));module.exports=s})();
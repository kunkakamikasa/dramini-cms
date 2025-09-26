(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[203],{3067:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(2898).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},8438:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(2898).Z)("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]])},6264:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(2898).Z)("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},6245:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(2898).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},1541:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(2898).Z)("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]])},3451:function(e,t,r){Promise.resolve().then(r.bind(r,8241))},8241:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return y},dynamic:function(){return b}});var a=r(7437),s=r(2265),i=r(4033),n=r(5754),o=r(5179),l=r(7815),d=r(3444),c=r(3067),u=r(8438),m=r(1541),f=r(6264),p=r(6245),x=r(1396),g=r.n(x),h=r(5925);let b="force-dynamic";function y(){let e=(0,i.useRouter)(),[t,r]=(0,s.useState)(!1),[x,b]=(0,s.useState)([]),[y,v]=(0,s.useState)(!1),[j,N]=(0,s.useState)(!1),w=(0,s.useRef)(null),k=(0,s.useRef)(null),[I,C]=(0,s.useState)({name:"",mainTitle:"",subTitle:"",slug:"",synopsis:"",coverImageId:"",bannerUrl:"",categoryId:"",language:"zh",status:"DRAFT",isOnline:!1});(0,s.useEffect)(()=>{Z()},[]);let Z=async()=>{try{let e=await fetch("/api/categories");if(e.ok){let t=await e.json();b(t)}}catch(e){console.error("Failed to fetch categories:",e)}},z=(e,t)=>{if(C(r=>({...r,[e]:t})),"name"===e&&t){let e=t.toLowerCase().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"");C(t=>({...t,slug:e}))}},E=async(e,t)=>{var r;let a=null===(r=e.target.files)||void 0===r?void 0:r[0];if(!a)return;if(!a.type.startsWith("image/")){h.ZP.error("请选择图片文件");return}if(a.size>5242880){h.ZP.error("图片文件不能超过 5MB");return}let s="cover"===t?v:N;s(!0);try{let e=new FormData;e.append("file",a),e.append("type",t);let r=await fetch("/api/upload",{method:"POST",body:e});if(r.ok){let e=await r.json();console.log("Upload result:",e),C(r=>({...r,["cover"===t?"coverImageId":"bannerUrl"]:e.imageUrl})),console.log("Updated formData:",I),h.ZP.success("".concat("cover"===t?"封面图":"轮播图","上传成功"))}else h.ZP.error("图片上传失败")}catch(e){h.ZP.error("上传失败")}finally{s(!1)}},T=async t=>{if(t.preventDefault(),!I.name.trim()){h.ZP.error("请填写影片名称");return}if(!I.mainTitle.trim()){h.ZP.error("请填写主标题");return}if(!I.subTitle.trim()){h.ZP.error("请填写副标题");return}if(!I.coverImageId.trim()){h.ZP.error("请上传9:16封面图");return}if(!I.categoryId){h.ZP.error("请选择分类");return}r(!0);try{let t=await fetch("/api/movie-library",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(I)});if(t.ok)h.ZP.success("影片添加成功"),e.push("/admin/content/movie-library");else{let e=await t.text();h.ZP.error("创建失败: "+e)}}catch(e){h.ZP.error("网络错误")}finally{r(!1)}};return(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsx)(g(),{href:"/admin/content/movie-library",children:(0,a.jsxs)(n.z,{variant:"outline",size:"sm",children:[(0,a.jsx)(c.Z,{className:"h-4 w-4 mr-2"}),"返回影片库"]})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"添加影片"}),(0,a.jsx)("p",{className:"text-gray-600",children:"添加新影片到影片库"})]})]}),(0,a.jsxs)(l.Zb,{children:[(0,a.jsx)(l.Ol,{children:(0,a.jsx)(l.ll,{children:"影片信息"})}),(0,a.jsx)(l.aY,{children:(0,a.jsxs)("form",{onSubmit:T,className:"space-y-6",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["影片名称 * ",(0,a.jsx)("span",{className:"text-red-500",children:"必填"})]}),(0,a.jsx)(o.I,{value:I.name,onChange:e=>z("name",e.target.value),placeholder:"重生之你动我一下试试",required:!0})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"URL别名"}),(0,a.jsx)(o.I,{value:I.slug,onChange:e=>z("slug",e.target.value),placeholder:"自动生成",required:!0})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["主标题 * ",(0,a.jsx)("span",{className:"text-red-500",children:"必填"})]}),(0,a.jsx)(o.I,{value:I.mainTitle,onChange:e=>z("mainTitle",e.target.value),placeholder:"重生之你动我一下试试",required:!0})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["副标题 * ",(0,a.jsx)("span",{className:"text-red-500",children:"必填"})]}),(0,a.jsx)(o.I,{value:I.subTitle,onChange:e=>z("subTitle",e.target.value),placeholder:"重生之你真敢动我?",required:!0})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["分类 * ",(0,a.jsx)("span",{className:"text-red-500",children:"必填"})]}),(0,a.jsxs)("select",{value:I.categoryId,onChange:e=>z("categoryId",e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0,children:[(0,a.jsx)("option",{value:"",children:"请选择分类"}),x.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]}),0===x.length&&(0,a.jsx)("p",{className:"text-xs text-red-500 mt-1",children:"请先在分类管理中创建分类"})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["9:16封面图 * ",(0,a.jsx)("span",{className:"text-red-500",children:"必填"})]}),(0,a.jsxs)("div",{className:"border-2 border-dashed border-gray-300 rounded-lg p-4",children:[I.coverImageId?(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsx)("div",{className:"relative w-32 h-48 bg-gray-100 rounded-lg overflow-hidden mx-auto",children:(0,a.jsx)("img",{src:I.coverImageId,alt:"封面预览",className:"w-full h-full object-cover"})}),(0,a.jsxs)("div",{className:"flex justify-center space-x-2",children:[(0,a.jsx)(n.z,{type:"button",variant:"outline",size:"sm",onClick:()=>{var e;return null===(e=w.current)||void 0===e?void 0:e.click()},disabled:y,children:"重新选择"}),(0,a.jsx)(n.z,{type:"button",variant:"outline",size:"sm",onClick:()=>C(e=>({...e,coverImageId:""})),children:"删除"})]})]}):(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)(u.Z,{className:"h-12 w-12 text-gray-400 mx-auto mb-4"}),(0,a.jsxs)(n.z,{type:"button",onClick:()=>{var e;return null===(e=w.current)||void 0===e?void 0:e.click()},disabled:y,children:[(0,a.jsx)(m.Z,{className:"h-4 w-4 mr-2"}),y?"上传中...":"选择封面图"]}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-2",children:"9:16比例，推荐540x960像素"})]}),(0,a.jsx)("input",{ref:w,type:"file",accept:"image/*",onChange:e=>E(e,"cover"),className:"hidden"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"16:9轮播图 (可选)"}),(0,a.jsxs)("div",{className:"border-2 border-dashed border-gray-300 rounded-lg p-4",children:[I.bannerUrl?(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsx)("div",{className:"relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden",children:(0,a.jsx)("img",{src:I.bannerUrl,alt:"轮播图预览",className:"w-full h-full object-cover"})}),(0,a.jsxs)("div",{className:"flex justify-center space-x-2",children:[(0,a.jsx)(n.z,{type:"button",variant:"outline",size:"sm",onClick:()=>{var e;return null===(e=k.current)||void 0===e?void 0:e.click()},disabled:j,children:"重新选择"}),(0,a.jsx)(n.z,{type:"button",variant:"outline",size:"sm",onClick:()=>C(e=>({...e,bannerUrl:""})),children:"删除"})]})]}):(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)(u.Z,{className:"h-12 w-12 text-gray-400 mx-auto mb-4"}),(0,a.jsxs)(n.z,{type:"button",variant:"outline",onClick:()=>{var e;return null===(e=k.current)||void 0===e?void 0:e.click()},disabled:j,children:[(0,a.jsx)(m.Z,{className:"h-4 w-4 mr-2"}),j?"上传中...":"选择轮播图"]}),(0,a.jsxs)("p",{className:"text-xs text-gray-500 mt-2",children:["16:9比例，推荐1920x1080像素",(0,a.jsx)("br",{}),"只有上传了轮播图的影片才能设置为轮播图"]})]}),(0,a.jsx)("input",{ref:k,type:"file",accept:"image/*",onChange:e=>E(e,"banner"),className:"hidden"})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"剧情简介"}),(0,a.jsx)(d.g,{value:I.synopsis,onChange:e=>z("synopsis",e.target.value),placeholder:"输入影片的剧情简介...",rows:4})]}),(0,a.jsxs)("div",{className:"bg-gray-50 p-4 rounded-lg",children:[(0,a.jsx)("h4",{className:"text-sm font-medium text-gray-700 mb-2",children:"表单完成状态:"}),(0,a.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-2 text-xs",children:[(0,a.jsxs)("div",{className:I.name.trim()?"text-green-600":"text-red-600",children:["影片名称: ",I.name.trim()?"✅":"❌"]}),(0,a.jsxs)("div",{className:I.mainTitle.trim()?"text-green-600":"text-red-600",children:["主标题: ",I.mainTitle.trim()?"✅":"❌"]}),(0,a.jsxs)("div",{className:I.subTitle.trim()?"text-green-600":"text-red-600",children:["副标题: ",I.subTitle.trim()?"✅":"❌"]}),(0,a.jsxs)("div",{className:I.coverImageId.trim()?"text-green-600":"text-red-600",children:["封面图: ",I.coverImageId.trim()?"✅":"❌"]}),(0,a.jsxs)("div",{className:I.categoryId?"text-green-600":"text-red-600",children:["分类: ",I.categoryId?"✅":"❌"]}),(0,a.jsxs)("div",{className:I.bannerUrl.trim()?"text-blue-600":"text-gray-500",children:["轮播图: ",I.bannerUrl.trim()?"✅ 可用于轮播":"无 (可选)"]})]})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsxs)(n.z,{type:"submit",disabled:t||!I.name.trim()||!I.mainTitle.trim()||!I.subTitle.trim()||!I.coverImageId.trim()||!I.categoryId,children:[t&&(0,a.jsx)(f.Z,{className:"mr-2 h-4 w-4 animate-spin"}),(0,a.jsx)(p.Z,{className:"h-4 w-4 mr-2"}),"添加到影片库"]}),(0,a.jsx)(g(),{href:"/admin/content/movie-library",children:(0,a.jsx)(n.z,{variant:"outline",type:"button",children:"取消"})})]})]})})]})]})}},5754:function(e,t,r){"use strict";r.d(t,{z:function(){return d}});var a=r(7437),s=r(2265),i=r(7256),n=r(6061),o=r(1657);let l=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=s.forwardRef((e,t)=>{let{className:r,variant:s,size:n,asChild:d=!1,...c}=e,u=d?i.g7:"button";return(0,a.jsx)(u,{className:(0,o.cn)(l({variant:s,size:n,className:r})),ref:t,...c})});d.displayName="Button"},7815:function(e,t,r){"use strict";r.d(t,{Ol:function(){return o},SZ:function(){return d},Zb:function(){return n},aY:function(){return c},ll:function(){return l}});var a=r(7437),s=r(2265),i=r(1657);let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...s})});n.displayName="Card";let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",r),...s})});o.displayName="CardHeader";let l=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("h3",{ref:t,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",r),...s})});l.displayName="CardTitle";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("p",{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",r),...s})});d.displayName="CardDescription";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("p-6 pt-0",r),...s})});c.displayName="CardContent",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("flex items-center p-6 pt-0",r),...s})}).displayName="CardFooter"},5179:function(e,t,r){"use strict";r.d(t,{I:function(){return n}});var a=r(7437),s=r(2265),i=r(1657);let n=s.forwardRef((e,t)=>{let{className:r,type:s,...n}=e;return(0,a.jsx)("input",{type:s,className:(0,i.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...n})});n.displayName="Input"},3444:function(e,t,r){"use strict";r.d(t,{g:function(){return n}});var a=r(7437),s=r(2265),i=r(1657);let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("textarea",{className:(0,i.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...s})});n.displayName="Textarea"},1657:function(e,t,r){"use strict";r.d(t,{cn:function(){return i}});var a=r(7042),s=r(4769);function i(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,a.W)(t))}},4033:function(e,t,r){e.exports=r(5313)},5925:function(e,t,r){"use strict";let a,s;r.d(t,{x7:function(){return em},ZP:function(){return ef}});var i,n=r(2265);let o={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},f={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},x=(e,t,r,a,s)=>{var i;let n=p(e),o=f[n]||(f[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!f[o]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);f[o]=m(s?{["@keyframes "+o]:t}:t,r?"":"."+o)}let l=r&&f.g?f.g:null;return r&&(f.g=f[o]),i=f[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),o},g=(e,t,r)=>e.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let b,y,v,j=h.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:y&&y()},o),r.o=/ *go\d+/.test(l),o.className=h.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),b(d,o)}return t?t(s):s}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,I=(a=0,()=>(++a).toString()),C=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},Z="default",z=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return z(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},O=(e,t=Z)=>{P[t]=z(P[t]||T,e),E.forEach(([e,r])=>{e===t&&r(P[t])})},$=e=>Object.keys(P).forEach(t=>O(e,t)),D=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),R=(e=Z)=>t=>{O(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=(e={},t=Z)=>{let[r,a]=(0,n.useState)(P[t]||T),s=(0,n.useRef)(P[t]);(0,n.useEffect)(()=>(s.current!==P[t]&&a(P[t]),E.push([t,a]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:i}},U=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||I()}),L=e=>(t,r)=>{let a=U(t,e,r);return R(a.toasterId||D(a.id))({type:2,toast:a}),a.id},M=(e,t)=>L("blank")(e,t);M.error=L("error"),M.success=L("success"),M.loading=L("loading"),M.custom=L("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?R(t)(r):$(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?R(t)(r):$(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let a=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?M.success(s,{id:a,...r,...null==r?void 0:r.success}):M.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?M.error(s,{id:a,...r,...null==r?void 0:r.error}):M.dismiss(a)}),e};var _=1e3,F=(e,t="default")=>{let{toasts:r,pausedAt:a}=A(e,t),s=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=_)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),o({type:4,toastId:e})},t);s.set(e,r)},[]);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&M.dismiss(r.id);return}return setTimeout(()=>M.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,n.useCallback)(R(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
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
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,V=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${V} 1s linear infinite;
`,J=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=j`
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
}`,K=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
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
`,Q=N("div")`
  position: absolute;
`,X=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===r?null:n.createElement(X,null,n.createElement(W,{...a}),"loading"!==r&&n.createElement(Q,null,"error"===r?n.createElement(Y,{...a}):n.createElement(K,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=N("div")`
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
`,en=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),es(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(er,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,m.p=void 0,b=i,y=void 0,v=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=F(r,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let i=r.position||t,o=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:o},"custom"===r.type?k(r.message,r):s?s(r):n.createElement(el,{toast:r,position:i}))}))},ef=M}},function(e){e.O(0,[61,448,971,938,744],function(){return e(e.s=3451)}),_N_E=e.O()}]);
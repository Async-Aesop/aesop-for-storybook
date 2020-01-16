module.exports=function(n){var t={};function e(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return n[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(o,i,function(t){return n[t]}.bind(null,i));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=2)}([function(n,t){n.exports=require("child_process")},function(n,t){n.exports=require("os")},function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=e(3),i=e(4),r=e(5),s=e(6),d=e(7),a=e(0),u=e(13),l=e(1);t.activate=function(n){let t;const e=new u.EventEmitter,c=l.platform(),p={linux:{cmd:"netstat",args:["-apntu"]},darwin:{cmd:"netstat",args:["-v","-n","-p","tcp"]},win32:{cmd:"netstat.exe",args:["-a","-n","-o"]}}[c];o.commands.executeCommand("setContext","aesop-awake",!0);const f=o.window.createStatusBarItem(o.StatusBarAlignment.Left,7);f.text="Aesop is finding your Storybook dependency...",f.color="#FFFFFF",f.command=void 0,f.tooltip="Aesop status";let g=o.commands.registerCommand("extension.aesopAwaken",()=>{const u=o.window.createOutputChannel("something");u.appendLine("testing"),f.show();let g=!1;const m=i.fileURLToPath(o.workspace.workspaceFolders[0].uri.toString(!0));s.access(r.join(m,"/node_modules/@storybook"),n=>{if(n)throw o.window.showErrorMessage(`Aesop could not find Storybook as a dependency in the active folder, ${m}`),new Error("Error finding a storybook project");f.text="Aesop found a Storybook project.",d.lookup({command:"node",psargs:"ux"},(n,i)=>{if(n)throw o.window.showErrorMessage(`Failed looking for running Node processes. Error: ${n}`),f.dispose(),new Error("Failed looking for running Node processes.");f.text="Reviewing Node processes...",i.forEach(n=>{if(n.arguments[0].includes("node_modules")&&n.arguments[0].includes("storybook")){u.append(`process.arguments: ${n.arguments[0]}`);const i=n.arguments.indexOf("-p"),r=parseInt(n.pid).toString();if(-1!==i)t=parseInt(n.arguments[i+1]),e.emit("sb_on");else{u.appendLine("hit inside netstat stuff");const n=a.spawn(p.cmd,p.args),i=a.spawn("grep",[r]);n.stdout.pipe(i.stdin),i.stdout.setEncoding("utf8"),i.stdout.on("data",n=>{const o=n.split(/\s/).filter(String),i="win32"===c?1:3;console.log(o),t=parseInt(o[i].replace(/[^0-9]/g,"")),e.emit("sb_on")}),n.stdout.on("exit",n=>{o.window.showInformationMessage(`Netstat ended with ${n}`)}),i.stdout.on("exit",n=>{o.window.showInformationMessage(`Grep ended with ${n}`)})}g=!0,f.text="Retrieving running Storybook process..."}}),!1===g&&s.readFile(r.join(m,"package.json"),(n,i)=>{if(n)o.window.showErrorMessage(`Aesop is attempting to read ${m}. Is there a package.json file here?`),f.dispose();else{f.text="Checking package.json...";let n=JSON.parse(i.toString()).scripts.storybook.split(" "),o=l.platform();const r="./node_modules/.bin/start-storybook",s=n.indexOf("start-storybook");let d;n[s]=r,n.push("--ci"),d="win32"===o?a.spawn("npm.cmd",["run","storybook"],{cwd:m,detached:!1,env:process.env,windowsHide:!1,windowsVerbatimArguments:!0}):a.spawn("node",n,{cwd:m,detached:!1,env:process.env}),f.text="Done looking. Aesop will now launch Storybook in the background.",d.stdout.setEncoding("utf8");let c=0;d.stdout.on("data",n=>{let o=n.toString().split(" ");if(c+=1,c>=2){u.append(`IF COUNTER HIT, ${c}`);for(let n=165;n<o.length;n+=1)if(o[n].includes("localhost")){const i=o[n],r=/[^0-9]/g;t=i.replace(r,""),e.emit("sb_on");break}}}),d.on("error",n=>{console.log(n),process.exit(1)}),d.on("close",n=>{console.log(`child process exited with code ${n}`)})}})})}),e.on("sb_on",()=>{!function(t,e){f.hide(),o.window.showInformationMessage("Welcome to Aesop Storybook"),o.window.createWebviewPanel("aesop-sb","Aesop",o.ViewColumn.Beside,{enableCommandUris:!0,enableScripts:!0,portMapping:[{webviewPort:t,extensionHostPort:t}],localResourceRoots:[o.Uri.file(n.extensionPath)]}).webview.html=`\n\t\t\t<!DOCTYPE html>\n\t\t\t<html lang="en">\n\t\t\t\t<head>\n\t\t\t\t\t<meta charset="UTF-8">\n\t\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t\t\t\t<title>Aesop</title>\n\t\t\t\t\t<style>\n\t\t\t\t\t\thtml { width: 100%; height: 100%; min-width: 20%; min-height: 20%;}\n\t\t\t\t\t\tbody { display: flex; flex-flow: column nowrap; padding: 0; margin: 0; width: 100%' justify-content: center}\n\t\t\t\t\t</style>\n\t\t\t\t</head>\n\t\t\t\t<body>\n\t\t\t\t\t<iframe src="http://${e}:${t}" width="100%" height="600"></iframe>\n\t\t\t\t</body>\n\t\t\t</html>`}(t,"localhost")})});n.subscriptions.push(g)},t.deactivate=function(){}},function(n,t){n.exports=require("vscode")},function(n,t){n.exports=require("url")},function(n,t){n.exports=require("path")},function(n,t){n.exports=require("fs")},function(n,t,e){n.exports=e(8)},function(n,t,e){var o=e(0),i="win32"===process.platform,r=e(9),s=/(\r\n)|(\n\r)|\n|\r/,d=e(1).EOL,a=n.exports=t=function(n,t){var e=o.spawn;if(i){var r=e("cmd"),a="",u=null;r.stdout.on("data",(function(n){a+=n.toString()})),r.stderr.on("data",(function(n){null===u?u=n.toString():u+=n.toString()})),r.on("exit",(function(){var n;(a=a.split(s)).forEach((function(t,e){t&&void 0===n&&0===t.indexOf("CommandLine")&&(n=e)})),a.splice(a.length-1,1),a.splice(0,n),t(u,a.join(d)||!1)})),r.stdin.write("wmic process get ProcessId,ParentProcessId,CommandLine \n"),r.stdin.end()}else{"string"==typeof n&&(n=n.split(/\s+/));const o=e("ps",n);a="",u=null;o.stdout.on("data",(function(n){a+=n.toString()})),o.stderr.on("data",(function(n){null===u?u=n.toString():u+=n.toString()})),o.on("exit",(function(){if(u)return t(u.toString());t(null,a||!1)}))}};t.lookup=function(n,t){var e,o=n.psargs||["lx"],i={};return n.pid&&(e=(e=Array.isArray(n.pid)?n.pid:[n.pid]).map((function(n){return String(n)}))),n.command&&(i.command=new RegExp(n.command,"i")),n.arguments&&(i.arguments=new RegExp(n.arguments,"i")),n.ppid&&(i.ppid=new RegExp(n.ppid)),a(o,(function(n,o){if(n)return t(n);var s=function(n){if(!n)return[];return t=r.parse(n),e=[],t.forEach((function(n){var t=n.PID&&n.PID[0]||n.ProcessId&&n.ProcessId[0]||void 0,o=n.CMD||n.CommandLine||n.COMMAND||void 0,i=n.PPID&&n.PPID[0]||n.ParentProcessId&&n.ParentProcessId[0]||void 0;if(t&&o){var r=o[0],s="";o.length>1&&(s=o.slice(1)),e.push({pid:t,command:r,arguments:s,ppid:i})}})),e;var t,e}(o),d=[];s.forEach((function(n){var t,o=!0;if(!(e&&e.indexOf(String(n.pid))<0)){for(t in i)o=!!i[t].test(n[t])&&o;o&&d.push(n)}})),t(null,d)}))},t.kill=function(n,e,o){2==arguments.length&&"function"==typeof e&&(o=e,e=void 0);var i=e&&e.timeout||30;"object"==typeof e&&(e=e.signal);try{process.kill(n,e)}catch(n){return o&&o(n)}var r=0,s=null,d=!1;function a(e){t.lookup({pid:n},(function(n,t){d||(n?(clearTimeout(s),e&&e(n)):t.length>0?(r=r-1||0,a(e)):5===++r?(clearTimeout(s),e&&e()):a(e))}))}o&&a(o),s=o&&setTimeout((function(){d=!0,o(new Error("Kill process timeout"))}),1e3*i)}},function(n,t,e){n.exports=e(10)},function(n,t,e){var o=e(11),i=/\s/;function r(n,t,e,o){return n>e&&n<o||t>e&&t<o||n<=e&&t>=o}function s(n){var t=n.match(/"/g);if(t&&1!=t.length){var e=[],o=null,i=!1,r=!1,s=0,d=t.length%2==0?t.length:t.length-1,a=null,u=n.split("");return u.forEach((function(n,t){" "!==n?'"'===n?!1===i&&s<=d?(i=!0,s++," "===a||null===a?(r=!0,o=""):o+=n):!0===i&&(i=!1,s++,!0===r?(r=!1,e.push(o),o=null):o+=n):!1!==i||" "!==a&&null!==a?o+=n:o=n:i?o+=n:null!==o&&(e.push(o),o=null),a=n,t==u.length-1&&null!==o&&(e.push(o),o=null)})),e}return n.split(/\s+/)}n.exports.parse=function(n){var t=n.split(/(\r\n)|(\n\r)|\n|\r/),e=[],d={},a=[];t.forEach((function(n){n&&n.trim()&&e.push(n)})),e.forEach((function(n,t){if(0==t){var e=n.split(/\s+/);e.forEach((function(t,o){if(t){var i=d[t]={},r=n.indexOf(t),s=r+t.length;i.titleBegin=0==o?0:r,o==e.length-1?i.titleEnd=n.length-1:i.titleEnd=s}}))}else a[t-1]=n.split("")}));var u=o(a,(function(n){return i.test(n)?-1:1}),!0),l=[];u.domains.sort((function(n,t){return n.bounding.x-t.bounding.x})),u.domains.forEach((function(n){if(1===n.identifier){var t=!1;l.forEach((function(e){var o=n.bounding,i=o.x,s=o.x+o.w;r(i,s,e.begin,e.end)&&(t=!0,e.domains.push(n),e.begin=e.begin>i?i:e.begin,e.end=e.end<s?s:e.end)})),t||l.push({begin:n.bounding.x,end:n.bounding.x+n.bounding.w,domains:[n]})}})),l.forEach((function(n){var t=null,e=null,o=!1,i=null,s=null,a=null;for(t in d)e=d[t],n.begin>e.titleBegin&&(a=n.begin-e.titleBegin,(!s||a<i)&&(s=t,i=a)),r(n.begin,n.end,e.titleBegin,e.titleEnd)&&(o=!0,e.titleBegin=e.titleBegin>n.begin?n.begin:e.titleBegin,e.titleEnd=e.titleEnd<n.end?n.end:e.titleEnd);if(!o&&s){var u=d[s];u.titleBegin=u.titleBegin>n.begin?n.begin:u.titleBegin,u.titleEnd=u.titleEnd<n.end?n.end:u.titleEnd}}));var c=[];return e.forEach((function(n,t){if(t>0){var e={},o=null,i=null,r=null;for(o in d)i=d[o],r=n.substring(i.titleBegin,i.titleEnd+1),e[o]=s(r.trim());c.push(e)}})),c}},function(n,t,e){n.exports=e(12)},function(n,t){n.exports=function(n,t,e){if(e=e||!1,!n)throw new Error("tdArray must be provided");if(!t)throw new Error("indicator must be provided");n=JSON.parse(JSON.stringify(n));var o={},i=0,r={};n.forEach((function(i,s){i.forEach((function(d,a){var u=t(d,a,s),l=[];if(n[s-1]&&void 0!==n[s-1][a]&&l.push(r[a+"_"+(s-1)]),void 0!==i[a-1]&&l.push(r[a-1+"_"+s]),e||(n[s-1]&&void 0!==n[s-1][a-1]&&l.push(r[a-1+"_"+(s-1)]),n[s-1]&&void 0!==n[s-1][a+1]&&l.push(r[a+1+"_"+(s-1)])),l.length){var p=!1;l.forEach((function(n){if(n.identifier==u)if(p){var t=r[a+"_"+s];n.domainId!=t.domainId&&(e=n.domainId,i=t.domainId,l=o[e],c=o[i],l.identifier==c.identifier&&(c.domainId=l.domainId,c.points.forEach((function(n){n.domainId=l.domainId,r[n.x+"_"+n.y].domainId=l.domainId})),l.points=l.points.concat(c.points),delete o[i]))}else!function(n,t,e,i){var s=o[i],d={value:n,x:t,y:e,identifier:s.identifier,domainId:i};r[t+"_"+e]={value:n,identifier:s.identifier,domainId:i},s.points.push(d)}(d,a,s,n.domainId),p=!0;var e,i,l,c})),p||c(d,a,s,u)}else c(d,a,s,u)}))}));var s={domains:[],totalDomains:0,groupByIdentifier:{},totalIdentifiers:0},d=null,a=null,u=null;for(d in o)(u=o[d]).bounding=l(u.points),a=u.identifier,s.domains.push(u),s.totalDomains++,a in s.groupByIdentifier||(s.groupByIdentifier[a]=[],s.totalIdentifiers++),s.groupByIdentifier[a].push(u);function l(n){var t=null,e=null,o=null,i=null;return n.forEach((function(n){(null===t||n.x<t)&&(t=n.x),(null===e||n.y<e)&&(e=n.y),(null===o||n.x>o)&&(o=n.x),(null===i||n.y>i)&&(i=n.y)})),{x:t,y:e,w:o-t,h:i-e}}function c(n,t,e,s){var d={identifier:s,domainId:++i,bounding:{},points:[]},a={value:n,x:t,y:e,identifier:s,domainId:d.domainId};r[t+"_"+e]={value:n,identifier:s,domainId:d.domainId},d.points.push(a),o[d.domainId]=d}return s}},function(n,t){n.exports=require("events")}]);
//# sourceMappingURL=extension.js.map
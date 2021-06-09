!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var i=n();for(var t in i)("object"==typeof exports?exports:e)[t]=i[t]}}("undefined"!=typeof self?self:this,function(){return function(e){var n={};function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=n,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i(i.s=5)}([function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sendLog=function(e,n,i){try{if("true"===new URLSearchParams(window.location.search).get("debug")){var r=(0,t.default)("arcads.js");r({service:"ArcAds",timestamp:""+new Date,"logging from":e,description:n,slotName:i})}}catch(e){console.error(e)}};var t=function(e){return e&&e.__esModule?e:{default:e}}(i(2));i(7)},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.initializeGPT=function(){window.googletag=window.googletag||{},window.googletag.cmd=window.googletag.cmd||[],(0,t.appendResource)("script","//securepubads.g.doubleclick.net/tag/js/gpt.js",!0,!0),(0,o.sendLog)("initializeGPT()","Appended googletag script to the head tag of the page.",null)},n.refreshSlot=function(e){var n=e.ad,i=e.correlator,t=void 0!==i&&i,r=e.prerender,o=void 0===r?null:r,a=e.info,d=void 0===a?{}:a;new Promise(function(e){if(o)try{o(d).then(function(){e("Prerender function has completed.")})}catch(n){console.warn("ArcAds: Prerender function did not return a promise or there was an error.\n          Documentation: https://github.com/washingtonpost/arcads/wiki/Utilizing-a-Prerender-Hook"),e("Prerender function did not return a promise or there was an error, ignoring.")}else e("No Prerender function was provided.")}).then(function(){!function e(){if(window.blockArcAdsLoad)return"blockArcAdsLoad";window.googletag&&googletag.pubadsReady?window.googletag.pubads().refresh([n],{changeCorrelator:t}):setTimeout(function(){e()},200)}()})},n.queueGoogletagCommand=function(e){window.googletag.cmd.push(e)},n.setTargeting=function(e,n){for(var i in n)n.hasOwnProperty(i)&&n[i]&&e.setTargeting(i,n[i])},n.dfpSettings=function(e){window.googletag.pubads().disableInitialLoad(),window.googletag.pubads().enableSingleRequest(),window.googletag.pubads().enableAsyncRendering(),this.collapseEmptyDivs&&((0,o.sendLog)("dfpSettings()","This wrapper is set to collapse any empty divs.",null),window.googletag.pubads().collapseEmptyDivs());window.googletag.enableServices(),e&&((0,o.sendLog)("dfpSettings()","This wrapper has a function to call upon the slot render ending.",null),window.googletag.pubads().addEventListener("slotRenderEnded",e))},n.determineSlotName=function(e,n){var i=(0,r.expandQueryString)("adslot");if(i&&(""!==i||null!==i))return"/"+e+"/"+i;return"/"+e+"/"+n};var t=i(8),r=i(9),o=i(0)},function(e,n){var i=Object.create(null),t=function(e,n){return e?i[e]||(i[e]=t.ext(t.new(e,n))):i};t.levels={error:1,warn:2,info:3,log:4,debug:5,trace:6},t.new=function(e,n){var i={};i[e]=function(){t.log(e,[].slice.call(arguments))};try{Object.defineProperty(i[e],"name",{get:function(){return e}})}catch(e){}return i[e]},t.log=function(e,n){var r=n.length>1&&t.levels[n[0]]?n.shift():"log";i[e][r].apply(i[e],n)},t.ext=function(e){for(var n in e.enabledFor=function(){},t.levels)e[n]=function(){};return e},e.exports=t},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.initializeBiddingServices=d,n.fetchBids=function(e){var n=this,i=e.ad,a=e.id,s=e.slotName,l=e.dimensions,u=e.wrapper,c=e.bidding,p=e.correlator,g=void 0!==p&&p,f=e.prerender,h=e.breakpoints,b={adUnit:i,adSlot:s,adDimensions:l,adId:a,bids:c},v=new Promise(function(e){if(u.prebid&&u.prebid.enabled){var r=u.prebid.timeout||700;t.queuePrebidCommand.bind(n,(0,t.fetchPrebidBids)(i,u.prebid.useSlotForAdUnit?s:a,r,b,f,function(){e("Fetched Prebid ads!")}))}else e("Prebid is not enabled on the wrapper...")}),w=new Promise(function(e){u.amazon&&u.amazon.enabled?(0,r.fetchAmazonBids)(a,s,l,h,function(){e("Fetched Amazon ads!")}):e("Amazon is not enabled on the wrapper...")});window.arcBiddingReady?Promise.all([v,w]).then(function(){(0,o.refreshSlot)({ad:i,correlator:g,prerender:f,info:b})}):setTimeout(function(){return d()},200)};var t=i(4),r=i(10),o=i(1),a=i(0);function d(e){var n=e.prebid,i=void 0!==n&&n,t=e.amazon,o=void 0!==t&&t;if(window.arcBiddingReady)(0,a.sendLog)("initializeBiddingServices()","Header bidding has been previously initialized",null);else{window.arcBiddingReady=!1;var d=new Promise(function(e){if(i&&i.enabled){if("undefined"==typeof pbjs){var n=n||{};n.que=n.que||[]}e("Prebid has been initialized")}else(0,a.sendLog)("initializeBiddingServices()","Prebid is not enabled on this wrapper.",null),e("Prebid is not enabled on the wrapper...")}),s=new Promise(function(e){o&&o.enabled&&window.apstag?o.id&&""!==o.id?(0,r.queueAmazonCommand)(function(){window.apstag.init({pubID:o.id,adServer:"googletag"}),e("Amazon scripts have been added onto the page!")}):(console.warn("ArcAds: Missing Amazon account id. \n          Documentation: https://github.com/washingtonpost/arcads#amazon-tama9"),(0,a.sendLog)("initializeBiddingServices()","Amazon is not enabled on this wrapper.",null),e("Amazon is not enabled on the wrapper...")):e("Amazon is not enabled on the wrapper...")});Promise.all([d,s]).then(function(){window.arcBiddingReady=!0})}}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e};n.queuePrebidCommand=function(e){pbjs.que.push(e)},n.fetchPrebidBidsArray=o,n.fetchPrebidBids=function(e,n,i,t,r){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,d=t;d.bids=Array.isArray(t.bids)?t.bids:[t.bids],o(e,[n],i,d,r,a)},n.addUnit=function(e,n,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=t({code:e,bids:i},o);a.mediaTypes={banner:{sizes:n}};var d=r.sizeConfig,s=r.config;if(pbjs.addAdUnits(a),s)return void pbjs.setConfig(s);d&&pbjs.setConfig({sizeConfig:d})};var r=i(1);function o(e,n,i,t,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;pbjs.addAdUnits(t),window.blockArcAdsPrebid||pbjs.requestBids({timeout:i,adUnitCodes:n,bidsBackHandler:function(i){console.log("Bid Back Handler",i),pbjs.setTargetingForGPTAsync(n),a?a():(0,r.refreshSlot)({ad:e,info:t,prerender:o})}})}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.ArcAds=void 0;var t=function(){function e(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,i,t){return i&&e(n.prototype,i),t&&e(n,t),n}}(),r=i(6),o=i(0),a=i(3),d=i(1),s=i(4),l=i(11);function u(e){if(Array.isArray(e)){for(var n=0,i=Array(e.length);n<e.length;n++)i[n]=e[n];return i}return Array.from(e)}n.ArcAds=function(){function e(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.dfpId=n.dfp.id||"",this.wrapper=n.bidding||{},this.positions=[],this.collapseEmptyDivs=n.dfp.collapseEmptyDivs,this.adsList=[],window.isMobile=r.MobileDetection,""===this.dfpId?(console.warn("ArcAds: DFP id is missing from the arcads initialization script.","\n","Documentation: https://github.com/washingtonpost/arcads#getting-started"),(0,o.sendLog)("constructor()","The DFP id missing from the arcads initialization script. ArcAds cannot proceed.",null)):((0,d.initializeGPT)(),(0,d.queueGoogletagCommand)(d.dfpSettings.bind(this,i)),(0,a.initializeBiddingServices)(this.wrapper))}return t(e,[{key:"registerAd",value:function(e){var n=e.id,i=e.slotName,t=e.dimensions,r=e.adType,a=void 0!==r&&r,l=e.targeting,c=void 0===l?{}:l,p=e.display,g=void 0===p?"all":p,f=e.bidding,h=void 0!==f&&f,b=e.iframeBidders,v=void 0===b?["openx"]:b,w=e.others,m=void 0===w?{}:w,y=[],A=!1,k=function e(n){return Array.isArray(n)?1+Math.max.apply(Math,u(n.map(function(n){return e(n)}))):0}(t);t&&void 0!==t&&1===k?y.push.apply(y,u(t)):t&&void 0!==t&&t.length>0&&2===k?y.push.apply(y,u(t)):t&&t.forEach(function(e){y.push.apply(y,u(e))});try{if(!(c&&c.hasOwnProperty("position")||!1===a)){var P=this.positions[a]+1||1;this.positions[a]=P;var z=Object.assign(c,{position:P});Object.assign(e,{targeting:z})}var S=h.prebid&&(h.prebid.enabled&&h.prebid.bids||void 0===h.prebid.enabled&&h.prebid.bids);if(isMobile.any()&&"mobile"===g||!isMobile.any()&&"desktop"===g||"all"===g){if(S&&this.wrapper.prebid&&this.wrapper.prebid.enabled&&y){pbjs&&v.length>0&&pbjs.setConfig({userSync:{iframeEnabled:!0,filterSettings:{iframe:{bidders:v,filter:"include"}}}});var L=this.wrapper.prebid.useSlotForAdUnit?(0,d.determineSlotName)(this.dfpId,i):n;s.queuePrebidCommand.bind(this,(0,s.addUnit)(L,y,h.prebid.bids,this.wrapper.prebid,m))}(A=this.displayAd.bind(this,e))&&((0,o.sendLog)("registerAd()","Queuing Google Tag command for ad",i),(0,d.queueGoogletagCommand)(A))}}catch(e){console.error("ads error",e)}}},{key:"registerAdCollection",value:function(e){var n=this;e.forEach(function(e){n.registerAd(e)})}},{key:"registerAdCollectionSingleCall",value:function(e){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:700;(0,o.sendLog)("registerAdCollectionSingleCall()","Registering all reserved ads",null),window.blockArcAdsLoad=!0,window.blockArcAdsPrebid=!0,e.forEach(function(e){n.registerAd(e)}),window.blockArcAdsLoad=!1,window.blockArcAdsPrebid=!1,pbjs.requestBids({timeout:i,bidsBackHandler:function(e){console.log("Bid Back Handler",e),pbjs.setTargetingForGPTAsync(),window.googletag.pubads().refresh(window.adsList),window.adsList=[]}})}},{key:"displayAd",value:function(e){var n=e.id,i=e.slotName,t=e.dimensions,r=e.targeting,s=e.sizemap,u=void 0!==s&&s,c=e.bidding,p=void 0!==c&&c,g=e.prerender,f=void 0===g?null:g,h=(0,d.determineSlotName)(this.dfpId,i),b=t&&!t.length?null:t,v=t?window.googletag.defineSlot(h,b,n):window.googletag.defineOutOfPageSlot(h,n);if(u&&u.breakpoints&&t){var w=(0,l.prepareSizeMaps)(b,u.breakpoints),m=w.mapping,y=w.breakpoints,A=w.correlators;if(!v)return(0,o.sendLog)("displayAd()","No ad available to display - the div was either not defined or an ad with the same slot name already exists on the page",i),!1;v.defineSizeMapping(m),u.refresh&&((0,o.sendLog)("displayAd()","Attaching resize listener to the ad with this slot name and sizemap defined",i),(0,l.setResizeListener)({ad:v,slotName:h,breakpoints:y,id:n,mapping:m,correlators:A,bidding:p,wrapper:this.wrapper,prerender:f}))}v&&(v.addService(window.googletag.pubads()),(0,d.setTargeting)(v,r));var k=u&&u.breakpoints?u.breakpoints:[];window.adsList&&v&&adsList.push(v),t&&p&&(p.amazon&&p.amazon.enabled||p.prebid&&p.prebid.enabled)?((0,o.sendLog)("displayAd()","Fetching bids for ad with this slot name",i),(0,a.fetchBids)({ad:v,id:n,slotName:h,dimensions:b,wrapper:this.wrapper,prerender:f,bidding:p,breakpoints:k})):window.blockArcAdsPrebid||((0,o.sendLog)("displayAd()","Refreshing ad with this slot name",i),(0,d.refreshSlot)({ad:v,prerender:f,info:{adUnit:v,adSlot:h,adDimensions:b,adId:n}}))}},{key:"sendSingleCallAds",value:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:700;if(this.adsList&&this.adsList.length<1)return(0,o.sendLog)("sendSingleCallAds()","No ads have been reserved on the page",null),!1;window&&window.googletag&&googletag.pubadsReady?(window.googletag.pubads().disableInitialLoad(),window.googletag.pubads().enableSingleRequest(),window.googletag.pubads().enableAsyncRendering(),this.registerAdCollectionSingleCall(this.adsList,n)):setTimeout(function(){e.sendSingleCallAds()},2e3)}},{key:"reserveAd",value:function(n){e.setAdsBlockGate(),this.adsList.push(n)}},{key:"setPageLeveTargeting",value:function(e,n){googletag.pubads().setTargeting(e,n)}}],[{key:"setAdsBlockGate",value:function(){var n=e.getWindow();void 0!==n&&(n.blockArcAdsLoad=!0)}},{key:"releaseAdsBlockGate",value:function(){var n=e.getWindow();void 0!==n&&(n.blockArcAdsLoad=!1)}},{key:"getWindow",value:function(){return window}}]),e}()},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=function(){function e(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,i,t){return i&&e(n.prototype,i),t&&e(n,t),n}}();var r=n.MobileDetection=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return t(e,null,[{key:"Android",value:function(){return!!navigator.userAgent.match(/Android/i)}},{key:"AndroidOld",value:function(){return!!navigator.userAgent.match(/Android 2.3.3/i)}},{key:"AndroidTablet",value:function(){return!(!navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Mobile/i))}},{key:"Kindle",value:function(){return!!navigator.userAgent.match(/Kindle/i)}},{key:"KindleFire",value:function(){return!!navigator.userAgent.match(/KFOT/i)}},{key:"Silk",value:function(){return!!navigator.userAgent.match(/Silk/i)}},{key:"BlackBerry",value:function(){return!!navigator.userAgent.match(/BlackBerry/i)}},{key:"iOS",value:function(){return!!navigator.userAgent.match(/iPhone|iPad|iPod/i)}},{key:"iPhone",value:function(){return!!navigator.userAgent.match(/iPhone|iPod/i)}},{key:"iPad",value:function(){return!!navigator.userAgent.match(/iPad/i)}},{key:"Windows",value:function(){return!!navigator.userAgent.match(/IEMobile/i)}},{key:"FirefoxOS",value:function(){return!!navigator.userAgent.match(/Mozilla/i)&&!!navigator.userAgent.match(/Mobile/i)}},{key:"Retina",value:function(){return window.retina||window.devicePixelRatio>1}},{key:"any",value:function(){return this.Android()||this.Kindle()||this.KindleFire()||this.Silk()||this.BlackBerry()||this.iOS()||this.Windows()||this.FirefoxOS()}}]),e}();n.default=r},function(e,n,i){var t=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(i(2));t.default.ext=function(e){var n="undefined"!=typeof console&&console;for(var i in t.default.levels)e[i]=n&&(n[i]||n.log)||function(){};return e.enabledFor=function(){return!0},e}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.appendResource=function(e,n,i,t,r){var o=document.createElement(e);if("script"!==e)return;o.src=n,o.async=i||!1,o.defer=i||t||!1;(document.head||document.documentElement).appendChild(o),r&&r()}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.expandQueryString=function(e){var n=window.location.href,i=e.replace(/[[\]]/g,"\\$&"),t=new RegExp("[?&]"+i+"(=([^&#]*)|&|#|$)").exec(n);if(!t)return null;if(!t[2])return"";return decodeURIComponent(t[2].replace(/\+/g," "))}},function(e,n,i){"use strict";function t(e){window.apstag&&e()}Object.defineProperty(n,"__esModule",{value:!0}),n.fetchAmazonBids=function(e,n,i,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,a=i;if(r&&void 0!==window.innerWidth&&void 0!==i[0][0][0]){for(var d=window.innerWidth,s=-1,l=r.length,u=0;u<l;u++)if(d>=r[u][0]){s=u;break}a=i[s]}t(function(){var i={slotName:n,slotID:e,sizes:a};window.apstag.fetchBids({slots:[i]},function(){window.apstag.setDisplayBids(),o&&o()})})},n.queueAmazonCommand=t},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.resizeListeners=n.sizemapListeners=void 0,n.prepareSizeMaps=function(e,n){var i=[],t=[],r=[],o=n.length?n:null;o&&e&&o.forEach(function(n,o){i.push([n,e[o]]),-1===t.indexOf(n[0])&&(t.push(n[0]),r.push(!1))});return t.sort(function(e,n){return e-n}),{mapping:i,breakpoints:t,correlators:r}},n.parseSizeMappings=l,n.runResizeEvents=u,n.setResizeListener=function(e){var n=e.id,i=e.correlators;s[n]=(0,t.debounce)(u(e),250),window.addEventListener("resize",s[n]),d[n]={listener:s[n],correlators:i}};var t=i(12),r=i(3),o=i(1),a=i(0),d=n.sizemapListeners={},s=n.resizeListeners={};function l(e){try{var n=[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight],i=e.filter(function(e){return e[0][0]<=n[0]&&e[0][1]<=n[1]}),t=i.length>0?i[0][1]:[];return t.length>0&&t[0].constructor!==Array&&(t=[t]),t}catch(n){return(0,a.sendLog)("parseSizeMappings()","invalid size mapping",null),e[e.length-1][1]}}function u(e){var n=void 0,i=!1;if(e.breakpoints){var t=window.innerWidth;n=e.breakpoints.filter(function(e){return e<t}).pop()||e.breakpoints[0]}return function(){for(var t=e.ad,a=e.breakpoints,s=e.id,u=e.bidding,c=e.mapping,p=e.slotName,g=e.wrapper,f=e.prerender,h=window.innerWidth,b=void 0,v=void 0,w=0;w<a.length;w++){if(b=a[w],v=a[w+1],n!==b&&(h>b&&(h<v||!v)||h===b&&!i)){n=b,i=!0;var m=l(c),y={adUnit:t,adSlot:p,adDimensions:m,adId:s};u.prebid&&u.prebid.enabled||u.amazon&&u.amazon.enabled?(0,r.fetchBids)({ad:t,id:s,slotName:p,dimensions:m,bidding:u,wrapper:g,prerender:f,correlator:d[s].correlators[w],breakpoints:a}):(0,o.refreshSlot)({ad:t,correlator:d[s].correlators[w],prerender:f,info:y})}d[s].correlators[w]=!0}}}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.debounce=function(e,n){var i=void 0;return function(){for(var t=this,r=arguments.length,o=Array(r),a=0;a<r;a++)o[a]=arguments[a];clearTimeout(i),i=setTimeout(function(){i=null,e.apply(t,o)},n)}}}])});
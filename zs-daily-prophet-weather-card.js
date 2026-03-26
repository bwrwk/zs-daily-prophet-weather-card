/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$3=t=>t,s$1=t$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

const TRANSLATIONS = {
    en: {
        eyebrow: 'Daily Prophet Weather Bureau',
        defaultTitle: 'Daily Prophet',
        updated: 'Updated',
        feelsLike: 'Feels like',
        specialEdition: 'Special Edition',
        forecastTitle: 'Forecast',
        almanacTitle: 'Almanac',
        noForecast: 'Forecast quills are quiet today.',
        chanceOfRain: 'Chance of rain',
        low: 'Low',
        high: 'High',
        windShort: 'Wind',
        debugTitle: 'Diagnostics',
        debugLabels: {
            forecast_source: 'Forecast source',
            forecast_items: 'Forecast items',
            forecast_mode: 'Forecast mode',
            weather_entity: 'Weather entity',
            forecast_entity: 'Forecast bridge',
            service_status: 'Forecast API',
        },
        alertLevels: {
            info: 'Notice',
            warning: 'Warning',
            critical: 'Emergency',
        },
        labels: {
            entity: 'Weather entity',
            title: 'Title',
            subtitle: 'Subtitle',
            location: 'Location',
            style: 'Style',
            preset: 'Preset',
            ha_theme: 'Home Assistant theme',
            accent_color: 'Accent color',
            ink_color: 'Ink color',
            paper_color: 'Paper color',
            background: 'Background',
            density: 'Density',
            paper_texture: 'Paper texture',
            animated_hero: 'Animated hero',
            show_masthead: 'Show masthead',
            show_almanac: 'Show almanac',
            show_forecast: 'Show forecast',
            show_alerts: 'Show alerts',
            debug: 'Debug mode',
            layout: 'Layout',
            mode: 'Layout mode',
            forecast_mode: 'Forecast mode',
            forecast_items: 'Forecast items',
            facts: 'Fact tiles',
            content: 'Content',
            headline_mode: 'Headline mode',
            headline_template: 'Custom headline',
            condition_labels: 'Condition language',
            entities: 'Data overrides',
            forecast_entity: 'Forecast bridge entity',
            forecast_attribute: 'Forecast attribute',
            apparent_temperature: 'Feels-like sensor',
            humidity: 'Humidity sensor',
            pressure: 'Pressure sensor',
            wind_speed: 'Wind speed sensor',
            wind_bearing: 'Wind bearing sensor',
            visibility: 'Visibility sensor',
            uv_index: 'UV index sensor',
            cloud_coverage: 'Cloud coverage sensor',
            precipitation: 'Precipitation sensor',
            sunrise: 'Sunrise entity',
            sunset: 'Sunset entity',
            alerts: 'Alert entities',
            tap_action: 'Tap action',
            action: 'Action',
        },
        helpers: {
            entity: 'Primary weather.* entity used for current conditions and default forecast lookup.',
            location: 'Optional editorial location shown in the issue header.',
            preset: 'Classic is the most polished preset right now.',
            ha_theme: 'Optional Home Assistant theme for this card.',
            accent_color: 'Custom accent used for borders and seals.',
            ink_color: 'Overrides the main newspaper ink color.',
            paper_color: 'Overrides the inner paper surface color.',
            background: 'Overrides the outer card background.',
            density: 'Controls spacing inside the card.',
            paper_texture: 'Adds subtle print grain over the paper surface.',
            animated_hero: 'Enables the gentle moving front-page hero treatment.',
            show_masthead: 'Shows the newspaper title block.',
            show_almanac: 'Shows sunrise and sunset blocks.',
            show_forecast: 'Shows the forecast strip.',
            show_alerts: 'Shows the special-edition alert section.',
            debug: 'Shows a compact diagnostics panel below the card content.',
            mode: 'Frontpage is editorial. Bulletin is for a cleaner report layout.',
            forecast_mode: 'Auto detects whether the forecast is hourly or daily.',
            forecast_items: 'How many forecast entries to render.',
            facts: 'Choose which fact tiles appear in the lead panel.',
            headline_mode: 'Auto generates copy from weather. Custom uses the field below.',
            headline_template: 'Used only when headline mode is custom.',
            condition_labels: 'Controls the language used for condition names.',
            forecast_entity: 'Optional helper or template entity that exposes forecast data.',
            forecast_attribute: 'Attribute name on the forecast bridge entity. Defaults to forecast.',
            apparent_temperature: 'Optional sensor override for apparent temperature.',
            humidity: 'Optional sensor override for humidity.',
            pressure: 'Optional sensor override for pressure.',
            wind_speed: 'Optional sensor override for wind speed.',
            wind_bearing: 'Optional sensor override for wind bearing.',
            visibility: 'Optional sensor override for visibility.',
            uv_index: 'Optional sensor override for UV index.',
            cloud_coverage: 'Optional sensor override for cloud coverage.',
            precipitation: 'Optional sensor override for precipitation.',
            sunrise: 'Optional entity or sensor for sunrise time.',
            sunset: 'Optional entity or sensor for sunset time.',
            alerts: 'Optional warning entities, usually binary_sensors or sensors.',
            tap_action: 'What should happen when the card is clicked.',
            action: 'More-info opens the Home Assistant dialog for the main weather entity.',
        },
        facts: {
            humidity: 'Humidity',
            wind: 'Wind',
            pressure: 'Pressure',
            precipitation: 'Precipitation',
            visibility: 'Visibility',
            uv: 'UV',
            cloud_coverage: 'Clouds',
            sunrise: 'Sunrise',
            sunset: 'Sunset',
        },
        conditions: {
            clear_night: 'clear night',
            cloudy: 'cloudy',
            exceptional: 'exceptional',
            fog: 'fog',
            hail: 'hail',
            lightning: 'lightning',
            lightning_rainy: 'stormy rain',
            partlycloudy: 'partly cloudy',
            pouring: 'pouring rain',
            rainy: 'rain',
            snowy: 'snow',
            snowy_rainy: 'sleet',
            sunny: 'sunny',
            windy: 'windy',
            windy_variant: 'gusty',
        },
    },
    pl: {
        eyebrow: 'Biuro Pogodowe Proroka Codziennego',
        defaultTitle: 'Prorok Codzienny',
        updated: 'Aktualizacja',
        feelsLike: 'Odczuwalna',
        specialEdition: 'Wydanie Specjalne',
        forecastTitle: 'Prognoza',
        almanacTitle: 'Almanach',
        noForecast: 'Dzis sowy nie przyniosly prognozy.',
        chanceOfRain: 'Szansa opadow',
        low: 'Min',
        high: 'Max',
        windShort: 'Wiatr',
        debugTitle: 'Diagnostyka',
        debugLabels: {
            forecast_source: 'Zrodlo prognozy',
            forecast_items: 'Pozycje prognozy',
            forecast_mode: 'Tryb prognozy',
            weather_entity: 'Encja pogody',
            forecast_entity: 'Mostek prognozy',
            service_status: 'Forecast API',
        },
        alertLevels: {
            info: 'Komunikat',
            warning: 'Ostrzezenie',
            critical: 'Alarm',
        },
        labels: {
            entity: 'Encja pogody',
            title: 'Tytul',
            subtitle: 'Podtytul',
            location: 'Lokalizacja',
            style: 'Styl',
            preset: 'Preset',
            ha_theme: 'Motyw Home Assistanta',
            accent_color: 'Kolor akcentu',
            ink_color: 'Kolor atramentu',
            paper_color: 'Kolor papieru',
            background: 'Tlo',
            density: 'Gestosc',
            paper_texture: 'Faktura papieru',
            animated_hero: 'Animowany hero',
            show_masthead: 'Pokaz naglowek',
            show_almanac: 'Pokaz almanach',
            show_forecast: 'Pokaz prognoze',
            show_alerts: 'Pokaz alerty',
            debug: 'Tryb debug',
            layout: 'Uklad',
            mode: 'Tryb ukladu',
            forecast_mode: 'Tryb prognozy',
            forecast_items: 'Liczba pozycji prognozy',
            facts: 'Kafelki faktow',
            content: 'Tresc',
            headline_mode: 'Tryb naglowka',
            headline_template: 'Wlasny naglowek',
            condition_labels: 'Jezyk warunkow',
            entities: 'Nadpisania danych',
            forecast_entity: 'Encja mostka prognozy',
            forecast_attribute: 'Atrybut prognozy',
            apparent_temperature: 'Sensor odczuwalnej',
            humidity: 'Sensor wilgotnosci',
            pressure: 'Sensor cisnienia',
            wind_speed: 'Sensor predkosci wiatru',
            wind_bearing: 'Sensor kierunku wiatru',
            visibility: 'Sensor widocznosci',
            uv_index: 'Sensor UV',
            cloud_coverage: 'Sensor zachmurzenia',
            precipitation: 'Sensor opadow',
            sunrise: 'Encja wschodu',
            sunset: 'Encja zachodu',
            alerts: 'Encje alertow',
            tap_action: 'Akcja klikniecia',
            action: 'Akcja',
        },
        helpers: {
            entity: 'Glowna encja weather.* dla biezacych warunkow i domyslnego odczytu prognozy.',
            location: 'Opcjonalna nazwa miejsca pokazywana w naglowku wydania.',
            preset: 'Classic jest obecnie najbardziej dopracowany.',
            ha_theme: 'Opcjonalny motyw Home Assistanta dla tej karty.',
            accent_color: 'Wlasny kolor akcentow dla ramek i detali.',
            ink_color: 'Nadpisuje glowny kolor atramentu.',
            paper_color: 'Nadpisuje kolor papieru wewnatrz karty.',
            background: 'Nadpisuje zewnetrzne tlo karty.',
            density: 'Steruje odstepami wewnatrz karty.',
            paper_texture: 'Dodaje subtelna fakture druku.',
            animated_hero: 'Wlacza delikatna animacje front page hero.',
            show_masthead: 'Pokazuje gazetowy blok tytulowy.',
            show_almanac: 'Pokazuje bloki wschodu i zachodu slonca.',
            show_forecast: 'Pokazuje pasek prognozy.',
            show_alerts: 'Pokazuje sekcje wydania specjalnego dla ostrzezen.',
            debug: 'Pokazuje kompaktowy panel diagnostyczny pod trescia karty.',
            mode: 'Frontpage jest bardziej redakcyjny. Bulletin jest bardziej raportowy.',
            forecast_mode: 'Auto wykrywa, czy prognoza jest godzinowa czy dzienna.',
            forecast_items: 'Ile pozycji prognozy pokazac.',
            facts: 'Wybierz, ktore kafelki faktow maja byc pokazane.',
            headline_mode: 'Auto generuje tekst z pogody. Custom uzywa pola ponizej.',
            headline_template: 'Uzywane tylko przy headline mode ustawionym na custom.',
            condition_labels: 'Steruje jezykiem nazw warunkow pogodowych.',
            forecast_entity: 'Opcjonalna encja pomocnicza lub template z danymi prognozy.',
            forecast_attribute: 'Nazwa atrybutu na encji mostka. Domyslnie forecast.',
            apparent_temperature: 'Opcjonalny sensor odczuwalnej temperatury.',
            humidity: 'Opcjonalny sensor wilgotnosci.',
            pressure: 'Opcjonalny sensor cisnienia.',
            wind_speed: 'Opcjonalny sensor predkosci wiatru.',
            wind_bearing: 'Opcjonalny sensor kierunku wiatru.',
            visibility: 'Opcjonalny sensor widocznosci.',
            uv_index: 'Opcjonalny sensor UV.',
            cloud_coverage: 'Opcjonalny sensor zachmurzenia.',
            precipitation: 'Opcjonalny sensor opadow.',
            sunrise: 'Opcjonalna encja lub sensor wschodu slonca.',
            sunset: 'Opcjonalna encja lub sensor zachodu slonca.',
            alerts: 'Opcjonalne encje ostrzezen, zwykle binary_sensor lub sensor.',
            tap_action: 'Co ma sie stac po kliknieciu w karte.',
            action: 'More-info otwiera okno Home Assistanta dla glownej encji pogody.',
        },
        facts: {
            humidity: 'Wilgotnosc',
            wind: 'Wiatr',
            pressure: 'Cisnienie',
            precipitation: 'Opady',
            visibility: 'Widocznosc',
            uv: 'UV',
            cloud_coverage: 'Zachmurzenie',
            sunrise: 'Wschod',
            sunset: 'Zachod',
        },
        conditions: {
            clear_night: 'bezchmurna noc',
            cloudy: 'pochmurno',
            exceptional: 'wyjatkowo',
            fog: 'mgla',
            hail: 'grad',
            lightning: 'burza',
            lightning_rainy: 'burza z deszczem',
            partlycloudy: 'czesciowe zachmurzenie',
            pouring: 'ulewa',
            rainy: 'deszcz',
            snowy: 'snieg',
            snowy_rainy: 'deszcz ze sniegiem',
            sunny: 'slonecznie',
            windy: 'wietrznie',
            windy_variant: 'porywiscie',
        },
    },
};
function getLanguage(hass) {
    const raw = String(hass?.language || hass?.locale?.language || hass?.config?.language || 'en').toLowerCase();
    return raw.startsWith('pl') ? 'pl' : 'en';
}
function getEditorLanguage() {
    const documentLanguage = typeof document !== 'undefined' ? document.documentElement?.lang : '';
    const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en';
    return getLanguage({
        language: documentLanguage || browserLanguage,
    });
}
function getTranslations(language) {
    return TRANSLATIONS[language] || TRANSLATIONS.en;
}

const PRESET_STYLES = {
    classic_prophet: {
        cardBackground: 'linear-gradient(180deg, rgba(118,91,56,0.96), rgba(68,49,28,0.98))',
        paper: 'linear-gradient(180deg, #f3e8c9 0%, #e8d7b1 54%, #d3ba8b 100%)',
        ink: '#2e2215',
        muted: 'rgba(46, 34, 21, 0.64)',
        accent: '#8f6230',
        accentSoft: 'rgba(143, 98, 48, 0.18)',
        border: '#8f6b3d',
        alert: '#8d2b1f',
        shadow: 'rgba(34, 22, 10, 0.24)',
    },
    weather_bureau: {
        cardBackground: 'linear-gradient(180deg, rgba(44,54,58,0.96), rgba(22,29,31,0.98))',
        paper: 'linear-gradient(180deg, #e8ece8 0%, #d9ddd8 58%, #c9cec8 100%)',
        ink: '#1f2d2f',
        muted: 'rgba(31, 45, 47, 0.68)',
        accent: '#44656a',
        accentSoft: 'rgba(68, 101, 106, 0.18)',
        border: '#5c787c',
        alert: '#8d2b1f',
        shadow: 'rgba(8, 16, 18, 0.24)',
    },
    animated_frontpage: {
        cardBackground: 'linear-gradient(180deg, rgba(56,45,31,0.96), rgba(24,19,13,0.99))',
        paper: 'linear-gradient(180deg, #f1e2bc 0%, #e2cca0 58%, #caa56d 100%)',
        ink: '#2a1f14',
        muted: 'rgba(42, 31, 20, 0.66)',
        accent: '#b37a3d',
        accentSoft: 'rgba(179, 122, 61, 0.2)',
        border: '#b7874b',
        alert: '#a43224',
        shadow: 'rgba(27, 18, 9, 0.3)',
    },
};
function getDensityValues(density) {
    if (density === 'compact') {
        return { cardPadding: '18px', heroPadding: '16px', gap: '14px' };
    }
    if (density === 'airy') {
        return { cardPadding: '28px', heroPadding: '24px', gap: '22px' };
    }
    return { cardPadding: '22px', heroPadding: '20px', gap: '18px' };
}

function formatNumber(value, fractionDigits = 0) {
    if (value === undefined || Number.isNaN(value)) {
        return '-';
    }
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits,
    }).format(value);
}
function formatTime(value) {
    if (!value) {
        return '-';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '-';
    }
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}
function cardinalFromBearing(bearing) {
    if (bearing === undefined || Number.isNaN(bearing)) {
        return '';
    }
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((((bearing % 360) + 360) % 360) / 45) % 8;
    return directions[index];
}
function formatForecastTemperature(item, language) {
    const t = getTranslations(language);
    if (item.temperature === undefined && item.templow === undefined) {
        return '-';
    }
    if (item.templow === undefined || item.templow === item.temperature) {
        return item.temperature !== undefined ? `${Math.round(item.temperature)}°` : '-';
    }
    return `${t.high} ${Math.round(item.temperature || 0)}°  ${t.low} ${Math.round(item.templow)}°`;
}
function formatAlertSeverity(alert, language) {
    const t = getTranslations(language);
    return t.alertLevels[alert.severity];
}
function buildHeadline(snapshot, language) {
    const t = getTranslations(language);
    const condition = t.conditions[snapshot.condition] || snapshot.condition || t.conditions.cloudy;
    const temp = snapshot.temperature !== undefined ? `${Math.round(snapshot.temperature)}°` : '';
    if (snapshot.alerts.length) {
        return language === 'pl'
            ? `Pilna depesza: ${condition} nadciaga do ${snapshot.friendlyName}`
            : `Urgent bulletin: ${condition} moving over ${snapshot.friendlyName}`;
    }
    if (snapshot.condition === 'sunny') {
        return language === 'pl'
            ? `Jasne niebo nad ${snapshot.friendlyName}, ${temp} w porannym wydaniu`
            : `Clear skies over ${snapshot.friendlyName}, ${temp} in the morning edition`;
    }
    if (snapshot.condition === 'rainy' || snapshot.condition === 'pouring' || snapshot.condition === 'lightning_rainy') {
        return language === 'pl'
            ? `Deszczowy numer dla ${snapshot.friendlyName}, przygotuj peleryne`
            : `Rain-soaked edition for ${snapshot.friendlyName}, cloaks advised`;
    }
    if (snapshot.condition === 'snowy' || snapshot.condition === 'snowy_rainy') {
        return language === 'pl'
            ? `Zimny front nad ${snapshot.friendlyName}, pergaminy trzepoca na wietrze`
            : `A cold front over ${snapshot.friendlyName}, parchments flutter in the wind`;
    }
    return language === 'pl'
        ? `${condition} w ${snapshot.friendlyName}, obecnie ${temp}`
        : `${condition} in ${snapshot.friendlyName}, currently ${temp}`;
}
function buildFacts(snapshot, facts, language) {
    const t = getTranslations(language);
    const map = {
        humidity: { key: 'humidity', label: t.facts.humidity, value: snapshot.humidity !== undefined ? `${formatNumber(snapshot.humidity)}%` : '-' },
        wind: {
            key: 'wind',
            label: t.facts.wind,
            value: snapshot.windSpeed !== undefined ? `${formatNumber(snapshot.windSpeed)} ${cardinalFromBearing(snapshot.windBearing)}`.trim() : '-',
        },
        pressure: { key: 'pressure', label: t.facts.pressure, value: snapshot.pressure !== undefined ? `${formatNumber(snapshot.pressure)} hPa` : '-' },
        precipitation: {
            key: 'precipitation',
            label: t.facts.precipitation,
            value: snapshot.precipitation !== undefined ? `${formatNumber(snapshot.precipitation, 1)} mm` : '-',
        },
        visibility: { key: 'visibility', label: t.facts.visibility, value: snapshot.visibility !== undefined ? `${formatNumber(snapshot.visibility, 1)} km` : '-' },
        uv: { key: 'uv', label: t.facts.uv, value: snapshot.uvIndex !== undefined ? formatNumber(snapshot.uvIndex, 1) : '-' },
        cloud_coverage: {
            key: 'cloud_coverage',
            label: t.facts.cloud_coverage,
            value: snapshot.cloudCoverage !== undefined ? `${formatNumber(snapshot.cloudCoverage)}%` : '-',
        },
        sunrise: { key: 'sunrise', label: t.facts.sunrise, value: formatTime(snapshot.sunrise) },
        sunset: { key: 'sunset', label: t.facts.sunset, value: formatTime(snapshot.sunset) },
    };
    return facts.map((fact) => map[fact]).filter(Boolean);
}

function getEntity(hass, entityId) {
    if (!hass || !entityId) {
        return undefined;
    }
    return hass.states?.[entityId];
}
function readNumberEntityState(entity) {
    if (!entity) {
        return undefined;
    }
    const value = Number(entity.state);
    return Number.isFinite(value) ? value : undefined;
}
function readNumberAttribute(entity, keys) {
    for (const key of keys) {
        const value = Number(entity?.attributes?.[key]);
        if (Number.isFinite(value)) {
            return value;
        }
    }
    return undefined;
}
function readStringAttribute(entity, keys) {
    for (const key of keys) {
        const value = entity?.attributes?.[key];
        if (value !== undefined && value !== null && String(value).trim()) {
            return String(value);
        }
    }
    return undefined;
}
function normalizeForecastData(raw) {
    if (!Array.isArray(raw)) {
        return [];
    }
    return raw.map((item) => ({
        datetime: item?.datetime,
        temperature: Number.isFinite(Number(item?.temperature)) ? Number(item.temperature) : undefined,
        templow: Number.isFinite(Number(item?.templow)) ? Number(item.templow) : undefined,
        condition: item?.condition ? String(item.condition) : undefined,
        precipitation: Number.isFinite(Number(item?.precipitation)) ? Number(item.precipitation) : undefined,
        precipitation_probability: Number.isFinite(Number(item?.precipitation_probability)) ? Number(item.precipitation_probability) : undefined,
        wind_speed: Number.isFinite(Number(item?.wind_speed)) ? Number(item.wind_speed) : undefined,
        is_daytime: item?.is_daytime === undefined ? undefined : Boolean(item.is_daytime),
    }));
}
function extractForecastResponse(raw, entityId) {
    if (!raw) {
        return [];
    }
    if (Array.isArray(raw)) {
        for (const entry of raw) {
            const extracted = extractForecastResponse(entry, entityId);
            if (extracted.length) {
                return extracted;
            }
        }
        return [];
    }
    if (typeof raw !== 'object') {
        return [];
    }
    const directEntityForecast = raw?.[entityId]?.forecast;
    if (Array.isArray(directEntityForecast)) {
        return normalizeForecastData(directEntityForecast);
    }
    if (Array.isArray(raw.forecast)) {
        return normalizeForecastData(raw.forecast);
    }
    for (const value of Object.values(raw)) {
        const extracted = extractForecastResponse(value, entityId);
        if (extracted.length) {
            return extracted;
        }
    }
    return [];
}
function deriveAlertSeverity(entity) {
    const raw = String(entity.attributes?.severity
        || entity.attributes?.level
        || entity.state
        || '').toLowerCase();
    if (['critical', 'severe', 'extreme', 'danger', 'on'].includes(raw)) {
        return 'critical';
    }
    if (['warning', 'watch', 'moderate', 'problem'].includes(raw)) {
        return 'warning';
    }
    return 'info';
}
function normalizeAlerts(entities) {
    return entities
        .filter((entity) => !['off', 'false', '0', 'idle', 'unknown', 'unavailable'].includes(String(entity.state).toLowerCase()))
        .map((entity) => ({
        entityId: entity.entity_id,
        title: String(entity.attributes?.headline
            || entity.attributes?.title
            || entity.attributes?.friendly_name
            || entity.entity_id),
        severity: deriveAlertSeverity(entity),
        description: String(entity.attributes?.description
            || entity.attributes?.message
            || entity.attributes?.event
            || '').trim() || undefined,
    }));
}
function createWeatherSnapshot(hass, config) {
    const weatherEntity = getEntity(hass, config.entity);
    const overrides = config.entities || {};
    const forecastEntity = getEntity(hass, overrides.forecast_entity);
    const humidityEntity = getEntity(hass, overrides.humidity);
    const pressureEntity = getEntity(hass, overrides.pressure);
    const windSpeedEntity = getEntity(hass, overrides.wind_speed);
    const windBearingEntity = getEntity(hass, overrides.wind_bearing);
    const apparentEntity = getEntity(hass, overrides.apparent_temperature);
    const visibilityEntity = getEntity(hass, overrides.visibility);
    const uvEntity = getEntity(hass, overrides.uv_index);
    const cloudEntity = getEntity(hass, overrides.cloud_coverage);
    const precipitationEntity = getEntity(hass, overrides.precipitation);
    const sunriseEntity = getEntity(hass, overrides.sunrise);
    const sunsetEntity = getEntity(hass, overrides.sunset);
    const alertEntities = (overrides.alerts || []).map((entityId) => getEntity(hass, entityId)).filter(Boolean);
    const forecastSource = normalizeForecastData(forecastEntity?.attributes?.[overrides.forecast_attribute || 'forecast']
        ?? weatherEntity?.attributes?.forecast);
    const lastUpdated = forecastSource[0]?.datetime || weatherEntity?.attributes?.last_updated;
    const lastUpdatedLabel = lastUpdated
        ? new Date(lastUpdated).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
        : new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    return {
        entityId: config.entity,
        state: weatherEntity?.state || 'unknown',
        condition: weatherEntity?.state || 'cloudy',
        temperature: readNumberAttribute(weatherEntity, ['temperature']) ?? readNumberEntityState(weatherEntity),
        apparentTemperature: readNumberEntityState(apparentEntity) ?? readNumberAttribute(weatherEntity, ['apparent_temperature', 'feels_like']),
        humidity: readNumberEntityState(humidityEntity) ?? readNumberAttribute(weatherEntity, ['humidity']),
        pressure: readNumberEntityState(pressureEntity) ?? readNumberAttribute(weatherEntity, ['pressure']),
        windSpeed: readNumberEntityState(windSpeedEntity) ?? readNumberAttribute(weatherEntity, ['wind_speed']),
        windBearing: readNumberEntityState(windBearingEntity) ?? readNumberAttribute(weatherEntity, ['wind_bearing']),
        visibility: readNumberEntityState(visibilityEntity) ?? readNumberAttribute(weatherEntity, ['visibility']),
        uvIndex: readNumberEntityState(uvEntity) ?? readNumberAttribute(weatherEntity, ['uv_index']),
        cloudCoverage: readNumberEntityState(cloudEntity) ?? readNumberAttribute(weatherEntity, ['cloud_coverage']),
        precipitation: readNumberEntityState(precipitationEntity) ?? readNumberAttribute(weatherEntity, ['precipitation', 'precipitation_amount']),
        sunrise: sunriseEntity?.state || readStringAttribute(weatherEntity, ['sunrise']),
        sunset: sunsetEntity?.state || readStringAttribute(weatherEntity, ['sunset']),
        friendlyName: config.location || String(weatherEntity?.attributes?.friendly_name || config.title || 'Hogwarts'),
        attribution: readStringAttribute(weatherEntity, ['attribution']),
        forecast: forecastSource,
        alerts: normalizeAlerts(alertEntities),
        lastUpdatedLabel,
    };
}

const CARD_TAG = 'zs-daily-prophet-card';
const DEFAULT_CONFIG = {
    type: `custom:${CARD_TAG}`,
    entity: '',
    title: 'Daily Prophet',
    subtitle: 'Weather Edition',
    location: '',
    style: {
        preset: 'classic_prophet',
        density: 'comfortable',
        paper_texture: true,
        animated_hero: false,
        show_masthead: true,
        show_almanac: true,
        show_forecast: true,
        show_alerts: true,
        debug: false,
    },
    layout: {
        mode: 'frontpage',
        forecast_mode: 'daily',
        forecast_items: 5,
        facts: ['humidity', 'wind', 'pressure', 'precipitation'],
    },
    content: {
        headline_mode: 'auto',
        headline_template: '',
        condition_labels: 'auto',
    },
    entities: {},
    tap_action: {
        action: 'more-info',
    },
};
function mergeConfig(config) {
    return {
        ...DEFAULT_CONFIG,
        ...config,
        style: { ...DEFAULT_CONFIG.style, ...(config.style || {}) },
        layout: { ...DEFAULT_CONFIG.layout, ...(config.layout || {}) },
        content: { ...DEFAULT_CONFIG.content, ...(config.content || {}) },
        entities: { ...DEFAULT_CONFIG.entities, ...(config.entities || {}) },
        tap_action: { ...DEFAULT_CONFIG.tap_action, ...(config.tap_action || {}) },
    };
}
function getConditionIcon(condition) {
    switch (condition) {
        case 'sunny':
            return '\u263c';
        case 'partlycloudy':
            return '\u26c5';
        case 'rainy':
        case 'pouring':
            return '\u2614';
        case 'lightning':
        case 'lightning_rainy':
            return '\u2607';
        case 'snowy':
        case 'snowy_rainy':
            return '\u2744';
        case 'fog':
            return '\u3030';
        case 'windy':
        case 'windy_variant':
            return '\ud83c\udf01';
        default:
            return '\u2601';
    }
}
function formatForecastLabel(item, mode) {
    if (!item.datetime) {
        return 'Edition';
    }
    const date = new Date(item.datetime);
    if (Number.isNaN(date.getTime())) {
        return 'Edition';
    }
    if (mode === 'hourly') {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    return date.toLocaleDateString([], {
        weekday: 'short',
    });
}
function resolveForecastMode(configuredMode, items) {
    if (configuredMode === 'hourly' || configuredMode === 'daily') {
        return configuredMode;
    }
    const first = items[0]?.datetime ? new Date(items[0].datetime) : undefined;
    const second = items[1]?.datetime ? new Date(items[1].datetime) : undefined;
    if (!first || !second || Number.isNaN(first.getTime()) || Number.isNaN(second.getTime())) {
        return 'daily';
    }
    const diff = Math.abs(second.getTime() - first.getTime());
    return diff <= 1000 * 60 * 60 * 6 ? 'hourly' : 'daily';
}
class ZSDailyProphetCard extends i$2 {
    constructor() {
        super(...arguments);
        this.serviceForecast = [];
        this.forecastLoading = false;
        this.forecastSource = 'weather_entity';
        this.forecastServiceStatus = 'idle';
        this.lastForecastFetchKey = '';
        this.forecastRequestToken = 0;
    }
    static getStubConfig() {
        return {
            type: `custom:${CARD_TAG}`,
            entity: 'weather.home',
            title: 'Prorok Codzienny',
            subtitle: 'Wydanie pogodowe',
            location: 'Hogwart i okolice',
            style: {
                preset: 'classic_prophet',
            },
        };
    }
    static getConfigForm() {
        const t = getTranslations(getEditorLanguage());
        return {
            schema: [
                {
                    name: 'entity',
                    required: true,
                    selector: {
                        entity: {
                            filter: [{ domain: 'weather' }],
                        },
                    },
                },
                { name: 'title', selector: { text: {} } },
                { name: 'subtitle', selector: { text: {} } },
                { name: 'location', selector: { text: {} } },
                {
                    type: 'expandable',
                    name: 'style',
                    title: t.labels.style,
                    schema: [
                        {
                            name: 'preset',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'classic_prophet', label: 'Classic Prophet' },
                                        { value: 'weather_bureau', label: 'Weather Bureau' },
                                        { value: 'animated_frontpage', label: 'Animated Front Page' },
                                    ],
                                },
                            },
                        },
                        { name: 'ha_theme', selector: { theme: {} } },
                        { name: 'accent_color', selector: { text: {} } },
                        { name: 'ink_color', selector: { text: {} } },
                        { name: 'paper_color', selector: { text: {} } },
                        { name: 'background', selector: { text: {} } },
                        {
                            name: 'density',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'compact', label: 'Compact' },
                                        { value: 'comfortable', label: 'Comfortable' },
                                        { value: 'airy', label: 'Airy' },
                                    ],
                                },
                            },
                        },
                        { name: 'paper_texture', selector: { boolean: {} } },
                        { name: 'animated_hero', selector: { boolean: {} } },
                        { name: 'show_masthead', selector: { boolean: {} } },
                        { name: 'show_almanac', selector: { boolean: {} } },
                        { name: 'show_forecast', selector: { boolean: {} } },
                        { name: 'show_alerts', selector: { boolean: {} } },
                        { name: 'debug', selector: { boolean: {} } },
                    ],
                },
                {
                    type: 'expandable',
                    name: 'layout',
                    title: t.labels.layout,
                    schema: [
                        {
                            name: 'mode',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'frontpage', label: 'Frontpage' },
                                        { value: 'bulletin', label: 'Bulletin' },
                                    ],
                                },
                            },
                        },
                        {
                            name: 'forecast_mode',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'auto', label: 'Auto' },
                                        { value: 'hourly', label: 'Hourly' },
                                        { value: 'daily', label: 'Daily' },
                                    ],
                                },
                            },
                        },
                        {
                            name: 'forecast_items',
                            selector: {
                                number: {
                                    min: 1,
                                    max: 12,
                                    step: 1,
                                    mode: 'slider',
                                },
                            },
                        },
                        {
                            name: 'facts',
                            selector: {
                                select: {
                                    multiple: true,
                                    mode: 'list',
                                    options: [
                                        { value: 'humidity', label: t.facts.humidity },
                                        { value: 'wind', label: t.facts.wind },
                                        { value: 'pressure', label: t.facts.pressure },
                                        { value: 'precipitation', label: t.facts.precipitation },
                                        { value: 'visibility', label: t.facts.visibility },
                                        { value: 'uv', label: t.facts.uv },
                                        { value: 'cloud_coverage', label: t.facts.cloud_coverage },
                                        { value: 'sunrise', label: t.facts.sunrise },
                                        { value: 'sunset', label: t.facts.sunset },
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'expandable',
                    name: 'content',
                    title: t.labels.content,
                    schema: [
                        {
                            name: 'headline_mode',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'auto', label: 'Auto' },
                                        { value: 'custom', label: 'Custom' },
                                        { value: 'none', label: 'None' },
                                    ],
                                },
                            },
                        },
                        { name: 'headline_template', selector: { text: {} } },
                        {
                            name: 'condition_labels',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'auto', label: 'Auto' },
                                        { value: 'pl', label: 'Polish' },
                                        { value: 'en', label: 'English' },
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'expandable',
                    name: 'entities',
                    title: t.labels.entities,
                    schema: [
                        { name: 'forecast_entity', selector: { entity: {} } },
                        { name: 'forecast_attribute', selector: { text: {} } },
                        { name: 'apparent_temperature', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'humidity', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'pressure', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'wind_speed', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'wind_bearing', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'visibility', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'uv_index', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'cloud_coverage', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'precipitation', selector: { entity: { filter: [{ domain: 'sensor' }] } } },
                        { name: 'sunrise', selector: { entity: {} } },
                        { name: 'sunset', selector: { entity: {} } },
                        {
                            name: 'alerts',
                            selector: {
                                entity: {
                                    multiple: true,
                                    filter: [{ domain: 'binary_sensor' }, { domain: 'sensor' }],
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'expandable',
                    name: 'tap_action',
                    title: t.labels.tap_action,
                    schema: [
                        {
                            name: 'action',
                            selector: {
                                select: {
                                    options: [
                                        { value: 'more-info', label: 'More info' },
                                        { value: 'none', label: 'None' },
                                    ],
                                },
                            },
                        },
                    ],
                },
            ],
            computeLabel: (schema) => t.labels[schema.name] || schema.name,
            computeHelper: (schema) => t.helpers[schema.name],
        };
    }
    setConfig(config) {
        const mergedConfig = mergeConfig(config);
        if (!mergedConfig.entity?.trim()) {
            throw new Error('`entity` is required.');
        }
        this.config = mergedConfig;
    }
    updated(changedProperties) {
        if (changedProperties.has('hass') || changedProperties.has('config')) {
            void this.refreshForecastIfNeeded();
        }
    }
    getCardSize() {
        return 6;
    }
    getGridOptions() {
        return {
            columns: 12,
            min_columns: 4,
            rows: 6,
            min_rows: 5,
        };
    }
    get language() {
        const configured = this.config?.content?.condition_labels;
        if (configured && configured !== 'auto') {
            return configured;
        }
        return getLanguage(this.hass);
    }
    get t() {
        return getTranslations(this.language);
    }
    get preset() {
        return PRESET_STYLES[this.config.style?.preset || 'classic_prophet'] || PRESET_STYLES.classic_prophet;
    }
    get selectedThemeVariables() {
        const themeName = this.config.style?.ha_theme;
        if (!themeName) {
            return {};
        }
        return { ...(this.hass?.themes?.themes?.[themeName] || {}) };
    }
    get selectedFacts() {
        return this.config.layout?.facts?.length ? this.config.layout.facts : ['humidity', 'wind', 'pressure', 'precipitation'];
    }
    get isWeatherBureau() {
        return this.config.style?.preset === 'weather_bureau';
    }
    get effectiveForecastMode() {
        const configured = this.config.layout?.forecast_mode || 'daily';
        return configured === 'hourly' ? 'hourly' : 'daily';
    }
    openMoreInfo() {
        if (this.config.tap_action?.action === 'none') {
            return;
        }
        const event = new Event('hass-more-info', { bubbles: true, composed: true });
        event.detail = { entityId: this.config.entity };
        this.dispatchEvent(event);
    }
    computeCardStyle() {
        const density = getDensityValues(this.config.style?.density);
        return {
            ...this.selectedThemeVariables,
            '--zs-prophet-card-bg': this.config.style?.background || this.preset.cardBackground,
            '--zs-prophet-paper': this.config.style?.paper_color || this.preset.paper,
            '--zs-prophet-ink': this.config.style?.ink_color || this.preset.ink,
            '--zs-prophet-muted': this.preset.muted,
            '--zs-prophet-accent': this.config.style?.accent_color || this.preset.accent,
            '--zs-prophet-accent-soft': this.preset.accentSoft,
            '--zs-prophet-border': this.config.style?.accent_color || this.preset.border,
            '--zs-prophet-alert': this.preset.alert,
            '--zs-prophet-shadow': this.preset.shadow,
            '--zs-prophet-card-padding': density.cardPadding,
            '--zs-prophet-gap': density.gap,
            '--zs-prophet-hero-padding': density.heroPadding,
        };
    }
    async fetchForecastFromService(forecastType) {
        const callApi = this.hass?.callApi;
        if (!callApi || !this.config?.entity) {
            return [];
        }
        const attempts = [
            {
                path: 'services/weather/get_forecasts?return_response',
                body: {
                    target: { entity_id: [this.config.entity] },
                    data: { type: forecastType },
                },
            },
            {
                path: 'services/weather/get_forecasts?return_response=true',
                body: {
                    target: { entity_id: [this.config.entity] },
                    data: { type: forecastType },
                },
            },
            {
                path: 'services/weather/get_forecasts?return_response',
                body: {
                    entity_id: this.config.entity,
                    type: forecastType,
                },
            },
        ];
        for (const attempt of attempts) {
            try {
                const response = await callApi('POST', attempt.path, attempt.body);
                const forecast = extractForecastResponse(response, this.config.entity);
                if (forecast.length) {
                    return forecast;
                }
            }
            catch {
                continue;
            }
        }
        return [];
    }
    async refreshForecastIfNeeded() {
        if (!this.hass || !this.config) {
            return;
        }
        if (this.config.entities?.forecast_entity) {
            this.forecastSource = 'forecast_entity';
            this.forecastServiceStatus = 'skipped';
            if (this.serviceForecast.length) {
                this.serviceForecast = [];
            }
            return;
        }
        const weatherEntity = this.hass.states?.[this.config.entity];
        const directForecast = weatherEntity?.attributes?.forecast;
        if (Array.isArray(directForecast) && directForecast.length) {
            this.forecastSource = 'weather_entity';
            this.forecastServiceStatus = 'skipped';
            if (this.serviceForecast.length) {
                this.serviceForecast = [];
            }
            return;
        }
        const fetchKey = [
            this.config.entity,
            this.effectiveForecastMode,
            weatherEntity?.state || '',
            weatherEntity?.attributes?.temperature ?? '',
            weatherEntity?.last_updated || '',
        ].join('|');
        if (fetchKey === this.lastForecastFetchKey) {
            return;
        }
        this.lastForecastFetchKey = fetchKey;
        const requestToken = ++this.forecastRequestToken;
        this.forecastLoading = true;
        this.forecastServiceStatus = 'loading';
        const primaryForecast = await this.fetchForecastFromService(this.effectiveForecastMode);
        const fallbackForecast = !primaryForecast.length && this.effectiveForecastMode === 'daily'
            ? await this.fetchForecastFromService('hourly')
            : [];
        if (requestToken !== this.forecastRequestToken) {
            return;
        }
        this.serviceForecast = primaryForecast.length ? primaryForecast : fallbackForecast;
        this.forecastSource = this.serviceForecast.length ? 'weather_service' : 'unavailable';
        this.forecastServiceStatus = this.serviceForecast.length ? 'ok' : 'unavailable';
        this.forecastLoading = false;
    }
    renderDebugPanel(forecastMode, forecastItems) {
        if (this.config.style?.debug !== true) {
            return '';
        }
        const debugItems = [
            { label: this.t.debugLabels.weather_entity, value: this.config.entity || '-' },
            { label: this.t.debugLabels.forecast_entity, value: this.config.entities?.forecast_entity || '-' },
            { label: this.t.debugLabels.forecast_source, value: this.forecastSource },
            { label: this.t.debugLabels.service_status, value: this.forecastServiceStatus },
            { label: this.t.debugLabels.forecast_mode, value: forecastMode },
            { label: this.t.debugLabels.forecast_items, value: String(forecastItems.length) },
        ];
        return b `
      <section class="debug-panel">
        <div class="debug-title">${this.t.debugTitle}</div>
        <div class="debug-grid">
          ${debugItems.map((item) => b `
            <div class="debug-item">
              <div class="debug-label">${item.label}</div>
              <div class="debug-value">${item.value}</div>
            </div>
          `)}
        </div>
      </section>
    `;
    }
    renderForecastItem(item, mode) {
        const conditionLabel = this.t.conditions[item.condition] || item.condition || '';
        const rainChance = item.precipitation_probability !== undefined ? `${this.t.chanceOfRain}: ${Math.round(item.precipitation_probability)}%` : '';
        const precipitation = item.precipitation !== undefined ? `${item.precipitation.toFixed(1)} mm` : '';
        const wind = item.wind_speed !== undefined ? `${this.t.windShort}: ${Math.round(item.wind_speed)}` : '';
        return b `
      <div class="forecast-item">
        <div class="forecast-name">${formatForecastLabel(item, mode)}</div>
        <div class="forecast-main">
          <div class="forecast-temp">${mode === 'hourly'
            ? (item.temperature !== undefined ? `${Math.round(item.temperature)}°` : '-')
            : formatForecastTemperature(item, this.language)}</div>
          <div class="forecast-extra forecast-condition">${getConditionIcon(item.condition || 'cloudy')} ${conditionLabel}</div>
        </div>
        <div class="forecast-meta">
          ${rainChance ? b `<div>${rainChance}</div>` : ''}
          ${precipitation ? b `<div>${precipitation}</div>` : ''}
          ${wind ? b `<div>${wind}</div>` : ''}
        </div>
      </div>
    `;
    }
    renderHeader(snapshot) {
        if (this.config.style?.show_masthead === false) {
            return '';
        }
        if (!this.isWeatherBureau) {
            return b `
        <div class="masthead">
          <div class="eyebrow">${this.t.eyebrow}</div>
          <div class="title">${this.config.title || this.t.defaultTitle}</div>
          ${this.config.subtitle ? b `<div class="subtitle">${this.config.subtitle}</div>` : ''}
        </div>
      `;
        }
        return b `
      <div class="bureau-header">
        <div class="bureau-bar">
          <div class="bureau-stamp">${this.t.eyebrow}</div>
          <div class="bureau-stamp">${snapshot.friendlyName}</div>
        </div>
        <div class="bureau-grid">
          <div class="bureau-title">
            <div class="title">${this.config.title || this.t.defaultTitle}</div>
            ${this.config.subtitle ? b `<div class="subtitle">${this.config.subtitle}</div>` : ''}
          </div>
          <div class="bureau-meta">
            <div>${this.t.updated}: ${snapshot.lastUpdatedLabel}</div>
            <div>${snapshot.state}</div>
          </div>
        </div>
      </div>
    `;
    }
    renderHero(snapshot, headline, facts, conditionLabel) {
        if (!this.isWeatherBureau) {
            return b `
        <section class="hero">
          <div class="lead">
            <div class="lead-copy">
              <div class="edition-row">
                <span>${snapshot.friendlyName}</span>
                <span>${this.t.updated}: ${snapshot.lastUpdatedLabel}</span>
              </div>
              ${headline ? b `<div class="headline">${headline}</div>` : ''}
              <div class="lede">${snapshot.attribution || this.config.location || snapshot.friendlyName}</div>
            </div>
            <div class="facts">
              ${facts.map((fact) => b `
                <div class="fact">
                  <div class="fact-label">${fact.label}</div>
                  <div class="fact-value">${fact.value}</div>
                </div>
              `)}
            </div>
          </div>

          <div class=${`hero-side ${this.config.style?.animated_hero ? 'animated' : ''}`}>
            <div class="prophet-reading-card">
              <div class="icon-medallion">${getConditionIcon(snapshot.condition)}</div>
              <div class="bureau-reading">
                <div class="temperature">${snapshot.temperature !== undefined ? `${Math.round(snapshot.temperature)}°` : '-'}</div>
                <div class="condition">${conditionLabel}</div>
                <div class="apparent">
                  ${this.t.feelsLike}: ${snapshot.apparentTemperature !== undefined ? `${Math.round(snapshot.apparentTemperature)}°` : '-'}
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
        }
        return b `
      <section class="hero bureau-hero">
        <div class="bureau-story">
          <div class="edition-row">
            <span>${snapshot.friendlyName}</span>
            <span>${this.t.updated}: ${snapshot.lastUpdatedLabel}</span>
          </div>
          ${headline ? b `<div class="headline">${headline}</div>` : ''}
          <div class="lede">${snapshot.attribution || this.config.location || snapshot.friendlyName}</div>
        </div>

        <div class="bureau-side">
          <div class="bureau-reading-card">
            <div class="icon-medallion">${getConditionIcon(snapshot.condition)}</div>
            <div class="bureau-reading">
              <div class="temperature">${snapshot.temperature !== undefined ? `${Math.round(snapshot.temperature)}°` : '-'}</div>
              <div class="condition">${conditionLabel}</div>
              <div class="apparent">
                ${this.t.feelsLike}: ${snapshot.apparentTemperature !== undefined ? `${Math.round(snapshot.apparentTemperature)}°` : '-'}
              </div>
              <div class="bureau-summary">
                <div>${conditionLabel}</div>
                <div>${snapshot.friendlyName}</div>
              </div>
            </div>
          </div>

          <div class="bureau-facts">
            ${facts.map((fact) => b `
              <div class="fact">
                <div class="fact-label">${fact.label}</div>
                <div class="fact-value">${fact.value}</div>
              </div>
            `)}
          </div>
        </div>
      </section>
    `;
    }
    render() {
        if (!this.config || !this.hass) {
            return b `<ha-card><div class="empty">Loading weather edition...</div></ha-card>`;
        }
        const snapshot = createWeatherSnapshot(this.hass, this.config);
        const facts = buildFacts(snapshot, this.selectedFacts, this.language);
        const headline = this.config.content?.headline_mode === 'none'
            ? ''
            : this.config.content?.headline_mode === 'custom' && this.config.content.headline_template
                ? this.config.content.headline_template
                : buildHeadline(snapshot, this.language);
        const combinedForecast = snapshot.forecast.length ? snapshot.forecast : this.serviceForecast;
        const forecastItems = combinedForecast.slice(0, this.config.layout?.forecast_items || 5);
        const forecastMode = resolveForecastMode(this.config.layout?.forecast_mode || 'daily', combinedForecast);
        const conditionLabel = this.t.conditions[snapshot.condition] || snapshot.condition;
        return b `
      <ha-card style=${o(this.computeCardStyle())} @click=${() => this.openMoreInfo()}>
        <div class=${`frame ${this.config.style?.paper_texture === false ? '' : 'paper-texture'} ${this.isWeatherBureau ? 'bureau-layout' : ''}`}>
          ${this.renderHeader(snapshot)}

          ${this.renderHero(snapshot, headline, facts, conditionLabel)}

          ${this.config.style?.show_alerts === false || !snapshot.alerts.length ? '' : b `
            <section class="section">
              <div class="section-header">
                <div class="section-title">${this.t.specialEdition}</div>
              </div>
              <div class="alert-list">
                ${snapshot.alerts.map((alert) => b `
                  <div class=${`alert ${alert.severity}`}>
                    <div class="alert-kicker">${formatAlertSeverity(alert, this.language)}</div>
                    <div class="alert-title">${alert.title}</div>
                    ${alert.description ? b `<div class="alert-description">${alert.description}</div>` : ''}
                  </div>
                `)}
              </div>
            </section>
          `}

          ${this.config.style?.show_forecast === false ? '' : b `
            <section class="section">
              <div class="section-header">
                <div class="section-title">${this.t.forecastTitle}</div>
                <div class="section-meta">${forecastMode}</div>
              </div>
              ${forecastItems.length
            ? b `<div class="forecast">${forecastItems.map((item) => this.renderForecastItem(item, forecastMode))}</div>`
            : b `<div class="empty">${this.t.noForecast}</div>`}
            </section>
          `}

          ${this.config.style?.show_almanac === false ? '' : b `
            <section class="section">
              <div class="section-header">
                <div class="section-title">${this.t.almanacTitle}</div>
                <div class="section-meta">${snapshot.state}</div>
              </div>
              <div class="almanac">
                <div class="almanac-item">
                  <div class="fact-label">${this.t.facts.sunrise}</div>
                  <div class="fact-value">${formatTime(snapshot.sunrise)}</div>
                </div>
                <div class="almanac-item">
                  <div class="fact-label">${this.t.facts.sunset}</div>
                  <div class="fact-value">${formatTime(snapshot.sunset)}</div>
                </div>
              </div>
            </section>
          `}

          ${this.renderDebugPanel(forecastMode, forecastItems)}
        </div>
      </ha-card>
    `;
    }
}
ZSDailyProphetCard.properties = {
    hass: { attribute: false },
    config: { attribute: false },
    serviceForecast: { attribute: false, state: true },
    forecastLoading: { attribute: false, state: true },
    forecastSource: { attribute: false, state: true },
    forecastServiceStatus: { attribute: false, state: true },
};
ZSDailyProphetCard.styles = i$5 `
    :host {
      display: block;
      --zs-prophet-card-bg: linear-gradient(180deg, rgba(118,91,56,0.96), rgba(68,49,28,0.98));
      --zs-prophet-paper: linear-gradient(180deg, #f3e8c9 0%, #e8d7b1 54%, #d3ba8b 100%);
      --zs-prophet-ink: #2e2215;
      --zs-prophet-muted: rgba(46, 34, 21, 0.64);
      --zs-prophet-accent: #8f6230;
      --zs-prophet-accent-soft: rgba(143, 98, 48, 0.18);
      --zs-prophet-border: #8f6b3d;
      --zs-prophet-alert: #8d2b1f;
      --zs-prophet-shadow: rgba(34, 22, 10, 0.24);
      --zs-prophet-title: "Cinzel Decorative", "Cinzel", Georgia, serif;
      --zs-prophet-copy: "Cormorant Garamond", Georgia, serif;
      --zs-prophet-card-padding: 22px;
      --zs-prophet-gap: 18px;
      --zs-prophet-hero-padding: 20px;
    }

    ha-card {
      position: relative;
      overflow: hidden;
      border-radius: 30px;
      padding: var(--zs-prophet-card-padding);
      background: var(--zs-prophet-card-bg);
      border: 1px solid color-mix(in srgb, var(--zs-prophet-border) 50%, transparent);
      box-shadow: 0 24px 44px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      color: var(--zs-prophet-ink);
      cursor: pointer;
    }

    .frame {
      position: relative;
      display: grid;
      gap: var(--zs-prophet-gap);
      background: var(--zs-prophet-paper);
      border-radius: 24px;
      padding: var(--zs-prophet-card-padding);
      border: 1px solid color-mix(in srgb, var(--zs-prophet-border) 42%, transparent);
      box-shadow: inset 0 0 0 1px rgba(255, 248, 230, 0.26), 0 16px 32px var(--zs-prophet-shadow);
    }

    .frame::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.5;
      background:
        radial-gradient(circle at 15% 12%, rgba(255,255,255,0.38), transparent 22%),
        linear-gradient(135deg, rgba(255,255,255,0.08), transparent 38%, rgba(88,57,28,0.04) 90%);
      mix-blend-mode: screen;
    }

    .paper-texture::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.18;
      background-image:
        radial-gradient(rgba(79, 51, 23, 0.28) 0.55px, transparent 0.7px),
        radial-gradient(rgba(255, 251, 239, 0.45) 0.55px, transparent 0.8px);
      background-size: 18px 18px, 24px 24px;
      background-position: 0 0, 11px 9px;
    }

    .masthead {
      display: grid;
      gap: 4px;
      justify-items: center;
      text-align: center;
      padding-bottom: 14px;
      border-bottom: 1px solid color-mix(in srgb, var(--zs-prophet-border) 48%, transparent);
    }

    .bureau-header {
      display: grid;
      gap: 12px;
      padding: 0 0 14px;
      border-bottom: 1px solid color-mix(in srgb, var(--zs-prophet-border) 52%, transparent);
    }

    .bureau-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px 16px;
      align-items: center;
    }

    .bureau-stamp {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--zs-prophet-accent-soft) 100%, transparent);
      border: 1px solid color-mix(in srgb, var(--zs-prophet-border) 40%, transparent);
      font-family: var(--zs-prophet-copy);
      font-size: 0.88rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--zs-prophet-muted);
    }

    .bureau-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.3fr) minmax(180px, 0.9fr);
      gap: 12px;
      align-items: end;
    }

    .bureau-title {
      display: grid;
      gap: 4px;
    }

    .bureau-title .title {
      font-size: clamp(1.75rem, 4vw, 2.8rem);
      line-height: 0.98;
      letter-spacing: 0.06em;
    }

    .bureau-title .subtitle {
      font-size: 1rem;
    }

    .bureau-meta {
      display: grid;
      gap: 6px;
      justify-items: end;
      text-align: right;
      font-family: var(--zs-prophet-copy);
      color: var(--zs-prophet-muted);
      font-size: 0.96rem;
    }

    .eyebrow,
    .subtitle,
    .edition-row,
    .lede,
    .fact-label,
    .section-meta,
    .forecast-name,
    .forecast-extra {
      font-family: var(--zs-prophet-copy);
    }

    .eyebrow {
      font-size: 0.84rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--zs-prophet-muted);
    }

    .title,
    .headline,
    .temperature,
    .fact-value,
    .section-title {
      font-family: var(--zs-prophet-title);
    }

    .title {
      font-size: clamp(2rem, 5vw, 3.4rem);
      line-height: 0.95;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .subtitle {
      font-size: 1.08rem;
      color: var(--zs-prophet-muted);
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(210px, 0.9fr);
      gap: 18px;
      align-items: stretch;
    }

    .bureau-layout .hero {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .lead,
    .hero-side {
      padding: var(--zs-prophet-hero-padding);
      border-radius: 22px;
      border: 1px solid rgba(104, 73, 39, 0.12);
    }

    .lead {
      display: grid;
      gap: 12px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08)),
        color-mix(in srgb, var(--zs-prophet-accent-soft) 100%, transparent);
    }

    .lead-copy {
      display: grid;
      gap: 12px;
      min-width: 0;
    }

    .bureau-hero {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.95fr);
      gap: 14px;
      align-items: stretch;
    }

    .bureau-story,
    .bureau-reading-card,
    .bureau-facts {
      padding: var(--zs-prophet-hero-padding);
      border-radius: 18px;
      border: 1px solid rgba(104, 73, 39, 0.12);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04)),
        rgba(255,255,255,0.08);
    }

    .bureau-story {
      display: grid;
      gap: 12px;
    }

    .bureau-side {
      display: grid;
      grid-template-rows: auto auto;
      gap: 14px;
      min-width: 0;
    }

    .bureau-reading-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 14px;
      align-items: start;
      min-width: 0;
    }

    .bureau-facts {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .edition-row,
    .section-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px 14px;
      align-items: center;
    }

    .edition-row,
    .section-meta,
    .lede,
    .forecast-extra,
    .forecast-name {
      color: var(--zs-prophet-muted);
    }

    .headline {
      font-size: clamp(1.3rem, 3vw, 2rem);
      line-height: 1.05;
      text-wrap: balance;
    }

    .lede {
      font-size: 1.08rem;
      line-height: 1.18;
    }

    .hero-side {
      position: relative;
      display: block;
      background:
        radial-gradient(circle at 50% 28%, rgba(255,255,255,0.42), transparent 32%),
        linear-gradient(180deg, rgba(250,240,215,0.82), rgba(227,208,168,0.75));
      overflow: hidden;
      min-height: 260px;
    }

    .prophet-reading-card {
      display: grid;
      gap: 14px;
      justify-items: center;
      align-content: center;
      min-height: 100%;
    }

    .bureau-reading-card .icon-medallion {
      width: 108px;
      height: 108px;
      margin: 0;
      align-self: start;
    }

    .bureau-reading {
      display: grid;
      gap: 8px;
      align-content: start;
      min-width: 0;
    }

    .prophet-reading-card > .bureau-reading {
      width: 100%;
      justify-items: center;
      text-align: center;
    }

    .bureau-layout .temperature,
    .bureau-layout .condition,
    .bureau-layout .apparent {
      text-align: left;
    }

    .bureau-layout .temperature {
      font-size: clamp(2.5rem, 6vw, 4.1rem);
    }

    .bureau-summary {
      display: grid;
      gap: 6px;
      padding-top: 10px;
      border-top: 1px dashed color-mix(in srgb, var(--zs-prophet-border) 35%, transparent);
      font-family: var(--zs-prophet-copy);
      color: var(--zs-prophet-muted);
    }

    .hero-side.animated::before {
      content: "";
      position: absolute;
      inset: auto -10% 18% -10%;
      height: 84px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(255,255,255,0.38), rgba(255,255,255,0));
      animation: drift 11s ease-in-out infinite alternate;
      opacity: 0.75;
    }

    .icon-medallion {
      width: 124px;
      height: 124px;
      margin: 0 auto;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background:
        radial-gradient(circle at 50% 35%, rgba(255,255,255,0.86), rgba(214,180,122,0.75) 64%, rgba(120,79,37,0.84) 100%);
      border: 2px solid color-mix(in srgb, var(--zs-prophet-border) 72%, white);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.56), 0 16px 26px rgba(88, 57, 28, 0.18);
      font-size: 3rem;
    }

    .temperature {
      font-size: clamp(2.8rem, 7vw, 4.8rem);
      line-height: 0.92;
      text-align: center;
    }

    .condition,
    .apparent {
      font-family: var(--zs-prophet-copy);
      text-align: center;
    }

    .condition {
      font-size: 1.2rem;
      text-transform: capitalize;
    }

    .apparent {
      font-size: 1rem;
      color: var(--zs-prophet-muted);
    }

    .facts,
    .forecast,
    .almanac {
      display: grid;
      gap: 12px;
    }

    .facts {
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    }

    .forecast {
      grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
    }

    .almanac {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .fact,
    .forecast-item,
    .almanac-item,
    .alert {
      border-radius: 16px;
      border: 1px solid rgba(104, 73, 39, 0.12);
    }

    .fact,
    .almanac-item {
      padding: 12px 14px;
      background: rgba(255, 248, 230, 0.28);
    }

    .forecast-item {
      padding: 14px 12px;
      text-align: center;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.14)),
        rgba(255, 248, 230, 0.16);
    }

    .bureau-layout .forecast {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }

    .bureau-layout .forecast-item {
      text-align: left;
      border-radius: 14px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06)),
        rgba(255,255,255,0.08);
    }

    .forecast-main {
      display: grid;
      gap: 6px;
    }

    .forecast-meta {
      display: grid;
      gap: 4px;
      margin-top: 8px;
      font-family: var(--zs-prophet-copy);
      color: var(--zs-prophet-muted);
      font-size: 0.92rem;
    }

    .forecast-condition {
      text-transform: capitalize;
    }

    .alert-list {
      display: grid;
      gap: 10px;
    }

    .bureau-layout .alert-list {
      gap: 8px;
    }

    .alert {
      padding: 14px 16px;
      background: linear-gradient(180deg, rgba(166,56,40,0.12), rgba(141,43,31,0.18));
      color: var(--zs-prophet-alert);
    }

    .bureau-layout .alert {
      border-radius: 14px;
    }

    .alert.info {
      background: linear-gradient(180deg, rgba(98,86,61,0.1), rgba(98,86,61,0.16));
      color: var(--zs-prophet-ink);
    }

    .alert.warning {
      background: linear-gradient(180deg, rgba(184,118,38,0.12), rgba(160,95,22,0.18));
      color: #7a4312;
    }

    .alert.critical {
      background: linear-gradient(180deg, rgba(166,56,40,0.12), rgba(141,43,31,0.18));
      color: var(--zs-prophet-alert);
    }

    .alert-kicker,
    .alert-description {
      font-family: var(--zs-prophet-copy);
    }

    .alert-kicker {
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.84rem;
      opacity: 0.85;
    }

    .alert-title {
      font-family: var(--zs-prophet-title);
      font-size: 1.1rem;
      line-height: 1.05;
    }

    .alert-description {
      margin-top: 6px;
      font-size: 0.98rem;
      line-height: 1.15;
    }

    .fact-label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--zs-prophet-muted);
    }

    .fact-value {
      margin-top: 4px;
      font-size: 1.2rem;
    }

    .section {
      display: grid;
      gap: 12px;
    }

    .section-header {
      padding-top: 4px;
      border-top: 1px solid color-mix(in srgb, var(--zs-prophet-border) 38%, transparent);
    }

    .section-title {
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 1rem;
    }

    .forecast-temp {
      margin: 8px 0;
      font-family: var(--zs-prophet-title);
      font-size: 1.35rem;
    }

    .empty {
      padding: 24px 16px;
      font-family: var(--zs-prophet-copy);
      color: var(--zs-prophet-muted);
      text-align: center;
    }

    .debug-panel {
      display: grid;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px dashed color-mix(in srgb, var(--zs-prophet-border) 45%, transparent);
    }

    .debug-title {
      font-family: var(--zs-prophet-title);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .debug-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
    }

    .debug-item {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(255, 248, 230, 0.2);
      border: 1px solid rgba(104, 73, 39, 0.1);
    }

    .debug-label,
    .debug-value {
      font-family: var(--zs-prophet-copy);
    }

    .debug-label {
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--zs-prophet-muted);
    }

    .debug-value {
      margin-top: 4px;
      font-size: 0.98rem;
      line-height: 1.15;
      word-break: break-word;
    }

    @keyframes drift {
      from { transform: translateX(-4%); }
      to { transform: translateX(7%); }
    }

    @media (max-width: 760px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .bureau-grid,
      .bureau-hero,
      .bureau-reading-card {
        grid-template-columns: 1fr;
      }

      .bureau-meta {
        justify-items: start;
        text-align: left;
      }

      .bureau-reading-card .icon-medallion {
        margin: 0 auto;
      }

      .bureau-layout .temperature,
      .bureau-layout .condition,
      .bureau-layout .apparent {
        text-align: center;
      }

      .hero-side {
        min-height: 0;
      }

      .title {
        font-size: clamp(1.8rem, 9vw, 2.9rem);
      }
    }
  `;
customElements.define(CARD_TAG, ZSDailyProphetCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: CARD_TAG,
    name: 'ZS Daily Prophet Card',
    preview: true,
    description: 'Daily Prophet inspired weather card for Home Assistant',
    documentationURL: 'https://github.com/bwrwk/zs-daily-prophet-card',
});
//# sourceMappingURL=zs-daily-prophet-weather-card.js.map

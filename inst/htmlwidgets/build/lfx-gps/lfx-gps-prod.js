(()=>{var t={220:(t,i,o)=>{var s,n,e;n=[o(525)],void 0===(e="function"==typeof(s=function(t){return t.Control.Gps=t.Control.extend({includes:"1"==t.version[0]?t.Evented.prototype:t.Mixin.Events,options:{autoActive:!1,autoCenter:!1,autoFollow:!0,maxZoom:null,textErr:"",callErr:null,title:"Center map on your location",marker:null,style:{radius:5,weight:2,color:"#c20",opacity:1,fillColor:"#f23",fillOpacity:1},position:"topleft",transform:function(t){return t}},initialize:function(i){i&&i.style&&(i.style=t.Util.extend({},this.options.style,i.style)),t.Util.setOptions(this,i),this._errorFunc=this.options.callErr||this.showAlert,this._isActive=!1,this._isLoading=!1,this._currentLocation=null},onAdd:function(i){this._map=i;var o=t.DomUtil.create("div","leaflet-control-gps");return this._button=t.DomUtil.create("a","gps-button",o),this._button.href="#",this._button.title=this.options.title,t.DomEvent.on(this._button,"dblclick",t.DomEvent.stop,this).on(this._button,"click",t.DomEvent.stop,this).on(this._button,"click",this._switchGps,this),this._alert=t.DomUtil.create("div","gps-alert",o),this._alert.style.display="none",this._gpsMarker=this.options.marker?this.options.marker:new t.CircleMarker([0,0],this.options.style),this.options.autoFollow?this._map.on("locationfound",this._drawGps,this):this._map.once("locationfound",this._drawGps,this),this._map.on("locationerror",this._errorGps,this),this.options.autoActive&&this.activate(),o},onRemove:function(t){this.deactivate(),t.off("locationfound",this._drawGps,this).off("locationerror",this._errorGps,this)},_switchGps:function(){this._isActive||this._isLoading?this.deactivate():this.activate()},getLocation:function(){return this._currentLocation},activate:function(){this._isActive=!0,this._isLoading=!0,this._map.addLayer(this._gpsMarker),t.DomUtil.addClass(this._button,"loading"),this._map.once("locationfound",(function(i){t.DomUtil.removeClass(this._button,"loading"),t.DomUtil.removeClass(this._button,"disabled"),t.DomUtil.addClass(this._button,"active"),this._isLoading=!1,this.options.autoCenter&&this._map.setView(i.latlng,this.options.maxZoom||this._map.getZoom())}),this),this._map.locate({enableHighAccuracy:!1,watch:!0,setView:!1})},deactivate:function(){this._isActive=!1,this._isLoading=!1,t.DomUtil.removeClass(this._button,"active"),t.DomUtil.removeClass(this._button,"loading"),this._map&&(this._map.stopLocate(),this._map.removeLayer(this._gpsMarker)),this.fire("gps:disabled",{marker:this._gpsMarker})},_drawGps:function(t){this._currentLocation=this.options.transform(t.latlng),this._gpsMarker.setLatLng(this._currentLocation),this.options.autoFollow?this._map.on("locationfound",this._drawGps,this):this._map.once("locationfound",this._drawGps,this),this._map.on("locationerror",this._errorGps,this),this.options.autoActive&&this.activate()},_errorGps:function(i){this.fire("gps:error",i),this.deactivate(),t.DomUtil.addClass(this._button,"disabled"),this._errorFunc.call(this,this.options.textErr||i.message)},showAlert:function(t){this._alert.style.display="block",this._alert.innerHTML=t;var i=this;clearTimeout(this.timerAlert),this.timerAlert=setTimeout((function(){i._alert.style.display="none"}),5e3)}}),t.Map.addInitHook((function(){this.options.gpsControl&&(this.gpsControl=t.control.gps(this.options.gpsControl),this.addControl(this.gpsControl))})),t.control.gps=function(i){return new t.Control.Gps(i)},t.Control.Gps})?s.apply(i,n):s)||(t.exports=e)},537:()=>{},525:t=>{"use strict";t.exports=L}},i={};function o(s){var n=i[s];if(void 0!==n)return n.exports;var e=i[s]={exports:{}};return t[s](e,e.exports,o),e.exports}o(220),o(537)})();
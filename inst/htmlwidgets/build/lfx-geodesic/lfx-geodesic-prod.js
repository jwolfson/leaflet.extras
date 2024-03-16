(()=>{"use strict";void 0===Number.prototype.toRadians&&(Number.prototype.toRadians=function(){return this*Math.PI/180}),void 0===Number.prototype.toDegrees&&(Number.prototype.toDegrees=function(){return 180*this/Math.PI});var t=179.999;L.Geodesic=L.Polyline.extend({options:{color:"blue",steps:10,dash:1,wrap:!0},initialize:function(t,a){this.options=this._merge_options(this.options,a),this.options.dash=Math.max(.001,Math.min(1,parseFloat(this.options.dash)||1)),this.datum={},this.datum.ellipsoid={a:6378137,b:6356752.3142,f:1/298.257223563},this._latlngs=this._generate_Geodesic(t),L.Polyline.prototype.initialize.call(this,this._latlngs,this.options)},setLatLngs:function(t){this._latlngs=this._generate_Geodesic(t),L.Polyline.prototype.setLatLngs.call(this,this._latlngs)},getStats:function(){let t,a,s={distance:0,points:0,polygons:this._latlngs.length};for(t=0;t<this._latlngs.length;t++)for(s.points+=this._latlngs[t].length,a=0;a<this._latlngs[t].length-1;a++)s.distance+=this._vincenty_inverse(this._latlngs[t][a],this._latlngs[t][a+1]).distance;return s},geoJson:function(t){let a=L.GeoJSON.asFeature(t),s="FeatureCollection"===a.type?a.features:[a];this._latlngs=[];for(let t of s){let a="Feature"===t.type?t.geometry:t,s=a.coordinates;switch(a.type){case"LineString":this._latlngs.push(this._generate_Geodesic([L.GeoJSON.coordsToLatLngs(s,0)]));break;case"MultiLineString":case"Polygon":this._latlngs.push(this._generate_Geodesic(L.GeoJSON.coordsToLatLngs(s,1)));break;case"Point":case"MultiPoint":console.log("Dude, points can't be drawn as geodesic lines...");break;default:console.log("Drawing "+a.type+" as a geodesic is not supported. Skipping...")}}L.Polyline.prototype.setLatLngs.call(this,this._latlngs)},createCircle:function(a,s){let n,i=0,e={lat:0,lng:0,brg:0};this._latlngs=[],this._latlngs[i]=[];let l=this._vincenty_direct(L.latLng(a),0,s,this.options.wrap);for(e=L.latLng(l.lat,l.lng),this._latlngs[i].push(e),n=1;n<=this.options.steps;){l=this._vincenty_direct(L.latLng(a),360/this.options.steps*n,s,this.options.wrap);let o=L.latLng(l.lat,l.lng);if(Math.abs(o.lng-e.lng)>180){let a=this._vincenty_inverse(e,o),s=this._intersection(e,a.initialBearing,{lat:-89,lng:o.lng-e.lng>0?-179.999:t},0);s?(this._latlngs[i].push(L.latLng(s.lat,s.lng)),i++,this._latlngs[i]=[],e=L.latLng(s.lat,-s.lng),this._latlngs[i].push(e)):(i++,this._latlngs[i]=[],this._latlngs[i].push(o),e=o,n++)}else this._latlngs[i].push(o),e=o,n++}L.Polyline.prototype.setLatLngs.call(this,this._latlngs)},_generate_Geodesic:function(a){let s=[],n=0;for(let i=0;i<a.length;i++){s[n]=[];let e=L.latLng(a[i][0]);for(let l=0;l<a[i].length-1;l++){let o=e,h=L.latLng(a[i][l+1]);if(o.equals(h))continue;let r=this._vincenty_inverse(o,h);s[n].push(e);for(let a=1;a<=this.options.steps;){let i=r.distance/this.options.steps,l=a-1+this.options.dash,h=this._vincenty_direct(o,r.initialBearing,i*l,this.options.wrap),g=L.latLng(h.lat,h.lng);if(Math.abs(g.lng-e.lng)>180){let i=this._intersection(o,r.initialBearing,{lat:-89,lng:g.lng-e.lng>0?-179.999:t},0);i?(s[n].push(L.latLng(i.lat,i.lng)),n++,s[n]=[],e=L.latLng(i.lat,-i.lng),s[n].push(e)):(n++,s[n]=[],s[n].push(g),e=g,a++)}else{if(s[n].push(g),this.options.dash<1){n++;let t=this._vincenty_direct(o,r.initialBearing,i*a,this.options.wrap);s[n]=[],e=L.latLng(t.lat,t.lng),s[n].push(e)}else e=g;a++}}}n++}return s},_vincenty_direct:function(t,a,s,n){var i,e,l,o,h=t.lat.toRadians(),r=t.lng.toRadians(),g=a.toRadians(),M=s,c=this.datum.ellipsoid.a,p=this.datum.ellipsoid.b,u=this.datum.ellipsoid.f,d=Math.sin(g),_=Math.cos(g),L=(1-u)*Math.tan(h),f=1/Math.sqrt(1+L*L),v=L*f,y=Math.atan2(L,_),P=f*d,m=1-P*P,b=m*(c*c-p*p)/(p*p),I=1+b/16384*(4096+b*(b*(320-175*b)-768)),R=b/1024*(256+b*(b*(74-47*b)-128)),N=M/(p*I),w=0;do{o=Math.cos(2*y+N),i=N,N=M/(p*I)+R*(e=Math.sin(N))*(o+R/4*((l=Math.cos(N))*(2*o*o-1)-R/6*o*(4*e*e-3)*(4*o*o-3)))}while(Math.abs(N-i)>1e-12&&++w);var D,G=v*e-f*l*_,q=Math.atan2(v*l+f*e*_,(1-u)*Math.sqrt(P*P+G*G)),B=u/16*m*(4+u*(4-3*m)),S=Math.atan2(e*d,f*l-v*e*_)-(1-B)*u*P*(N+B*e*(o+B*l*(2*o*o-1)));D=n?(r+S+3*Math.PI)%(2*Math.PI)-Math.PI:r+S;var F=Math.atan2(P,-G);return{lat:q.toDegrees(),lng:D.toDegrees(),finalBearing:F.toDegrees()}},_vincenty_inverse:function(t,a){var s,n,i,e,l,o,h,r,g=t.lat.toRadians(),M=t.lng.toRadians(),c=a.lat.toRadians(),p=a.lng.toRadians(),u=this.datum.ellipsoid.a,d=this.datum.ellipsoid.b,_=this.datum.ellipsoid.f,L=p-M,f=(1-_)*Math.tan(g),v=1/Math.sqrt(1+f*f),y=f*v,P=(1-_)*Math.tan(c),m=1/Math.sqrt(1+P*P),b=P*m,I=L,R=0;do{var N=m*(h=Math.sin(I))*(m*h)+(v*b-y*m*(r=Math.cos(I)))*(v*b-y*m*r);if(0==(i=Math.sqrt(N)))return 0;l=y*b+v*m*r,o=Math.atan2(i,l);var w=v*m*h/i;e=l-2*y*b/(n=1-w*w),isNaN(e)&&(e=0);var D=_/16*n*(4+_*(4-3*n));s=I,I=L+(1-D)*_*w*(o+D*i*(e+D*l*(2*e*e-1)))}while(Math.abs(I-s)>1e-12&&++R<100);if(R>=100)return console.log("Formula failed to converge. Altering target position."),this._vincenty_inverse(t,{lat:a.lat,lng:a.lng-.01});var G=n*(u*u-d*d)/(d*d),q=G/1024*(256+G*(G*(74-47*G)-128)),B=d*(1+G/16384*(4096+G*(G*(320-175*G)-768)))*(o-q*i*(e+q/4*(l*(2*e*e-1)-q/6*e*(4*i*i-3)*(4*e*e-3)))),S=Math.atan2(m*h,v*b-y*m*r),F=Math.atan2(v*h,-y*m+v*b*r);return{distance:B=Number(B.toFixed(3)),initialBearing:S.toDegrees(),finalBearing:F.toDegrees()}},_intersection:function(t,a,s,n){var i=t.lat.toRadians(),e=t.lng.toRadians(),l=s.lat.toRadians(),o=s.lng.toRadians(),h=Number(a).toRadians(),r=Number(n).toRadians(),g=l-i,M=o-e,c=2*Math.asin(Math.sqrt(Math.sin(g/2)*Math.sin(g/2)+Math.cos(i)*Math.cos(l)*Math.sin(M/2)*Math.sin(M/2)));if(0==c)return null;var p=Math.acos((Math.sin(l)-Math.sin(i)*Math.cos(c))/(Math.sin(c)*Math.cos(i)));isNaN(p)&&(p=0);var u,d,_=Math.acos((Math.sin(i)-Math.sin(l)*Math.cos(c))/(Math.sin(c)*Math.cos(l)));Math.sin(o-e)>0?(u=p,d=2*Math.PI-_):(u=2*Math.PI-p,d=_);var L=(h-u+Math.PI)%(2*Math.PI)-Math.PI,f=(d-r+Math.PI)%(2*Math.PI)-Math.PI;if(0==Math.sin(L)&&0==Math.sin(f))return null;if(Math.sin(L)*Math.sin(f)<0)return null;var v=Math.acos(-Math.cos(L)*Math.cos(f)+Math.sin(L)*Math.sin(f)*Math.cos(c)),y=Math.atan2(Math.sin(c)*Math.sin(L)*Math.sin(f),Math.cos(f)+Math.cos(L)*Math.cos(v)),P=Math.asin(Math.sin(i)*Math.cos(y)+Math.cos(i)*Math.sin(y)*Math.cos(h)),m=e+Math.atan2(Math.sin(h)*Math.sin(y)*Math.cos(i),Math.cos(y)-Math.sin(i)*Math.sin(P));return m=(m+3*Math.PI)%(2*Math.PI)-Math.PI,{lat:P.toDegrees(),lng:m.toDegrees()}},_merge_options:function(t,a){let s={};for(let a in t)s[a]=t[a];for(let t in a)s[t]=a[t];return s}}),L.geodesic=function(t,a){return new L.Geodesic(t,a)}})();
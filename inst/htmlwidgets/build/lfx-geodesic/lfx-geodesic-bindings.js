LeafletWidget.methods.addGeodesicPolylines=function(e,t,l,o,a,i,r,c,n){if(e.length>0){var s=(new LeafletWidget.DataFrame).col("shapes",e).col("layerId",t).col("group",l).col("popup",a).col("popupOptions",i).col("label",r).col("labelOptions",c).col("highlightOptions",n).cbind(o);LeafletWidget.methods.addGenericLayers(this,"shape",s,(function(e,t){for(var l=e.get(t,"shapes"),o=[],a=0;a<l.length;a++)for(var i=0;i<l[a].length;i++)o.push(HTMLWidgets.dataframeToD3(l[a][i]));return L.geodesic(o,e.get(t))}))}},LeafletWidget.methods.addGreatCircles=function(e,t,l,o,a,i,r,c,n,s,d){if(!$.isEmptyObject(e)&&!$.isEmptyObject(t)||$.isNumeric(e)&&$.isNumeric(t)){var g=(new LeafletWidget.DataFrame).col("lat",e).col("lng",t).col("radius",l).col("layerId",o).col("group",a).col("popup",r).col("popupOptions",c).col("label",n).col("labelOptions",s).col("highlightOptions",d).cbind(i),p=this;LeafletWidget.methods.addGenericLayers(this,"shape",g,(function(e,t){var l=e.get(t),o=L.geodesic([],l),a=L.marker([e.get(t,"lat"),e.get(t,"lng")]);return p.on("layeradd",(function(e){e.layer===o&&a.addTo(p)})),p.on("layerremove",(function(e){e.layer===o&&p.removeLayer(a)})),o.createCircle([e.get(t,"lat"),e.get(t,"lng")],e.get(t,"radius")),o}))}};
//# sourceMappingURL=lfx-geodesic-bindings.js.map
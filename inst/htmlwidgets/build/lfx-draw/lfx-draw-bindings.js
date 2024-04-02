LeafletWidget.methods.addDrawToolbar=function(e,a,r){(function(){var t,o=this;if(o.drawToolbar&&(o.drawToolbar.remove(o),delete o.drawToolbar),e){if(!(t=o.layerManager.getLayer("geojson",e)))throw"GeoJSON layer with ID "+e+" not Found";o._editableGeoJSONLayerId=e}else a||(a="editableFeatureGroup"),t=o.layerManager.getLayerGroup(a,!0),o._editableFeatureGroupName=a;if(r&&r.draw&&r.draw.marker&&r.draw.marker.markerIcon&&r.draw.marker.markerIconFunction&&(r.draw.marker.icon=r.draw.marker.markerIconFunction(r.draw.marker.markerIcon)),!$.isEmptyObject(r.edit)){var n={};r.edit.remove||(n.remove=!1),r.edit.edit?$.isEmptyObject(r.edit.selectedPathOptions)||(n.edit={},n.edit.selectedPathOptions=r.edit.selectedPathOptions):n.edit=!1,$.isEmptyObject(r.edit.poly)||(n.poly=r.edit.poly),n.featureGroup=t,r.edit=n}if(r&&r.toolbar){var d=r.toolbar,i=L.drawLocal.draw.toolbar;L.drawLocal.draw.toolbar.buttons=Object.assign({},i.buttons,d.buttons),L.drawLocal.draw.toolbar.actions=Object.assign({},i.actions,d.actions),L.drawLocal.draw.toolbar.finish=Object.assign({},i.finish,d.finish),L.drawLocal.draw.toolbar.undo=Object.assign({},i.undo,d.undo)}if(r&&r.handlers){var l=r.handlers,s=L.drawLocal.draw.handlers;L.drawLocal.draw.handlers.circle=Object.assign({},s.circle,l.circle),L.drawLocal.draw.handlers.circlemarker=Object.assign({},s.circlemarker,l.circlemarker),L.drawLocal.draw.handlers.marker=Object.assign({},s.marker,l.marker),L.drawLocal.draw.handlers.polygon=Object.assign({},s.polygon,l.polygon),L.drawLocal.draw.handlers.polyline=Object.assign({},s.polyline,l.polyline),L.drawLocal.draw.handlers.rectangle=Object.assign({},s.rectangle,l.rectangle)}o.drawToolbar=new L.Control.Draw(r),o.drawToolbar.addTo(o),o.on(L.Draw.Event.DRAWSTART,(function(e){HTMLWidgets.shinyMode&&Shiny.onInputChange(o.id+"_draw_start",{feature_type:e.layerType,nonce:Math.random()})})),o.on(L.Draw.Event.DRAWSTOP,(function(e){HTMLWidgets.shinyMode&&Shiny.onInputChange(o.id+"_draw_stop",{feature_type:e.layerType,nonce:Math.random()})})),o.on(L.Draw.Event.CREATED,(function(e){r.draw.singleFeature&&t.getLayers().length>0&&t.clearLayers();var a=e.layer;t.addLayer(a);var n=L.stamp(a);a.feature={type:"Feature",properties:{_leaflet_id:n,feature_type:e.layerType}},"function"==typeof a.getRadius&&(a.feature.properties.radius=a.getRadius()),HTMLWidgets.shinyMode&&(Shiny.onInputChange(o.id+"_draw_new_feature",a.toGeoJSON()),Shiny.onInputChange(o.id+"_draw_all_features",t.toGeoJSON()))})),o.on(L.Draw.Event.EDITSTART,(function(){HTMLWidgets.shinyMode&&Shiny.onInputChange(o.id+"_draw_editstart",!0)})),o.on(L.Draw.Event.EDITSTOP,(function(){HTMLWidgets.shinyMode&&Shiny.onInputChange(o.id+"_draw_editstop",!0)})),o.on(L.Draw.Event.EDITED,(function(e){var a=e.layers;a.eachLayer((function(e){var a=L.stamp(e);e.feature||(e.feature={type:"Feature"}),e.feature.properties||(e.feature.properties={}),e.feature.properties._leaflet_id=a,e.feature.properties.layerId=e.options.layerId,"function"==typeof e.getRadius&&(e.feature.properties.radius=e.getRadius())})),HTMLWidgets.shinyMode&&(Shiny.onInputChange(o.id+"_draw_edited_features",a.toGeoJSON()),Shiny.onInputChange(o.id+"_draw_all_features",t.toGeoJSON()))})),o.on(L.Draw.Event.DELETESTART,(function(){HTMLWidgets.shinyMode&&Shiny.onInputChange(o.id+"_draw_deletestart",!0)})),o.on(L.Draw.Event.DELETESTOP,(function(){HTMLWidgets.shinyMode&&Shiny.onInputChange(o.id+"_draw_deletestop",!0)})),o.on(L.Draw.Event.DELETED,(function(e){var a=e.layers;a.eachLayer((function(e){var a=L.stamp(e);e.feature||(e.feature={type:"Feature"}),e.feature.properties||(e.feature.properties={}),e.feature.properties._leaflet_id=a,e.feature.properties.layerId=e.options.layerId,"function"==typeof e.getRadius&&(e.feature.properties.radius=e.getRadius())})),HTMLWidgets.shinyMode&&(Shiny.onInputChange(o.id+"_draw_deleted_features",a.toGeoJSON()),Shiny.onInputChange(o.id+"_draw_all_features",t.toGeoJSON()))}))}).call(this)},LeafletWidget.methods.removeDrawToolbar=function(e){(function(){var a=this;a.drawToolbar&&(a.drawToolbar.remove(a),delete a.drawToolbar),a._editableFeatureGroupName&&e&&a.layerManager.getLayerGroup(a._editableFeatureGroupName,!1).clearLayers(),a._editableFeatureGroupName=null,a._editableGeoJSONLayerId&&e&&a.layerManager.removeLayer("geojson",a._editableGeoJSONLayerId),a._editableGeoJSONLayerId=null}).call(this)},LeafletWidget.methods.getDrawnItems=function(){var e,a=this;return a._editableGeoJSONLayerId?e=a.layerManager.getLayer("geojson",a._editableGeoJSONLayerId):a._editableFeatureGroupName&&(e=a.layerManager.getLayerGroup(a._editableFeatureGroupName,!1)),e?e.toGeoJSON():null};
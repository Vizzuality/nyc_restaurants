

  (function() {

    var map = new L.Map('map').setView(new L.LatLng(40.7143528, -74.0059731), 14)
      , streetMapUrl = 'http://{s}.tiles.mapbox.com/v3/cartodb.map-u6vat89l/{z}/{x}/{y}.png'
      , streetMapLayer = new L.TileLayer(streetMapUrl, { maxZoom: 19, attribution: 'Tiles: &copy; Mapbox' });

    map.addLayer(streetMapLayer)

    var ny_restaurants = new L.CartoDBLayer({
      map: map,
      user_name:'viz2',
      table_name: 'restaurant_week',
      query: "SELECT * FROM {{table_name}}",
      interactivity: "cartodb_id,name,meal,cuisine,price,link",
      featureOver: function(ev,latlng,pos,data) {
        // document.body.style.cursor = "pointer";
        // showTooltip(data,pos)
        
        // // Show the hover point if it is a different feature
        // if (data.cartodb_id != circleMarker.cartodb_id) {
        //   map.removeLayer(circleMarker);
        
        //   circleMarker = new L.CircleMarker(new L.LatLng(data.lat, data.lng), hover_style);
        //   circleMarker.cartodb_id = data.cartodb_id;
          
        //   map.addLayer(circleMarker);
        // }
        
      },
      featureOut: function() {
        // document.body.style.cursor = "default";
        // hideTooltip();
        
        // // Hide and remove in any case the hover point
        // circleMarker.cartodb_id = null;
        // map.removeLayer(circleMarker)
      },
      featureClick: function(ev,latlng,pos,data) {
        // console.log("jamon");
        //window.open(data["link"],"_blank");
      },
      auto_bound: false
    });

    map.addLayer(ny_restaurants)


  })()
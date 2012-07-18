

  (function() {


    var NYCRestaurants = Backbone.View.extend({

      el: $("body"),

      options: {
        user_name: "viz2",
        table_name: "restaurant_week",
        mapId: "map"
      },

      events: {
        "click ul > li > a.type":  "_setFilter"
      },


      initialize: function() {
        this._initMap();
        this._initLayer();
        this.filters = [];
      },

      render: function() {
        
      },      


      _initMap: function() {
        var map = this.map = new L.Map(this.options.mapId).setView(new L.LatLng(40.7143528, -74.0059731), 14)
          , mapboxUrl = 'http://{s}.tiles.mapbox.com/v3/cartodb.map-u6vat89l/{z}/{x}/{y}.png'
          , mapboxLayer = new L.TileLayer(mapboxUrl, { maxZoom: 19, attribution: 'Tiles: &copy; Mapbox' });

        map.addLayer(mapboxLayer);
      },


      _initLayer: function() {
        var layer = this.layer = new L.CartoDBLayer({
          map: this.map,
          user_name: this.options.user_name,
          table_name: this.options.table_name,
          query: "SELECT * FROM {{table_name}}",
          interactivity: "cartodb_id,name,meal,cuisine,price,link",
          featureOver: this._featureOver,
          featureOut: this._featureOut,
          featureClick: this._featureClick,
          auto_bound: false
        });

        this.map.addLayer(layer)
      },

      _updateLayer: function() {

        var query = "SELECT * FROM {{table_name}} ";

        if (_.size(this.filters) > 0) {
          query += "WHERE ";
          _.each(this.filters, function(cuisine,i) {
            query += " cuisine ILIKE '%" + cuisine + "%' OR ";
          });

          query = query.substring(0, query.length-3);
        }
        
        this.layer.setQuery(query);
      },


      // Library events
      _featureOver: function(ev,latlng,pos,data) {

      },
      _featureOut: function() {

      },
      _featureClick: function(ev,latlng,pos,data) {

      },


      // Aside events
      _setFilter: function(ev) {
        ev.preventDefault();

        var cuisine = $(ev.target).text();

        // if () {
        //   $(ev.target).addClass("selected");
        // } else {
        //   $(ev.target).removeClass("selected");
        // }

        this.filters.push(cuisine);

        // Change filter
        this._updateLayer();
      }
    });

    var app = new NYCRestaurants();
  })()
Vue.component('lmap',{
    template:`
        <div class="lmap">
            <div id="map">
            </div>
        </div>
    `,

    data(){
        return{
            map: null,
            tileLayer: null,
            layerGroup:null,
            selectedMarker: {}
        }
    },

    mounted(){
        this.initMap();
        this.map.on('click', (e) => {
            if(this.selectedMarker != undefined){
                this.layerGroup.removeLayer(this.selectedMarker);
                this.selectedMarker = null;
            }
            this.selectedMarker = L.marker(e.latlng);
            this.layerGroup.addLayer(this.selectedMarker);
            this.$parent.isSelected=true;
        });
    },

    methods:{
        initMap(){
            this.map = L.map('map').setView([this.$parent.map_data.map_lat, this.$parent.map_data.map_lng], this.$parent.map_data.map_zoom);
            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                {
                    maxZoom: 18,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                }
            );
            this.tileLayer.addTo(this.map);
            L.control.scale().addTo(this.map);
            this.layerGroup = L.layerGroup().addTo(this.map); //Use a layerGroup instead of add all marker to the map, easier to clear all
        },

        validate_choice(){
            let searchedMarker = L.marker([this.$parent.images[this.$parent.index_img]['lat'], this.$parent.images[this.$parent.index_img]['lng']]).addTo(this.layerGroup);
            let coord = Array();
            coord.push(searchedMarker.getLatLng());
            coord.push(this.selectedMarker.getLatLng());
            let pathLine = L.polyline(coord, {color:'red'}).addTo(this.layerGroup);
            this.map.fitBounds(pathLine.getBounds());
            this.$parent.submit_choice(this.selectedMarker.getLatLng());
        },

        clearMap(){
            this.layerGroup.clearLayers();
            this.map.flyTo([this.$parent.images[this.$parent.index_img]['lat'], this.$parent.images[this.$parent.index_img]['lng']], this.$parent.map_data.map_zoom);
        }
    }
})

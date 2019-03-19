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
    },

    methods:{
        /* Method initMap used to initialize the map */
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

        /* Method validate_choice used to validate the marker placed by the user */
        validate_choice(){
            this.map.off('click');

            let cIcon = L.icon({
                iconUrl: '../images/flag.svg',
            
                iconSize:     [38, 95], // size of the icon
                iconAnchor:   [3, 65], // point of the icon which will correspond to marker's location
            });
            let searchedMarker = L.marker([this.$parent.images[this.$parent.index_img]['latitude'], this.$parent.images[this.$parent.index_img]['longitude']], {icon: cIcon}).addTo(this.layerGroup);
            
            let coord = Array();
            coord.push(searchedMarker.getLatLng());
            coord.push(this.selectedMarker.getLatLng());
            let pathLine = L.polyline(coord, {color:'red'}).addTo(this.layerGroup);
            this.map.fitBounds(pathLine.getBounds());
            this.$parent.submit_choice(this.selectedMarker.getLatLng());
        },

        /* Method clearMap used to delete all marker and line from the map, and set the position
        of the map to the initial location */
        clearMap(){
            this.layerGroup.clearLayers();
            this.map.flyTo([this.$parent.map_data['map_lat'], this.$parent.map_data['map_lng']], this.$parent.map_data.map_zoom);
            this.map.once('moveend', () => {
                this.$parent.$children[1].chronoStart();
                this.addOnClick();
            });
        },

        /* Method addOnClick used to add the onClick listener to the map, for put marker */
        addOnClick(){
            this.map.on('click', (e) => {
                if(this.selectedMarker != undefined){
                    this.layerGroup.removeLayer(this.selectedMarker);
                    this.selectedMarker = null;
                }
                this.selectedMarker = L.marker(e.latlng);
                this.layerGroup.addLayer(this.selectedMarker);
                this.$parent.isSelected=true;
            });
        }
    }
})

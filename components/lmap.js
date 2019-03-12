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
            layers: [],
            selectedMarker: {}
        }
    },

    mounted(){
        this.initMap();
        this.initLayers();
        
        this.map.on('click', (e) => {

            if(this.selectedMarker != undefined){
                this.map.removeLayer(this.selectedMarker);
                this.selectedMarker = null;
            }

            this.selectedMarker = L.marker(e.latlng).addTo(this.map);
            this.$parent.has_selected();
        });
    },

    methods:{
        initMap(){
            this.map = L.map('map').setView([48.6937223, 6.1834097], 13);
            this.tileLayer = L.tileLayer(
              'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
              {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
              }
            );
            this.tileLayer.addTo(this.map);
        },

        initLayers(){
            //Get pictures and points ! Temp point

        },

        validate_choice(){
            let searchedMarker = L.marker([this.$parent.images[this.$parent.index_img]['lat'], this.$parent.images[this.$parent.index_img]['lng']]).addTo(this.map);
            
            let coord = Array();

            coord.push(searchedMarker.getLatLng());
            coord.push(this.selectedMarker.getLatLng());
            
            let pathLine = L.polyline(coord, {color:'red'}).addTo(this.map);
            this.map.fitBounds(pathLine.getBounds());

            this.$parent.submit_choice(this.selectedMarker.getLatLng());
        }
    }
})

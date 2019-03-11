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
            console.log(e.latlng);

            if(this.selectedMarker != undefined){
                this.map.removeLayer(this.selectedMarker);
                this.selectedMarker = null;
            }

            this.selectedMarker = L.marker(e.latlng).addTo(this.map);
            this.$parent.submit_choice(e.latlng)
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
            //Get pictures and points !
        }
    }
})

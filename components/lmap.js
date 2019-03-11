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
            layers: [
            ],
            selectedPoint:null
        }
    },

    mounted(){
        this.initMap();
        this.initLayers();
        
        this.map.on('click', (e) => {
            console.log(e.latlng);

            if(this.selectedPoint != null){
                this.map.removeLayer(L.marker(this.selectedPoint));
                this.selectedPoint = null;
            }

            this.selectedPoint = e.latlng;

            let marker = L.marker(this.selectedPoint).addTo(this.map);
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
Vue.component('chronometer',{
    template:`
        <span class="text-danger h3" id="chronotime">00:00:00</span>  
    `,

    data(){
        return{
            startTime: 0,
            start: 0,
            end: 0,
            diff: 0,
            timerID: 0
        }
    },

    mounted(){
    },

    methods:{
        /* Method chrono used to initialize the chronometer */
        chrono(){
            this.end = new Date();
            this.diff = this.end - this.start;
            this.diff = new Date(this.diff);
            let msec = this.diff.getMilliseconds();
            let sec = this.diff.getSeconds();
            let min = this.diff.getMinutes();
            let hr = this.diff.getHours()-1;
            if (min < 10){
                min = "0" + min;
            }
            if (sec < 10){
                sec = "0" + sec;
            }
            if(msec < 10){
                msec = "00" +msec;
            }
            else if(msec < 100){
                msec = "0" +msec;
            }
            document.getElementById("chronotime").innerHTML = min + ":" + sec + ":" + msec;
            this.timerID = setTimeout(this.chrono, 100);
        },
        /* Method chronoStart used to start the chrono */
        chronoStart(){
            this.start = new Date();
            this.chrono();
        },
        /* Method chronoContinue used to start the chrono after a stop */
        chronoContinue(){
            this.start = new Date()-this.diff;
            this.start = new Date(this.start);
            this.chrono();
        },
        /* Method chronoReset used to reset the chrono */
        chronoReset(){
            document.getElementById("chronotime").innerHTML = "00:00:000";
            this.start = new Date();
        },
        /* Method chronoStop used to stop the chrono */
        chronoStop(){
            clearTimeout(this.timerID);
        }
    }
})

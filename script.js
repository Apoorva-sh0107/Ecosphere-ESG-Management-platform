// Line Chart

const emissionCtx = document.getElementById("emissionChart");

new Chart(emissionCtx, {
    type: "line",
    data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun"],
        datasets: [{
            label: "CO₂ Emission",
            data: [20,35,28,45,40,60],
            borderColor:"#00ff66",
            backgroundColor:"rgba(0,255,102,0.2)",
            fill:true,
            tension:0.4
        }]
    },
    options:{
        responsive:true,
        maintainAspectRatio:false
    }
});


// Bar Chart

const deptCtx = document.getElementById("departmentChart");

new Chart(deptCtx,{
    type:"bar",

    data:{

        labels:["Sales","HR","IT","Finance","R&D"],

        datasets:[{

            label:"Department ESG",

            data:[65,82,91,74,68],

            backgroundColor:[
                "#00ff66",
                "#3b82f6",
                "#a855f7",
                "#f97316",
                "#facc15"
            ]

        }]

    },

    options:{

        responsive:true,

        maintainAspectRatio:false

    }

});
const path = require("path");

const express = require("express");
var sharedsession = require("express-socket.io-session");
const bodyParser = require("body-parser");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let allMachines = [{
        mc_id: "mc001",
        mc_name: "Spark01",
        production_rate: 70,
        operation_time: 160,
        units: {
            target_units: 33700,
            good_units: 11100,
            current_units: 11100,
        },
        availability: {
            planned_runtime: 540, //include break time
            actual_runtime: 480, //real operation
            unplanned_downtime: 20,
        },
        performance: {
            planned_units: 33700,
            current_units: 11100,
        },
        quality: {
            current_units: 11100,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc002",
        mc_name: "Copper02",
        production_rate: 30,
        operation_time: 100,
        units: {
            target_units: 7500,
            good_units: 3067,
            current_units: 3067,
        },
        availability: {
            planned_runtime: 630,
            actual_runtime: 100,
            unplanned_downtime: 40,
        },
        performance: {
            planned_units: 7500,
            current_units: 3067,
        },
        quality: {
            current_units: 3067,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc003",
        mc_name: "Socket003",
        operation_time: 200,
        production_rate: 200,
        units: {
            target_units: 42000,
            good_units: 20000,
            current_units: 20000,
        },
        availability: {
            planned_runtime: 420,
            actual_runtime: 200,
            unplanned_downtime: 60,
        },
        performance: {
            planned_units: 42000,
            current_units: 20000,
        },
        quality: {
            current_units: 20000,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc004",
        mc_name: "Cole004",
        operation_time: 160,
        production_rate: 400,

        units: {
            target_units: 3500,
            good_units: 2700,
            current_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc005",
        mc_name: "Evxx005",
        production_rate: 98,
        operation_time: 160,
        units: {
            target_units: 3500,
            good_units: 1800,
            current_units: 2000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc006",
        mc_name: "Max006",
        production_rate: 86,
        operation_time: 160,
        units: {
            target_units: 3500,
            good_units: 2700,
            current_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc007",
        mc_name: "JamesBond007",
        production_rate: 74,
        operation_time: 160,
        units: {
            target_units: 1100,
            good_units: 1000,
            current_units: 1000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc008",
        mc_name: "Machine008",
        production_rate: 90,
        operation_time: 160,
        units: {
            target_units: 1000,
            good_units: 757,
            current_units: 800,
        },
        availability: {
            planned_runtime: 550,
            actual_runtime: 540,
            unplanned_downtime: 10,
        },
        performance: {
            planned_units: 1000,
            current_units: 800,
        },
        quality: {
            current_units: 800,
            reject_units: 43,
        },

    },
    {
        mc_id: "mc009",
        mc_name: "Machine009",
        production_rate: 58,
        operation_time: 160,
        units: {
            target_units: 1200,
            good_units: 980,
            current_units: 1000,
        },
        availability: {
            planned_runtime: 540,
            actual_runtime: 520,
            unplanned_downtime: 20,
        },
        performance: {
            planned_units: 1200,
            current_units: 1000,
        },
        quality: {
            current_units: 1000,
            reject_units: 20,
        },

    },
    {
        mc_id: "mc010",
        mc_name: "Machine010",
        production_rate: 76,
        operation_time: 160,
        units: {
            target_units: 3500,
            good_units: 2700,
            current_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc011",
        mc_name: "ive011",
        production_rate: 96,
        operation_time: 160,
        units: {
            target_units: 3500,
            good_units: 1800,
            current_units: 2000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
    {
        mc_id: "mc012",
        mc_name: "Machine012",
        production_rate: 94,
        operation_time: 160,
        units: {
            target_units: 3500,
            good_units: 2700,
            current_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            current_units: 900,
        },
        quality: {
            current_units: 900,
            reject_units: 0,
        },

    },
];
let prodTime = [{
        register_data: 227.35,
        time_stamp: 1643938200000,
    },
    {
        register_data: 229.16,
        time_stamp: 1643940000000,
    },
    {
        register_data: 229.153,
        time_stamp: 1643941200000,
    },
    {
        register_data: 0,
        time_stamp: 1643944200000,
    },
    {
        register_data: 0,
        time_stamp: 1643946600000,
    },
    {
        register_data: 228.924,
        time_stamp: 1643947475000,
    },
    {
        register_data: 228.953,
        time_stamp: 1643950074000,
    },
    {
        register_data: 0,
        time_stamp: 1643950800000,
    },
    {
        register_data: 0.047,
        time_stamp: 1643954400000,
    },
    {
        register_data: 0,
        time_stamp: 1643959241000,
    },
    {
        register_data: 225,
        time_stamp: 1643792446276,
    },
    {
        register_data: 227.512,
        time_stamp: 1643796480284,
    },
    {
        register_data: 0,
        time_stamp: 1643796644773,
    },
    {
        register_data: 228.768,
        time_stamp: 1643797844276,
    },
    {
        register_data: 228.732,
        time_stamp: 1643799643285,
    },
    {
        register_data: 228.696,
        time_stamp: 1643959481000,
    },
    {
        register_data: 0.049,
        time_stamp: 1643968442000,
    },
    {
        register_data: 227.374,
        time_stamp: 1643970382000,
    },
    {
        register_data: 254,
        time_stamp: 1643972400000,
    },
];
let operationTime = 160;
let oeeValues = [];

function calOEE() {
    oeeValues = []
    for (let i = 0; i < allMachines.length; i++) {
        let mc_id = allMachines[i].mc_id;
        let mc_name = allMachines[i].mc_name;
        let availability = ((allMachines[i].availability.actual_runtime / allMachines[i].availability.planned_runtime) * 100).toFixed(2);
        let performance = (((allMachines[i].units.current_units / operationTime) / allMachines[i].production_rate) * 100).toFixed(2);
        let quality = ((allMachines[i].units.good_units / allMachines[i].units.current_units) * 100).toFixed(2);
        let oee = (((availability / 100) * (performance / 100) * (quality / 100)) * 100).toFixed(2);
        oeeValues.push({ mc_id, mc_name, oee });
    }
    return oeeValues;
}

// Socket
io.on("connection", function(socket) {
    console.log("Socket connected");
    socket.on("disconnect", function() {
        console.log("... socket disconnected");
    });
    socket.on("loadMachineInfo", (data) => {
        console.log(data)
        let dashboardInfo = allMachines
        socket.emit("allMachines", dashboardInfo)
        socket.emit("oeeValue", calOEE());

    });

    // dashboard page
    socket.emit("test", "testData");

    // machine page
    socket.on("sendMachineId", (data) => {
        console.log("sent mc_id");
        let machineId = data;
        let mcDetail = allMachines.find((item) => item.mc_id === machineId);
        let operationTime = 160;
        // calculate avalibility = runtime / planned prod time
        let availability = ((mcDetail.availability.actual_runtime / mcDetail.availability.planned_runtime) * 100).toFixed(2);

        // calculate performance = (Total count / Runtime)/Ideal run rate
        let performance = (((mcDetail.units.current_units / operationTime) / mcDetail.production_rate) * 100).toFixed(2);

        // calculate quality = good count / total count
        let quality = ((mcDetail.units.good_units / mcDetail.units.current_units) * 100).toFixed(2);

        // calculate OEE
        let oee = (((availability / 100) * (performance / 100) * (quality / 100)) * 100).toFixed(2);
        let valueCalculated = { availability, performance, quality, oee }
        socket.emit("machineDetail", { mcDetail, prodTime, valueCalculated });


    });
});
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// Communication with folder
app.use(express.static(path.join(__dirname, "chart")));

app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname + "/chart/dashboard.html"));
});

app.get("/machine", (req, res) => {
    res.sendFile(path.join(__dirname + "/chart/machine.html"));
});

app.get("/:token", (req, res) => {
    res.sendFile(path.join(__dirname + "/chart/machine.html"));
    // let machineId = req.params['token']
    // console.log(machineId)
});

const PORT = 3000;
//Set server port
http.listen(PORT, function() {
    // console.log(`listening on *:${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
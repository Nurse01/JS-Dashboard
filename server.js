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
        units: {
            target_units: 1100,
            good_units: 1000,
            total_units: 1000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc002",
        mc_name: "Copper02",
        units: {
            target_units: 1000,
            good_units: 757,
            total_units: 800,
        },
        availability: {
            planned_runtime: 550,
            actual_runtime: 540,
            unplanned_downtime: 10,
        },
        performance: {
            planned_units: 1000,
            actual_units: 800,
        },
        quality: {
            actual_units: 800,
            reject_units: 43,
        },
        oee: {
            availability: 90.0,
            performance: 49.38,
            quality: 94.63,
        },
    },
    {
        mc_id: "mc003",
        mc_name: "Socket003",
        units: {
            target_units: 1200,
            good_units: 980,
            total_units: 1000,
        },
        availability: {
            planned_runtime: 540,
            actual_runtime: 520,
            unplanned_downtime: 20,
        },
        performance: {
            planned_units: 1200,
            actual_units: 1000,
        },
        quality: {
            actual_units: 1000,
            reject_units: 20,
        },
        oee: {
            availability: 86.67,
            performance: 64.1,
            quality: 98.0,
        },
    },
    {
        mc_id: "mc004",
        mc_name: "Cole004",
        units: {
            target_units: 3500,
            good_units: 2700,
            total_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc005",
        mc_name: "Evxx005",
        units: {
            target_units: 3500,
            good_units: 1800,
            total_units: 2000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 100.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc006",
        mc_name: "Max006",
        units: {
            target_units: 3500,
            good_units: 2700,
            total_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    }, {
        mc_id: "mc007",
        mc_name: "JamesBond007",
        units: {
            target_units: 1100,
            good_units: 1000,
            total_units: 1000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc008",
        mc_name: "Machine008",
        units: {
            target_units: 1000,
            good_units: 757,
            total_units: 800,
        },
        availability: {
            planned_runtime: 550,
            actual_runtime: 540,
            unplanned_downtime: 10,
        },
        performance: {
            planned_units: 1000,
            actual_units: 800,
        },
        quality: {
            actual_units: 800,
            reject_units: 43,
        },
        oee: {
            availability: 90.0,
            performance: 49.38,
            quality: 94.63,
        },
    },
    {
        mc_id: "mc009",
        mc_name: "Machine009",
        units: {
            target_units: 1200,
            good_units: 980,
            total_units: 1000,
        },
        availability: {
            planned_runtime: 540,
            actual_runtime: 520,
            unplanned_downtime: 20,
        },
        performance: {
            planned_units: 1200,
            actual_units: 1000,
        },
        quality: {
            actual_units: 1000,
            reject_units: 20,
        },
        oee: {
            availability: 86.67,
            performance: 64.1,
            quality: 98.0,
        },
    },
    {
        mc_id: "mc010",
        mc_name: "Machine010",
        units: {
            target_units: 3500,
            good_units: 2700,
            total_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc011",
        mc_name: "ive011",
        units: {
            target_units: 3500,
            good_units: 1800,
            total_units: 2000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 100.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc012",
        mc_name: "Machine012",
        units: {
            target_units: 3500,
            good_units: 2700,
            total_units: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_units: 1000,
            actual_units: 900,
        },
        quality: {
            actual_units: 900,
            reject_units: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
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

// Socket
io.on("connection", function(socket) {
    console.log("Socket connected");

    socket.on("disconnect", function() {
        console.log("... socket disconnected");
    });
    // dashboard page
    socket.emit("test", "testData");
    socket.emit("allMachines", allMachines);

    // machine page
    socket.on("sendMachineId", (data) => {
        console.log("sent mc_id");
        let machineId = data;
        let mcDetail = allMachines.find((item) => item.mc_id === machineId);
        socket.emit("machineDetail", { mcDetail, prodTime });
        // socket.emit("productionTime", prodTime)
        // socket.emit("machineDetail", productionTime);
    });
});
const PORT = 3000;
//Set server port
http.listen(PORT, function() {
    // console.log(`listening on *:${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
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
        parts: {
            expected_quantity: 1100,
            good_parts: 1000,
            total_parts: 1000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_quantity: 1000,
            actual_quantity: 900,
        },
        quality: {
            actual_quantity: 900,
            reject_quantity: 0,
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
        parts: {
            expected_quantity: 1000,
            good_parts: 757,
            total_parts: 800,
        },
        availability: {
            planned_runtime: 550,
            actual_runtime: 540,
            unplanned_downtime: 10,
        },
        performance: {
            planned_quantity: 1000,
            actual_quantity: 800,
        },
        quality: {
            actual_quantity: 800,
            reject_quantity: 43,
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
        parts: {
            expected_quantity: 1200,
            good_parts: 980,
            total_parts: 1000,
        },
        availability: {
            planned_runtime: 540,
            actual_runtime: 520,
            unplanned_downtime: 20,
        },
        performance: {
            planned_quantity: 1200,
            actual_quantity: 1000,
        },
        quality: {
            actual_quantity: 1000,
            reject_quantity: 20,
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
        parts: {
            expected_quantity: 3500,
            good_parts: 2700,
            total_parts: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_quantity: 1000,
            actual_quantity: 900,
        },
        quality: {
            actual_quantity: 900,
            reject_quantity: 0,
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
        parts: {
            expected_quantity: 3500,
            good_parts: 1800,
            total_parts: 2000,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_quantity: 1000,
            actual_quantity: 900,
        },
        quality: {
            actual_quantity: 900,
            reject_quantity: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
    {
        mc_id: "mc006",
        mc_name: "Max006",
        parts: {
            expected_quantity: 3500,
            good_parts: 2700,
            total_parts: 3100,
        },
        availability: {
            planned_runtime: 480,
            actual_runtime: 360,
            unplanned_downtime: 0,
        },
        performance: {
            planned_quantity: 1000,
            actual_quantity: 900,
        },
        quality: {
            actual_quantity: 900,
            reject_quantity: 0,
        },
        oee: {
            availability: 79.17,
            performance: 87.72,
            quality: 100.0,
        },
    },
];
let prodTime = [{
        register_data: 229.162,
        time_stamp: "1643763656273",
    },
    {
        register_data: 229.16,
        time_stamp: "1643767255282",
    },
    {
        register_data: 229.153,
        time_stamp: "1643774454786",
    },
    {
        register_data: 0,
        time_stamp: "1643774450787",
    },
    {
        register_data: 0,
        time_stamp: "1643776250275",
    },
    {
        register_data: 228.924,
        time_stamp: "1643778000283",
    },
    {
        register_data: 228.953,
        time_stamp: "1643781648787",
    },
    {
        register_data: 0,
        create_time: "1643785248276",
    },
    {
        register_data: 0.047,
        create_time: "1643788847284",
    },
    {
        register_data: 0.049,
        create_time: "1643792446788",
    },
    {
        register_data: 227.096,
        create_time: "1643792446276",
    },
    {
        register_data: 227.512,
        create_time: "1643796480284",
    },
    {
        register_data: 227.235,
        create_time: "1643796644773",
    },
    {
        register_data: 228.768,
        create_time: "1643797844276",
    },
    {
        register_data: 228.732,
        create_time: "1643799643285",
    },
    {
        register_data: 228.696,
        create_time: "1643803242773",
    },
    {
        register_data: 0.049,
        create_time: "1643806842277",
    },
    {
        register_data: 227.374,
        create_time: "1643807140277",
    },
    {
        register_data: 0,
        create_time: "1643808640277",
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
const path = require("path");

const express = require("express");
var sharedsession = require("express-socket.io-session");
const bodyParser = require("body-parser");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let allMachines = [
  {
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
});

// for (let i = 0; i < allMachines.length; i++) {
//     let allMachinesName =  allMachines[i].mc_name;
//     return allMachinesName;
//    } 
// Socket
io.on("connection", function (socket) {
  console.log("Socket connected");

  socket.on("disconnect", function () {
    console.log("... socket disconnected");

  });
  io.emit("test","testData")


  // GET - all machines name
  // socket.emit("allMachineName", allMachinesName)

  // GET - each machine
  // socket.on("", function(jsonData) {
  //     let data = jsonData
  //     socket.on("got_json")

  // })

  // socket.on("get_data", function(n_data) {
  //     //query data
  //     let data = n_data + " helllo"

  //     socket.emit("got data", data)
  // })
});
const PORT = 3000;
//Set server port
http.listen(PORT, function () {
  // console.log(`listening on *:${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

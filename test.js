const { header } = require("express/lib/request");
 
 const myInit = {
     method: 'GET',
     header:{
        'Content-Type': 'app;ication/json'
     },
     mode: 'cors',
     cache: 'default'
 }
 let myRequest = new Request("./chart/data.json", myInit)
 fetch(myRequest)
        .then(function (response) {
          return response;
        })
        .then(function (data) {
          allMachines = data.json();
          console.log(allMachines);
          return allMachines;
        })
        .catch(function (err) {
          console.log("Fetch problem show: " + err.message);
        });
      console.log(allMachines);
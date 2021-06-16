function addItem(station_name, desc) {
  var station = {
    station_name: station_name.value,
    desc: desc.value,
  };
  fetch("/station", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(station),
  }).then((response) => {
    // location.reload();
    location.replace(response.url);
  });
}
function editItem(station_name, desc, stationId) {
  var station = {
    station_name: station_name.value,
    desc: desc.value,
  };
  fetch("/station/" + stationId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(station),
  }).then((response) => {
    // location.reload();
    location.replace(response.url);
  });
}
function getAllstation() {
  fetch("/station")
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      // location.reload();
      let table = document.getElementById("stationList");
      for (let i = 0; i < response.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = ` <tr>
                <td>${i + 1}</td>
                <td>${response[i].station_name}</td>
                <td>${response[i].desc}</td>
                <td><a href="addstation.html?stationid=${
                  response[i]._id
                }">Edit</a>
                <!--- ||  <a onclick="stationDelete('${
                  response[i]._id
                }')">Delete</a> --->
                  </td>
              </tr>`;

        table.appendChild(tr);
      }
    });
}
function stationDelete(id) {
  var r = confirm("Are you sure you want to delete this station");
  if (r == true) {
    removestation(id);
  }
}
function removestation(id) {
  fetch("/station/" + id, { method: "DELETE" }).then((response) => {
    location.reload();
    // return response;
  });
}
function getStation(stationId) {
  fetch("/station/" + stationId)
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      let station_nameEl = document.getElementById("station_name");
      station_nameEl.value = response[0].station_name;
      let descEl = document.getElementById("desc");
      descEl.value = response[0].desc;
    });
}

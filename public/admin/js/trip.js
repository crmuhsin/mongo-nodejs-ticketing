function addTrip(
  from_station_id,
  to_station_id,
  coach_no,
  coach_type,
  deperture_time,
  fare
) {
  var trip = {
    from_station_id: from_station_id.value,
    to_station_id: to_station_id.value,
    coach_no: coach_no.value,
    coach_type: coach_type.value,
    deperture_time: deperture_time.value,
    fare: fare.value,
  };
  fetch("/trip", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  }).then((response) => {
    // location.reload();
    location.replace(response.url);
  });
}
function editItem(
  from_station_id,
  to_station_id,
  deperture_time,
  coach_no,
  coach_type,
  fare,
  tripId
) {
  var trip = {
    from_station_id: from_station_id.value,
    to_station_id: to_station_id.value,
    coach_no: coach_no.value,
    coach_type: coach_type.value,
    deperture_time: deperture_time.value,
    fare: fare.value,
  };
  fetch("/trip/" + tripId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  }).then((response) => {
    console.log(response);
    // location.reload();
    location.replace(response.url);
  });
}
function getAlltrip() {
  fetch("/trip")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let table = document.getElementById("tripList");
      for (let i = 0; i < response.length; i++) {
        response[i].from_station_name = getStation(response[i].from_station_id);
        response[i].to_station_name = getStation(response[i].to_station_id);
        // console.log(response);
        let tr = document.createElement("tr");
        tr.innerHTML = ` <tr>
                <td>${i + 1}</td>
                <td>${response[i].from_station_name}</td>
                <td>${response[i].to_station_name}</td>
                <td>${response[i].coach_no}</td>
                <td>${response[i].coach_type}</td>
                <td>${response[i].deperture_time}</td>
                <td>${response[i].fare}</td>
               <td><a href="addtrip.html?tripid=${response[i]._id}">Edit</a> ||
                  <a onclick="tripDelete('${response[i]._id}')">Delete</a></td>
              </tr>`;

        table.appendChild(tr);
      }
    });
}
var stationList;
function dynamicStation() {
  fetch("/station")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      stationList = response;
      console.log(stationList);

      let table = document.getElementById("tripList");
      if (table) {
        getAlltrip();
      }
      let station = document.getElementById("fromStation");
      if (station) {
        for (let i = 0; i < response.length; i++) {
          station.innerHTML += `<option value="${response[i]._id}">${response[i].station_name}</option> `;
        }
      }
      let station2 = document.getElementById("toStation");
      if (station2) {
        for (let j = 0; j < response.length; j++) {
          station2.innerHTML += `<option value="${response[j]._id}">${response[j].station_name}</option> `;
        }
      }
    });
}
function tripDelete(id) {
  console.log(1);
  var r = confirm("Are you sure you want to delete this trip");
  if (r == true) {
    removetrip(id);
  }
}
function removetrip(id) {
  fetch("/trip/" + id, { method: "DELETE" })
    .then((response) => {
      location.reload();
      // return response;
    })
    .then((data) => {
      getAlltrip();
    });
}
function getTrip(tripId) {
  fetch("/trip/" + tripId)
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      let from_station_idEl = document.getElementById("fromStation");
      console.log(response);
      from_station_idEl.value = response[0].from_station_id;
      let to_station_idEl = document.getElementById("toStation");
      console.log(response);
      to_station_idEl.value = response[0].to_station_id;
      let deperture_timeEl = document.getElementById("deperture_time");
      console.log(response);
      deperture_timeEl.value = response[0].deperture_time;
      let fareEl = document.getElementById("fare");
      console.log(response);
      fareEl.value = response[0].fare;
    });
}
function getStation(stationId) {
  let st = stationList.find((item) => item._id === stationId);
  return st.station_name;
}

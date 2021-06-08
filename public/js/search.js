function viewTrip(searchItems) {
  fetch("/search-trip", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchItems),
  })
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      console.log(response);
      // location.reload();
      let viewTrip = document.getElementById("viewTrips");
      var today = new Date();

      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      viewTrip.innerHTML = `<div class="trips">
                <h2 class="trips-number">Available Trips: </h2>
            </div>`;

      for (let i = 0; i < response.length; i++) {
        tripList = response;
        response[i].from_station_name = getStation(response[i].from_station_id);
        response[i].to_station_name = getStation(response[i].to_station_id);
        viewTrip.innerHTML += `<br>
              <div id="viewSeats-${i}">
                <div class="view-card">
                    <div class="part-1">${response[i].from_station_name}-To-${response[i].to_station_name}</div>
                    <div class="part-2">Departure <br>
                        ${response[i].deperture_time}<br>
                        ${date}</div>
                    <div class="part-3">Boarding <br>
                        ${response[i].from_station_name}
                        <br> <br>
                        Destination <br>
                        <span class="bold">${response[i].to_station_name}</span>
                    </div>
                    <div class="part-4">Business <br>
                        BDT <br> <br>
                        <span class="Taka">${response[i].fare}</span>
                    </div>

                    <div class="part-5"><button onclick="viewSeat('${i}')" class="view-btn">
                            <ion-icon class="seat-icon" name="reorder-three"></ion-icon>View Seats
                        </button></div>
                </div>
              </div>`;
      }
    });
}
var stationList;
function dynamicStation() {
  fetch("/station")
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      stationList = response;

      console.log(response);
      // location.reload();
      let fromStation = document.getElementById("showFromStation");
      for (let i = 0; i < response.length; i++) {
        fromStation.innerHTML += `<option value="${response[i]._id}">${response[i].station_name}</option> `;
      }
      let toStation = document.getElementById("showToStation");
      for (let j = 0; j < response.length; j++) {
        toStation.innerHTML += `<option value="${response[j]._id}">${response[j].station_name}</option> `;
      }
    });
}
function getStation(stationId) {
  let st = stationList.find((item) => item._id === stationId);
  return st.station_name;
}

function searchTrips(fromStation, toStation) {
  let searchItems = {
    fromStationId: fromStation.value,
    toStationId: toStation.value,
  };
  viewTrip(searchItems);
}

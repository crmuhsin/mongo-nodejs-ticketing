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
    })
    .then((response) => {
      let viewTrip = document.getElementById("viewTrips");
      var today = new Date();
      var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      viewTrip.innerHTML = `<div class="trips">
                <h2 class="trips-number">Available Trips: </h2>
            </div>`;

      for (let i = 0; i < response.length; i++) {
        tripList = response;
        response[i].from_station_name = getStation(response[i].from_station_id);
        response[i].to_station_name = getStation(response[i].to_station_id);
        viewTrip.innerHTML += `
          <div id="viewSeats-${i}">
            <div class="view-card">
                <div class="part">${response[i].from_station_name}-to-${response[i].to_station_name}</div>
                <div class="part">
                  <span>Departure Time</span>
                  <span>${response[i].deperture_time}</span>
                  <span>${searchDate}</span>
                </div>
                <div class="part"> 
                  <span>${response[i].coach_type}</span> 
                  <span>BDT</span>
                  <span class="Taka">${response[i].fare}</span>
                </div>
                <div class="part">
                  <button onclick="viewSeat('${i}')" class="view-btn">
                    <ion-icon class="seat-icon" name="reorder-three"></ion-icon>View Seats
                  </button>
                </div>
            </div>
          </div>`;
      }
      if (response.length === 0) {
        viewTrip.innerHTML += `
        <div id="viewSeats">
          <div class="view-card">
              No Available Trips to Show.
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
    })
    .then((response) => {
      stationList = response;
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
function searchTrips(fromStation, toStation, journeyDate, coachType) {
  // e.preventDefault();
  searchDate = journeyDate.value;
  let searchItems = {
    fromStationId: fromStation.value,
    toStationId: toStation.value,
    coachType: coachType.value,
    searchDate
  };
  viewTrip(searchItems);
}

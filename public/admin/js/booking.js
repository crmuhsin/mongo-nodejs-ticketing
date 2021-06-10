var tripList;
var stationList;

function getAllStation() {
  fetch("/station")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      stationList = response;
      getAlltrip();
    });
  }

function getAlltrip() {
  fetch("/trip")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      tripList = response;
      getAllBooking();
    });
}
function getAllBooking() {
  fetch("/all-booking")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let table = document.getElementById("bookingList");
      for (let i = 0; i < response.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <tr>
            <td>${i + 1}</td>
            <td id="trip-journey-${i}-${response[i].trip_id}"></td>
            <td id="trip-time-${i}-${response[i].trip_id}"></td>
            <td>${response[i].date}</td>
            <td>${response[i].seat_list}</td>
            <td>${response[i].user_id}</td>
            <td>
              <a href="#">Edit</a>
            </td>
          </tr>`;
          table.appendChild(tr);
          getTrip(i, response[i].trip_id);
      }
    });
}
function getStation(stationId) {
  let st = stationList.find((item) => item._id === stationId);
  return st.station_name;
}
function getTrip(i, tripId) {
  let trip = tripList.find((item) => item._id === tripId);
  let journeyEl = document.getElementById(`trip-journey-${i}-${tripId}`);
  journeyEl.innerText = `${getStation(trip.from_station_id)}-to-${getStation(trip.to_station_id)}`;
  let timeEl = document.getElementById(`trip-time-${i}-${tripId}`);
  timeEl.innerText = trip.deperture_time;
}
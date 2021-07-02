let query = window.location.search.substring(1);
let bookingId = "";
if (query.split('=')[0] === "bookingId") {
  bookingId = query.split('=')[1];
}
var stationList;
var currentBooking;
var currentTrip;
function getStations() {
  fetch("/station")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      stationList = response;
      if (bookingId) {
        getBooking(bookingId);
      }
    });
}
function getStationById(stationId) {
  let st = stationList.find((item) => item._id === stationId);
  return st.station_name;
}
function getBooking(bookingId) {
  fetch("/booking/" + bookingId)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      currentBooking = response[0];
      let departure_date = document.getElementById("departure_date");
      departure_date.innerText = currentBooking.date;
      getCurrentTrip(currentBooking.trip_id, currentBooking.seat_list);
    });
}
function getCurrentTrip(tripId, seatList) {
  fetch("/trip/" + tripId)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      currentTrip = response[0];
      currentTrip.fromStation = getStationById(currentTrip.from_station_id);
      currentTrip.toStation = getStationById(currentTrip.to_station_id);
      let coach_no = document.getElementById("coach_no");
      coach_no.innerText = currentTrip.coach_no;
      let coach_type = document.getElementById("coach_type");
      coach_type.innerText = currentTrip.coach_type;
      let deperture_timeEl = document.getElementById("departure_time");
      deperture_timeEl.innerText = currentTrip.deperture_time;

      let cartTable = document.getElementById("cartTable");
      cartTable.innerHTML = `<thead><tr>
        <th>#</th>
        <th>Seat</th>
        <th>Route</th>
        <th>Type</th>
        <th>Fare</th>
      </tr></thead>`;
      seatList.forEach((seat, index) => {
        cartTable.innerHTML += `<tbody><tr>
          <td>${index + 1}</td>
          <td>${seat}</td>
          <td>${currentTrip.fromStation} To ${currentTrip.fromStation}</td>
          <td>${currentTrip.coach_type}</td>
          <td>${currentTrip.fare}</td>
        </tr></tbody>`
      });
      cartTable.innerHTML += `<tbody class="table-row"><tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Total</td>
        <td>${seatList.length * currentTrip.fare}</td>
      </tr></tbody>`

    });
}
function createTicket() {
  let ticketParam = { to: userInfo.email, trip: currentTrip, booking: currentBooking };
  fetch("/create-ticket", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketParam),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let a = document.createElement('a');
      a.target = '_blank';
      a.href = `output/${response.fileName}.pdf`;
      a.click();
    });
}
getStations();
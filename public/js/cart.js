let query = window.location.search.substring(1);
let bookingId = "";
if (query.split('=')[0] === "bookingId") {
  bookingId = query.split('=')[1];
}
var stationList;
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
      let departure_date = document.getElementById("departure_date");
      departure_date.innerText = response[0].date;
      getCurrentTrip(response[0].trip_id, response[0].seat_list);
    });
}
function getCurrentTrip(tripId, seatList) {
  fetch("/trip/" + tripId)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let coach_no = document.getElementById("coach_no");
      coach_no.innerText = response[0].coach_no;
      let coach_type = document.getElementById("coach_type");
      coach_type.innerText = response[0].coach_type;
      let deperture_timeEl = document.getElementById("departure_time");
      deperture_timeEl.innerText = response[0].deperture_time;
            
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
          <td>${getStationById(response[0].from_station_id)} To ${getStationById(response[0].to_station_id)}</td>
          <td>${response[0].coach_type}</td>
          <td>${response[0].fare}</td>
        </tr></tbody>`
      });
      cartTable.innerHTML += `<tbody class="table-row"><tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Total</td>
        <td>${seatList.length * response[0].fare}</td>
      </tr></tbody>`

    });
}
function createTicket() {
  fetch("/create-ticket")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setTimeout(() => {
        let a= document.createElement('a');
        a.target= '_blank';
        a.href= `output/${response.fileName}.pdf`;
        a.click();
      }, 2000);
    });
}
getStations();
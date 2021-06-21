var tripList;
var stationList;
var perPage = 10;

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
      getAllBooking(1, perPage);
    });
}
function getAllBooking(pageNo, limit) {
  fetch("/all-booking", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({pageNo, limit: limit}),
  }).then((response) => {
      return response.json();
    })
    .then((response) => {
      let bookings = response.result;
      let table = document.getElementById("bookingList");
      table.innerHTML = `<tr>
        <th width="5%">No.</th>
        <th width="25%">Trip</th>
        <th width="10%">Time</th>
        <th width="10%">Date</th>
        <th width="35%">Seats</th>
        <th width="15%">Action</th>
      </tr>`;
      for (let i = 0; i < bookings.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <tr>
            <td>${(response.limit * (response.currentPage - 1)) + i + 1}</td>
            <td id="trip-journey-${i}-${bookings[i].trip_id}"></td>
            <td id="trip-time-${i}-${bookings[i].trip_id}"></td>
            <td>${bookings[i].date}</td>
            <td>${bookings[i].seat_list}</td>
            <td>
              <a href="#">Edit</a>
            </td>
          </tr>`;
          table.appendChild(tr);
          getTrip(i, bookings[i].trip_id);
      }
      pagination(response);
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
function pagination(data) {
  let paging = document.getElementById("paging");
  paging.innerHTML = `<div class="same-row">
    <div class="paging-left-side">
      <h6 class="paging-current">Current Page: ${data.currentPage}</h6>
      <select class="paging-select" onchange="changePerpage(event)" id="pagingSelect">
      </select>
    </div>
    <div class="pagination ${data.totalPages === 0 ? 'hidden' : ''}">
      <button class="page-link ${data.currentPage === 1 ? 'hidden' : ''}" onclick="getAllBooking(${data.currentPage - 1}, ${perPage})">Previous</button>
      <button class="page-link ${data.currentPage === 1 ? 'hidden' : ''}" onclick="getAllBooking(1, ${perPage})">1</button>
      <button class="page-link ${data.currentPage === 1 || data.currentPage - 1 === 1 ? 'hidden' : ''}" onclick="getAllBooking(${data.currentPage - 1}, ${perPage})">${data.currentPage - 1}</button>
      <button class="page-link current">${data.currentPage}</button>
      <button class="page-link ${data.totalPages === data.currentPage || data.totalPages === data.currentPage + 1 ? 'hidden' : ''}" onclick="getAllBooking(${data.currentPage + 1}, ${perPage})">${data.currentPage + 1}</button>
      <button class="page-link ${data.totalPages === data.currentPage ? 'hidden' : ''}" onclick="getAllBooking(${data.totalPages}, ${perPage})">${data.totalPages}</button>
      <button class="page-link ${data.totalPages === data.currentPage ? 'hidden' : ''}" onclick="getAllBooking(${data.currentPage + 1}, ${perPage})">Next</button>
    </div>
  </div>`;
  let pagingSelect = document.getElementById("pagingSelect");
  [3, 5, 10, 20, 50].forEach(val => {
    pagingSelect.innerHTML += `<option ${val === perPage ? "selected='selected'": ""} value="${val}">${val}</option>`
  });
}
function changePerpage(event) {
  perPage = +event.target.value;
  getAllBooking(1, perPage);
}
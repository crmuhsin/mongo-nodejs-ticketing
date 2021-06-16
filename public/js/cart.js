let query = window.location.search.substring(1);
let bookingId = "";
if (query.split('=')[0] === "bookingId") {
  bookingId = query.split('=')[1];
}
if (bookingId) {
  getBooking(bookingId);
}
function getBooking(bookingId) {
  fetch("/booking/" + bookingId)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      getCurrentTrip(response[0].trip_id);
      let departure_date = document.getElementById("departure_date");
      departure_date.innerText = response[0].date;
      // let fareEl = document.getElementById("fare");
      // fareEl.value = response[0].fare;
    });
}
function getCurrentTrip(tripId) {
  fetch("/trip/" + tripId)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let coach_no = document.getElementById("coach_no");
      coach_no.innerText = response[0].coach_no;
      let coach_type = document.getElementById("coach_type");
      coach_type.innerText = response[0].coach_type;
      let deperture_timeEl = document.getElementById("deperture_time");
      deperture_timeEl.value = response[0].deperture_time;
    });
}
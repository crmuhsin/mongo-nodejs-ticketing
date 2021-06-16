var tripList = [];
var searchDate;
function viewSeat(index) {
  //   debugger;
  let showseat = document.getElementById("viewSeats-" + index);
  let checkOpen = document.getElementById("showSeats-" + index);

  let viewseats = document.createElement("div");
  if (checkOpen) {
    checkOpen.parentNode.removeChild(checkOpen);
    viewseats.innerHTML = "";
    showseat.appendChild(viewseats);
  } else {
    viewseats.innerHTML = `<div class="show-seat" id="showSeats-${index}">
          <div class="seat-view">
              <div class="seat-left">
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-A1" class="seat-btn">A-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-A2" class="seat-btn">A-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-B1" class="seat-btn">B-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-B2" class="seat-btn">B-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-C1" class="seat-btn">C-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-C2" class="seat-btn">C-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-D1" class="seat-btn">D-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-D2" class="seat-btn">D-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-E1" class="seat-btn">E-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-E2" class="seat-btn">E-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-F1" class="seat-btn">F-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-F2" class="seat-btn">F-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-G1" class="seat-btn">G-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-G2" class="seat-btn">G-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-H1" class="seat-btn">H-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-H2" class="seat-btn">H-2</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-I1" class="seat-btn">I-1</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-I2" class="seat-btn">I-2</button><br>
              </div>
              <div class="seat-right">
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-A3" class="seat-btn">A-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-A4" class="seat-btn">A-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-B3" class="seat-btn">B-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-B4" class="seat-btn">B-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-C3" class="seat-btn">C-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-C4" class="seat-btn">C-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-D3" class="seat-btn">D-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-D4" class="seat-btn">D-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-E3" class="seat-btn">E-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-E4" class="seat-btn">E-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-F3" class="seat-btn">F-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-F4" class="seat-btn">F-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-G3" class="seat-btn">G-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-G4" class="seat-btn">G-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-H3" class="seat-btn">H-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-H4" class="seat-btn">H-4</button><br>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-I3" class="seat-btn">I-3</button>
                  <button type="button" onclick="selectSeat(event)" id="Seat-${index}-I4" class="seat-btn">I-4</button><br>
              </div>
          </div>
          <div class="seat-table">
              <table class="content-table">
                  <thead>
                    <tr class="table-data">
                      <th>Seat</th>
                      <th>Type</th>
                      <th>Fare</th>
                    </tr>
                  </thead>
                  <tbody id="table-${index}"></tbody>
              </table>
          </div>
          <div class="button-parent">
            <div class="seat-count">
              <div class="upper-table">Selected Seats: <span id="totalSeat-${index}">0</span> (Max 5)</div>
              <div class="upper-table">Total Fare: <span id="totalFare-${index}">0</span></div>
            </div>
            <button type="button" onclick="continueToCart('${index}')" class="continue-btn hidden" id="continueBtn-${index}">Continue</button>
          </div>
      </div>`;
      showseat.appendChild(viewseats);
      fillSeatData(index);
  }
}
function fillSeatData(index) {
  let searchItems = { 
    tripId: tripList[index]._id,
    searchDate
  };
  fetch("/booking-by-trip", {
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
      if (response.length) {
        response.forEach((booking) => {
          let fillSeats = booking.seat_list;
          fillSeats.forEach((seatName) => {
            let seatElement = document.getElementById(`Seat-${index}-${seatName}`);
            seatElement.classList.add("booked");
          });
        })
      }
    });
}
var seatArray = {};
function selectSeat(event) {
  let seatName = event.target.id.split("-")[2];
  let tripIndex = event.target.id.split("-")[1];
  selectSeatTable(seatName, tripIndex, event.target );
}

function selectSeatTable (seatName, tripIndex, element) {
  let contBtn = document.getElementById(`continueBtn-${tripIndex}`);
  if (element.className.includes("booked")) return;
  if (element.className.includes("selected")) {
    element.classList.remove("selected");

    let stIndex = seatArray[tripIndex].findIndex(
      (item) => item.seatName === seatName
    );
    seatArray[tripIndex].splice(stIndex, 1);
  } else {
    let seatItem = {
      seatname: seatName,
      type: tripList[tripIndex].coach_type,
      fare: tripList[tripIndex].fare,
    };
    if (seatArray[tripIndex]) {
      if (seatArray[tripIndex].length < 5) {
        element.classList.add("selected");
        seatArray[tripIndex].push(seatItem);
      }
    } else {
      seatArray[tripIndex] = [];

      element.classList.add("selected");
      seatArray[tripIndex].push(seatItem);
    }
  }

  let tbody = document.getElementById("table-" + tripIndex);
  tbody.innerHTML = "";
  for (let i = 0; i < seatArray[tripIndex].length; i++) {
    tbody.innerHTML += `<tr>
    <td>${seatArray[tripIndex][i].seatname}</td>
    <td>${seatArray[tripIndex][i].type}</td>
    <td>${seatArray[tripIndex][i].fare}</td>
  </tr>`;
  }
  let totalSeat = document.getElementById("totalSeat-" + tripIndex);
  totalSeat.innerText = `${seatArray[tripIndex].length}`;
  let totalFare = document.getElementById("totalFare-" + tripIndex);
  totalFare.innerText = `${seatArray[tripIndex].reduce((sum, el) => sum + +el.fare, 0)}`

  if (seatArray[tripIndex].length) {
    contBtn.classList.remove("hidden");
  } else {
    contBtn.classList.add("hidden");
  }
}

function continueToCart(tripIndex) {
  openModal();
  // var booking = {
  //   trip_id: tripList[tripIndex]._id,
  //   user_id: "muhsin",
  //   date: searchDate,
  //   seat_list: seatArray[tripIndex].map((el) => el.seatname)
  // };
  // fetch("/booking", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(booking),
  // }).then((response) => {
  //   location.replace("./userhome.html");
  // });
}
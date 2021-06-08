function addItem(coach_no, coach_type) {
  //  coach_no: String,
  // coach_type: String,
  var bus = {
    coach_no: coach_no.value,
    coach_type: coach_type.value,
  };
  console.log(bus);
  fetch("/bus", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bus),
  }).then((response) => {
    console.log(response);
    // location.reload();
    location.replace(response.url);
  });
}
function editItem(coach_no, coach_type, busId) {
  var bus = {
    coach_no: coach_no.value,
    coach_type: coach_type.value,
  };
  fetch("/bus/" + busId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bus),
  }).then((response) => {
    console.log(response);
    // location.reload();
    location.replace(response.url);
  });
}
function getAllbus() {
  fetch("/bus")
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      console.log(response);
      let table = document.getElementById("busList");
      for (let i = 0; i < response.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<tr>
                <td>${i + 1}</td>
                <td>${response[i].coach_no}</td>
                <td>${response[i].coach_type}</td>
                <td>
                  <a href="addbus.html?busid=${response[i]._id}">Edit</a> ||
                  <a onclick="busDelete('${response[i]._id}')">Delete</a>
                </td>
              </tr>`;

        table.appendChild(tr);
      }
      // location.reload();
    });
}

function busDelete(id) {
  console.log(1);
  var r = confirm("Are you sure you want to delete this bus");
  if (r == true) {
    removebus(id);
  }
}
function removebus(id) {
  fetch("/bus/" + id, { method: "DELETE" })
    .then((response) => {
      location.reload();
      // return response;
    })
    .then((data) => {
      getAllbus();
    });
}
function getBus(busId) {
  fetch("/bus/" + busId)
    .then((response) => {
      return response.json();
      // location.reload();
    })
    .then((response) => {
      let coach_noEl = document.getElementById("coach_no");
      console.log(response);
      coach_noEl.value = response[0].coach_no;
      let coach_typeEl = document.getElementById("coach_type");
      console.log(response);
      coach_typeEl.value = response[0].coach_type;
    });
}

let head = document.getElementById("headTemplate");
head.innerHTML = `<h2>Admin Panel</h2>
      <nav class="mainmenu">
        <ul>
          <li><a href="./../">Home</a></li>
          <li><a href="user.html">User</a></li>
          <li><a href="changepass.html">Change Password</a></li>
          <!--<li><a href="logout.html">Logout</a></li> -->
        </ul>
      </nav>`;
let leftSide = document.getElementById("leftSide");
leftSide.innerHTML = `
        <div class="samesidebar">
          <h2>Station Option</h2>
          <ul>
            <li> <a href="addstation.html"> Add Station</a></li>
            <li> <a href="liststation.html"> Station List</a></li>
          </ul>
        </div>
        <div class="samesidebar">
          <h2> Trip Option</h2>
          <ul>
            <li> <a href="addtrip.html"> Add Trip</a></li>
            <li> <a href="listtrip.html"> Trip List</a></li>
          </ul>
        </div>
        <div class="samesidebar">
          <h2> Booking Option</h2>
          <ul>
            <li> <a href="listbooking.html">Booking List</a></li>
            
          </ul>
        </div>`;
        
let userInfo = "";
if (localStorage.getItem("info")) {
  userInfo = JSON.parse(localStorage.getItem("info"))
}
if (userInfo) {
  if (userInfo.user_type !== "admin") {
    location.replace("./../");
  }
} else {
  location.replace("./../");
}

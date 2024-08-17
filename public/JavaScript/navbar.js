document.addEventListener("DOMContentLoaded", function () {
  // Load the navbar HTML
  fetch("../HTML/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      // Insert the fetched HTML into the placeholder
      document.getElementById("navbar-placeholder").innerHTML = data;

      // Fetch and display the user's full name
      fetch("/users/current")
        .then((response) => response.json())
        .then((data) => {
          if (data.fullname) {
            document.querySelector(".username").textContent = data.fullname;
          } else {
            document.querySelector(".username").textContent = "Unknown User";
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          document.querySelector(".username").textContent =
            "Error Loading User";
        });

      // Notification functionality
      const notificationImg = document.querySelector(".notification-img");
      const notificationsContainer = document.getElementById(
        "notifications-container"
      );

      if (notificationImg && notificationsContainer) {
        notificationImg.addEventListener("click", function () {
          if (notificationsContainer.style.display === "block") {
            notificationsContainer.style.display = "none"; // Hide if already visible
          } else {
            notificationsContainer.innerHTML =
              "<p>Bạn hiện không có thông báo nào.</p>"; // Set the message
            notificationsContainer.style.display = "block"; // Show the notification box
          }
        });
      } else {
        console.error("Notification icon or container not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching navbar HTML:", error);
    });
});

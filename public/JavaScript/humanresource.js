document.addEventListener("DOMContentLoaded", () => {
  // Fetch all users from the server
  fetch("/users/all")
    .then((response) => response.json())
    .then((users) => {
      const gridContainer = document.querySelector(".grid-container");

      users.forEach((user) => {
        // Create the rectangle container
        const rectangleContainer = document.createElement("div");
        rectangleContainer.classList.add("rectangle-container");

        // Create the profile div
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        // Profile image
        const profileImage = document.createElement("img");
        profileImage.src = "../Assets/images/profile.png";
        profileImage.alt = "Profile Image";
        profileImage.classList.add("profile-image");

        // Profile info div
        const profileInfoDiv = document.createElement("div");
        profileInfoDiv.classList.add("profile-info");

        // Name div (no gender)
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name-gender");

        const profileNameSpan = document.createElement("span");
        profileNameSpan.classList.add("profile-name");
        profileNameSpan.textContent = user.fullname;

        nameDiv.appendChild(profileNameSpan);

        // Additional icons div
        const additionalIconsDiv = document.createElement("div");
        additionalIconsDiv.classList.add("additional-icons");

        // Text icon
        const textIconWrapper = document.createElement("div");
        textIconWrapper.classList.add("icon-wrapper");
        const textIcon = document.createElement("img");
        textIcon.src = "../Assets/images/text.png";
        textIcon.alt = "Text Icon";
        textIcon.classList.add("icon-image", "text-icon");
        textIcon.dataset.name = user.fullname;
        textIconWrapper.appendChild(textIcon);

        // Phone icon
        const phoneIconWrapper = document.createElement("div");
        phoneIconWrapper.classList.add("icon-wrapper", "phone-icon-wrapper");
        const phoneIcon = document.createElement("img");
        phoneIcon.src = "../Assets/images/phone.png";
        phoneIcon.alt = "Phone Icon";
        phoneIcon.classList.add("icon-image", "phone-icon");
        const phoneNumberSpan = document.createElement("span");
        phoneNumberSpan.classList.add("phone-number");
        phoneNumberSpan.textContent = user.phone_no;
        phoneIconWrapper.appendChild(phoneIcon);
        phoneIconWrapper.appendChild(phoneNumberSpan);

        // Mail icon
        const mailIconWrapper = document.createElement("div");
        mailIconWrapper.classList.add("icon-wrapper", "mail-icon-wrapper");
        const mailIcon = document.createElement("img");
        mailIcon.src = "../Assets/images/mail.png";
        mailIcon.alt = "Mail Icon";
        mailIcon.classList.add("icon-image", "mail-icon");
        const mailLink = document.createElement("a");
        mailLink.href = `mailto:${user.email}`;
        mailLink.classList.add("mail-address-link");
        const mailAddressSpan = document.createElement("span");
        mailAddressSpan.classList.add("mail-address");
        mailAddressSpan.textContent = user.email;
        mailLink.appendChild(mailAddressSpan);
        mailIconWrapper.appendChild(mailIcon);
        mailIconWrapper.appendChild(mailLink);

        // Report icon
        const reportIconWrapper = document.createElement("div");
        reportIconWrapper.classList.add("icon-wrapper");
        const reportLink = document.createElement("a");
        reportLink.href = "report.html";
        reportLink.target = "_blank";
        const reportButton = document.createElement("button");
        reportButton.classList.add("action-button");
        const reportImage = document.createElement("img");
        reportImage.src = "../Assets/images/form.png";
        reportImage.alt = "Report";
        reportImage.classList.add("button-image");
        reportButton.appendChild(reportImage);
        reportLink.appendChild(reportButton);
        reportIconWrapper.appendChild(reportLink);

        // Append all icons to the additional icons div
        additionalIconsDiv.appendChild(textIconWrapper);
        additionalIconsDiv.appendChild(phoneIconWrapper);
        additionalIconsDiv.appendChild(mailIconWrapper);
        additionalIconsDiv.appendChild(reportIconWrapper);

        // Append name and additional icons to profile info
        profileInfoDiv.appendChild(nameDiv);
        profileInfoDiv.appendChild(additionalIconsDiv);

        // Append profile image and profile info to profile div
        profileDiv.appendChild(profileImage);
        profileDiv.appendChild(profileInfoDiv);

        // Append profile div to rectangle container
        rectangleContainer.appendChild(profileDiv);

        // Append rectangle container to grid container
        gridContainer.appendChild(rectangleContainer);
      });

      // Chatbox logic
      document.querySelectorAll(".text-icon").forEach((icon) => {
        icon.addEventListener("click", () => {
          const name = icon.getAttribute("data-name");
          document.getElementById("chatbox-header-name").textContent = name;
          document.getElementById("chatbox").style.display = "flex";
        });
      });
    })
    .catch((error) => console.error("Error fetching users:", error));

  // Chatbox close functionality
  document.getElementById("chatbox-close").addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "none";
  });
});

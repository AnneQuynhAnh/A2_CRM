document.addEventListener("DOMContentLoaded", function () {
  const filterIcon = document.querySelector(".filter-icon");
  const filterDropdown = document.querySelector(".filter-dropdown");

  // Correctly reference the modal element
  const modal = document.getElementById("billingModal");
  const closeModal = document.querySelector(".close");

  // Toggle filter dropdown visibility
  filterIcon.addEventListener("click", function () {
    filterDropdown.style.display =
      filterDropdown.style.display === "block" ? "none" : "block";
  });

  // Close modal when the user clicks on <span> (x)
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when the user clicks anywhere outside of the modal
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Fetch and display orders
  function fetchOrders(filter = "order_id", query = "") {
    fetch(`/orders?filter=${filter}&query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Orders fetched:", data);
        const container = document.querySelector(".container");
        container.innerHTML = ""; // Clear existing content

        // Sort orders by order_id in descending order
        data.sort((a, b) => b.order_id - a.order_id);

        // Separate matching and non-matching orders
        let matchedOrders = [];
        let otherOrders = [];

        data.forEach((order) => {
          if (matchesQuery(order, filter, query)) {
            matchedOrders.push(order);
          } else {
            otherOrders.push(order);
          }
        });

        // Combine matched and non-matched orders, then limit to 10
        const displayedOrders = matchedOrders.concat(otherOrders).slice(0, 10);

        // Display the orders
        displayedOrders.forEach((order) => {
          const orderDiv = createOrderDiv(order);
          container.appendChild(orderDiv);
        });
      })
      .catch((error) => console.error("Lỗi khi tải đơn hàng:", error));
  }

  // Function to check if the order matches the search query
  function matchesQuery(order, filter, query) {
    const value = order[filter];
    if (typeof value === "string" || typeof value === "number") {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    }
    return false;
  }

  // Function to create the order div dynamically
  function createOrderDiv(order) {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order");

    // Section code
    const sectionCode = document.createElement("div");
    sectionCode.classList.add("section", "code");
    const orderId = document.createElement("p");
    orderId.textContent = `#${order.order_id}`;
    sectionCode.appendChild(orderId);
    orderDiv.appendChild(sectionCode);

    // Section info
    const sectionInfo = document.createElement("div");
    sectionInfo.classList.add("section", "info");
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column");

    const customerInfo = document.createElement("p");
    customerInfo.textContent = `Tên KH: ${order.customer_name || ""} SĐT: ${
      order.phone_no || ""
    }`;
    columnDiv.appendChild(customerInfo);

    const amountInfo = document.createElement("p");
    amountInfo.textContent = `Số tiền KH trả: $${
      order.amount_to_pay || "0.00"
    }`;
    columnDiv.appendChild(amountInfo);

    const productInfo = document.createElement("p");
    productInfo.textContent = `Sản phẩm: ${order.product_details || "null"}`;
    columnDiv.appendChild(productInfo);

    sectionInfo.appendChild(columnDiv);
    orderDiv.appendChild(sectionInfo);

    // Section charged
    const sectionCharged = document.createElement("div");
    sectionCharged.classList.add("section", "charged");
    const chargedInfo = document.createElement("p");
    chargedInfo.textContent = `Đã thu: $${order.deposited || "undefined"}`;
    sectionCharged.appendChild(chargedInfo);
    orderDiv.appendChild(sectionCharged);

    // Section actions
    const sectionActions = document.createElement("div");
    sectionActions.classList.add("section", "actions");

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result");

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("status-btn");
    statusBtn.textContent = "Hoàn Tất";
    resultDiv.appendChild(statusBtn);
    sectionActions.appendChild(resultDiv);

    // Add print and edit icons
    const printIcon = document.createElement("img");
    printIcon.src = "../Assets/images/printericons-02.png";
    printIcon.alt = "Biểu tượng in";
    printIcon.classList.add("icon-btn");
    sectionActions.appendChild(printIcon);

    const editIcon = document.createElement("img");
    editIcon.src = "/Assets/images/editpic.png"; // Corrected path to your edit icon
    editIcon.alt = "Biểu tượng chỉnh sửa";
    editIcon.classList.add("icon-btn");
    sectionActions.appendChild(editIcon);

    // Add click event for the edit icon
    editIcon.addEventListener("click", function () {
      populateBillingSection(order, "payment");
      modal.style.display = "block";
    });

    // Add click event for the print icon
    printIcon.addEventListener("click", function () {
      populateBillingSection(order, "full");
      modal.style.display = "block";
    });

    orderDiv.appendChild(sectionActions);

    return orderDiv;
  }

  // Function to populate the billing section in the modal
  function populateBillingSection(order, mode = "full") {
    // Clear all fields first
    clearModalFields();

    if (mode === "payment") {
      // Hide all sections that are not related to payment or delivery
      document.querySelectorAll(".full-details").forEach((el) => {
        el.style.display = "none";
      });

      // Show only payment and delivery sections
      document.getElementById("paymentSection").style.display = "block";
      document.getElementById("deliverySection").style.display = "block";

      // Populate payment method
      document.getElementById("orderNo").value = order.order_id;

      if (order.payment_method === "cash") {
        document.getElementById("paymentCash").checked = true;
        document.getElementById("cashDetails").classList.remove("hidden");
        document.getElementById("transactionDetails").classList.add("hidden");
      } else if (order.payment_method === "transaction") {
        document.getElementById("paymentTransaction").checked = true;
        document.getElementById("cashDetails").classList.add("hidden");
        document
          .getElementById("transactionDetails")
          .classList.remove("hidden");
      }

      document.getElementById("depositedAmountCash").value =
        order.deposited || 0;
      document.getElementById("timeTransaction").value =
        order.payment_timing || "";

      // Populate delivery method
      if (order.delivery_method === "pickup") {
        document.getElementById("deliveryPickup").checked = true;
      } else if (order.delivery_method === "delivery") {
        document.getElementById("deliveryDelivery").checked = true;
      }
    } else {
      // Show all sections for full details
      document.querySelectorAll(".full-details").forEach((el) => {
        el.style.display = "block";
      });

      // Populate all fields as before
      document.getElementById("orderNo").value = order.order_id;
      document.getElementById("staffName").value = order.staff_name;
      document.getElementById("designer").value = order.designer;
      document.getElementById("billingCustomerName").value =
        order.customer_name;
      document.getElementById("phoneNo").value = order.phone_no;

      if (order.payment_method === "cash") {
        document.getElementById("paymentCash").checked = true;
        document.getElementById("cashDetails").classList.remove("hidden");
        document.getElementById("transactionDetails").classList.add("hidden");
      } else if (order.payment_method === "transaction") {
        document.getElementById("paymentTransaction").checked = true;
        document.getElementById("cashDetails").classList.add("hidden");
        document
          .getElementById("transactionDetails")
          .classList.remove("hidden");
      }

      document.getElementById("finalProductDetails").textContent =
        order.product_details || "No product details";
      document.getElementById("discount").value = order.discount || 0;
      document.getElementById("amountToPay").textContent =
        order.amount_to_pay || 0;
      document.getElementById("noteDetails").value = order.note || "";

      if (order.delivery_method === "pickup") {
        document.getElementById("deliveryPickup").checked = true;
        document.getElementById("pickupDetails").classList.remove("hidden");
        document.getElementById("deliveryDetails").classList.add("hidden");
      } else if (order.delivery_method === "delivery") {
        document.getElementById("deliveryDelivery").checked = true;
        document.getElementById("pickupDetails").classList.add("hidden");
        document.getElementById("deliveryDetails").classList.remove("hidden");
      }

      document.getElementById("deliveryCompany").value =
        order.delivery_company || "";
      document.getElementById("deliveryFee").value = order.delivery_fee || 0;
    }
  }

  // Function to clear all fields in the modal
  function clearModalFields() {
    document.getElementById("orderNo").value = "";
    document.getElementById("staffName").value = "";
    document.getElementById("designer").value = "";
    document.getElementById("billingCustomerName").value = "";
    document.getElementById("phoneNo").value = "";
    document.getElementById("depositedAmountCash").value = "";
    document.getElementById("timeTransaction").value = "";
    document.getElementById("finalProductDetails").textContent = "";
    document.getElementById("discount").value = 0;
    document.getElementById("amountToPay").textContent = 0;
    document.getElementById("noteDetails").value = "";
    document.getElementById("deliveryCompany").value = "";
    document.getElementById("deliveryFee").value = 0;

    document.querySelectorAll(".payment-only").forEach((el) => {
      el.style.display = "none";
    });
    document.querySelectorAll(".full-details").forEach((el) => {
      el.style.display = "none";
    });
  }

  // Add event listener for the "Update" button in the edit modal
  const editUpdateButton = document.getElementById("editUpdateButton");

  editUpdateButton.addEventListener("click", function () {
    // Collect payment and delivery details
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;
    const paymentTiming = document.getElementById("timeTransaction").value;
    const depositedAmount =
      paymentMethod === "cash"
        ? document.getElementById("depositedAmountCash").value
        : document.getElementById("depositedAmountTransaction").value;

    // Collect additional data as needed
    const orderId = document.getElementById("orderNo").value;

    const paymentData = {
      order_id: orderId,
      payment_method: paymentMethod,
      payment_timing: paymentTiming,
      deposited: depositedAmount,
    };

    fetch(`/orders/order_payments/update/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Payment details updated successfully!");
          modal.style.display = "none";
          fetchOrders(); // Refresh the order list
        } else {
          alert("Failed to update payment details.");
        }
      })
      .catch((error) =>
        console.error("Error updating payment details:", error)
      );
  });

  // Handle search input
  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      const filter = document.querySelector(
        'input[name="filter"]:checked'
      ).value;
      const query = this.value;

      fetchOrders(filter, query);
    });

  // Initial fetch with default filter
  fetchOrders();
});

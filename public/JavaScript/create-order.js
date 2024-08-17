document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const suggestions = document.getElementById("suggestions");
  const productDetails = document.getElementById("productDetails");
  const productNameSpan = document.getElementById("productName");
  const specificationsSelect = document.getElementById("specifications");
  const pricePerM2Span = document.getElementById("pricePerM2");
  const lengthInput = document.getElementById("length");
  const widthInput = document.getElementById("width");
  const totalSizeSpan = document.getElementById("totalSize");
  const printingMoneySpan = document.getElementById("printingMoney");
  const leftMaterialSpan = document.getElementById("leftMaterial");
  const perPieceMoneySpan = document.getElementById("perPieceMoney");
  const quantityInput = document.getElementById("quantity");
  const totalMoneySpan = document.getElementById("totalMoney");
  const noteInput = document.getElementById("note");
  const addToCartButton = document.getElementById("addToCartButton");
  const cartIcon = document.getElementById("cartIcon");
  const cartPopup = document.getElementById("cartPopup");
  const cartItemsList = document.getElementById("cartItems");
  const closeCartButton = document.getElementById("closeCartButton");
  const nextButton = document.getElementById("nextButton");
  const finalProductDetails = document.getElementById("finalProductDetails");
  const finalizationPopup = document.getElementById("finalizationPopup");
  const finalizationPopupContent = document.getElementById(
    "finalizationPopupContent"
  );
  const printButton = document.createElement("button");
  printButton.innerHTML = '<i class="fas fa-print"></i>';
  printButton.className = "button-common print-button";
  printButton.onclick = function () {
    window.printFinalOrder();
  };

  const depositedAmountCashInput = document.getElementById(
    "depositedAmountCash"
  );
  const depositedAmountTransactionInput = document.getElementById(
    "depositedAmountTransaction"
  );

  let chosenProducts = [];
  let maxSide = 3; // default value if not fetched from DB
  let extraSupply = 1; // default value if not fetched from DB
  let productPrices = []; // Array to store the prices of products
  let tongTienHangValue = 0; // Variable to store Tổng tiền hàng

  // Event listeners for the "Tiền Đặt Cọc" inputs
  depositedAmountCashInput.addEventListener("input", function () {
    calculateFinalAmount(); // Recalculate the final amount whenever the deposit changes
  });

  depositedAmountTransactionInput.addEventListener("input", function () {
    calculateFinalAmount(); // Recalculate the final amount whenever the deposit changes
  });

  // Event listener for the discount input field
  document.getElementById("discount").addEventListener("input", function () {
    calculateFinalAmount(); // Recalculate the final amount whenever the discount changes
  });

  // Event listener for the delivery fee input field
  document.getElementById("deliveryFee").addEventListener("input", function () {
    calculateFinalAmount(); // Recalculate the final amount whenever the delivery fee changes
  });

  lengthInput.addEventListener("input", updateCalculations);
  widthInput.addEventListener("input", updateCalculations);
  quantityInput.addEventListener("input", updateCalculations);

  function fetchMaxSide(productName) {
    const url = `/products/product-max-side?productName=${encodeURIComponent(
      productName
    )}`;
    console.log("Fetching max side from URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Max side data fetched:", data);
        maxSide = parseFloat(data.max_side) || 3; // default to 3 if not specified
        extraSupply = parseFloat(data.extra_supply) || 1; // default to 1 if not specified
        updateCalculations();
      })
      .catch((error) => {
        console.error("Error fetching max side:", error);
      });
  }

  function displayProductDetails(product) {
    productNameSpan.textContent = product.product_name;
    productDetails.classList.remove("hidden");

    const url = `/products/product-specifications?productName=${encodeURIComponent(
      product.product_name
    )}`;
    console.log("Fetching specifications from URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((specifications) => {
        specificationsSelect.innerHTML = specifications
          .map(
            (spec) =>
              `<option value="${spec.product_specification}">${spec.product_specification}</option>`
          )
          .join("");

        if (specifications.length > 0) {
          fetchPricePerM2(
            product.product_name,
            specifications[0].product_specification
          );
          fetchMaxSide(product.product_name); // Make sure fetchMaxSide is called after it's defined
        }

        specificationsSelect.addEventListener("change", function () {
          fetchPricePerM2(product.product_name, this.value);
        });
      })
      .catch((error) => {
        console.error("Error fetching product specifications:", error);
        alert(
          "Sorry, there was an error fetching the product specifications. Please try again later."
        );
      });
  }

  function fetchPricePerM2(productName, productSpecification) {
    const url = `/products/product-price?productName=${encodeURIComponent(
      productName
    )}&productSpecification=${encodeURIComponent(productSpecification)}`;
    console.log("Fetching price from URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((priceData) => {
        console.log("Price Data fetched:", priceData);

        if (priceData.price_perm2) {
          const price = parseFloat(priceData.price_perm2);
          pricePerM2Span.textContent = price.toFixed(2);
          updateCalculations();
        } else {
          pricePerM2Span.textContent = "0.00"; // Set to 0 if price_perm2 is not available
        }

        if (priceData.price_per_unit) {
          const pricePerUnit = parseFloat(priceData.price_per_unit).toFixed(2);
          perPieceMoneySpan.textContent = pricePerUnit;
          totalMoneySpan.textContent = pricePerUnit; // Update total money as well
        } else {
          perPieceMoneySpan.textContent = "0.00"; // Ensure this is set correctly
          totalMoneySpan.textContent = "0.00"; // Ensure this is set correctly
        }
      })
      .catch((error) => {
        console.error("Error fetching product price:", error);
        pricePerM2Span.textContent = "0.00";
        perPieceMoneySpan.textContent = "0.00";
        totalMoneySpan.textContent = "0.00";
        updateCalculations();
      });
  }

  function calculateTotalSize() {
    const lengthValue = parseFloat(lengthInput.value) || 0;
    const widthValue = parseFloat(widthInput.value) || 0;
    return lengthValue * widthValue;
  }

  function calculatePrintingMoney() {
    const totalSize = calculateTotalSize();
    const pricePerM2 = parseFloat(pricePerM2Span.textContent) || 0;
    return totalSize * pricePerM2;
  }

  function calculateLeftMaterial() {
    const lengthValue = parseFloat(lengthInput.value) || 0;
    const widthValue = parseFloat(widthInput.value) || 0;

    let effectiveMaxSide = maxSide || 3; // default to 3 if not set

    if (lengthValue > maxSide || widthValue > maxSide) {
      if (lengthValue <= 2 * maxSide && widthValue <= 2 * maxSide) {
        effectiveMaxSide = 2 * maxSide;
      } else if (lengthValue <= 3 * maxSide && widthValue <= 3 * maxSide) {
        effectiveMaxSide = 3 * maxSide;
      }
    }

    const smallerSide = Math.min(lengthValue, widthValue);
    const largerSide = Math.max(lengthValue, widthValue);

    let leftMaterial = (effectiveMaxSide - largerSide) * smallerSide;
    if (leftMaterial < 0) {
      leftMaterial = 0;
    }

    leftMaterial *= extraSupply || 1; // default to 1 if not set

    console.log(`Length: ${lengthValue}, Width: ${widthValue}`);
    console.log(
      `Effective Max Side: ${effectiveMaxSide}, Left Material Size: ${leftMaterial}`
    );

    return leftMaterial;
  }

  function calculatePerPieceMoney() {
    const printingMoney = calculatePrintingMoney();
    const leftMaterial = calculateLeftMaterial();
    console.log("Vật tư dư:", leftMaterial);

    leftMaterialSpan.textContent = leftMaterial.toFixed(2);

    const pricePerUnit = parseFloat(perPieceMoneySpan.textContent) || 0; // Use price_per_unit here if available
    if (pricePerUnit > 0) {
      return pricePerUnit;
    }

    return printingMoney + leftMaterial;
  }

  function calculateTotalMoney() {
    const perPieceMoney = calculatePerPieceMoney();
    const quantity = parseFloat(quantityInput.value) || 1;
    return perPieceMoney * quantity;
  }

  function updateCalculations() {
    const totalSize = calculateTotalSize();
    totalSizeSpan.textContent = totalSize.toFixed(2);

    const printingMoney = calculatePrintingMoney();
    printingMoneySpan.textContent = printingMoney.toFixed(2);

    const perPieceMoney = calculatePerPieceMoney();
    perPieceMoneySpan.textContent = perPieceMoney.toFixed(2);

    const totalMoney = calculateTotalMoney();
    totalMoneySpan.textContent = totalMoney.toFixed(2);
    tongTienHangValue = totalMoney;
  }

  addToCartButton.addEventListener("click", function () {
    const productName = productNameSpan.textContent;
    const productSpecification = specificationsSelect.value;
    const totalMoney = parseFloat(totalMoneySpan.textContent) || 0;
    const note = noteInput.value;

    const cartItem = {
      productName,
      productSpecification,
      totalMoney,
      note,
    };

    chosenProducts.push(cartItem);
    productPrices.push(totalMoney); // Store the total price in the array

    console.log("Added to cart:", cartItem); // Log each added item
    console.log("Current chosenProducts array:", chosenProducts); // Log the entire chosenProducts array

    // Assign prices to dynamically named variables
    for (let i = 0; i < productPrices.length; i++) {
      window[`sp${i + 1}price`] = productPrices[i];
      console.log(`sp${i + 1}price:`, window[`sp${i + 1}price`]); // Print the price variables
    }

    // Recalculate the total amount due
    calculateTotalAndFinalAmount();

    updateCartPopup();
  });

  cartIcon.addEventListener("click", function () {
    cartPopup.classList.toggle("hidden");
  });

  closeCartButton.addEventListener("click", function () {
    cartPopup.classList.add("hidden");
  });

  nextButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior (such as form submission)
    updateFinalProductDetails();
    calculateTotalAndFinalAmount(); // Calculate Tổng tiền hàng and Số tiền khách cần trả when the "Tiếp" button is clicked
  });

  function calculateTotalAndFinalAmount() {
    tongTienHangValue = 0;

    // Sum up all the prices stored in the dynamically named variables (sp1price, sp2price, etc.)
    for (let i = 0; i < productPrices.length; i++) {
      tongTienHangValue += window[`sp${i + 1}price`] || 0;
    }

    // Log Tổng tiền hàng to the console
    console.log("Tổng tiền hàng:", tongTienHangValue); // Log Tổng tiền hàng

    // Calculate and update the final amount due
    calculateFinalAmount();
  }

  function calculateFinalAmount() {
    // Get the discount entered by the user, defaulting to 0 if not provided
    const discount = parseFloat(document.getElementById("discount").value) || 0;

    // Get the deposited amounts
    const depositedAmountTransaction =
      parseFloat(document.getElementById("depositedAmountTransaction").value) ||
      0;
    const depositedAmountCash =
      parseFloat(document.getElementById("depositedAmountCash").value) || 0;
    const totalDeposited = depositedAmountTransaction + depositedAmountCash;

    // Get the delivery fee
    const deliveryFee =
      parseFloat(document.getElementById("deliveryFee").value) || 0;

    // Calculate Số tiền khách cần trả
    const soTienKhachCanTra =
      tongTienHangValue - discount - totalDeposited + deliveryFee;

    // Display Số tiền khách cần trả in the HTML
    document.getElementById("amountToPay").textContent =
      soTienKhachCanTra.toFixed(2);

    // Log Số tiền khách cần trả to the console
    console.log("Số tiền khách cần trả:", soTienKhachCanTra);
  }

  function updateCartPopup() {
    cartItemsList.innerHTML = "";
    chosenProducts.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
              <span>${item.productName} - ${
        item.productSpecification
      }: ${item.totalMoney.toFixed(2)} VND</span>
              <span>Note: ${item.note}</span>
              <button class="remove-from-cart" data-index="${index}"><i class="fas fa-times"></i></button>
          `;
      cartItemsList.appendChild(cartItemDiv);
    });

    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        chosenProducts.splice(index, 1);
        productPrices.splice(index, 1); // Also remove the corresponding price
        console.log(
          "Removed from cart, current chosenProducts array:",
          chosenProducts
        ); // Log the chosenProducts array after removal
        updateCartPopup();
        calculateTotalAndFinalAmount(); // Recalculate the total amount due after removing an item
      });
    });
  }

  function updateFinalProductDetails() {
    finalProductDetails.innerHTML = chosenProducts
      .map(
        (item) =>
          `<div>
              <span>${item.productName} - ${
            item.productSpecification
          }: ${item.totalMoney.toFixed(2)} VND</span>
              <span>Note: ${item.note}</span>
          </div>`
      )
      .join("");
    console.log(
      "Updated final product details:",
      finalProductDetails.innerHTML
    ); // Console log the final product details
    console.log(
      "Current chosenProducts array before submission:",
      chosenProducts
    ); // Log the chosenProducts array before submission
  }

  function submitBillingData() {
    const staffName = document.getElementById("staffName")
      ? document.getElementById("staffName").value
      : "";
    const designer = document.getElementById("designer")
      ? document.getElementById("designer").value
      : "";
    const customerName = document.getElementById("billingCustomerName")
      ? document.getElementById("billingCustomerName").value
      : "";
    const phoneNo = document.getElementById("phoneNo")
      ? document.getElementById("phoneNo").value
      : "";
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    )
      ? document.querySelector('input[name="payment"]:checked').value
      : "";
    const deliveryMethod = document.querySelector(
      'input[name="delivery"]:checked'
    )
      ? document.querySelector('input[name="delivery"]:checked').value
      : "";
    const discount = document.getElementById("discount")
      ? document.getElementById("discount").value
      : "0";
    const amountToPay = document.getElementById("amountToPay")
      ? document.getElementById("amountToPay").textContent
      : "0";
    const note = document.getElementById("noteDetails")
      ? document.getElementById("noteDetails").value
      : "";

    // Determine which section's fields to use based on payment method
    let paymentTiming = "";
    let depositedAmount = 0;

    if (paymentMethod === "cash") {
      paymentTiming = document.getElementById("timeReceiveCash").value;
      depositedAmount =
        parseFloat(document.getElementById("depositedAmountCash").value) || 0;
    } else if (paymentMethod === "transaction") {
      paymentTiming = document.getElementById("timeTransaction").value;
      depositedAmount =
        parseFloat(
          document.getElementById("depositedAmountTransaction").value
        ) || 0;
    }

    console.log("Payment Timing:", paymentTiming);
    console.log("Deposit Amount:", depositedAmount);

    const deliveryCompany = document.getElementById("deliveryCompany")
      ? document.getElementById("deliveryCompany").value
      : "";
    const deliveryFee = document.getElementById("deliveryFee")
      ? parseFloat(document.getElementById("deliveryFee").value)
      : 0;

    const orderData = {
      staffName,
      designer,
      customerName,
      phoneNo,
      productDetails: chosenProducts, // Use chosenProducts array
      paymentMethod,
      deliveryMethod,
      discount,
      amountToPay,
      deposit: isNaN(depositedAmount) ? 0 : depositedAmount, // Handle NaN cases
      note,
      payment_timing: paymentTiming || "", // Handle the date
      delivery_company: deliveryCompany, // Add delivery company
      delivery_fee: deliveryFee, // Add delivery fee
    };

    console.log("Order data before sending:", orderData); // Log data being sent

    fetch("/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        console.log("Response status:", response.status); // Log the response status
        return response.text().then((text) => {
          console.log("Response text:", text); // Log the raw response text
          if (!response.ok) {
            throw new Error(text);
          }
          return text;
        });
      })
      .then((data) => {
        console.log("Order created successfully:", data);
        // Additional actions after order creation
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        console.error("Order data sent:", orderData); // Log order data that was sent
        alert("There was an issue creating your order. Please try again.");
      });
  }

  document
    .getElementById("next-billing")
    .addEventListener("click", function () {
      // Ensure the finalProductDetails is updated before submission
      updateFinalProductDetails();

      submitBillingData();

      const rightHalfContent = document
        .querySelector(".right-half")
        .cloneNode(true);
      const nextBillingButton = rightHalfContent.querySelector("#next-billing");
      if (nextBillingButton) {
        nextBillingButton.remove();
      }

      const removeButtons =
        rightHalfContent.querySelectorAll(".remove-from-cart");
      removeButtons.forEach((button) => {
        button.remove();
      });

      finalizationPopupContent.innerHTML = "";
      finalizationPopupContent.appendChild(rightHalfContent);
      finalizationPopupContent.appendChild(printButton);

      finalizationPopup.classList.remove("hidden");
    });

  document
    .getElementById("closeFinalizationPopupButton")
    .addEventListener("click", function () {
      finalizationPopup.classList.add("hidden");
    });

  fetch("/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      if (!Array.isArray(products)) {
        throw new Error("Products is not an array");
      }
      console.log("Products:", products);

      searchBar.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        suggestions.innerHTML = "";
        if (query) {
          const filteredProducts = products.filter((product) =>
            product.product_name.toLowerCase().includes(query)
          );
          filteredProducts.forEach((product) => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.textContent = product.product_name;
            suggestionDiv.addEventListener("click", function () {
              displayProductDetails(product);
              suggestions.style.display = "none";
            });
            suggestions.appendChild(suggestionDiv);
          });
          suggestions.style.display = "block";
        } else {
          suggestions.style.display = "none";
        }
      });

      if (products.length > 0) {
        displayProductDetails(products[0]);
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  // Show/hide payment and delivery details based on user selection
  const paymentCash = document.getElementById("paymentCash");
  const paymentTransaction = document.getElementById("paymentTransaction");
  const cashDetails = document.getElementById("cashDetails");
  const transactionDetails = document.getElementById("transactionDetails");
  const deliveryPickup = document.getElementById("deliveryPickup");
  const deliveryDelivery = document.getElementById("deliveryDelivery");
  const pickupDetails = document.getElementById("pickupDetails");
  const deliveryDetails = document.getElementById("deliveryDetails");

  if (paymentCash && cashDetails && transactionDetails) {
    paymentCash.addEventListener("change", function () {
      if (paymentCash.checked) {
        cashDetails.classList.remove("hidden");
        transactionDetails.classList.add("hidden");
      }
    });

    paymentTransaction.addEventListener("change", function () {
      if (paymentTransaction.checked) {
        cashDetails.classList.add("hidden");
        transactionDetails.classList.remove("hidden");
      }
    });
  }

  if (deliveryPickup && pickupDetails && deliveryDetails) {
    deliveryPickup.addEventListener("change", function () {
      if (deliveryPickup.checked) {
        pickupDetails.classList.remove("hidden");
        deliveryDetails.classList.add("hidden");
      }
    });

    deliveryDelivery.addEventListener("change", function () {
      if (deliveryDelivery.checked) {
        pickupDetails.classList.add("hidden");
        deliveryDetails.classList.remove("hidden");
      }
    });
  }

  function printFinalOrder() {
    console.log("Print function called"); // Debugging statement
    const printContent = document.getElementById(
      "finalizationPopupContent"
    ).innerHTML;
    console.log("Print content:", printContent); // Debugging statement

    // Check if the print content is not empty
    if (!printContent) {
      console.error("No content to print");
      return;
    }

    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);

    const printDocument =
      printFrame.contentDocument || printFrame.contentWindow.document;
    printDocument.open();
    printDocument.write("<html><head><title>Print Order</title>");
    printDocument.write(
      '<link rel="stylesheet" href="../CSS/create-order.css" type="text/css" />'
    );
    printDocument.write(
      '<link rel="stylesheet" href="../CSS/navbar.css" type="text/css" />'
    );
    printDocument.write(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" type="text/css" />'
    );
    printDocument.write("</head><body>");
    printDocument.write("<div>" + printContent + "</div>");
    printDocument.write("</body></html>");
    printDocument.close();

    printFrame.onload = function () {
      console.log("Iframe loaded"); // Debugging statement
      printFrame.contentWindow.focus(); // Ensure the iframe gets focus
      printFrame.contentWindow.print();
      document.body.removeChild(printFrame); // Clean up the iframe after printing
    };

    // Error handling for print
    printFrame.onerror = function () {
      console.error("Error loading iframe for print");
    };
  }

  window.printFinalOrder = printFinalOrder;
});

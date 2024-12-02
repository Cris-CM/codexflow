document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    {
      id: 1,
      title: "Desarrollo Web Fullstack",
      price: 299.99,
      image: "/Client/Images/courses/web-dev.jpg",
    },
    {
      id: 2,
      title: "Diseño UX/UI Avanzado",
      price: 249.99,
      image: "/Client/Images/courses/ux-ui.jpg",
    },
    {
      id: 3,
      title: "Machine Learning y Data Science",
      price: 349.99,
      image: "/Client/Images/courses/ml-ds.jpg",
    },
    {
      id: 4,
      title: "Desarrollo de Apps Móviles",
      price: 279.99,
      image: "/Client/Images/courses/mobile-apps.jpg",
    },
    {
      id: 5,
      title: "DevOps y Cloud Computing",
      price: 329.99,
      image: "/Client/Images/courses/devops.jpg",
    },
    {
      id: 6,
      title: "Ciberseguridad Empresarial",
      price: 299.99,
      image: "/Client/Images/courses/cybersecurity.jpg",
    },
  ];

  const plans = [
    { id: "basico", title: "Plan Básico", price: 200 },
    { id: "duo", title: "Plan Duo", price: 350 },
    { id: "expert", title: "Plan Expert", price: 500 },
  ];

  let cart = [];

  const courseGrid = document.getElementById("courseGrid");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.querySelector(".cart-count");
  const paymentAmount = document.getElementById("paymentAmount");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartToggle = document.getElementById("cartToggle");
  const checkoutButton = document.getElementById("checkoutButton");
  const purchaseItems = document.getElementById("purchaseItems");
  const purchaseTotal = document.getElementById("purchaseTotal");
  const searchInput = document.querySelector(".search-bar input");
  const searchResults = document.querySelector(".search-results");

  const cardNumberInput = document.getElementById("cardNumber");
  const expiryDateInput = document.getElementById("cardExpiry");
  const cvcInput = document.getElementById("cardCVC");

  cardNumberInput.addEventListener("input", (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  });

  expiryDateInput.addEventListener("input", (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{1,1})/, "$1/$2")
      .trim();
  });

  cvcInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
  });

  function renderCourses() {
    courseGrid.innerHTML = courses
      .map(
        (course) => `
      <div class="course-card">
        <img src="${course.image}" alt="${course.title}">
        <div class="course-content">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-price">S/ ${course.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${course.id}">
            <i class="lucide-shopping-cart"></i> Agregar al carrito
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  function updateCart() {
    cartItems.innerHTML = "";
    purchaseItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.title} - S/ ${item.price.toFixed(2)}
        <button class="remove-item" data-index="${index}">Eliminar</button>
      `;
      cartItems.appendChild(li);
      purchaseItems.appendChild(li.cloneNode(true));
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    purchaseTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
    paymentAmount.textContent = total.toFixed(2);
  }

  function addToCart(item) {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      cart.push(item);
      updateCart();
    }
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function showView(viewId) {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.remove("active");
    });
    document.getElementById(viewId + "View").classList.add("active");
  }

  courseGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const courseId = parseInt(e.target.getAttribute("data-id"));
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        addToCart(course);
      }
    }
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(index);
    }
  });

  document.querySelectorAll(".select-plan").forEach((button) => {
    button.addEventListener("click", () => {
      const planId = button.getAttribute("data-plan");
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        addToCart(plan);
      }
    });
  });

  cartToggle.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
  });

  // Cerrar el carrito al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
      cartSidebar.classList.remove("open");
    }
  });

  checkoutButton.addEventListener("click", () => {
    showView("payment");
    cartSidebar.classList.remove("open");
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const viewId = button.getAttribute("data-view");
      showView(viewId);
    });
  });

  const paymentForm = document.getElementById("paymentForm");
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Pago procesado exitosamente!");
    cart = [];
    updateCart();
    showView("courses");
  });

  const paymentMethods = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  const paymentFields = {
    card: document.getElementById("cardPaymentFields"),
    yape: document.getElementById("yapePaymentFields"),
    cash: document.getElementById("cashPaymentFields"),
    paypal: document.getElementById("paypalPaymentFields"),
  };

  function showPaymentFields(method) {
    Object.values(paymentFields).forEach((field) => {
      field.style.display = "none";
    });
    paymentFields[method].style.display = "block";

    document
      .querySelectorAll(".payment-method-options label")
      .forEach((label) => {
        label.classList.remove("selected");
      });
    document
      .querySelector(`input[value="${method}"]`)
      .parentElement.classList.add("selected");
  }

  paymentMethods.forEach((method) => {
    method.addEventListener("change", (e) => {
      showPaymentFields(e.target.value);
    });
  });

  showPaymentFields("card");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm)
    );

    searchResults.innerHTML = filteredCourses
      .map(
        (course) => `
      <div class="search-result-item" data-id="${course.id}">
        ${course.title}
      </div>
    `
      )
      .join("");

    searchResults.style.display = filteredCourses.length > 0 ? "block" : "none";
  });

  searchResults.addEventListener("click", (e) => {
    if (e.target.classList.contains("search-result-item")) {
      const courseId = parseInt(e.target.getAttribute("data-id"));
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        showCourseDetails(course);
      }
      searchResults.style.display = "none";
      searchInput.value = "";
    }
  });

  function showCourseDetails(course) {
    const courseDetails = document.getElementById("courseDetails");
    courseDetails.innerHTML = `
      <h2>${course.title}</h2>
      <img src="${course.image}" alt="${course.title}">
      <p>Precio: S/ ${course.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${
        course.id
      }">Agregar al carrito</button>
    `;
    showView("courseDetails");
  }

  renderCourses();
  updateCart();
  showView("courses");
});

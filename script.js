const products = {
  welcome: {
    title: "Welcome Week Starter",
    price: 58,
    studentType: "First-year starter",
    moment: "Welcome week",
    copy:
      "Packed full of dorm necessities, this box Includes a popcorn starter set, mini first aid kit, utensils, candy, and other helpful dorm items. Academic coaching cards include how to read a syllabus, creating a roommate contract, and building good habits.",
  },
  study: {
    title: "Study Sprint",
    price: 64,
    studentType: "Focused achiever",
    moment: "Midterms",
    copy:
      "Satisfying snacks, planning and study tools, and self-care resets.",
  },
  homesick: {
    title: "Homesick Helper",
    price: 52,
    studentType: "Homesick helper",
    moment: "Welcome week",
    copy:
      "Comfort staples, familiar treats, and gentle routines for settling in and finding your community.",
  },
  activity: {
    title: "Activity Kits",
    price: 49,
    studentType: "Club or team rush",
    moment: "Welcome week",
    copy:
      "Rush week, club fairs, game days, lab-heavy weeks, and athlete-friendly add-ons.",
  },
};

const packageData = {
  "First-year starter|Welcome week": {
    productId: "welcome",
    title: "Welcome Week Starter",
    copy:
      "Packed full of dorm necessities, this box Includes a popcorn starter set, mini first aid kit, utensils, candy, and other helpful dorm items. Academic coaching cards include how to read a syllabus, creating a roommate contract, and building good habits.",
  },
  "Homesick helper|Welcome week": {
    productId: "homesick",
    title: "Homesick Helper",
    copy:
      "Comfort staples, familiar treats, and gentle routines for settling in and finding your community.",
  },

  "Focused achiever|Midterms": {
    productId: "study",
    title: "Study Sprint Box",
    copy:
      "High-focus supplies, desk snacks, and QR guides for office hours, review planning, and turning a rough grade into a useful signal.",
  },
  "Wellness reset|Finals": {
    productId: "study",
    title: "Finals Reset Box",
    copy:
      "Sleep-friendly comforts, hydration helpers, calm checklists, and professor-informed tips for finishing strong without running on panic.",
  },

  "First-year starter|Room refresh": {
    productId: "homesick",
    title: "Room Refresh",
    copy:
      "Dorms can stink--yours doesn't have to. Banish the funk and refresh your space so you can enjoy breathing deeply again.",
  },
  "Homesick helper|Room refresh": {
    productId: "homesick",
    title: "Room Refresh",
    copy:
      "Dorms can stink--yours doesn't have to. Banish the funk and refresh your space so you can enjoy breathing deeply again.",
  },
  "Focused achiever|Room refresh": {
    productId: "homesick",
    title: "Room Refresh",
    copy:
      "Dorms can stink--yours doesn't have to. Banish the funk and refresh your space so you can enjoy breathing deeply again.",
  },
  "Wellness reset|Room refresh": {
    productId: "homesick",
    title: "Room Refresh",
    copy:
      "Dorms can stink--yours doesn't have to. Banish the funk and refresh your space so you can enjoy breathing deeply again.",
  },
  "Club or team rush|Room refresh": {
    productId: "homesick",
    title: "Room Refresh",
    copy:
      "Dorms can stink--yours doesn't have to. Banish the funk and refresh your space so you can enjoy breathing deeply again.",
  },
  "First-year starter|Snack attack": {
    productId: "welcome",
    title: "Snack Attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
  "Homesick helper|Snack attack": {
    productId: "welcome",
    title: "Snack Attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
  "Focused achiever|Snack attack": {
    productId: "welcome",
    title: "Snack Attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
  "Wellness reset|Snack attack": {
    productId: "welcome",
    title: "Snack Attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
  "Club or team rush|Snack attack": {
    productId: "welcome",
    title: "Snack Attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
};

const fallbackCopy = {
  productId: "welcome",
  title: "Custom Care Package",
  copy:
    "A tailored mix of comfort, practical supplies, and QR-linked college guidance based on the student type and moment you choose.",
};

const addonLabels = {
  laundry: "Laundry rescue pack",
  professor: "Professor email prompt cards",
  snacks: "Extra snack sleeve",
};

let cart = [];
let packageNote = {};

const sliderContainer = document.querySelector(".lineup-slider-container");
const sliderTrack = document.querySelector("#lineupSliderTrack");
const prevButton = document.querySelector("#slidePrev");
const nextButton = document.querySelector("#slideNext");
const saveInterest = document.querySelector("#saveInterest");
const formStatus = document.querySelector("#formStatus");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const subtotal = document.querySelector("#subtotal");
const addonTotal = document.querySelector("#addonTotal");
const cartTotal = document.querySelector("#cartTotal");
const checkoutButton = document.querySelector("#checkoutButton");
const checkoutStatus = document.querySelector("#checkoutStatus");
const clearCart = document.querySelector("#clearCart");

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getSelectedAddons() {
  return [...document.querySelectorAll("input[name='addon']:checked")].map((addon) => ({
    id: addon.value,
    label: addonLabels[addon.value],
    price: Number(addon.dataset.price),
  }));
}

function addToCart(productId) {
  const existingLine = cart.find((line) => line.productId === productId);

  if (existingLine) {
    existingLine.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
    });
  }

  checkoutStatus.textContent = "";
  renderCart();
}

function changeQuantity(productId, delta) {
  cart = cart
    .map((line) =>
      line.productId === productId
        ? { ...line, quantity: Math.max(0, line.quantity + delta) }
        : line,
    )
    .filter((line) => line.quantity > 0);
  renderCart();
}

function totals() {
  const packageSubtotal = cart.reduce((sum, line) => {
    return sum + products[line.productId].price * line.quantity;
  }, 0);
  const selectedAddonTotal = getSelectedAddons().reduce((sum, addon) => sum + addon.price, 0);
  return {
    packageSubtotal,
    selectedAddonTotal,
    total: packageSubtotal + selectedAddonTotal,
  };
}

function renderCart() {
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  cartCount.textContent = itemCount;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">No packages yet.</p>';
  } else {
    cartItems.innerHTML = cart
      .map((line) => {
        const product = products[line.productId];
        return `
          <article class="cart-line">
            <div>
              <h4>${product.title}</h4>
              <p>${product.studentType} / ${product.moment} / ${money(product.price)} each</p>
            </div>
            <div class="quantity-control" aria-label="${product.title} quantity">
              <button type="button" data-quantity="${line.productId}" data-delta="-1">-</button>
              <span>${line.quantity}</span>
              <button type="button" data-quantity="${line.productId}" data-delta="1">+</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const cartTotals = totals();
  subtotal.textContent = money(cartTotals.packageSubtotal);
  addonTotal.textContent = money(cartTotals.selectedAddonTotal);
  cartTotal.textContent = money(cartTotals.total);
}

function savePackageNote() {
  packageNote = {
    studentName: document.querySelector("#studentName").value.trim(),
    school: document.querySelector("#school").value.trim(),
    deliveryWindow: document.querySelector("#deliveryWindow").value,
    need: document.querySelector("#need").value.trim(),
    addons: getSelectedAddons(),
  };

  formStatus.textContent = "Note attached to this prototype cart.";
  renderCart();
}

function fakeCheckout() {
  if (cart.length === 0) {
    checkoutStatus.textContent = "Add at least one package before checkout.";
    return;
  }

  const addonText = getSelectedAddons().map((addon) => addon.label).join(", ") || "No add-ons";
  const noteText = packageNote.studentName
    ? ` for ${packageNote.studentName}`
    : "";

  checkoutStatus.textContent = `Fake Shopify checkout ready${noteText}. Add-ons: ${addonText}.`;
}



document.querySelectorAll(".add-product").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.productId));
});

document.querySelectorAll(".see-details").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector("#inside");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll("input[name='addon']").forEach((addon) => {
  addon.addEventListener("change", renderCart);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  changeQuantity(button.dataset.quantity, Number(button.dataset.delta));
});

saveInterest.addEventListener("click", savePackageNote);
checkoutButton.addEventListener("click", fakeCheckout);
function renderSlider() {
  if (!sliderTrack) return;
  const uniquePackages = [];
  const seenTitles = new Set();
  
  Object.entries(packageData).forEach(([key, data]) => {
    if (!seenTitles.has(data.title)) {
      seenTitles.add(data.title);
      uniquePackages.push({ key, ...data });
    }
  });

  sliderTrack.innerHTML = uniquePackages.map((pkg) => {
    const [student, moment] = pkg.key.split("|");
    const tagText = pkg.title === "Welcome Week Starter" ? "Pre-Order Now" : `${moment.charAt(0).toUpperCase() + moment.slice(1)} • ${student}`;
    return `
      <article class="lineup-card" data-key="${pkg.key}">
        <span class="card-moment-tag">${tagText}</span>
        <h3>${pkg.title}</h3>
        <p>${pkg.copy}</p>
      </article>
    `;
  }).join("");
}

if (prevButton && nextButton && sliderContainer) {
  prevButton.addEventListener("click", () => {
    sliderContainer.scrollBy({ left: -374, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    sliderContainer.scrollBy({ left: 374, behavior: "smooth" });
  });
}

if (sliderTrack) {
  sliderTrack.addEventListener("click", (event) => {
    const card = event.target.closest(".lineup-card");
    if (!card) return;
    
    // Toggle active class on lineup cards
    document.querySelectorAll(".lineup-card").forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    const key = card.dataset.key;
    const pkg = packageData[key];
    if (pkg && pkg.productId) {
      const targetCard = document.querySelector(`.package-card[data-product-id="${pkg.productId}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
}

clearCart.addEventListener("click", () => {
  cart = [];
  checkoutStatus.textContent = "";
  renderCart();
});

// Render and initialize
renderSlider();
renderCart();

// About Us Modal Logic
const aboutUsBtn = document.querySelector("#aboutUsBtn");
const aboutUsModal = document.querySelector("#aboutUsModal");
const closeAboutUs = document.querySelector("#closeAboutUs");

if (aboutUsBtn && aboutUsModal && closeAboutUs) {
  const openModal = (e) => {
    e.preventDefault();
    aboutUsModal.classList.add("active");
    aboutUsModal.setAttribute("aria-hidden", "false");
    closeAboutUs.focus();
  };

  const closeModal = () => {
    aboutUsModal.classList.remove("active");
    aboutUsModal.setAttribute("aria-hidden", "true");
    aboutUsBtn.focus();
  };

  aboutUsBtn.addEventListener("click", openModal);
  closeAboutUs.addEventListener("click", closeModal);

  // Close modal when clicking outside the modal content card
  aboutUsModal.addEventListener("click", (e) => {
    if (e.target === aboutUsModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && aboutUsModal.classList.contains("active")) {
      closeModal();
    }
  });
}

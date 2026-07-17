const products = {
  welcome: {
    title: "Welcome Week Starter",
    price: 58,
    studentType: "First-year starter",
    moment: "Welcome week",
    copy:
      "Packed full of dorm necessities, including a popcorn starter set, mini first aid kit, utensils, candy, and other practical goodies.",
    image: "assets/welcome_week_box.jpg",
    contents: [
      "Mini popcorn starter set: individual silicone popcorn popper, 4 oz popcorn kernels with wooden scoop, and 0.9 oz popcorn seasoning",
      "First aid kit: 15 adhesive bandages, two 5x7 cleansing towels, two neosporin packs, and two hydrocortisone packs in a sturdy, re-usable case",
      "A wheatgrass bowl and plate (microwave safe) with a zippered pouch of stainless steel utensils (fork, butter knife, spoon, chopsticks) and a mini salt-and-pepper shaker",
      "Clorox Disinfecting on the go travel wipes",
      "Command strips for hanging posters (4)",
      "A wallet multi-tool",
      "An invigorating citrus room and linen spray",
      "Fidget toy",
      "Sweet snacks",
      "Academic coaching cards for: reading a syllabus, creating a roommate contract, and building a solid foundation of healthy habits"
    ]
  },
  homesick: {
    title: "Homesick Helper",
    price: 52,
    studentType: "Homesick helper",
    moment: "Welcome week",
    copy:
      "Comfort staples, familiar treats, and routines for settling in and finding your community.",
  },
  study: {
    title: "Study Sprint Box",
    price: 64,
    studentType: "Focused achiever",
    moment: "Midterms",
    copy:
      "Supplies and tips for improved planning and studying; satisfying snacks; and guidance for turning a rough grade or ineffective habit into a building block for success.",
  },
  sick: {
    title: "Warm Hug from Home",
    price: 48,
    studentType: "Wellness reset",
    moment: "Sick day",
    copy:
      "Tissues, throat lozenges, hydration powder, soup, tea, and expert tips on when to visit campus health or self-care.",
  },
  finals: {
    title: "Finals Reset Box",
    price: 64,
    studentType: "Wellness reset",
    moment: "Finals",
    copy:
      "Sleep-friendly comforts, hydration helpers, calm checklists, and professor-informed tips for finishing strong without running on panic.",
  },
  refresh: {
    title: "Room Refresh",
    price: 45,
    studentType: "First-year starter",
    moment: "Room refresh",
    copy:
      "Dorms can stink--yours doesn't have to. Banish the funk and refresh your space so you can enjoy breathing deeply again.",
  },
  snack: {
    title: "Snack Attack",
    price: 42,
    studentType: "First-year starter",
    moment: "Snack attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
  seasonal: {
    title: "Seasonal Celebrations",
    price: 68,
    studentType: "Focused achiever",
    moment: "Holiday",
    copy:
      "Holiday themes, finals treats, exam survival kits, and birthday celebration packs customized for the time of year.",
  },
};

const packageData = {
  "First-year starter|Welcome week": {
    productId: "welcome",
    title: "Welcome Week Starter",
    copy:
      "Practical necessities for living in a smaller, shared space (with that tiny microwave!), plus coaching tips for building a strong academic foundation and fulfilling academic and personal relationships.",
  },
  "Homesick helper|Welcome week": {
    productId: "homesick",
    title: "Homesick Helper",
    copy:
      "Soon, campus will feel like a second home. Until then, help ease the transition with this box of comfort staples, familiar treats, and routines for settling in and finding your community.",
  },
  "Focused achiever|Midterms": {
    productId: "study",
    title: "Study Sprint Box",
    copy:
      "Everyone hits a rough patch in the transition to college-level work--what matters most is how they handle it. This box includes supplies and tips for improved planning and studying; satisfying snacks; and guidance for turning a rough grade or ineffective habit into a building block for success.",
  },
  "Wellness reset|Sick baby": {
    productId: "sick",
    title: "Warm Hug from Home",
    copy:
      "College exposes them to new people, new experiences, and new germs. Send healing comfort across the miles with tissues, throat lozenges, hydration packets, soup, and tea, along with tips on utilizing campus resources, making up work and communicating clearly with faculty.",
  },
  "Wellness reset|Finals": {
    productId: "finals",
    title: "Finals Reset Box",
    copy:
      "Finals week requires a balance of hard work, focus, and intentional self-care. Help them across the finish line with lots of colorful, fun school supplies, snacks for late nights, coaching cards for successful study habits, and tips for finishing strong without running on panic.",
  },
  "First-year starter|Room refresh": {
    productId: "refresh",
    title: "Room Refresh",
    copy:
      "Dorms can really stink--theirs doesn't have to. Banish the funk and refresh their space so they can enjoy breathing deeply again.",
  },
  "First-year starter|Snack attack": {
    productId: "snack",
    title: "Snack Attack",
    copy:
      "Whether they love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of their favorites.",
  },
  "First-year starter|Holiday": {
    productId: "seasonal",
    title: "Seasonal Celebrations",
    copy:
      "They may not be home to enjoy their favorite seasons, but you can help them celebrate from afar and make their dorm rooms feel festive with this box of seasonal goodies for fall, Christmas, Valentine's Day, birthdays, and other important occasions.",
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
  snacks_cookies: "Extra snack sleeve: cookies",
  snacks_chips: "Extra snack sleeve: chips",
  toilet_paper: "roll of two-ply toilet paper (trust us on this one)",
  popcorn_bottle: "Extra popcorn -14 oz bottle",
  popcorn_seasoning: "Extra mini popcorn seasoning",
  cable_3in1: "3.5 foot 3-in-1 charging cable",
  cable_usb_c: "10 foot USB-C charging cable",
  personalized_card: "Card with your personalized message and 'You Are Loved' sticker",
};

let cart = [];
let packageNote = {};

const sliderContainer = document.querySelector(".lineup-slider-container");
const sliderTrack = document.querySelector("#lineupSliderTrack");
const prevButton = document.querySelector("#slidePrev");
const nextButton = document.querySelector("#slideNext");

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

function fakeCheckout() {
  if (cart.length === 0) {
    checkoutStatus.textContent = "Add at least one package before checkout.";
    return;
  }

  const addonText = getSelectedAddons().map((addon) => addon.label).join(", ") || "No add-ons";
  checkoutStatus.textContent = `Fake Shopify checkout ready. Add-ons: ${addonText}.`;
}



document.querySelectorAll(".add-product").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.productId));
});

document.querySelectorAll(".see-details").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const product = products[productId];
    if (product && product.contents) {
      openPackageModal(productId);
    } else {
      const target = document.querySelector("#inside");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
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
    let tagText = "Coming in September";
    let tagClass = "card-moment-tag coming-soon-tag";
    const isClickable = pkg.title === "Welcome Week Starter";
    if (isClickable) {
      tagText = "Pre-Order Now";
      tagClass = "card-moment-tag";
    } else if (pkg.title === "Seasonal Celebrations") {
      tagText = "Seasonal";
      tagClass = "card-moment-tag seasonal-tag";
    }
    return `
      <article class="lineup-card" data-key="${pkg.key}">
        <span class="${tagClass}">${tagText}</span>
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

  aboutUsModal.addEventListener("click", (e) => {
    if (e.target === aboutUsModal) {
      closeModal();
    }
  });
}

// Package Details Modal Logic
const packageModal = document.querySelector("#packageModal");
const closePackageModal = document.querySelector("#closePackageModal");

function openPackageModal(productId) {
  const product = products[productId];
  if (!product || !packageModal) return;

  const modalTitle = document.querySelector("#packageModalTitle");
  const modalBody = document.querySelector("#packageModalBody");

  if (modalTitle) modalTitle.textContent = product.title;

  if (modalBody) {
    const contentsHTML = product.contents
      ? `<ul class="package-contents-list">${product.contents.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : `<p>${product.copy}</p>`;

    const imageHTML = product.image
      ? `<div class="modal-image-container"><img class="modal-package-image" src="${product.image}" alt="${product.title}"></div>`
      : "";

    modalBody.innerHTML = `
      ${imageHTML}
      <div class="modal-package-details">
        <h4>What's Inside:</h4>
        ${contentsHTML}
      </div>
    `;
    
    // Scroll body back to top on open
    modalBody.scrollTop = 0;
  }

  packageModal.classList.add("active");
  packageModal.setAttribute("aria-hidden", "false");
  if (closePackageModal) closePackageModal.focus();
}

function closePackageModalFunc() {
  if (!packageModal) return;
  packageModal.classList.remove("active");
  packageModal.setAttribute("aria-hidden", "true");
}

if (closePackageModal) {
  closePackageModal.addEventListener("click", closePackageModalFunc);
}

if (packageModal) {
  packageModal.addEventListener("click", (e) => {
    if (e.target === packageModal) {
      closePackageModalFunc();
    }
  });
}

// Global Modal Escape listener
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (aboutUsModal && aboutUsModal.classList.contains("active")) {
      aboutUsModal.classList.remove("active");
      aboutUsModal.setAttribute("aria-hidden", "true");
      if (aboutUsBtn) aboutUsBtn.focus();
    }
    if (packageModal && packageModal.classList.contains("active")) {
      closePackageModalFunc();
    }
  }
});

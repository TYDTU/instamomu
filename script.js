// Version 1.0.8 - Regroup, Recover, Restart
const products = {
  welcome: {
    title: "Welcome Week Starter",
    price: 58,
    studentType: "First-year starter",
    moment: "Welcome week",
    copy:
      "Packed full of dorm necessities, including a popcorn starter set, mini first aid kit, utensils, candy, and other practical goodies. Academic coaching offers guidance on new experiences like reading a syllabus and living with a roommate.",
    image: "assets/welcome_week_box.jpg",
    contents: [
      "Mini popcorn starter set: individual silicone popcorn popper, 4 oz popcorn kernels with wooden scoop, and 0.9 oz popcorn seasoning",
      "First aid kit: 15 adhesive bandages, two 5x7 cleansing towels, two Neosporin packs, and two hydrocortisone packs in a sturdy, re-usable case",
      "Microwave-safe (3 minutes) wheat straw bowl (5.5 in) and plate (5.7 in) with a zippered pouch of stainless steel utensils (fork, butter knife, spoon, chopsticks) and mini salt-and-pepper shakers",
      "Clorox on-the-go disinfecting wipes",
      "Command strips for hanging posters (4)",
      "Stainless steel credit card multi-tool",
      "Invigorating citrus room and linen spray in reusable glass bottle",
      "Fidget toy",
      "Sweet snacks and three Crystal Light flavored lemonade packets",
      "Academic coaching cards for: reading a syllabus, creating a roommate contract, and building a solid foundation of healthy habits",
      "Blank roommate contract—includes both hard copy and document link"
    ]
  },
  snacks_cookies: {
    title: "Extra Snack Sleeve: Cookies",
    copy:
      "Includes one to-go cup of Oreos (3.5 oz), one to-go pack of Chips Ahoy (3.5 oz) and five individually-wrapped Biscoff cookies",
  },
  laundry: {
    title: "Laundry Rescue Pack",
    copy:
      "One box of 15 Bounce dryer sheets and Travel Size Tide one load liquid detergent (3)",
  },
  athlete_recovery: {
    title: "Athlete Recovery Pack",
    copy:
      "One reusable 6\" x 9\" hot/cold gel pack; two Liquid IV hydration packs; one cooling towel; two single-use Biofreeze packets; and one 3in x 5yd compression bandage",
  },
  snacks_chips: {
    title: "Extra Snack Sleeve: Chips",
    copy:
      "Five Lay's variety snack-sized chips and Pringles Original chips one-serving can 2.38 oz",
  },
  homesick: {
    title: "Homesick Helper",
    price: 62,
    studentType: "Homesick helper",
    moment: "Welcome week",
    copy:
      "Comfort snacks and calming items to ease the stress of the college transition. A microwavable, stuffed lavender Warmie, perfect for a cozy cuddle. Coaching guidance for increasing campus engagement and finding their people.",
    image: "assets/homesick_helper_box.jpg",
    contents: [
      "Comforting microwavable lavendar Warmy stuffed animal",
      "Mindfulness journal",
      "NYT Bestseller mini adult coloring book of stress-reducing patterns",
      "Goldfaber 12 pack watercolor pencils",
      "Hot chocolate",
      "Coaching guidance includes prompts for starting conversations with classmates and dormmates; tips for introverts and extroverts to find like-minded peers on campus; suggestions for joining clubs; and creating new routines in their new home"
    ]
  },
  study: {
    title: "Regroup, Recover, Restart",
    price: 52,
    studentType: "Focused achiever",
    moment: "Midterms",
    copy:
      "Heavy on academic coaching, tools for positive reframing, and tips for utilizing academic support resources on campus. Includes study and workload planning supplies, a focus timer, and—of course!—tasty snacks with staying power.",
    image: "assets/regroup_recover_restart_box.jpg",
    contents: [
      "Colorful and calming focus timer (30-40 minute timer)",
      "Productivity Planner",
      "Gummy stress square",
      "Color-coded study supplies: highlighters, pens, post-it tabs and post-it notes",
      "Lavender Calming Patches",
      "Granola bars",
      "Granola bites",
      "Coaching cards include: positive reframing; communicating with faculty; utilizing campus resources; practicing both time and task management; and sticking to schedules and plans."
    ]
  },
  sick: {
    title: "Warm Hug from Home",
    price: 62,
    studentType: "Wellness reset",
    moment: "Sick day",
    copy:
      "Soft, gentle tissues, soothing cough drops, soup and crackers, tea, and a mini honey bear whose cuteness is as comforting as its contents. Coaching helps students catch up with work and communicate with professors during and after an illness.",
    image: "assets/warm_hug_from_home_box.jpg",
    contents: [
      "Comforting microwavable lavender Warmie stuffed animal",
      "Ricola natural cough drops (9 count)",
      "Microwave chicken noodle soup cups (2)",
      "Saltine crackers",
      "EmergenC packets (4)",
      "Twinings superblend immune support tea bags (4)",
      "Mini honey bear",
      "Box of comfort touch Kleenex, in addition to individual travel packs (3)",
      "Purell travel size hand sanitizer with jelly wrap key chain",
      "Coaching cards guide students through communicating with faculty during an illness, keeping up with class assignments, utilizing the health center, and priotirizing make-up work when the germs have been vanquished"
    ]
  },
  finals: {
    title: "Finals Reset Box",
    price: 64,
    studentType: "Wellness reset",
    moment: "Finals",
    copy:
      "Self-care goodies like soothing eye masks and stress toys; colorful pens, highlighters, and post-its; and Nerds and Smarties for good measure. Academic coaching helps students replace popular study myths with practicing efficient study habits.",
    image: "assets/finals_reset_box.jpg",
    contents: [
      "Set of colorful pens",
      "Set of colorful highlighters",
      "Set of colorful mechanical pencils",
      "Post-it tabs and notes",
      "Colorful index cards",
      "Stress toy",
      "Warmies microwavable eye mask",
      "Gel cooling mask",
      "Nerds and Nerds Ropes",
      "Smarties",
      "Hershey's Kisses",
      "Mints",
      "Snack-sized chips (5)",
      "Starbucks K-cups (4)",
      "Liquid IV packets (4)",
      "Calming lavender and chamomile linen spray",
      "Balloons to blow up and then pop when a final or paper is complete (so satisfying!)",
      "Coaching cards offer guidance on maintaining perspective under stress; balancing rest and wellbeing with working hard; and practicing efficient study habits"
    ]
  },
  refresh: {
    title: "Room Refresh",
    price: 56,
    studentType: "First-year starter",
    moment: "Room refresh",
    copy:
      "If they can smell it, this package can refresh it—the air, the bathroom, their shoes, their laundry, their breath. Air freshener sprays and diffusers, sneaker balls, and mints and gum will keep their spaces pleasant so they can focus on what matters.",
    image: "assets/room_refresh_box.jpg",
    contents: [
      "Wood tone diffuser starter kit with LED light and calming essential oil",
      "Sneaker Balls odor fighters (4)",
      "Poopourri travel spray 2.5oz",
      "Fresh linen sachet (2)",
      "Wet Ones travel body wipes",
      "Febreze to go 2.8oz spray Gain scent",
      "Mints and gum"
    ]
  },
  snack: {
    title: "Snack Attack",
    studentType: "First-year starter",
    moment: "Snack attack",
    copy:
      "Whether you love chocolate, cheese, salty snacks, protein-packed goodies, or the gross stuff no one else eats (licorice, anyone?) we've got a box chock full of your favorites.",
  },
  snack_cheese: {
    title: "Snack Attack: Cheese Lovers",
    price: 35,
    studentType: "First-year starter",
    moment: "Snack attack",
    contents: [
      "3 snack size packs each of",
      "Cheetos",
      "Doritos",
      "Goldfish",
      "Cheez-Its",
      "Pringles Cheddar Cheese grab and go",
      "Ruffles Sour Cream and Cheddar",
      "Smartfood White Cheddar Popcorn",
      "Microwave Kraft Mac and Cheese cups"
    ]
  },
  snack_chocolate: {
    title: "Snack Attack: Chocolate Lovers",
    price: 45,
    studentType: "First-year starter",
    moment: "Snack attack",
    contents: [
      "Double chocolate brownie cookies (6 oz)",
      "Milk chocolate covered pretzels (5 oz)",
      "Ghirardelli chocolate squares (assorted)",
      "Nutella & Go breadstick snack pack",
      "M&Ms chocolate candies family size pack",
      "Rich hot cocoa mixes (3)"
    ]
  },
  snack_protein: {
    title: "Snack Attack: Protein Fiend",
    price: 60,
    studentType: "First-year starter",
    moment: "Snack attack",
    contents: [
      "Premium beef jerky sticks (4)",
      "Mixed nuts with sea salt (8 oz)",
      "High-protein peanut butter squeeze packs (3)",
      "Protein bars (assorted flavors, 3)",
      "Roasted chickpeas snack pack (3 oz)",
      "Sunflower seed packs (2)"
    ]
  },
  seasonal: {
    title: "Seasonal Celebrations",
    studentType: "Focused achiever",
    moment: "Holiday",
    copy:
      "Holiday themes, finals treats, exam survival kits, and birthday celebration packs customized for the time of year.",
  },
  seasonal_birthday: {
    title: "Seasonal: Birthday Box",
    price: 62,
    studentType: "Focused achiever",
    moment: "Holiday",
    image: "assets/seasonal_birthday_box.jpg",
    contents: [
      "Vanilla Confetti Individual Cake Kit (nut free)—includes cake mix, frosting, pop-up baking tray for microwave, sprinkles, candle, and cake topper",
      "Confetti balloons (6)",
      "Balloon hand pump",
      "Party poppers (4)",
      "Birthday horns (4)",
      "Bubblelick Sour Blue Raspberry Bubbles",
      "Mini Welch's sparkling white grape juice",
      "Birthday cake pretzels",
      "Birthday cake cupcake bites",
      "Birthday cake Kit Kat",
      "Plush cupcake",
      "Birthday Mad Libs",
      "Faber-Castell Paint by Number Museum Series: The Starry Night"
    ]
  },
  seasonal_fall: {
    title: "Seasonal: Anything But Basic Fall Box",
    price: 60,
    studentType: "Focused achiever",
    moment: "Holiday",
    copy: "Coming Soon!"
  },
  seasonal_halloween: {
    title: "Seasonal: Halloween Box",
    price: 45,
    studentType: "Focused achiever",
    moment: "Holiday",
    copy: "Coming Soon!"
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
    title: "Regroup, Recover, Restart",
    copy:
      "Everyone hits a rough patch in the transition to college-level work—what matters most is how they handle it. This box includes supplies and tips for improved planning and studying; satisfying snacks; and guidance for turning a rough grade or ineffective habit into a building block for success.",
  },
  "Wellness reset|Sick baby": {
    productId: "sick",
    title: "Warm Hug from Home",
    copy:
      "College exposes them to new people, new experiences, and new germs. Send healing comfort across the miles with tissues, cough drops, hydration packets, soup, and tea, along with tips on utilizing campus resources, making up work and communicating clearly with faculty.",
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
      "Dorms can stink—theirs doesn't have to. Banish the funk and refresh their space so they can enjoy breathing deeply again.",
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
  laundry: "Laundry Rescue Pack",
  athlete_recovery: "Athlete Recovery Pack",
  snacks_cookies: "Extra snack sleeve: cookies",
  snacks_chips: "Extra snack sleeve: chips",
  toilet_paper: "Roll of two-ply toilet paper (trust us)",
  popcorn_bottle: "Extra popcorn -14 oz bottle",
  popcorn_seasoning: "Extra mini popcorn seasoning: White Cheddar",
  cable_3in1: "3.5 foot 3-in-1 charging cable",
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
  return [...document.querySelectorAll(".addon-select")].map((select) => {
    const qty = Number(select.value);
    const addonId = select.dataset.addonId;
    return {
      id: addonId,
      label: addonLabels[addonId],
      price: Number(select.dataset.price),
      quantity: qty,
    };
  }).filter(addon => addon.quantity > 0);
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
  const selectedAddonTotal = getSelectedAddons().reduce((sum, addon) => sum + (addon.price * addon.quantity), 0);
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

  const addonText = getSelectedAddons().map((addon) => {
    return addon.quantity > 1 ? `${addon.label} (Qty: ${addon.quantity})` : addon.label;
  }).join(", ") || "No add-ons";

  const roommateWrapInput = document.querySelector("#roommateWrapNotes");
  const roommateText = roommateWrapInput && roommateWrapInput.value.trim()
    ? ` Roommate separate wrap request: "${roommateWrapInput.value.trim()}".`
    : "";

  checkoutStatus.textContent = `Fake Shopify checkout ready. Add-ons: ${addonText}.${roommateText}`;
}



document.querySelectorAll(".add-product").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    if (productId === "snack") {
      openSnackChoiceModal();
    } else if (productId === "seasonal") {
      openSeasonalChoiceModal();
    } else {
      addToCart(productId);
    }
  });
});

document.querySelectorAll(".snack-sub-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const subId = btn.dataset.subId;
    openPackageModal(subId);
  });
});

document.querySelectorAll(".seasonal-sub-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const subId = btn.dataset.subId;
    openPackageModal(subId);
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".see-details");
  if (button) {
    const productId = button.dataset.productId;
    if (productId && products[productId]) {
      openPackageModal(productId);
    }
  }
});

document.querySelectorAll(".addon-select").forEach((select) => {
  select.addEventListener("change", renderCart);
});

const addAddonsToCartBtn = document.querySelector("#addAddonsToCartBtn");
if (addAddonsToCartBtn) {
  addAddonsToCartBtn.addEventListener("click", () => {
    renderCart();
    const cartSection = document.querySelector("#cart");
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

document.querySelectorAll(".addon-details-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const addonId = btn.dataset.addonId;
    openPackageModal(addonId);
  });
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
    return `
      <article class="lineup-card" data-key="${pkg.key}">
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
  document.querySelectorAll(".addon-select").forEach(select => select.value = "0");
  const roommateWrapNotes = document.querySelector("#roommateWrapNotes");
  if (roommateWrapNotes) roommateWrapNotes.value = "";
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
    const detailsHeader = product.contents ? "<h4>What's Inside:</h4>" : "";
    const contentsHTML = product.contents
      ? `<ul class="package-contents-list">${product.contents.map((item) => (item.endsWith(":") || item.includes("packs each of")) ? `<li class="no-check"><strong>${item}</strong></li>` : `<li>${item}</li>`).join("")}</ul>`
      : (product.copy === "Coming Soon!"
          ? `<p class="coming-soon-text" style="font-size: 1.35rem; font-weight: 700; color: var(--navy-dark); text-align: center; margin: 32px 0;">${product.copy}</p>`
          : `<p class="addon-info-text" style="font-size: 1.05rem; font-weight: 500; color: var(--navy-dark); text-align: left; line-height: 1.65; margin: 16px 0;">${product.copy}</p>`);

    const imageHTML = product.image
      ? `<div class="modal-image-container"><img class="modal-package-image" src="${product.image}" alt="${product.title}"></div>`
      : "";

    modalBody.innerHTML = `
      ${imageHTML}
      <div class="modal-package-details">
        ${detailsHeader}
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

function openSnackChoiceModal() {
  const modalTitle = document.querySelector("#packageModalTitle");
  const modalBody = document.querySelector("#packageModalBody");
  if (!modalTitle || !modalBody || !packageModal) return;

  modalTitle.textContent = "Choose Snack Attack Option";
  modalBody.innerHTML = `
    <div class="snack-choice-form-container">
      <p class="snack-choice-intro">Please select which Snack Attack box you would like to add to your cart:</p>
      <form id="snackChoiceForm" class="snack-choice-form">
        <label class="choice-label">
          <input type="radio" name="snack_flavor" value="snack_cheese">
          <span class="choice-text">Cheese Lovers <strong>$35</strong></span>
        </label>
        <label class="choice-label">
          <input type="radio" name="snack_flavor" value="snack_chocolate">
          <span class="choice-text">Chocolate Lovers <strong>$45</strong></span>
        </label>
        <label class="choice-label">
          <input type="radio" name="snack_flavor" value="snack_protein">
          <span class="choice-text">Protein Fiend <strong>$60</strong></span>
        </label>
      </form>
      <div id="snackChoiceError" class="snack-choice-error" style="display: none; color: var(--pink); font-weight: 700; margin-top: 10px;">Please select one option before adding to cart.</div>
      <button type="button" id="confirmSnackAddBtn" class="confirm-snack-add-btn">Add to Cart</button>
    </div>
  `;

  // Show modal
  packageModal.classList.add("active");
  packageModal.setAttribute("aria-hidden", "false");
  if (closePackageModal) closePackageModal.focus();

  // Event listener for the confirm button
  const confirmBtn = document.querySelector("#confirmSnackAddBtn");
  confirmBtn.addEventListener("click", () => {
    const selectedRadio = document.querySelector('input[name="snack_flavor"]:checked');
    if (!selectedRadio) {
      const errorDiv = document.querySelector("#snackChoiceError");
      if (errorDiv) errorDiv.style.display = "block";
      return;
    }
    const chosenFlavor = selectedRadio.value;
    addToCart(chosenFlavor);
    closePackageModalFunc();
  });
}

function openSeasonalChoiceModal() {
  const modalTitle = document.querySelector("#packageModalTitle");
  const modalBody = document.querySelector("#packageModalBody");
  if (!modalTitle || !modalBody || !packageModal) return;

  modalTitle.textContent = "Choose Seasonal Celebrations Option";
  modalBody.innerHTML = `
    <div class="seasonal-choice-form-container">
      <p class="seasonal-choice-intro">Please select which Seasonal Celebrations box you would like to add to your cart:</p>
      <form id="seasonalChoiceForm" class="seasonal-choice-form">
        <label class="choice-label">
          <input type="radio" name="seasonal_flavor" value="seasonal_birthday">
          <span class="choice-text">Birthday Box <strong>$60</strong></span>
        </label>
        <label class="choice-label">
          <input type="radio" name="seasonal_flavor" value="seasonal_fall">
          <span class="choice-text">Anything But Basic Fall Box <strong>$60</strong></span>
        </label>
        <label class="choice-label">
          <input type="radio" name="seasonal_flavor" value="seasonal_halloween">
          <span class="choice-text">Halloween Box <strong>$45</strong></span>
        </label>
      </form>
      <div id="seasonalChoiceError" class="seasonal-choice-error" style="display: none; color: var(--pink); font-weight: 700; margin-top: 10px;">Please select one option before adding to cart.</div>
      <button type="button" id="confirmSeasonalAddBtn" class="confirm-seasonal-add-btn">Add to Cart</button>
    </div>
  `;

  // Show modal
  packageModal.classList.add("active");
  packageModal.setAttribute("aria-hidden", "false");
  if (closePackageModal) closePackageModal.focus();

  // Event listener for the confirm button
  const confirmBtn = document.querySelector("#confirmSeasonalAddBtn");
  confirmBtn.addEventListener("click", () => {
    const selectedRadio = document.querySelector('input[name="seasonal_flavor"]:checked');
    if (!selectedRadio) {
      const errorDiv = document.querySelector("#seasonalChoiceError");
      if (errorDiv) errorDiv.style.display = "block";
      return;
    }
    const chosenFlavor = selectedRadio.value;
    addToCart(chosenFlavor);
    closePackageModalFunc();
  });
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

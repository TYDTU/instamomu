const products = {
  welcome: {
    title: "Welcome Package",
    price: 58,
    studentType: "First-year starter",
    moment: "Welcome week",
    copy:
      "Campus basics, dorm comfort, first-week checklists, and QR codes for smart starts.",
  },
  study: {
    title: "Study Sprint",
    price: 64,
    studentType: "Focused achiever",
    moment: "Midterms",
    copy:
      "High-focus snacks, planning tools, professor office-hours prompts, and exam-week resets.",
  },
  homesick: {
    title: "Homesick Helper",
    price: 52,
    studentType: "Homesick helper",
    moment: "Welcome week",
    copy:
      "Comfort staples, handwritten notes, familiar treats, and gentle routines for settling in.",
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
      "A practical new-student box with comfort items, colorful school supplies, and fun snacks, as well as QR-linked tips for academic success, creating relationships with professors, and building healthy and productive habits",
  },
  "Homesick helper|Welcome week": {
    productId: "homesick",
    title: "Soft Landing Box",
    copy:
      "Comfort snacks, dorm warmth, and tiny prompts for reaching out, joining something low-pressure, and making the room feel less temporary.",
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
  "Club or team rush|Welcome week": {
    productId: "activity",
    title: "Get-Involved Kit",
    copy:
      "Campus activity basics, conversation starters, and QR-linked advice for choosing clubs, managing tryouts, and protecting study time.",
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

const studentType = document.querySelector("#studentType");
const momentSelect = document.querySelector("#moment");
const previewButton = document.querySelector("#previewButton");
const addPreviewButton = document.querySelector("#addPreviewButton");
const previewTitle = document.querySelector("#previewTitle");
const previewCopy = document.querySelector("#previewCopy");
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

function selectedPackage() {
  const key = `${studentType.value}|${momentSelect.value}`;
  return packageData[key] || fallbackCopy;
}

function getSelectedAddons() {
  return [...document.querySelectorAll("input[name='addon']:checked")].map((addon) => ({
    id: addon.value,
    label: addonLabels[addon.value],
    price: Number(addon.dataset.price),
  }));
}

function updatePreview() {
  const packageInfo = selectedPackage();
  previewTitle.textContent = packageInfo.title;
  previewCopy.textContent = packageInfo.copy;
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

previewButton.addEventListener("click", updatePreview);

addPreviewButton.addEventListener("click", () => {
  const packageInfo = selectedPackage();
  addToCart(packageInfo.productId);
});

document.querySelectorAll(".add-product").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.productId));
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
clearCart.addEventListener("click", () => {
  cart = [];
  checkoutStatus.textContent = "";
  renderCart();
});

updatePreview();
renderCart();

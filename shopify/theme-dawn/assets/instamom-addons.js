/*
 * InstaMom University — add-ons modal behaviour.
 *
 * Opens snippets/instamom-addons-modal.liquid after a PACKAGE is added to the
 * cart, and on demand from the "Add-ons" button on a package's cart line.
 *
 * Hooks Dawn's pub/sub rather than patching its cart code: product-form.js
 * publishes PUB_SUB_EVENTS.cartUpdate on every successful add, carrying the
 * /cart/add.js response. We compare the added product id against the package
 * ids rendered onto the modal, so adding an ADD-ON never re-opens the modal.
 */
(function () {
  const modal = document.getElementById('InstamomAddons');
  if (!modal) return;

  const packageIds = (modal.dataset.packageIds || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  const open = () => {
    // ModalDialog.show() expects an opener to return focus to on close.
    modal.show(document.activeElement || document.body);
  };

  // --- open after a package is added -------------------------------------
  if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
    subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (!event || event.source !== 'product-form') return;
      const added = event.cartData;
      if (!added) return;

      // /cart/add.js returns the line item, or { items: [...] } for multiples.
      const ids = added.items
        ? added.items.map((i) => String(i.product_id))
        : [String(added.product_id)];

      if (ids.some((id) => packageIds.includes(id))) open();
    });
  }

  // --- open from a cart line's "Add-ons" button ---------------------------
  document.addEventListener('click', (event) => {
    if (event.target.closest('.instamom-addons-trigger')) {
      event.preventDefault();
      open();
    }
  });

  // --- add an extra, without leaving the modal ----------------------------
  modal.addEventListener('click', async (event) => {
    const button = event.target.closest('.instamom-addons__add');
    if (!button || button.disabled) return;

    const original = button.textContent;
    button.disabled = true;
    button.textContent = 'Adding…';

    try {
      const res = await fetch(`${window.routes.cart_add_url}.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: [{ id: button.dataset.variantId, quantity: 1 }] }),
      });
      if (!res.ok) throw new Error('add failed');

      button.textContent = 'Added ✓';
      refreshCartCount();
    } catch (e) {
      // Leave the shopper somewhere useful rather than failing silently.
      button.textContent = original;
      button.disabled = false;
      console.error('InstaMom add-on add failed', e);
    }
  });

  // --- skip -----------------------------------------------------------------
  modal.addEventListener('click', (event) => {
    if (event.target.closest('.instamom-addons__skip')) modal.hide();
  });

  // Keep the header cart bubble honest after adding from the modal.
  async function refreshCartCount() {
    try {
      const res = await fetch(`${window.routes.cart_url}?section_id=cart-icon-bubble`);
      const text = await res.text();
      const fresh = new DOMParser()
        .parseFromString(text, 'text/html')
        .querySelector('.shopify-section');
      const current = document.getElementById('cart-icon-bubble');
      if (fresh && current) current.innerHTML = fresh.innerHTML;
    } catch (e) {
      /* the count will correct itself on the next page load */
    }
  }
})();

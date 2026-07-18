# shopify/

Migration kit for taking InstaMom University from the GitHub Pages prototype to a real
Shopify store. **Start with [`MIGRATION.md`](MIGRATION.md)** — it's the full
step-by-step guide; the CSVs below are the data it tells you to import.

| File | Purpose | Import order |
| --- | --- | --- |
| [`MIGRATION.md`](MIGRATION.md) | The complete guide (account → products → bundles → pre-orders → theme → domain cutover → launch checklist). | Read first |
| [`products-components.csv`](products-components.csv) | Items inside the boxes. Hidden from storefront, inventory-tracked. Bundle building blocks. | 1st |
| [`products-addons.csv`](products-addons.csv) | The 8 purchasable add-ons. Visible, inventory-tracked, their own cart lines. | 2nd |
| [`products-packages.csv`](products-packages.csv) | The 8 packages — build sheet for assembling the bundles in the Bundles app. | 3rd (reference) |

## Decisions baked in
- **Add-ons** = separate products, added to the box by packers at ship time.
- **Packages** = bundles with component-level inventory (a sale decrements each item inside).
- **Coming-soon boxes** = native pre-orders (Continue selling when out of stock).

## Before you import
- Every `Variant Inventory Qty` is `0` — you enter real on-hand counts after import.
- Only the **Welcome Week Starter** components are real data. Every other box's
  components are `needs-review` placeholders extracted from marketing copy — replace
  them with your actual packing lists before building those bundles.
- Product images aren't in the CSVs; upload them in the Shopify product editor.

The prototype (`../index.html`, `../script.js`, `../styles.css`) stays live on GitHub
Pages as the fallback until the Shopify store is verified and the domain is cut over.

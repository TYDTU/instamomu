# InstaMom University — Prototype → Shopify Migration Guide

This folder turns the GitHub Pages prototype into a real Shopify store. It reflects
the decisions we locked in:

| Decision | Choice |
| --- | --- |
| **Add-ons** | Separate, individually‑tracked products. Shown as their own cart lines. Packers add them to the box at ship time. |
| **Packages** | Built as **bundles** with **component‑level inventory** (selling a box decrements each item inside it). |
| **"Coming in September" boxes** | **Native pre-orders** — Shopify's *Continue selling when out of stock* toggle, no third‑party checkout dependency. |

> **Who does what:** Steps marked 🧑‍💼 are day-to-day tasks a non-technical owner
> (Dr. Savage / Dr. Cylke) can do in the Shopify admin. Steps marked 🛠️ are
> one-time setup that benefits from a developer's help (theme port, DNS cutover).

---

## 0. How the pieces map

```
Prototype (script.js)          Shopify
─────────────────────          ─────────────────────────────────────────────
8 packages (products{})   →    8 BUNDLE products  (Bundles app)
   contents[] items       →    COMPONENT products (hidden, inventory-tracked)
8 add-ons (addonLabels)   →    8 ADD-ON products  (visible, inventory-tracked)
fake cart / fake checkout →    native Shopify cart + checkout
"Pre-Order Now" / "Coming"→    pre-order (continue selling when out of stock)
gift message / roommate   →    cart line-item properties (or order note)
  wrap note
About Us / Gives Back     →    Shopify Pages
scholarship story
```

**Build order matters** because bundles are assembled *from* components:

1. Import **component** products (the stuff inside the boxes).
2. Import **add-on** products.
3. Build the 8 **package bundles** referencing those components.
4. Theme, pages, navigation, pre-orders, domain cutover, test order.

The three CSVs in this folder cover steps 1–2 and give you a build sheet for step 3:

| File | What it creates | Import as |
| --- | --- | --- |
| `products-components.csv` | Items inside the boxes (hidden from storefront) | Products → Import |
| `products-addons.csv` | The 8 purchasable add-ons | Products → Import |
| `products-packages.csv` | The 8 packages — **reference/build sheet** for the bundles | See Step 4 |

---

## 1. Create the Shopify account & pick a plan 🧑‍💼

1. Go to shopify.com → **Start free trial**. Sign up with a shared business email
   (e.g. a `hello@instamomu…` address you control), not a personal one — this keeps
   the account transferable and not tied to one founder.
2. Store name: **InstaMom University**. You can change the public name later; the
   permanent `*.myshopify.com` URL is set once, so pick something clean like
   `instamom-university`.
3. **Plan:** choose **Basic**. This is the entry tier that includes a full online
   store, unlimited products, and the abandoned-cart recovery you'll want.
   - *Do not* pick the cheaper **Starter** plan — it's buy-buttons only, no themed
     storefront.
   - Shopify typically offers a trial + a $1/month intro period; you can stay on the
     trial while you build and only need to pick a paid plan before you launch.
4. Nothing here locks you in: products, customers, and orders all export to CSV, and
   themes are portable. You stay flexible.

---

## 2. Core store settings 🧑‍💼

In **Settings**:

- **Payments** → activate **Shopify Payments** (cards) and optionally PayPal / Shop Pay.
  *You'll enter banking details here — do this yourself; it's not something to delegate.*
- **Shipping and delivery** → create a shipping profile. Care packages are boxes, so
  set weight-based or flat-rate shipping. Add your real box weights later.
- **Taxes and duties** → enable automatic tax calculation for the US states you ship to.
- **Locations** → confirm your single fulfillment location (your packing location).
  Component inventory is tracked *per location*, so this must be right before you
  count stock.
- **Store details** → set currency USD, business address, support email.

---

## 3. Import the component & add-on products 🧑‍💼

### 3a. Components (the stuff inside the boxes)

1. **Products → Import → Add file →** upload `products-components.csv` → **Upload and continue**.
2. On the preview, leave "Publish new products to all sales channels" **unchecked** —
   components should be hidden from the storefront. (The CSV already sets
   `Published = FALSE`.)
3. After import, create a manual collection called **Components** and add them, so
   they're easy to find. Do **not** add this collection to your navigation.

> ⚠️ **Only the Welcome Week Starter components are real data.** Every other box's
> components were auto-extracted from your marketing copy and are tagged
> `needs-review` with quantity `0`, and their descriptions say `PLACEHOLDER`. Before
> you build those bundles, replace them with your actual packing list (exact items,
> SKUs, and quantities). Filter the Components collection by the `needs-review` tag to
> find every one that still needs confirming.

### 3b. Add-ons

1. **Products → Import →** upload `products-addons.csv`.
2. **Do** publish these to the online store — they're purchasable.
3. These are ordinary products with tracked inventory (`Inventory policy = deny`, so
   they stop selling at 0). Packers pull them and drop them in the box at ship time.

### 3c. Set real inventory counts 🧑‍💼

All imported quantities are `0`. Go to **Products → Inventory** (or **Bulk edit**) and
enter your real on-hand counts for every component and add-on. This is what makes
component-level bundle tracking work.

---

## 4. Build the 8 package bundles 🧑‍💼

Use `products-packages.csv` as your **build sheet** (title, price, description, tags).

1. Install the free first-party **Shopify Bundles** app (Shopify App Store → search
   "Shopify Bundles", published by Shopify).
2. For each of the 8 packages, in the Bundles app: **Create bundle** →
   - **Title / description / price / image:** copy from the matching row in
     `products-packages.csv`. Set the **fixed bundle price** to the package price
     (e.g. Welcome Week Starter = `$58`) rather than summing components.
   - **Products in the bundle:** add the component products from step 3a with the
     right quantities.
   - **Save & publish.**
3. Shopify derives each bundle's availability from its **lowest-stock component** and
   decrements every component when the bundle sells — no manual bundle stock to manage.

> **Why the packages CSV isn't imported directly:** the first-party Bundles app
> creates the bundle product *itself*, so importing the packages as normal products
> first would duplicate them. The CSV is there so you're copy-pasting finished copy,
> not rewriting it. *(If you later switch to a third-party app such as Simple Bundles
> that attaches components to an existing product, you can import
> `products-packages.csv` directly and skip the retyping.)*

### Add-ons are intentionally NOT in the bundles

Per our decision, add-ons stay separate products and appear as their own cart lines.
Nothing to configure here — just make sure they're visible on the product pages or a
dedicated "Add extras" section (see Step 6, theme).

---

## 5. Pre-orders for the "Coming in September" boxes 🧑‍💼

We're using the **native** approach — no app controlling checkout.

**For a box you want orderable now as a pre-order** (e.g. Welcome Week Starter,
"Pre-Order Now"):

1. Open the bundle/product → the variant → **Inventory**.
2. Check **Continue selling when out of stock**.
3. This lets customers buy and pay upfront even at zero stock. Add a "Pre-order —
   ships September" line to the product description and/or a theme badge so it's clear.

**For a box not yet orderable** (the greyed "Coming in September" cards): leave it as
**Draft** until you're ready, then publish it with the toggle above.

**Limitations to know:** the native toggle charges the full amount immediately and has
no deferred billing, deposits, or automated "your pre-order shipped" emails. If you
later want those, add a dedicated pre-order app (e.g. PreProduct) — it layers on top of
the same native checkout. Start native; upgrade only if you need deposits.

Sources on native pre-order behavior:
[Shopify pre-orders guide](https://www.shopify.com/blog/shopify-pre-orders),
[how bundle inventory syncs](https://apps.shopify.com/bundles).

---

## 6. Theme — reproduce the InstaMom look 🛠️

Start from Shopify's free **Dawn** theme (Online Store → Themes → Add theme → Dawn),
then style it to match the prototype. Your existing `styles.css` is the source of truth
for the brand. Key tokens to reproduce in **Theme editor → Settings**:

| Token | Value (from `styles.css`) |
| --- | --- |
| Primary navy (text/buttons) | `#062b66` / ink `#082b63` |
| Navy dark | `#041d45` |
| Page background (yellow "paper") | `#fff2ad` |
| Gold accent | `#ffc928` |
| Cream | `#fff0b8` |
| Pink accent (badges) | `#ed2f89` |
| Hairline / border | `#e8d38a` |
| Display font | **Graduate** (Google Fonts) |
| Body font | **Inter** |

Sections to build with Dawn's native blocks (no custom code needed for most):

- **Header:** crest logo (`assets/instamom-logo-crest.png`) + "InstaMom University",
  nav links About / Packages / Gives Back / Cart.
- **Hero:** banner with the "Family Love + Faculty Wisdom" badge.
- **Featured collection:** the 8 packages, with the "Pre-Order Now" / "Coming in
  September" tags surfaced as badges.
- **"What makes it InstaMom University" split** (tip cards + QR videos, whole-person
  gifts, care across the miles) → an image-with-text / multicolumn section.
- **Product page:** description + "What's Inside" list (from each package's
  `contents`), plus the add-ons surfaced as a linked "Add extras" collection.

The dotted background, the Graduate headings, and the pink badges are what make it feel
like the prototype — a developer can drop the few lines of custom CSS from `styles.css`
into **Theme → Edit code → base.css** if the theme settings don't get you all the way.

---

## 7. Gift message & roommate-wrap note 🧑‍💼 / 🛠️

The prototype captures two free-text fields. In Shopify:

- **Personalized message card** is already an add-on product (`personalized-card`) — the
  message text itself should be collected as a **line-item property** on that product
  (a text field on the product page) or in the **cart note**. Dawn supports a cart note
  out of the box; per-product text fields need a small theme block or a free
  "product options" app.
- **Roommate separate-wrap request** → easiest as the **cart note** (Settings → Checkout
  → enable "Add a note to the order" / Dawn cart note). Packers see it on the order.

If you want structured, per-item fields exactly like the prototype, a free product-options
app (e.g. Infinite Options) adds text inputs to the product page that flow onto the order.

---

## 8. Pages, navigation, policies 🧑‍💼

- **About Us page:** paste the founders' bio from the prototype's About modal.
- **InstaMom University Gives Back page:** the scholarship story (1 box in 1,000 →
  $1,000 scholarship). This is content only — no commerce mechanics.
  - ⚠️ A sweepstakes/giveaway can carry legal requirements (official rules, eligibility,
    no-purchase-necessary language) that vary by state. Have someone confirm the rules
    wording before launch.
- **Policies:** Settings → Policies → generate refund, privacy, terms, shipping.
- **Navigation:** Online Store → Navigation → rebuild the header menu (About, Packages,
  Gives Back, Cart is automatic).

---

## 9. Cut the domain over from GitHub Pages 🛠️

1. Decide the domain. If you already have one (custom domain on Pages), you'll repoint
   it; if not, buy one (through Shopify or any registrar).
2. In Shopify: **Settings → Domains → Connect existing domain** (or **Buy new domain**).
3. At your DNS provider, point the domain at Shopify (A record → Shopify's IP, and
   `www` CNAME → `shops.myshopify.com`), per the exact values Shopify shows you.
4. Remove the GitHub Pages custom-domain setting so the two don't fight over DNS.
5. **Keep the GitHub Pages prototype live until the Shopify store is verified** — it's
   your fallback. Retire it (or leave it as an archived branch) only after a successful
   test order.

The prototype's deploy workflow is `.github/workflows/pages.yml`; you can disable it in
the repo's **Settings → Pages** once you've cut over.

---

## 10. Pre-launch checklist ✅

- [ ] Real inventory counts entered for every component and add-on
- [ ] All 8 bundles built, priced, and their component quantities verified (not the
      auto-extracted placeholders)
- [ ] Welcome Week Starter set to pre-order (Continue selling when out of stock)
- [ ] "Coming in September" boxes are Draft or clearly labeled pre-order
- [ ] Payments activated; a **test order** placed and refunded
- [ ] Shipping rates return correctly at checkout for a real address
- [ ] Taxes calculating for your states
- [ ] About / Gives Back pages published; scholarship rules reviewed
- [ ] Gift message + roommate-wrap note appear on the order for packers
- [ ] Domain resolves to Shopify; GitHub Pages custom domain removed
- [ ] Theme checked on mobile

---

## Appendix — CSV column reference

The CSVs use a practical subset of Shopify's product-import columns:

| Column | Meaning |
| --- | --- |
| `Handle` | Unique URL slug (lowercase-hyphen). Rows with the same handle = same product. |
| `Title` / `Body (HTML)` | Product name and description. |
| `Vendor` / `Type` / `Tags` | Merchandising metadata. `Type` distinguishes Component / Add-on / Package. |
| `Published` | `TRUE` = visible on storefront, `FALSE` = hidden (components). |
| `Option1 Name/Value` | `Title` / `Default Title` for single-variant products. |
| `Variant SKU` | Your internal SKU. |
| `Variant Inventory Tracker` | `shopify` = Shopify tracks stock. |
| `Variant Inventory Qty` | On-hand count. **All set to `0` — you enter real counts.** |
| `Variant Inventory Policy` | `deny` = stop at 0; `continue` = keep selling (pre-order). |
| `Variant Price` | Price in USD. |
| `Status` | `active` / `draft`. |

Missing Shopify columns (barcode, weight, SEO, images) are fine to omit at import and
can be filled in the admin. Product images aren't in the CSV — upload them in the
product editor, or set `Image Src` to the public URLs of the images in `assets/`.

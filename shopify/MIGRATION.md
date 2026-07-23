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

- **Header:** crest logo + nav links About Us / Packages / Inside / Gives Back, with
  Cart automatic. Use `instamom-logo-crest-transparent.png` — the opaque crest renders
  as a white box on the yellow paper. Note Dawn shows *either* a logo image or the shop
  name, never both, so setting the crest drops the "InstaMom University" wordmark from
  the header.
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

✅ **Done** — pages created and the header menu rebuilt. Recorded here so the next
person knows what exists and why.

- **About Us page** (`/pages/about-us`): the founders' bio, verbatim from the
  prototype's About modal.
- **What Makes It InstaMom University** (`/pages/what-makes-it-instamom-university`):
  the prototype's "#inside" section — the *comfort of family plus wisdom of faculty*
  intro and the three value props. The homepage still carries the same content as a
  Multicolumn section, so the two are currently word-for-word duplicates; trim the
  homepage copy to a teaser if that matters for SEO.
- **Gives Back** is *not* a page. It's a homepage section, reached by an anchor —
  the rich-text section has an **Anchor ID** setting (added to
  `theme/sections/rich-text.liquid`) set to `gives-back`, and the menu item points at
  `/#gives-back`.
  - ⚠️ A sweepstakes/giveaway can carry legal requirements (official rules, eligibility,
    no-purchase-necessary language) that vary by state. Have someone confirm the rules
    wording before launch.
- **Policies:** Settings → Policies → generate refund, privacy, terms, shipping.
  *(Still outstanding.)*
- **Navigation:** the header menu is **About Us / Packages / Inside / Gives Back**,
  with Cart automatic. Packages points at the `packages` collection (an automated
  collection on the `package` tag, sorted **Manually** into the prototype's order).

> ⚠️ **Adding a new section setting?** Push the Liquid *before* the JSON template.
> Shopify validates `templates/*.json` against the schema at upload time, so a
> setting the live schema doesn't know about yet is silently dropped — which is how
> the `gives-back` anchor first shipped as a dead link.

---

## 9. Cut the domain over from GitHub Pages 🛠️

✅ **Done** — `instamomuniversity.com` is connected and is now the store's **primary**
domain. Recorded here because the Cloudflare specifics are easy to get wrong.

The domain is registered at Hover but its DNS is on **Cloudflare** (nameservers
`edward`/`sloan.ns.cloudflare.com`). Before the cutover all three A records pointed at
`216.40.34.41` — Hover's parking IP — and were **proxied**, so the domain served a
Cloudflare `522`.

Final Cloudflare records:

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `23.227.38.65` | **DNS only** |
| CNAME | `www` | `shops.myshopify.com` | **DNS only** |
| MX | `@` | `mx.hover.com.cust.hostedemail.com` | DNS only *(untouched — this is email)* |

> ⚠️ **The proxy must be off (grey cloud) on both records.** Shopify terminates TLS
> itself and issues its own Let's Encrypt certificate; leaving Cloudflare's orange
> cloud on breaks certificate issuance and causes redirect loops. Verified working:
> the served cert is `issuer=Let's Encrypt, CN=instamomuniversity.com`, i.e. Shopify's,
> not Cloudflare's.

> ⚠️ **Don't touch the MX record.** Email for the domain runs through Hover; changing
> or proxying MX would silently break it.

Verified after the change: apex returns `200`, `www` 301s to the apex, both landing on
the store (currently the password page). A leftover wildcard `*` A record still points
at Hover's parking IP and is still proxied — harmless for the apex and `www`, which
have more specific records, but worth deleting when convenient.

**GitHub Pages was never on this domain** (`cname: null`), so there was nothing to
disconnect and no fallback was lost — the prototype is still at
`tydtu.github.io/instamomu`. Keep it until a successful test order, then disable
`.github/workflows/pages.yml` via the repo's **Settings → Pages**.

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

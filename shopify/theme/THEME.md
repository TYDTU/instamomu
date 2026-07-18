# InstaMom University — Dawn theme port

This kit reproduces the prototype's look on top of Shopify's free **Dawn** theme,
rather than hand-building a whole theme from scratch. Dawn gives you the structure,
cart, and checkout for free; these files carry the InstaMom identity — the yellow
dotted "paper" background, Graduate headings, gold hard-shadow product cards, the navy
"sticker" hero, pink/gold buttons, and the tag-driven pre-order badges.

> **Tested?** The **CSS is a direct port** of your `styles.css` and is the reliable
> core. The **Liquid** (section + snippets) follows Dawn conventions but hasn't been
> run against a live store (none exists yet) — preview each piece in the theme editor
> and adjust a selector if Dawn's markup differs in your version. Nothing here touches
> checkout or payments, so it's safe to iterate on.

## What's in this folder

```
theme/
├── assets/instamom.css               brand overlay (the core — load this)
├── sections/instamom-hero.liquid     custom "sticker" hero with the badge
├── snippets/instamom-badge.liquid    pre-order / coming-soon / seasonal badge (from tags)
├── snippets/instamom-whats-inside.liquid   "What's Inside" ✓ checklist (from a metafield)
└── config/color-schemes.json         brand color values for Dawn's schemes
```

---

## Step 1 — Add Dawn

Online Store → **Themes** → Add theme → **Dawn** (free, by Shopify). Work on a **copy**
(Actions → Duplicate) so you always have a clean fallback.

## Step 2 — Install these files

Theme → **Edit code**, then add each file in the matching folder:

- `assets/instamom.css`
- `sections/instamom-hero.liquid`
- `snippets/instamom-badge.liquid`
- `snippets/instamom-whats-inside.liquid`

(Create-a-new-asset / new-section / new-snippet, paste the contents, save.)

## Step 3 — Load the CSS

In `layout/theme.liquid`, just before `</head>`, add:

```liquid
{{ 'instamom.css' | asset_url | stylesheet_tag }}
```

That one line applies the whole brand overlay. Save and preview — the page should turn
yellow-dotted with navy/pink/gold styling.

## Step 4 — Colors & fonts

- **Colors:** Theme editor → **Colors**. Set the schemes to the values in
  `config/color-schemes.json` (scheme-1 = paper page, scheme-2 = navy band, scheme-3 =
  white cards, scheme-4 = footer). The CSS also hard-codes the key brand colors, so
  this step is mostly for native Dawn elements the CSS doesn't reach.
- **Fonts:** the CSS loads **Graduate** (Google Fonts) for headings automatically. For
  body text, Theme editor → **Typography** → pick **Inter** (or nearest) from Shopify's
  font list. Graduate generally isn't in Shopify's font picker, which is why it's loaded
  in the CSS instead.

## Step 5 — Build the pages with native Dawn sections

Map each prototype section to a Dawn section in the theme editor:

| Prototype section | Dawn section to use | Notes |
| --- | --- | --- |
| Hero "sticker" + badge | **InstaMom Hero** (this kit) | Add section → InstaMom Hero. Set crest image + badge text. |
| "Explore our packages" lineup | **Featured collection** | Point it at a "Packages" collection. |
| Package grid | **Featured collection** / **Collection page** | Cards get the gold hard-shadow from the CSS automatically. |
| "What makes it InstaMom University" (tip cards / whole person / care across miles) | **Multicolumn** | Three columns. |
| InstaMom University Gives Back | **Rich text** or **Image with text** | Add the CSS class `instamom-band` via the section's custom-CSS field for the navy look. |
| About Us | **Page** + **Rich text** | Paste the founders' bio. |
| Footer | Dawn **Footer** | Styled navy by the CSS. |

## Step 6 — Pre-order / coming-soon badges

The badge snippet reads the **product tags** already set in the CSVs
(`pre-order`, `coming-soon`, `seasonal`). To show them:

1. Product cards: in `snippets/card-product.liquid`, inside the card's media/content
   wrapper, add:
   ```liquid
   {% render 'instamom-badge', product: card_product %}
   ```
2. Product page: in `sections/main-product.liquid`, near the title, add:
   ```liquid
   {% render 'instamom-badge', product: product %}
   ```

(Exact variable names — `card_product` on cards, `product` on the product page — match
Dawn's defaults; confirm in your version.)

## Step 7 — "What's Inside" checklist

1. Settings → **Custom data** → **Products** → **Add definition**:
   - Name: `What's inside`
   - Namespace/key: `custom.whats_inside`
   - Type: **List of single line text**
2. On each package product, fill the list with one entry per item (for the Welcome Week
   Starter, copy the 10 lines already in `products-components.csv` / the prototype's
   `contents`).
3. In `sections/main-product.liquid`, where you want the list, add:
   ```liquid
   {% render 'instamom-whats-inside', product: product %}
   ```

## Step 8 — Images

Upload the brand images (in the repo's `assets/`) via the theme editor / Content →
Files:

- `assets/instamom-logo-crest.png` → header logo + hero crest
- `assets/imu-logo-cap.png` → section accents
- `assets/welcome_week_box.jpg` → Welcome Week Starter product photo

## Step 9 — Check it

Preview at desktop **and** mobile widths. Spot-check: dotted background, Graduate
headings, pink primary buttons, gold hard-shadow on product cards, a pre-order badge on
the Welcome box, and the ✓ "What's Inside" list on a product page.

---

### If you'd rather not touch Liquid

Everything except the badges and "What's Inside" list works from **just Step 1–5**
(Dawn + `instamom.css` + native sections). The two Liquid snippets are enhancements you
can add later or hand to a developer — the store is fully functional without them.

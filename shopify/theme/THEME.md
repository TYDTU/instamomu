# InstaMom University — Dawn theme port

This kit reproduces the prototype's look on top of Shopify's free **Dawn** theme,
rather than hand-building a whole theme from scratch. Dawn gives you the structure,
cart, and checkout for free; these files carry the InstaMom identity — the yellow
dotted "paper" background, the navy "sticker" hero in blocky Graduate over Inter
section/card headings, gold hard-shadow product cards, pink/gold buttons, pink
focus/hover accents, and the tag-driven pre-order badges.

> **Tested?** Yes, as of the Dawn 15.5.0 port on `instamom-university.myshopify.com`.
> The CSS and the hero section are verified rendering on desktop and mobile. Four CSS
> bugs found during that pass are already fixed here: card titles going navy-on-navy,
> the dot pattern never showing (Dawn paints section backgrounds on its
> `.color-scheme-N` wrappers, above `body`), card price strips staying transparent
> (Dawn renders `.card__content` as a *sibling* of `.card`), and headings vanishing on
> the navy bands.
>
> **Still unverified:** `instamom-badge` and `instamom-whats-inside` have never
> rendered visible output — no product carries a `pre-order`/`coming-soon`/`seasonal`
> tag yet (those live on the packages, which are bundles built in Step 4 of
> `../MIGRATION.md`), and the `custom.whats_inside` metafield doesn't exist yet. Both
> snippets fail safe, so nothing breaks meanwhile. Nothing here touches checkout or
> payments.

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
- ⚠️ **Also point the cards at scheme-3.** Setting the scheme *values* is not enough —
  Dawn's `card_color_scheme` still defaults to **scheme-2**, which you've just painted
  navy, and the CSS renders card titles in navy. The result is navy-on-navy and
  unreadable. In the theme editor this is **Theme settings → Product cards → Color
  scheme**; in code it's `card_color_scheme` (plus `collection_card_color_scheme` and
  `blog_card_color_scheme`) in `config/settings_data.json`.
- **Fonts:** matching the prototype, the CSS loads **Graduate** (Google Fonts) for the
  hero "sticker" title *only*. Every other heading follows Dawn's **body** font, so
  Theme editor → **Typography** → pick **Inter** (or nearest) as the body font and the
  section/card headings follow it automatically — the CSS repoints Dawn's
  `--font-heading-family`/`--font-heading-weight` at the body font, so the *header*-font
  setting no longer has to match. A couple of serif accents (the preview and add-ons
  modal titles) use **Georgia**. Graduate generally isn't in Shopify's font picker, which
  is why it's loaded in the CSS instead.

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

## Step 6b — Card actions: Preview package + Add to cart

The prototype's package cards carry two stacked full-width buttons — a secondary
"Explore package" and a primary "Add to cart" (`.card-actions` in `../../styles.css`).
Dawn ships only a quick-add, so:

1. Turn the quick-add on: **Featured collection → Quick add → Standard** (or
   `"quick_add": "standard"` in `templates/index.json`).
2. In `snippets/card-product.liquid`, just above the
   `{% assign product_form_id = 'quick-add-' ... %}` line, add the secondary button:
   ```liquid
   {%- if quick_add != blank and quick_add != 'none' -%}
     <div class="instamom-card-actions">
       <a href="{{ card_product.url }}"
          class="button button--full-width button--secondary instamom-preview-button">
         Preview package
       </a>
     </div>
   {%- endif -%}
   ```

Dawn hard-codes its quick-add as `.button--secondary`, which the overlay paints gold —
the same as the Preview button. `assets/instamom.css` repaints the *enabled* quick-add
pink so "Add to cart" reads as the primary action, matching the prototype.

> **Out-of-stock products show "Sold out", not "Add to cart".** Dawn renders the
> quick-add `disabled` when the variant is unavailable. The pink override is scoped
> `:not([disabled])` so sold-out buttons stay muted rather than looking clickable.

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

## Step 7b — Anchor links to a homepage section

To let a nav item jump to a section (the header's "Gives Back" link does this), add an
anchor to Dawn's `sections/rich-text.liquid`. Don't rely on Dawn's own
`shopify-section-…` wrapper id — it embeds a generated template id.

1. Just above the section's outer `<div class="isolate…">`, add:
   ```liquid
   {%- if section.settings.anchor_id != blank -%}
     <span id="{{ section.settings.anchor_id | handleize }}" class="instamom-anchor"></span>
   {%- endif -%}
   ```
2. Add a matching `{"type": "text", "id": "anchor_id", "label": "Anchor ID"}` entry to
   the top of that section's `settings` array in its `{% schema %}`.
3. Set the Anchor ID on the section, then point a menu item at `/#your-anchor`.

`.instamom-anchor` in `assets/instamom.css` carries a `scroll-margin-top` so the sticky
header doesn't cover the heading on arrival.

> ⚠️ **Push the Liquid before the JSON template.** Shopify validates
> `templates/*.json` against the live schema on upload, so a setting the store doesn't
> know about yet is silently dropped — which is how this anchor first shipped dead.

## Step 8 — Images

Upload the brand images (in the repo's `assets/`) via the theme editor / Content →
Files, then point the theme at them:

- `assets/instamom-logo-crest-transparent.png` → **header logo + favicon + hero crest**.
  Use the transparent one; the opaque crest renders as a white box on the yellow paper.
  Dawn shows a logo image *or* the shop name, never both, so this replaces the
  "InstaMom University" wordmark in the header.
- `assets/imu-logo-cap.png`, `assets/instamomu-banner.png` → spare brand art, unused so far
- `assets/welcome_week_box.jpg` → Welcome Week Starter product photo

> **Product photography:** shoot every box at the same framing and aspect ratio. Mixing
> a tight 1:1 shot with loose 16:9 ones makes one card's product look much larger than
> the rest, and no `image_ratio` setting can correct it — the crop disparity is
> identical in `square` and `portrait`.

## Step 9 — Check it

Preview at desktop **and** mobile widths. Spot-check: dotted background, the Graduate
hero title over Inter section/card headings, pink primary buttons, a pink focus border
on form fields, gold hard-shadow on product cards, a pre-order badge on the Welcome box,
and the ✓ "What's Inside" list on a product page.

---

### If you'd rather not touch Liquid

Everything except the badges and "What's Inside" list works from **just Step 1–5**
(Dawn + `instamom.css` + native sections). The two Liquid snippets are enhancements you
can add later or hand to a developer — the store is fully functional without them.

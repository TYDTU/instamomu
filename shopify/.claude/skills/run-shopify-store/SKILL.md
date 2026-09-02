---
name: run-shopify-store
description: Deploy, preview, and drive the InstaMom University Shopify store and Dawn theme via the Shopify CLI. Use when asked to push/deploy theme changes, preview the theme, take a screenshot of the storefront, read or write store data (products, metafields), or run a Shopify Admin GraphQL query/mutation for this store.
---

The deployable here is the **Dawn theme** (`theme-dawn/`) on the **live** InstaMom Shopify store — there is nothing to build or launch locally. The "app" lives on Shopify's servers; the **`shopify` CLI is the harness**, wrapped by `.claude/skills/run-shopify-store/driver.sh`. Use the driver for everything: deploy a file, preview with hot-reload, and read/write store data (metafields) via Admin GraphQL — no manual Admin API token needed.

All paths below are relative to `shopify/`. The driver `cd`s itself into `theme-dawn/`, so its file args are theme-relative (e.g. `assets/instamom.css`).

## Prerequisites

- **Shopify CLI** (`shopify version` → 4.5.2 here). Install/upgrade: `npm install -g @shopify/cli@latest`.
- **The `shopify store` commands** (needed to read/write store data) come from the official plugin — install once:
  ```bash
  claude plugin install shopify-ai-toolkit@claude-plugins-official
  ```
  Without it, `shopify store auth`/`execute` don't exist and you'd be stuck hunting for an Admin API token (which this store's OAuth "Develop apps" flow won't hand out — see Gotchas).

## Setup — one-time store auth

`shopify theme` commands already work against the alias domain. To read/write **store data** (`shopify store …`), authorize once — a browser opens; approve it:

```bash
shopify/.claude/skills/run-shopify-store/driver.sh auth
```

This authenticates against the **permanent** domain `rd3sqk-f2.myshopify.com` (NOT the alias — see Gotchas) and caches the session, so later `verify`/`execute`/`mutate` need nothing more.

## Run (agent path) — the driver

```bash
D=shopify/.claude/skills/run-shopify-store/driver.sh

$D verify        # read-only shop query — confirms store auth + execute work
$D theme-list    # lists themes; live one is Dawn #158107369572
$D pull-diff assets/instamom.css   # drift check a file vs the LIVE copy before pushing
$D push assets/instamom.css sections/header.liquid   # deploy ONLY those files to live
```

`verify` prints `{"shop": {"name": "Instamom University", "myshopifyDomain": "rd3sqk-f2.myshopify.com"}}`.

| command | what it does |
|---|---|
| `auth` | one-time store auth (browser; permanent domain) |
| `verify` | read-only shop query — is store execute working? |
| `theme-list` | list themes, marks the live one |
| `preview` | hot-reload preview at `http://127.0.0.1:9292` (backgroundable) |
| `pull-diff <file>` | pull the live copy of a theme file, diff vs local (do this **before** any live push) |
| `push <file>...` | surgical deploy — pushes ONLY the named files to the live theme (`--nodelete --allow-live`) |
| `execute <query>` | read-only Admin GraphQL query |
| `mutate <query> <varfile>` | Admin GraphQL mutation with a JSON variables file |

**Preview** (verify visual changes before pushing to live): run in the background, then drive/screenshot the storefront.

```bash
shopify/.claude/skills/run-shopify-store/driver.sh preview   # → http://127.0.0.1:9292
```

**Write a metafield** (how the `custom.lineup_blurb` and `custom.whats_inside` values were set). Build a variables file, then `mutate`:

```bash
# vars.json: {"mf":[{"ownerId":"gid://shopify/Product/8647365132388","namespace":"custom","key":"whats_inside","type":"list.single_line_text_field","value":"[\"item one\",\"item two\"]"}]}
$D mutate 'mutation Set($mf:[MetafieldsSetInput!]!){metafieldsSet(metafields:$mf){metafields{namespace key} userErrors{field message}}}' vars.json
```
A `list.*` metafield's `value` is a **JSON-array string**; a `multi_line_text_field` is a plain string. Product IDs: `execute 'query{ products(first:20,query:"tag:...") { nodes { id title } } }'`.

## Sharing work for owner review

The owner cannot see `theme dev` — `http://127.0.0.1:9292` only resolves on the
machine running it. To put work in front of her, either push to the live theme (fine
only while the store is password-gated) or, preferably, publish an **unpublished
preview theme** and send its `?preview_theme_id=` URL plus the storefront password:

```bash
shopify theme push --unpublished --theme "Review YYYY-MM-DD" --store instamom-university.myshopify.com
```

Full workflow, including what the owner needs to do on her side: [`shopify/REVIEWING.md`](../../../REVIEWING.md).

## Verify a change is live

Push, then load the storefront in a browser (Claude-in-Chrome is already past the gate; or use the `preview` server). Screenshots taken this way confirmed every change this session. To re-pull and confirm a file deployed: `pull-diff <file>` → `NO DRIFT`.

## Gotchas

- **Two domains.** `shopify store …` commands REQUIRE the permanent domain `rd3sqk-f2.myshopify.com`; the login alias `instamom-university.myshopify.com` triggers `OAuth callback store does not match`. `shopify theme …` commands accept the alias fine. The driver hard-codes the right one per command.
- **No static Admin token here.** The store's "Develop apps" routes to the OAuth **Dev Dashboard**, which only exposes a `shpss_` client *secret* (401s against the Admin API) — never a `shpat_` token. Don't chase one. Use `shopify store execute`/`mutate`; it auths via the CLI, no token.
- **Live pushes need `--allow-live`** or the CLI errors "Failed to prompt" non-interactively. And always `pull-diff` first — the homepage `templates/*.json` and any file can be edited in the theme editor; pushing blindly clobbers those edits. The driver's `push` is `--only <file> --nodelete` to stay surgical.
- **Dawn's root font-size is 10px (`62.5%`).** Prototype `rem` values ported into `assets/instamom.css` render 37.5% small — multiply by **1.6** to match. (Hero title `4.2rem`→`6.72rem`, nav `16px`=`1.6rem`, etc.)
- **New section before its template.** When a `templates/*.json` references a new section type, `push sections/foo.liquid` FIRST, then `push templates/index.json` — Shopify validates templates on upload and silently drops references to unknown sections.
- **Metafield key trap.** The theme reads `custom.lineup_blurb` and `custom.whats_inside`. A definition created in-admin as "custom.lineup_blurb" actually gets key `custom_lineup_blurb` (double "custom") and is a *different, unused* field — the working values are set directly by key via `metafieldsSet`, which needs no definition.
- **Metafield *definitions* use `write_products`** (for product-owned defs) — there is NO `write_metafield_definitions` scope; the OAuth flow rejects it as `invalid_scope`. To rename/fix a definition: `metafieldDefinitionDelete(id, deleteAllAssociatedMetafields: true)` the wrong one, then `metafieldDefinitionCreate` the right one (`pin: true`). Existing values whose key matches the new definition are **auto-adopted** — no need to re-set them.
- **Storefront is password-gated** ("Opening soon", password `usotsu`). `theme dev` needs `--store-password usotsu`; the public URL shows the gate. Claude-in-Chrome (the user's real browser) is already past it.
- **Status badges are tag-driven**, not metafields: product tags `pre-order`/`coming-soon`/`seasonal` → the `instamom-badge` snippet.
- **Storefront customer-form POSTs hit a bot challenge under automation.** Submitting a `form 'customer'` (the coming-soon "Notify me" signup) from `theme dev` in an automated browser lands on Shopify's **"Verifying your connection…"** interstitial and never processes — no customer is created, and the challenge must not be worked around. Automation can only verify the *rendered* form (hidden `contact[tags]`, `form_type`, action, the `#notify` anchor); the round trip has to be exercised by hand in a real browser. Confirming the tags actually landed additionally needs `read_customers` on the cached auth.
- **Add-to-cart behavior can't be tested on the boxes — they're sold out.** Every package sits at 0/`DENY` (a bundle's qty is its lowest-stock component), so Dawn renders the add button `disabled` and no cart-side validation can fire. Only `welcome-week-starter` (30) and `addon-personalized-card` (25) are buyable. To exercise a product-form snippet, temporarily widen its tag condition **locally** to hit a buyable product (`theme dev` serves local files, so no store write) and revert after — or stock the components per the inventory notes above.
- **Scopes beyond products need a re-auth.** The default `auth` grants only `write_products,read_products`. Inventory, locations, and publications each need their own scopes — re-run auth (opens a browser once) with the superset you need, e.g.:
  `shopify store auth --store rd3sqk-f2.myshopify.com --scopes "write_products,read_products,read_publications,write_publications,read_locations,read_inventory,write_inventory"`
- **Publishing a product to the storefront needs `write_publications`.** `productCreate` (even `status: ACTIVE`) does **not** auto-publish — `onlineStoreUrl` stays `null`. Publish with `publishablePublish(id, input:[{publicationId}])` using the **Online Store** publication id (from `publications`, needs `read_publications`). Note: on this password-gated store `onlineStoreUrl` reads `null` **even when published** — confirm via `resourcePublications(first:5){nodes{publication{name} isPublished}}`, not the URL.
- **Inventory writes are fiddly (API 2026-04).** Use `inventoryAdjustQuantities` (deltas) or `inventorySetQuantities`, and:
  - The mutation **requires** the `@idempotent(key:$idempotencyKey)` directive on the mutation field, with a unique UUID string variable — omit it and it errors.
  - `name` must be **`available`** (not `on_hand` — `on_hand` demands a `ledgerDocumentUri`; valid names: available, damaged, incoming, quality_control, reserved, safety_stock).
  - Every change needs **`changeFromQuantity`** (the item's current value at that location) — read it first with `inventoryLevel(locationId:…){ quantities(names:["available"]){ quantity } }`.
  - `changeFromQuantity` is the field name on `InventoryQuantityInput`. It is NOT `compareQuantity` — that guess fails with `Field is not defined on InventoryQuantityInput`.
  - A **bundle's** available qty is its lowest-stock component, so to make a box orderable you stock its *components*, not the box (Welcome's 11 components were set to 30, then to 50 in Jul 2026). Location: `INSTAMOM U` = `gid://shopify/Location/90382762084`.
  - The **bundle's own derived quantity lags** the component write: right after a successful `inventorySetQuantities` the box still reports the OLD `totalInventory` while its components already read the new value, and `quantityAfterChange` comes back `null`. It settles in ~15s — re-query the box before concluding the write failed.
  - Reading component ids/quantities needs **no inventory scope**: `productVariantComponents { productVariant { inventoryQuantity inventoryItem { id } } }` works on `read_products`. Only the write needs `write_inventory`, so stage everything first and re-auth once.
- **`theme dev` reports every BUNDLE as "already sold out".** Adding a bundle to
  the cart through `http://127.0.0.1:9292` returns
  `422 The product '<name>' is already sold out.` while the same add on the real
  storefront returns 200. Non-bundle products add fine through the proxy, which
  makes it look like a real, bundle-specific inventory fault. It is not.
  **Never diagnose purchasability or shipping rates through `theme dev`** — it
  cost most of an afternoon and nearly caused a correct shipping-zone change to
  be reverted. Verify cart/checkout behaviour on the live storefront
  (`https://instamomuniversity.com`), which Claude-in-Chrome can reach; use
  `theme dev` only for rendering and layout.
- **Bundle components are owned by the app that created them, and it is absolute.**
  Shopify: "After an app assigns components to a bundle, only that app can manage
  those components." The lock is at the **product** level, not the variant, and it
  blocks **removal as well as addition** — so you cannot release it from this side
  by deleting the relationships. `productVariantRelationshipBulkUpdate` fails with
  `PRODUCT_EXPANDER_APP_OWNERSHIP_ALREADY_EXISTS`. No scope fixes this;
  `read_apps` is not even a valid Shopify access scope, so you cannot identify the
  owning app from here either — look in the admin.
  The only route is a product THIS app created. Rebuild: rename the old handle to
  `<handle>-legacy` + set DRAFT, re-create on the original handle, copy
  metafields/photo/publications, then attach components. Done for Warm Hug from
  Home and Homesick Helper in Aug 2026; the script is in that session's
  scratchpad. Untag the legacy products so they leave any smart collection, and
  leave them DRAFT rather than deleting until someone has checked the replacement.
  Done a third time for **Seasonal Celebrations on 1 Sep 2026** (to attach the
  Birthday Box's 12 components) — assume any product from the original migration
  import is owned by the other app until a mutation proves otherwise, and budget
  for the rebuild rather than discovering it halfway. Two extras that only show
  up on a MULTI-VARIANT rebuild:
  - `productCreate` with several `productOptions` values creates **only the first
    variant** (the rest are silently skipped). Add the others with
    `productVariantsBulkCreate`, passing `optionValues:[{optionName, name}]`.
  - The component attach zeroes the price on **every** variant of the product,
    not just the parent you attached to — so set all prices in one
    `productVariantsBulkUpdate` at the very end, after the attach, and re-read.
- **`coming-soon` gates the whole PRODUCT, not the variant.** The buy-button
  gate in `sections/main-product.liquid` and the notify form in
  `snippets/instamom-notify-form.liquid` both test `product.tags`. So on a
  multi-variant box you cannot sell one occasion while the others stay
  "Coming Soon" — dropping the tag un-gates all of them. The others fall back to
  a disabled "Sold out" button (safe: they sit at 0/`DENY`), but they lose the
  Notify-me email capture. Owner accepted that trade for Seasonal Celebrations in
  Sep 2026 so the Birthday Box could ship; the alternative is splitting the
  occasion into its own product.
- **Attaching OR DETACHING bundle components ZEROES the parent variant's price.** This is the
  one that will bite you. `productVariantRelationshipBulkUpdate` silently resets
  the parent to **$0.00**, and returns no userError. Proven the hard way: on Room
  Refresh the price was set to $56 BEFORE attaching, the mutation reported
  success, and the variant still came out $0.00 afterwards. (`productSet` also
  doesn't apply prices at create time, so the two compound.)
  **Detaching does it too** — removing Homesick Helper's components left all four
  variants at $0.00, and it was only caught because the storefront grid showed
  "$0.00 USD". **Always set prices AFTER any component change, attach or detach,
  then re-read to confirm.** Get this wrong and the care packages go live free.
- **Smart collections re-evaluate asynchronously.** After changing the tag that a
  smart collection rules on, the collection keeps reporting the old membership for
  a good 30s. Poll rather than concluding the tag edit failed.
- **`/cart/add.js` does not enforce stock on this store** — a plain DENY variant
  with 25 in stock accepts a quantity of 9999 with HTTP 200, and so do bundles.
  Enforcement happens at checkout. Don't read a successful cart-add as proof that
  inventory is wired up; verify components through the Admin API instead.
- **Native bundles** (how the boxes decrement components): attach component variants to the box's variant with `productVariantRelationshipBulkUpdate(input:[{parentProductVariantId, productVariantRelationshipsToCreate:[{id, quantity}]}])`. This flips the parent to `requiresComponents: true` (settles a beat *after* the mutation response — re-query to confirm). Caveat: "only the app that assigned components can manage them" — components set via this CLI app aren't managed by the Shopify **Bundles** app, so verify a bundle expands into components at checkout before selling it. (Regroup, Recover, Restart was built this way.)
- **Uploading a LOCAL image takes three mutations, not one.** `productCreateMedia`
  only accepts a URL in `originalSource`, so a file on disk has to be staged first:
  1. `stagedUploadsCreate(input:[{filename, mimeType, resource:IMAGE, httpMethod:POST, fileSize}])`
     — `fileSize` is a **string** of bytes.
  2. `curl -X POST <target.url>` with every `target.parameters` name/value as `-F`,
     then `-F file=@<path>` **last**. Expect HTTP **201**.
  3. `productCreateMedia(productId, media:[{originalSource:<target.resourceUrl>, alt, mediaContentType:IMAGE}])`,
     then `productVariantAppendMedia(productId, variantMedia:[{variantId, mediaIds}])`
     to hang it on one variant.
  `image` comes back `null` on the create — the media is still processing. Re-query
  `media{ ... on MediaImage{ status image{width height} } }` until `status: READY`.
- **iPhone photos upload SIDEWAYS, and it looks fine locally right up until it doesn't.**
  A HEIC off an iPhone stores **landscape pixels plus an EXIF orientation tag**. macOS
  honours the tag, so Preview, Quick Look and the Read tool all show it upright; Shopify
  applies the tag at ingest and serves the rotated result. Worse, `sips -r 90` only
  **rewrites the tag** — it does not touch the pixels — and `sips` carries that tag
  through every later conversion while **not** listing it under `sips -g all`. So the
  file measures 1536x2048 locally and Shopify still stores 2048x1536.
  The reliable recipe, used for the Birthday Box photo on 1 Sep 2026:
  1. `sips -r 90 in.png --out rot.png` — rotate **as PNG**. PNG has no orientation
     tag, so this is the step that actually bakes the pixels. Confirm by checking the
     dimensions actually swapped.
  2. `sips -Z 2048 -s format jpeg -s formatOptions 88 rot.png --out out.jpg`
  3. **Strip the EXIF** — drop the `APP1` segment whose payload starts `Exif\0\0`
     (walk the JPEG markers; leave `APP2`/ICC alone so colour survives). Otherwise the
     inherited Apple tag rides along and re-rotates it server-side.
  Verify on the **live storefront**, not locally: `image{width height}` from the Admin
  API, or `naturalWidth`/`naturalHeight` on the rendered `<img>`. A local preview
  proves nothing here.

## Troubleshooting

- **`OAuth callback store does not match the requested store` / `Shopify returned rd3sqk-f2...`**: you used the alias domain for a `store` command. Re-run with `--store rd3sqk-f2.myshopify.com` (the driver does this).
- **`HTTP 401 Invalid API key or access token`** when curling the Admin API: the token is a `shpss_` client secret, not a `shpat_` Admin token. Abandon the curl/token path; use `shopify store execute`.
- **`shopify store` "command not found"**: the `shopify-ai-toolkit` plugin isn't installed (see Prerequisites), or CLI is too old — `shopify upgrade`.
- **`Could not find a Shopify app configuration file`** from `shopify app execute`: that command needs an app project; it is NOT the tool here. Use `shopify store execute`.
- **`theme dev` errors "Enter your store password"**: pass `--store-password usotsu` (the driver's `preview` does).
- **Admin metafield edits don't save with Cmd/Ctrl-S**: the shortcut doesn't save in the Shopify admin; click the Save button. (Prefer the CLI `mutate` path anyway.)
- **`Access denied for locations field` / `publications field` / `customers field` / `read_publications access scope`**: your cached auth lacks that scope. Re-run `shopify store auth …` with the scope added (see Gotchas) — customers need `read_customers`.
- **`Verifying your connection...` / "Your connection needs to be verified"** after submitting a storefront form: Shopify's bot protection, triggered by automated browsers. It is not a theme bug and must not be bypassed — submit that form manually in a real browser instead.
- **`The @idempotent directive is required for this mutation`** (inventory): add `@idempotent(key:$idempotencyKey)` to the mutation field and pass a UUID `idempotencyKey` variable.
- **`InventoryChangeInput/InventorySetQuantityInput must include the following argument: changeFromQuantity`**: add each item's current quantity as `changeFromQuantity`.
- **`The specified quantity name is invalid`** or **`A ledger document URI is required except when adjusting available`**: set `name: "available"` (not `on_hand`).
- **An uploaded photo renders rotated on the storefront** (but looks upright in Preview / Read): EXIF orientation. Don't re-run `sips -r` — it only rewrites the tag. Rotate via a PNG intermediate, then strip the `APP1`/Exif segment. See the iPhone-photos gotcha above.
- **`productCreateMedia` returns `image: null`**: not an error — the media is still processing. Poll `media{ ... on MediaImage{ status image{width height} } }` for `status: READY`.

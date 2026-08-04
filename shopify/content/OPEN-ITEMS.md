# What we still need from the owner

One list, covering the **21-page policy suite** and the **sweepstakes**. Anything
marked ✅ is already known and needs only a yes/no confirmation.

Nothing in either group can be published until its section here is complete.

---

> **Answered 3 Aug 2026.** Sections A–D below are resolved and applied; section
> E is moot — the sweepstakes was pulled. Kept as the record of what was asked
> and what came back.

## A–D. Answered

| Ref | Answer |
|---|---|
| A1 legal entity | **InstaMom University LLC** |
| A2 address | 203 Boston Avenue, Lynchburg, VA 24503 ✅ |
| A3 website | https://instamomuniversity.com ✅ |
| A4 public name | InstaMom University ✅ |
| B1–B3 emails | **instamomuniversity@gmail.com** — one inbox for support, privacy and legal notices |
| B5 privacy request link | Not used; email only |
| C1 processing | **7–10 business days** (raised from the 3–5 default) |
| C2 damage notice | 7 calendar days from delivery |
| C3 return window | 14 calendar days, unopened/unused |
| C4 return shipping | Customer pays unless we erred |
| C5 cancellation window | 2 hours after ordering |
| C6 coaching cancellation | 24 hours before start; **rescheduling allowed twice, then void** |
| C7 refund processing | 5–10 business days after approval |
| C8 territory | **Contiguous US only** — no Alaska, Hawaii, US territories, APO/FPO or P.O. boxes |
| C9 effective date | **4 August 2026** |
| D1 subscriptions | Not yet — "coming soon". Sections removed for launch. |
| D2 international | No. "We currently ship only within the United States." |
| D3 terms agreement at checkout | **Yes** — built as a required cart checkbox |
| D4 tools | **Shopify only** — no separate analytics, email or advertising tools |
| D5 ad pixels | None, so no cookie-consent control needed |
| D6 attorney review | **After** launch |

## E. Sweepstakes — withdrawn

Pulled entirely before launch. The $199-vs-$1,000 question never had to be
answered. See [README.md](README.md).

## K. Privacy Policy — settled, Aug 2026

**The store keeps Shopify's auto-managed Privacy Policy.** Owner's call. It was
the one policy the API refused to overwrite ("Automatic management for Privacy
Policy must be turned off in order to make changes"), and rather than turn that
off, we're leaving it — Shopify's version updates itself as privacy law changes,
where a hand-written one silently goes stale.

Checked on the live page: it renders cleanly, and it picks up the
`.shopify-policy` styling, so it looks consistent beside Refund, Shipping and
Terms. No contradiction with any of them.

One inaccuracy worth knowing rather than fixing: it says personal information is
shared *"with business and marketing partners to provide marketing services and
advertising"*. This store uses **Shopify and nothing else** — no analytics suite,
no email tool, no Meta Pixel, no Google Ads. So it describes **more** sharing
than actually happens. Over-disclosure isn't the dangerous direction, but it
isn't true of this business.

`shopify/content/policy-privacy.html` — the version written to match actual
practice — stays in the repo, unused. **Revisit it if an ad pixel or analytics
tool is ever added**: at that point the auto policy becomes right by accident,
and the trade-off changes.

## L. Sales tax — what's set up and what isn't (Aug 2026)

> **UPDATE 3 Aug 2026 — collection is ON.** Settings → Taxes and duties → United
> States now lists **Virginia** under "States you're collecting in", and the
> Virginia *Action required* warning is replaced by *"You're all set. You'll be
> notified when a state approaches or meets a tax collection threshold."*
> The steps below are kept as the record of what was done.
>
> Not verified: the actual amount charged. Confirming that needs a draft-order
> calculation (`write_draft_orders`, which this integration doesn't have) or a
> real checkout — **worth eyeballing the tax line on the next test order.**
>
> Shopify also surfaces the categorisation gap on that page: **"Tax rate
> management → Uncategorized products: 74"**, with auto-suggested categories
> waiting to be accepted or rejected. Of those 74 the ones that matter are the
> **9 add-ons**, which are sold to customers as their own line items; the ~65
> component products never appear on an order, so their category is
> inconsequential.
>
> **Done 3 Aug 2026 — all 9 add-ons are categorised**, chosen from the real
> Shopify taxonomy rather than Shopify's bulk auto-suggestions:
>
> | Add-on | Category |
> |---|---|
> | Extra Snack Sleeve: Chips | Food Items > Snack Foods > Chips |
> | Extra Snack Sleeve: Cookies | Food Items > Bakery > Cookies |
> | Extra Popcorn — 14 oz Bottle | Food Items > Snack Foods > Popcorn |
> | Extra Mini Popcorn Seasoning | Snack Foods > Popcorn > Popcorn Seasonings & Mixes |
> | Roll of Two-Ply Toilet Paper | Household Supplies > Household Paper Products > Toilet Paper |
> | Laundry Rescue Pack | Household Supplies > Laundry Supplies |
> | 3-in-1 Charging Cable | Electronics Accessories > Cables > USB Cables |
> | Personalized Message Card | Party & Celebration > Gift Giving > Greeting Cards |
> | Athlete Recovery Pack | Bundles — genuinely mixed (hot/cold pack, Liquid I.V., cooling towels, Biofreeze, bandage wrap), so no single food or health category is honest |
>
> **Every customer-facing product now has a category** — 9 add-ons and 9
> packages. This matters beyond tidiness: the four food add-ons are now
> classified as food, which is what lets Shopify Tax apply Virginia's reduced
> grocery rate if it applies. Previously they were uncategorised and treated as
> generally taxable.
>
> The remaining "uncategorized" count is components and the parked legacy
> products. Neither ever appears as a line item on an order, so neither affects
> tax. **Blank Roommate Contract** is one of those — it's a component, so its
> lack of a suggestion doesn't matter.

**Nothing was being collected anywhere before this.** Settings → Taxes and duties →
United States showed *Collecting: —*.

What IS already in place:

- **Shopify Tax is active.** Free until $100,000 in global sales, then 0.35% per
  transaction. It calculates state *and* local rates automatically, so there are
  no rate tables to maintain.
- **Shopify has already detected the nexus.** Tax liability insights shows
  **Virginia — Action required, "Physical presence threshold met in July 2026."**
  That's the Lynchburg fulfilment location. It is telling you that you have an
  obligation in Virginia.

### What has to happen, in this order

1. **Register with Virginia first.** Shopify's own note: *"Register with each
   state before collecting sales tax."* Collecting before you hold a Certificate
   of Registration is the wrong way round. Virginia Dept. of Taxation,
   Form R-1 / online registration.
2. **Then** Settings → Taxes and duties → United States → **Set up tax
   collection** on the Virginia row, and enter the sales tax ID. Shopify starts
   calculating at checkout from that point.

Only Virginia is flagged. Other states need *economic* nexus — typically
$100k in sales or 200 transactions into that state in a year — which a launching
store won't have. Shopify will flag them here if they're ever crossed, so this
page is worth checking periodically rather than guessing.

### Three things to raise with an accountant

I can wire up whatever is decided, but these are judgement calls about the
business, not Shopify settings, and I'm not qualified to answer them:

- **Food.** Virginia taxes food for home consumption at a reduced rate. These
  boxes are mostly snacks, mixed with non-food. Gift baskets with mixed contents
  are treated differently in different states, and every package here is
  categorised as **Bundles**, which Shopify Tax treats as generally taxable at
  the full rate. If the reduced grocery rate should apply to some of it, that's a
  categorisation change.
- **Tax on shipping.** The store currently has `taxShipping: true`. In Virginia,
  *separately stated* shipping charges are generally not taxable, while combined
  "shipping and handling" is. The rates here are stated separately (Standard /
  Express), so this setting may be charging tax it doesn't need to.
- **Pre-orders.** Boxes are being sold now and shipping 14 August. Which tax
  period a pre-order belongs to is a filing question worth asking once.

### Fixed in passing

All 8 packages now carry the **Bundles** product category. Three had lost it —
`productSet` doesn't copy the category, so the Warm Hug / Homesick / Room Refresh
rebuilds dropped it — and `regroup-recover-restart` never had one. Product
category is what Shopify Tax uses to decide taxability, so an unset category is
not cosmetic. **The 9 add-ons still have no category** and should get one before
they're sold separately.

## M. Snack Attack components + status changes (Virginia's 3 Aug email)

From *"I THINK This is what we need"*, cylke@lynchburg.edu, 3 Aug 2026.

**Snack Attack is now three real bundles.** 20 component products created from
her lists and attached per variant — Cheese Lovers 8, Chocolate Lovers 6,
Protein Fiend 6 — with her wording as the customer-facing "What's Inside".

Required the same rebuild as the Warmies products (app ownership), and it was
overdue: Cheese Lovers' four existing components were **a Blank Roommate
Contract, a Citrus Room & Linen Spray, Comfort Snacks and Assorted Snack
Selection** — a roommate contract and room spray in a cheese snack box. Nothing
worth keeping. `snack-attack-legacy` is parked as a DRAFT.

Status changes, all three from her numbered list:

| Product | Change |
|---|---|
| Homesick Helper | pre-order → **coming-soon** ("NO Homesick Helper Pre-Order Now Coming Soon") |
| Room Refresh | coming-soon → **pre-order**, ships 14 Aug ("at 30 Shippable Now Aug 14th") |
| Warm Hug from Home | ships 14 Aug added ("Shipping August 14th") |

The pre-order line no longer reads "all Welcome Boxes" — three products now share
the 14 August date and two of them aren't Welcome boxes.

### Two judgement calls to confirm

- **Component quantities are 1 per box, with counts kept in the component
  name** — "Premium Beef Jerky Sticks (4)", "Cheetos (3 snack-size packs)". Her
  Cheese list is headed *"3 snack size packs each of"*, and this carries that
  into the names rather than setting a bundle quantity of 3. It counts the way a
  packer counts, and matches how Room Refresh was already built. If stock is
  actually tracked as loose units, the quantities need changing.
- **Snack Attack components are all at 0 stock**, so the box stays at 0 and
  coming-soon. She gave no counts, so none were invented.

### Worth flagging

- ~~Warm Hug reads 48, she said "30 pieces"~~ — **resolved.** There are only
  **three** Golden Dog plush, not thirty. `comp-warmie` corrected 30 → 3, so all
  seven Warmies now sit at 3 apiece: **Warm Hug totals 21**, and Homesick Helper,
  which shares the same plush components, **totals 12**.

  Note this leaves the *consumables* over-stocked relative to the plush: soup,
  tea, tissues, crackers, honey bear, throat drops and both coaching cards are
  all at 30, i.e. enough for 30 boxes when only 21 can be built. That is
  harmless — a bundle's availability is its lowest component, so the plush
  correctly governs — but it does mean **"30 pieces" in her email describes the
  consumables, not sellable boxes.**
- **The Chocolate and Protein lists she sent are the ones deleted earlier** as
  AI-invented placeholders. She has now supplied them as the real contents, so
  they are restored verbatim. That earlier deletion was the right call on the
  information available and is simply superseded.

## N. Store-open readiness check (3 Aug 2026)

**The store is already open.** The password gate is off — no `storefront_digest`
cookie is needed to reach instamomuniversity.com, and a real mobile order has
gone through. Everything below is a live-store finding, not a pre-launch one.

### Working, verified on the live site

- Homepage, all 8 boxes, nav (About Us / Packages / Inside), no Gives Back remnant
- All four policies + the allergen disclaimer render and are linked in the footer
- About Us, Inside, Contact all render; the sweepstakes URLs correctly 404
- Cart: required candy preference, required Terms + Refund tick-box, allergen
  notice above Check out
- Shipping rates quote for contiguous states ($8 / $15) and are refused for
  Alaska, Hawaii and Puerto Rico, matching the Shipping Policy
- No drift between the repo and the live theme
- All 4 legacy products are drafts and out of the packages collection

### Homesick Helper can no longer eat Warm Hug's stock

It shares plush components with Warm Hug, so while it was a bundle it held a
claim on the same 21 units. Its components are now detached and its variants are
back to tracked/DENY at 0, so it reads **`available: false`** while still showing
as **Coming Soon** with the notify form. Warm Hug keeps all 21.

⚠ Two caveats. Detaching components silently set the variants to **untracked**,
which Shopify treats as *unlimited* — worse than before — so tracking had to be
turned back on explicitly; check that if this is ever repeated. And
`/cart/add.js` on this store enforces no stock at all (a plain variant with 25
accepted a quantity of 9999), so add-to-cart is not proof of anything;
`available: false` is the meaningful signal and Shopify enforces at checkout.
**Re-attach the components when Homesick Helper launches** — the script is in
the Aug 2026 session scratchpad.

### Open, in rough priority order

1. **8 of the 9 add-ons are sold out.** Only the Personalized Message Card has
   stock. The add-ons pop-up is a main upsell and it is currently almost entirely
   dead — every other row says Sold out.
2. ~~Sales tax is not being collected~~ — **done, collecting in Virginia.**
   Add-ons are now categorised too. Remaining: confirm the tax line on a real
   order, and settle `taxShipping` + the reduced food rate with an accountant.
   See section L.
3. **Seven of eight boxes have no weight.** Only Welcome Week (1179 g). Harmless
   while rates are flat, needed for carrier labels or if rates ever go
   carrier-calculated.
4. **Store contact email is `savageandsilkystudios@gmail.com`** while every
   policy tells customers to write to `instamomuniversity@gmail.com`. Order
   confirmations and replies will go to the wrong inbox.
5. **The 9 add-ons have no product category**, which is what Shopify Tax uses to
   decide taxability. The packages are all set to Bundles; the add-ons are unset.
6. **Five boxes still on placeholder photos** (section H).
7. **`taxShipping` is on** while Virginia generally doesn't tax separately
   stated shipping (section L).

## O. "Ships August 14th" badge + hidden price (Aug 2026)

**The badge now reads "Ships August 14th"** instead of "Pre-Order Now" — owner's
call, and a better one: a date tells a shopper how long they'll wait, where
"pre-order" only tells them that they will.

Driven by the **`ships-aug-14`** tag, not `pre-order`, so a future pre-order
product without a known date still falls back to "Pre-Order Now" rather than
promising a date it has no basis for. Currently on Welcome Week Starter, Warm
Hug from Home and Room Refresh.

⚠ **14 August 2026 is hard-coded in two places** — `instamom-badge.liquid` and
`instamom-shipping-note.liquid`. Once the date passes both read as stale. Remove
the `ships-aug-14` tag from the three products, or replace both with the next
date.

**Homesick Helper's price is hidden**, via a `hide-price` tag guarded inside
`snippets/price.liquid`. Guarding the snippet rather than the five call sites
(four in card-product, one in main-product) means the grid, the preview popup
and the product page can't drift apart, and applying it elsewhere is a tag
rather than a theme edit.

### A bug this surfaced

Homesick Helper was showing **$0.00**, not $62. Detaching its bundle components
zeroed the variant prices — the same behaviour as *attaching* them, which is
already recorded in SKILL.md, but it applies in both directions. Prices restored
to $62 / $62 / $62 / $72.

Worth being blunt about the near-miss: had the box ever become purchasable while
in that state, it would have sold for nothing. **Any time components are attached
OR detached, re-read the prices.**

## G. Launch-readiness items from the original doc

Checked against the live store on 28 Jul 2026 rather than copied forward.

| Item | State |
|---|---|
| **50 Welcome Week boxes in stock** | ✅ **Done.** All 11 components sit at 50, the bundle relationship is intact, and the box reports 50 available. Nothing needed. |
| **Every other box shows 0** | Expected — they're marked coming-soon/pre-order. Flagged only so it's a decision and not a surprise: they can't be bought until their components are stocked the same way. |
| **Weigh a box for real shipping rates** | ⚠️ **Welcome Week done (1179 g), seven boxes to go** — and it turns out weight isn't what's blocking rates. See section J. |
| **Enable taxes for the states you ship to** | ❌ Owner — see section L. Shopify has already flagged Virginia as *Action required*. |
| **Replace the AI product photos** | ⚠️ **Partly done, 3 Aug 2026.** All 8 AI renders are deleted and replaced with the owner's real photography. But per her own file naming, only **three are final** — the other five are `Holder`/`Hold` placeholders (see below). Add-ons deliberately have no photos — the owner removed them from the template, so those cards are type-only by design, not by omission. |
| **Check ordering on a phone end to end** | ❌ Owner. Worth doing by hand: the storefront form submissions hit Shopify's bot check under automation, so I can't complete a real order myself. |

---

*Companion to [README.md](README.md), which records what was built and what was
changed from the source documents.*

## H. Box photography — what's final and what isn't

Uploaded 3 August 2026 from *Website Display Pics (1)*, one per box. The AI
renders they replaced are deleted. **The filename is the key** — `Holder Pic` /
`Hold Pic` means a placeholder, not that box's contents:

| Box | File | Status |
|---|---|---|
| Welcome Week Starter | `Welcome Week Pic` | ✅ **Final** — the box with its actual contents laid out |
| Warm Hug from Home | `Warm Hug From Home 50` | ✅ **Final** — the real contents: sloth Warmie, soup, tea, Emergen-C, Kleenex |
| Room Refresh | `Room Refresh_Ready 50` | ✅ **Final**, but it's a styled shot of the room spray alone, not the box or its seven items |
| Homesick Helper | `Homesick Helper Holder Pic` | ⚠️ Placeholder — the Warmies plush range, which is *relevant* but isn't this box |
| Snack Attack | `Snack Attack Holder Pic` | ⚠️ Placeholder — a box of tissue paper on a chair. No snacks in shot |
| Seasonal Celebrations | `Celebration Holder Pic` | ⚠️ Placeholder — an open box of tissue paper |
| Regroup, Recover, Restart | `Regroup, Recover, Restart Holder Pic` | ⚠️ Placeholder — a box lid and tissue paper, shot from above |
| Finals Reset Box | `Finals Reset Hold Pic` | ⚠️ Placeholder — a closed box with the crest |

**Still wanted: five contents photos**, for the boxes marked ⚠️. They are
branded, real photography and are a clear improvement on the AI renders, so
they're fine to launch behind — but four of the five show packaging rather than
product, and a shopper can't see what they'd receive.

Two smaller things:

- **All eight are 1024×768.** That's fine on the homepage cards (they render at
  ~267px wide) but soft on the product page, where Dawn will serve up to
  ~1450px. Higher-resolution originals would sharpen the product pages, if they
  exist.
- **Room Refresh and Snack Attack are portrait shots padded to 4:3**, so they
  carry cream and pale-blue side bars. They read fine in the card crop; worth
  knowing if the images are ever recut.

⚠️ **A stock discrepancy to settle.** Two filenames end in `50` — `Room
Refresh_Ready 50` and `Warm Hug From Home 50` — and the earlier "50 Live Welcome
Week in Stock" note used the same shorthand for unit counts. But the answers
table said **30** for both boxes, which is what is set on the store. If `50`
means fifty ready, both need raising.

## I. Warmies bundles — FIXED by rebuilding the two products (Aug 2026)

**Every variant of Warm Hug from Home and Homesick Helper is now a real bundle**
that draws down its own plush, and for Warm Hug the eight consumables as well.
Selling a Goat box now decrements the goat plush, the soup, the tea, the
tissues, the crackers, the honey bear, the throat drops and both coaching cards
— which it did not before.

### Why a rebuild was necessary

Shopify: *"After an app assigns components to a bundle, only that app can manage
those components."* The Golden Dog bundles were created by a different app, and
that locks the **whole product** — not just that variant. Confirmed by probing
both directions: adding components was refused with
`PRODUCT_EXPANDER_APP_OWNERSHIP_ALREADY_EXISTS`, and so was **removing** them,
so the ownership could not be released from this side either. There is no scope
or token that gets around it.

The only route to a product this app can own is a product this app created.

### What was done

For each of the two products, in this order so the storefront was never broken:

1. old product renamed to `<handle>-legacy` and set to **DRAFT**;
2. replacement created on the original handle — same title, description, vendor,
   type, tags, option, variants, prices;
3. metafields copied, photo re-uploaded, published to Online Store;
4. per-variant components attached, which now works.

The legacy products are **still there as drafts**, retagged
`legacy-replaced-2026-08` / `do-not-publish` so they drop out of the `packages`
smart collection. Nothing was deleted. **Delete them once you're happy** — they
still hold the old direct inventory, which is why the numbers look duplicated in
the admin.

### Component map

| Variant | Plush component | Plus (Warm Hug only) |
|---|---|---|
| Golden Dog Junior 9" | `comp-warmie` (30) | the 8 consumables |
| Hamster Junior 9" | `comp-warmie-hamster` (3) | ” |
| Sloth Junior 9" | `comp-warmie-sloth` (3) | ” |
| Brown Curly Bear 13" | `comp-warmie-bear` (3) | ” |
| Black & White Cow Junior 9" | `comp-warmie-cow` (3) | ” |
| Bunny Junior 9" | `comp-warmie-bunny` (3) | ” |
| Goat Junior 9" | `comp-warmie-goat` (3) | ” |

The 8 consumables are Coaching Cards — Study Strategies, Coaching Cards —
Communicating with Professors, Crackers, Mini Honey Bear, Soft Facial Tissues,
Soup, Tea, Throat Drops.

### Two things still open

- **Homesick Helper's bundle is still only the plush.** Its contents list a
  mindfulness journal, colouring book, watercolour pencils and notecards, and no
  component products exist for those — so they aren't tracked for any variant.
  That was true before the rebuild too. `comp-cards-homesick` does exist but sits
  at 0, and adding it would take the whole box to 0 available, so it was left
  off deliberately rather than silently killing the listing.
- ~~Room Refresh~~ — **FIXED, same rebuild.** All seven of its contents now have
  components and decrement. Three had never existed and were created
  (`comp-poopourri`, `comp-linen-sachet`, `comp-body-wipes`), and the generic
  `comp-air-spray` placeholder was renamed to the Febreze To Go it actually
  represents. Note `comp-wipes` was NOT reused — that's Clorox Disinfecting
  Travel Wipes and belongs to Welcome Week; Room Refresh's Wet Ones body wipes
  are a different product.

  **Component stock was derived, not counted.** The owner said "Room Refresh 30
  in stock"; a bundle's stock IS its components, so each of the seven was set to
  30 (Sneaker Balls was already 60). If any single item is actually short, correct
  that one item and the box count follows automatically — which is the whole point
  of modelling it this way.


## J. Shipping weights and rates — what the first weight revealed (Aug 2026)

**Welcome Week Starter is set to 1179 g** and it flows correctly: the cart
reports `total_weight: 1179` for the bundle. That settles a question worth
recording — **for a bundle, Shopify uses the PARENT variant's weight, not the sum
of its components.** All 11 Welcome Week components are still 0 lb and it makes
no difference. So weigh and set the *box*, not the contents.

The other seven boxes are still 0. Send weights and they're a one-line change
each.

### But weight is not currently affecting price

Checkout returns **flat rates: Standard $8.00, Express $15.00**, `source:
shopify`, and — tested against Virginia, California, Alaska and Hawaii — the
price is **identical for every destination**. These are manually configured flat
rates, not carrier-calculated ones. Setting weights changes nothing about what a
customer is charged until someone switches the shipping profile to
carrier-calculated rates in **Settings → Shipping and delivery**.

That is a business decision, not a bug: flat-rate shipping is a perfectly normal
choice, and $8 on a $58 box may well be what's wanted. But it means "weigh a box
to get real rates" was solving for a mechanism the store isn't using. Worth
deciding deliberately:

- **Keep flat rates** — then the weights only matter for carrier labels, and
  there's no rush on the other seven.
- **Switch to carrier-calculated** — then all eight boxes need real weights
  first, or customers get quoted off a zero-weight parcel.

### ✅ The shipping zone now matches the Shipping Policy (fixed 3 Aug 2026)

The zone was **United States (62 of 62)** — every state, territory, armed-forces
address and freely-associated state. It is now **49 of 62: the 48 contiguous
states plus the District of Columbia.**

Removed: Alaska, Hawaii, Puerto Rico, Guam, American Samoa, Northern Mariana
Islands, U.S. Virgin Islands, Armed Forces Americas/Europe/Pacific, Marshall
Islands, Micronesia, Palau.

Verified on the **live** storefront with a real cart:

| Destination | Result |
|---|---|
| Virginia, California, New York | ✓ Standard $8.00 / Express $15.00 |
| Alaska, Hawaii, Puerto Rico | ✗ no rates — cannot check out |

Which is exactly what the Shipping Policy promises. Note P.O. boxes are **not**
a shipping-zone setting — Shopify has no switch for them, so that part of the
policy relies on order review rather than enforcement.

<details>
<summary>What this used to say</summary>

**Alaska and Hawaii are quoted rates and can check out.** The Shipping Policy now
live says, because the owner answered "NO" to shipping there:

> *InstaMom currently ships only within the contiguous United States.* … We do
> not currently ship to: Alaska or Hawaii; U.S. territories…; APO, FPO or DPO
> military addresses; P.O. boxes; or any destination outside the United States.

So the store will take an Alaska order that the policy promises won't be
fulfilled. One of the two has to change, and the zone is the cheaper fix:
**Settings → Shipping and delivery → edit the shipping zone** so it covers only
the contiguous states. (Shipping zones aren't reachable from this integration —
they need `write_shipping` and are admin-side.)

This was exactly the failure the policy packet warned about: *"Do not promise a
shipping speed, data practice, or refund right the business cannot consistently
honor."*
</details>

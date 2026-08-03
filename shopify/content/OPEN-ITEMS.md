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

## G. Launch-readiness items from the original doc

Checked against the live store on 28 Jul 2026 rather than copied forward.

| Item | State |
|---|---|
| **50 Welcome Week boxes in stock** | ✅ **Done.** All 11 components sit at 50, the bundle relationship is intact, and the box reports 50 available. Nothing needed. |
| **Every other box shows 0** | Expected — they're marked coming-soon/pre-order. Flagged only so it's a decision and not a surprise: they can't be bought until their components are stocked the same way. |
| **Weigh a box for real shipping rates** | ❌ **Still needed, and it's the blocking one.** Every package variant has a weight of **0 lb**. Carrier-calculated rates cannot work off zero, so a real weight per box has to be entered before checkout quotes anything meaningful. Give me the weights and I'll set them. |
| **Enable taxes for the states you ship to** | ❌ Owner — Settings → Taxes. Not visible to me without extra permissions. |
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

## I. Warmies bundles — blocked on app ownership (Aug 2026)

Every Warm Hug from Home and Homesick Helper variant now has stock and is
buyable. But **only the Golden Dog variant of each is a real bundle.** The other
nine variants across the two products are plain variants: selling one decrements
its own count and *nothing else* — no plush, no soup, tea, tissues, crackers,
honey bear, throat drops or coaching cards.

That is an oversell risk, not a tidiness point. Warm Hug can sell 48 boxes
against 30 sets of consumables.

**What's ready:** a component product now exists for each plush, stocked to
match the variants —

| Component | Qty |
|---|---|
| `comp-warmie` — Golden Dog Junior 9" (renamed from the generic "Lavender Warmie") | 30 |
| `comp-warmie-hamster` | 3 |
| `comp-warmie-sloth` | 3 |
| `comp-warmie-bear` — Brown Curly Bear 13" | 3 |
| `comp-warmie-cow` | 3 |
| `comp-warmie-bunny` | 3 |
| `comp-warmie-goat` | 3 |

**What's blocked:** attaching them. The Admin API refuses with
`PRODUCT_EXPANDER_APP_OWNERSHIP_ALREADY_EXISTS` — "the product(s) ... are
already owned by another App". Shopify lets only the app that created a
product's bundle relationships manage them, and the existing Golden Dog bundles
were built by a different app than this CLI. Both products are affected.

**So this has to be finished in whichever app owns those bundles** (the one used
to build the Golden Dog bundles — check Apps in the admin). For each of the nine
variants, add:

- its own plush component from the table above, quantity 1; **and**
- for Warm Hug only, the eight consumables already on its Golden Dog bundle:
  Coaching Cards — Study Strategies, Coaching Cards — Communicating with
  Professors, Crackers, Mini Honey Bear, Soft Facial Tissues, Soup, Tea, Throat
  Drops.

Homesick Helper's Golden Dog bundle contains *only* the plush, so its other
three variants need only their plush to match. Worth noting separately that this
means Homesick Helper's bundle doesn't track its journal, colouring book,
pencils or notecards for **any** variant — those component products don't exist
yet.

Once attached, each variant's availability becomes the lowest of its components,
which is what stops the oversell.

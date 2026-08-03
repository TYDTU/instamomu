# Page bodies

Shopify **pages** are store data, not theme files — they live in the admin under
Content → Pages, and nothing in `theme-dawn/` contains their text. That's fine
for a page of marketing copy, but these three are legal disclosures: they need a
history, a diff, and a reviewable source. So the body of each one is kept here,
and the store copy is created from it.

| File | Page handle | Live? |
|---|---|---|
| `allergen-disclaimer.html` | `allergen-disclaimer` | **Visible.** Linked from the footer and from the cart notice. |
| `sweepstakes-official-rules.html` | — | **Shelved.** Page deleted Aug 2026 — see below. |
| `sweepstakes-entry-form.html` | — | **Shelved.** Page deleted Aug 2026 — see below. |

Source for all three: the owner's *"Mark Final Things Add"* doc, July 2026, each
reconciled against the client's own PDF of the same document
(`Candy, Food Allergy, and Dietary Restriction Disclaimer.pdf`,
`InstaMom University Virginia Sweepstakes Official Rules.pdf`). Where the Google
Doc and the PDF disagree the **PDF is treated as authoritative**, because the Doc
copy lost formatting and mangled at least one figure in the process.

## These files are the source, not a mirror

Nothing syncs automatically. If you edit a page in the Shopify admin, edit it
here too, or the next person to re-upload from this directory will overwrite the
admin edit. The `<!-- ... -->` comment at the top of each file records where the
wording came from and what was changed from the owner's original — keep it; it
is stripped before upload and never reaches the page body.

## Uploading a body

```bash
D=shopify/.claude/skills/run-shopify-store/driver.sh
# vars.json: {"page": {"id": "gid://shopify/Page/...", "body": "<the HTML>"}}
$D mutate 'mutation P($page: PageUpdateInput!, $id: ID!){ pageUpdate(id:$id, page:$page){ page{ handle isPublished } userErrors{ field message } } }' vars.json
```

`isPublished: false` is what keeps a page hidden — it 404s on the storefront and
is reachable only from the admin. That is deliberate for the two sweepstakes
pages and must stay that way until the section below is done.

## The sweepstakes was pulled before launch

**Owner, Aug 2026: "Take out the sweepstakes entirely... ELIMINATE FOR NOW."**

Both Shopify pages are deleted, the homepage "Gives Back" band and its `Giving
Back` header link are removed, and the advertising-disclosure snippet is gone
from the theme. Nothing on the store references the promotion.

The two source files stay in this directory, each with a shelf note at the top.
"For now" isn't "never", and the drafting and reconciliation were the expensive
part — bringing it back means re-creating two pages from these files. Everything
below still applies if that happens.

## What was never resolved

Both sweepstakes pages carry unfilled facts, marked in the HTML as
`<mark class="instamom-legal__todo">`. Grep for it:

```bash
grep -c instamom-legal__todo shopify/content/sweepstakes-*.html
```

Outstanding, all of them things only the owner can supply:

- the **full legal business name** of the sponsor (the pages have the trading
  name, InstaMom University, and the address, 203 Boston Avenue, Lynchburg, VA
  24503);
- the sweepstakes **start and end date + time**;
- the **drawing date**;
- the mail-in **postmark-by and received-by dates**;
- a **contact email** for winner requests;
- how the $1,000 prize is **paid** (check or electronic transfer).

### The prize amount is contradicted, and it is the biggest open item

The client's Official Rules PDF says **$199** in all seven places it names the
prize, including its own title. The Google Doc's *required advertising
disclosure* — the text meant to run on the website — says **$1,000**.

These pages carry **$1,000**, on instruction, so the rules agree with the
advertised offer. That is a decision, not a finding: **the owner has to confirm
which figure is real before either page goes live.** In official rules the prize
amount is the offer, so this is not a typo to clean up quietly.

Everything else in the rules is the client's own wording, clause by clause. The
other changes are:

- the free-entry method is the **printed mail-in form**
  (`sweepstakes-entry-form.html`) rather than the PDF's online form, so its
  `[FREE ENTRY URL]` placeholder is gone. A web form would have meant collecting
  names, addresses, phone numbers and dates of birth from non-customers;
  print-and-mail avoids that entirely. The rules still accept a plain sheet of
  paper carrying the same details, because requiring a specific form would itself
  be a barrier to free entry;
- `[COMPLETE BUSINESS MAILING ADDRESS]`, `[WEBSITE URL]` and
  `[PRIVACY POLICY URL]` are filled in;
- `[CITY OR COUNTY]` for venue reads **Lynchburg**, which is *inferred* from the
  business address rather than given — confirm it.

The PDF's odds example (1,250 entries → 1 in 1,250) is kept exactly as the client
wrote it. The Google Doc's version of that sentence read "1,100 → 1 in 1,000",
which is arithmetically wrong; it is a corruption of the PDF, not a revision, so
it was not carried across.

Still **not built**, and required by section 4 of the rules before the promotion
can run: the optional cart checkbox reading *"Yes, enter me in the InstaMom
University $1,000 Virginia Sweepstakes"*, and the record-keeping behind it.

`snippets/instamom-sweepstakes-disclosure.liquid` holds the required advertising
disclosure. Nothing renders it yet; that snippet's header comment has the
go-live order.

> **The consolidated list of everything still needed from the owner — policy
> blanks, sweepstakes blanks, and the sweepstakes work that isn't a blank at all
> — is [OPEN-ITEMS.md](OPEN-ITEMS.md).** This file records what was built; that
> one records what's missing.

## Still to do: the 21-page policy suite

`InstaMom Website Policies 2026.pdf` (the "22 page document" from the owner's
launch-readiness list) is **not loaded onto the store yet**. It contains four
policies, each written as website-ready text:

| Policy | Goes where |
|---|---|
| Refund, Return & Cancellation | Settings → Policies → Refund policy |
| Shipping & Delivery | Settings → Policies → Shipping policy |
| ~~Privacy~~ | **Not loaded** — the owner chose to keep Shopify's auto-managed policy. See `policy-privacy.html`. |
| Terms of Use & Terms of Sale | Settings → Policies → Terms of service |

Shopify's five built-in policies render at `/policies/*` and Dawn already lists
whichever ones are filled in the footer, so loading them needs no theme change —
the footer picks them up automatically.

The packet is headed *"Draft for business review before publication"* and its own
Owner Implementation Notes (p.20) say to replace every bracketed field first.
The blanks are business facts nobody has supplied yet:

- `[SUPPORT EMAIL]`, `[PRIVACY EMAIL]`, `[LEGAL NOTICE EMAIL]` — the notes say
  these may all be one monitored inbox at launch;
- `[EFFECTIVE DATE]` — the date the policies actually go live;
- `[LEGAL ENTITY NAME, DBA INSTAMOM UNIVERSITY]` — the same blank the sweepstakes
  rules are waiting on;
- `[SHOP PLATFORM / PAYMENT / EMAIL / ANALYTICS]` — the real tool list, which the
  notes stress must describe what the business actually uses, not a generic list.

`[WEBSITE URL]` → `https://instamomuniversity.com` and `[BUSINESS MAILING
ADDRESS]` → 203 Boston Avenue, Lynchburg, VA 24503 are both known.

The packet also asks for decisions that are not text edits: whether to require
affirmative agreement to the Terms and Refund Policy at checkout, whether
international shipping is offered, and whether subscriptions are offered (if not,
those sections should be deleted rather than left in). Its p.21 note asks for a
Virginia-licensed attorney to review the warranty disclaimer, the $100 liability
cap, the coaching language and the allergen scope before publication.

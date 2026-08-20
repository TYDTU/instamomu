# Page bodies

Shopify **pages** are store data, not theme files — they live in the admin under
Content → Pages, and nothing in `theme-dawn/` contains their text. That's fine
for a page of marketing copy, but the legal disclosures need a history, a diff,
and a reviewable source — and so do the insert-card pages, whose markup carries
theme classes no admin editor should silently rewrite. So the body of each one is
kept here, and the store copy is created from it.

| File | Page handle | Live? |
|---|---|---|
| `allergen-disclaimer.html` | `allergen-disclaimer` | **Visible.** Linked from the footer and from the cart notice. |
| `guide-roommate-agreement.html` | `guide-roommate-agreement` | **Unlisted.** Published, linked from nothing — QR code only. See below. |
| `guide-syllabus-decoder.html` | `guide-syllabus-decoder` | **Unlisted.** Same — QR code only. |
| `guide-syllabus-decoder-video.html` | `guide-syllabus-decoder-video` | **Unlisted.** Video embedded Aug 2026. |
| `guide-college-success-videos.html` | `guide-college-success-videos` | **Unlisted** video library, one video in it. Handle is FROZEN — printed. |
| `sweepstakes-official-rules.html` | — | **Shelved.** Page deleted Aug 2026 — see below. |
| `sweepstakes-entry-form.html` | — | **Shelved.** Page deleted Aug 2026 — see below. |

Source for the three legal pages: the owner's *"Mark Final Things Add"* doc, July 2026, each
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

## Unlisted `guide-*` pages — the printed QR cards

The care packages include a printed card with a QR code on it. Each code points
at a page here that exists **only** for the person holding the box: published, so
the URL resolves, but linked from nothing — not the header, not the footer, not a
collection, not another page. There is no navigation route to one and there
should never be.

| Page | ID | PDF in Files |
|---|---|---|
| `guide-roommate-agreement` | `gid://shopify/Page/128300875876` | `Editable_PDF_Roommate_Agreement.pdf` — 8 pp, 81 KB |
| `guide-syllabus-decoder` | `gid://shopify/Page/128301236324` | `Syllabus_Decoder_PDF.pdf` — 10 pp, 248 KB |
| `guide-syllabus-decoder-video` | `gid://shopify/Page/128307495012` | same PDF; video `DHU6QYAI6yg` |
| `guide-college-success-videos` | `gid://shopify/Page/128311427172` | video library; 1 video (`CeWQzMt3Qd8`), **handle is printed** |

Both PDFs are real AcroForms (52 and 127 text fields respectively), which is why
the pages say "fillable" — check that before writing the same claim about a new
one; a scan with drawn-on lines would make the instructions wrong.

### A printed handle is frozen

`guide-college-success-videos` went to the printers in Aug 2026 as a QR code, so
**its handle cannot change.** Renaming a page in the Shopify admin rewrites the
handle by default, and every card already printed would scan to a 404 — cards
that are inside sealed boxes and cannot be recalled. The title and the handle are
separate fields: retitle freely, but leave the handle alone. The same freeze
applies to any other guide page once its card is printed.

If a handle ever *has* to change, the old one needs a URL redirect
(`urlRedirectCreate`, Online Store → Navigation → URL Redirects) created in the
same breath, or the printed cards die.

### The two video pages

`guide-syllabus-decoder-video` holds exactly one video; `guide-college-success-videos`
is a library and holds several. As of Aug 2026 both have their first video in:

| Page | Video | YouTube ID |
|---|---|---|
| `guide-syllabus-decoder-video` | Syllabus Decoder walkthrough | `DHU6QYAI6yg` |
| `guide-college-success-videos` | Welcome Week | `CeWQzMt3Qd8` |

Both embeds go through `youtube-nocookie.com`, carry a real `title`, and are
`loading="lazy"` — see the `SWAP ME` section below for why each of those matters.

The dashed `.instamom-guide__video-pending` stand-in is gone from both pages. Its
CSS rule is deliberately left in `assets/instamom.css`: nothing uses it today, but
it is the documented furniture for the next guide page that ships ahead of its
video, and removing it would mean pushing the stylesheet to the live theme for no
visible gain.

`guide-college-success-videos` is still a thin page — an intro line, one video,
and a closing note. It shipped with a "Ready right now" section linking to the two
PDF guides; the owner cut it in Aug 2026 as not relevant to that page. That is a
known and accepted state, not an oversight; don't re-add cross-links there without
asking. The intro copy ("There's no order to follow — watch one when the thing
it's about actually comes up") is written for the library it will become, and
reads a little ahead of itself with a single video in place.

**Adding a video to the library page: the `<h3>` must carry
`instamom-guide__video-title`.** This is the one way to get it visibly wrong. A
bare `<h3>` on these pages is styled as the *top half* of a framed card and
expects an `h3 + p` to draw the closing half; put a video after it instead and
the heading renders as an open-bottomed white box with a seam hanging over the
player. The class opts the heading out of that treatment. Both states were
rendered and compared before shipping — the broken one is not hypothetical.

### The `SWAP ME` comments

`guide-college-success-videos` still carries an HTML comment marked **`SWAP ME`**
holding the exact `<h3>` + `<iframe>` pair to paste in — only the video ID and the
title need filling. It is a repeatable block, added once per video, and it stays
in the body for as long as the library keeps growing. `guide-syllabus-decoder-video`
had the single-video version of the same comment; it was deleted when that video
went in, because that page takes only the one.

That comment is deliberately left in the *uploaded* page body, not stripped like
the file-header comments. The swap will most likely happen in the Shopify admin,
and having correct markup sitting right there is what stops someone hand-rolling
a plain `youtube.com` iframe with no `title` and no lazy-load. What's baked into
it: `youtube-nocookie.com` (no tracking cookies until play, which keeps these
pages out of the store's cookie-consent surface), a real `title` attribute
(without it a screen reader announces only "YouTube video player"), and
`loading="lazy"` (each embed is ~1 MB of YouTube's player, and a library page
loads all of them, on dorm wifi).

Adding one: paste the block from the comment in above the closing
`.instamom-guide__note`, fill in the ID and title, and re-upload the body with
`pageUpdate`. Both `.instamom-guide__video` and `.instamom-guide__video-title` are
already styled and pushed, so no theme change is needed.

Where guide pages do cross-link, that is safe — they are all unlisted and
noindexed, so linking one to another exposes none of them.

Three things keep a page unlisted, and all three have to stay together:

1. **The `guide-` handle prefix.** It is not decoration —
   `snippets/meta-tags.liquid` slices the first six characters of the page handle
   and emits `<meta name="robots" content="noindex, nofollow">` on a match. Name a
   new one `guide-something` and it is excluded from search automatically; name it
   anything else and it isn't.
2. **`isPublished: true`.** Unlisted is not the same as hidden. An unpublished
   page 404s, which would make the QR code on a card that is already inside
   sealed boxes dead. These pages must be published.
3. **Nothing links to them.** Shopify's `/sitemap.xml` lists every published page
   regardless, which is what step 1 exists to answer; step 3 is what keeps them
   off the store itself.

The page body is plain rich text plus a handful of hooks styled in
`assets/instamom.css`:

- `.instamom-guide__download` — the white CTA card, holding `.instamom-guide__btn`
  (the pink pill) and `.instamom-guide__meta` (the format/length/weight line, so
  nobody taps blind on cellular data);
- `.instamom-guide__steps` on the per-device `<ul>` and `.instamom-guide__body` on
  the plain paragraphs after it — both bring Dawn's ~1.4rem default up to 1.5rem,
  because these pages are read on a phone at arm's length, not at a desk;
- `.instamom-guide__note` — the closing note. White, not cream: `--imu-cream` on
  the page's `--imu-paper` is a 5-point difference and vanishes;
- `.instamom-guide__video` — a responsive 16:9 well for a YouTube `<iframe>`
  (padding-bottom, not `aspect-ratio`, so the box can't collapse to zero height
  and swallow the video), plus `.instamom-guide__video-pending` for the dashed
  stand-in shown until a video exists;
- `.instamom-guide__video-title` — **required** on any `<h3>` that heads a video.
  See the warning above; without it the heading draws a broken half-card.

A new guide page reuses all of this as-is: the Syllabus Decoder was added with no
CSS change at all. Only genuinely new furniture (the video well, the video
heading) has needed one.

**The download href is a Shopify Files CDN URL carrying a `?v=` stamp.** Re-upload
the file in the admin and the stamp changes; the old URL keeps serving the old
bytes, so the page silently hands out a stale PDF. Replacing a file means updating
the `href` here and re-uploading the body. Check the URL still resolves and still
matches what's in Files before printing another run of cards.

Creating one (rather than updating — `pageCreate`, not `pageUpdate`):

```bash
D=shopify/.claude/skills/run-shopify-store/driver.sh
# vars.json: {"page": {"title": "Roommate Agreement", "handle": "guide-roommate-agreement",
#                      "isPublished": true, "body": "<the HTML>"}}
$D mutate 'mutation P($page: PageCreateInput!){ pageCreate(page:$page){ page{ id handle isPublished } userErrors{ field message } } }' vars.json
```

The page **title** becomes the `<h1>` (`sections/main-page.liquid` renders it), so
the body starts at `<h2>` — don't repeat the title in the body.

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

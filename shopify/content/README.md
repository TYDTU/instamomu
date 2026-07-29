# Page bodies

Shopify **pages** are store data, not theme files — they live in the admin under
Content → Pages, and nothing in `theme-dawn/` contains their text. That's fine
for a page of marketing copy, but these three are legal disclosures: they need a
history, a diff, and a reviewable source. So the body of each one is kept here,
and the store copy is created from it.

| File | Page handle | Live? |
|---|---|---|
| `allergen-disclaimer.html` | `allergen-disclaimer` | **Visible.** Linked from the footer and from the cart notice. |
| `sweepstakes-official-rules.html` | `sweepstakes-official-rules` | **Hidden.** Draft — see below. |
| `sweepstakes-entry-form.html` | `sweepstakes-entry-form` | **Hidden.** Draft — see below. |

Source for all three: the owner's *"Mark Final Things Add"* doc, July 2026.

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

## The sweepstakes is NOT ready to publish

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

Three things were corrected against the owner's draft, because the rules
contradicted the advertising disclosure that runs on the site:

1. every **`$199` is now `$1,000`** — the draft used both figures for the same
   single prize, including in its own title;
2. the **odds example** said 1,100 entries gave odds of "1 in 1,000"; it is
   1 in 1,100;
3. the free-entry method is now the **printed mail-in form**
   (`sweepstakes-entry-form.html`) rather than an online form, so the draft's
   `[FREE ENTRY URL]` placeholder is gone. A web form would have meant
   collecting names, addresses, phone numbers and dates of birth from
   non-customers; print-and-mail avoids that entirely. The rules still accept a
   plain sheet of paper carrying the same details, because requiring a specific
   form would itself be a barrier to free entry.

Still **not built**, and required by section 4 of the rules before the promotion
can run: the optional cart checkbox reading *"Yes, enter me in the InstaMom
University $1,000 Virginia Sweepstakes"*, and the record-keeping behind it.

`snippets/instamom-sweepstakes-disclosure.liquid` holds the required advertising
disclosure. Nothing renders it yet; that snippet's header comment has the
go-live order.

# Getting changes in front of the owner for review

Two audiences. **Part 1** is for the owner reviewing the site; **Part 2** is for
whoever is deploying.

---

## Part 1 — How to look at the store (owner)

Open **<https://instamomuniversity.com>** in any browser, on phone or laptop.

You will land on an **"Opening soon"** page asking for a password. That is normal —
the store is not public yet. Enter:

```
usotsu
```

That gets you into the real storefront. The browser remembers it, so you should only
have to type it once per device. Everything you see from then on is the live site:
the homepage, the packages, the pop-ups, the cart.

**This is not the same as buying anything.** You can click Add to cart and open the
add-ons pop-up safely — nothing charges, and nothing ships, because the store has no
public traffic yet. If you want to clear a test cart, click the cart icon and remove
the item.

Leaving feedback: keep using the review doc. Notes anchored to a specific bullet
("Add shadows behind the three white boxes…") are the easiest to action, because each
one gets a reply saying what changed.

### Why a link sometimes doesn't work for you

If someone sends you a `127.0.0.1` or `localhost` address, **it will never load on
your machine.** That address means "this computer" — it only works on the laptop of
the person who sent it. Ask for either the real store link above, or a *preview link*
(Part 2).

---

## Part 2 — Three ways to show work (deployer)

| Way | Who can see it | Use it for |
| --- | --- | --- |
| `theme dev` → `127.0.0.1:9292` | **Only you**, on your machine | Your own build/test loop |
| Unpublished preview theme | Anyone you send the link to | **Owner review of unfinished work** |
| Push to the live theme | Anyone with the store password | Changes that are agreed and done |

### The default should be an unpublished preview theme

Pushing straight to live means the owner reviews *and the public would get* the same
files. Fine while the store is password-gated, risky the moment it launches. To share
work without touching live:

```bash
shopify theme push --unpublished --theme "Review YYYY-MM-DD" --store instamom-university.myshopify.com
```

The CLI prints a preview URL like
`https://instamom-university.myshopify.com/?preview_theme_id=<id>`. Send that plus the
storefront password. Delete the theme when the review is done.

`shopify theme dev` also prints a shareable preview URL, but it only works while that
command is running on your machine — don't hand it to anyone for later.

### Deploying to the live theme

Live is Dawn **#158107369572**. Always drift-check first: the homepage
`templates/*.json` and any file can be edited in the Shopify theme editor, and a blind
push silently overwrites those edits.

```bash
D=shopify/.claude/skills/run-shopify-store/driver.sh

# 1. Drift check — do this per file you intend to push
$D pull-diff assets/instamom.css        # → "NO DRIFT" or a diff

# 2. Push ONLY the files you changed (never a whole-theme push)
$D push assets/instamom.css snippets/card-product.liquid

# 3. Verify it actually landed
$D pull-diff assets/instamom.css        # → "NO DRIFT"
```

**Order matters.** Push `sections/` and `snippets/` *before* any `templates/*.json`
that references them — Shopify validates templates on upload and silently drops
references to sections it doesn't know yet.

For a bigger batch, pull the whole live theme once and diff the tree instead of
checking file by file:

```bash
T=$(mktemp -d)
shopify theme pull --theme 158107369572 --store instamom-university.myshopify.com --path "$T" --force
diff -rq "$T" shopify/theme-dawn | grep -v '\.shopify'
```

An empty result after pushing is the real proof the deploy landed — more reliable than
loading the page, since a stale CDN copy of an asset can render for a while.

### Keep the kit copy in sync

`shopify/theme/` is a documentation copy of the InstaMom-authored files. When
`assets/instamom.css` (or any file present in both) changes, copy it across so the two
don't drift:

```bash
cp shopify/theme-dawn/assets/instamom.css shopify/theme/assets/instamom.css
```

### Store data is not in the theme

Copy that lives on **products** (descriptions, the `custom.lineup_blurb` and
`custom.whats_inside` metafields), prices, inventory, page bodies and the header
navigation labels are **store data**. They are already live the moment they're written
and a theme push neither carries nor reverts them. See the `run-shopify-store` skill
for the Admin API paths.

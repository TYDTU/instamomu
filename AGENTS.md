# Operating brief — InstaMom University

Read this before touching anything. It is the shared brief for every AI assistant
used on this repo (Claude Code, Codex/ChatGPT, Antigravity). The human-facing
version of the same material is [`README.md`](README.md).

## What the deployable is

There is **no app to build or run locally.** The product is a live Shopify store.
The `shopify` CLI is the harness, wrapped by:

```
shopify/.claude/skills/run-shopify-store/driver.sh
```

Use the driver for everything — deploy a theme file, preview, and read/write store
data via Admin GraphQL. Its path is inside `.claude/` for historical reasons; it is
a plain bash script with no Claude dependency and every assistant should use it.

```bash
D=shopify/.claude/skills/run-shopify-store/driver.sh
$D verify                          # read-only health check
$D pull-diff assets/instamom.css   # drift-check BEFORE any push
$D push assets/instamom.css        # deploy ONLY that file to live
$D execute '<graphql query>'       # read store data
$D mutate '<graphql mutation>' vars.json
```

File arguments are **theme-relative** (`assets/instamom.css`), because the driver
`cd`s itself into `shopify/theme-dawn/`.

## Store facts

| | |
|---|---|
| Public storefront | <https://instamomuniversity.com> (password-gated: `usotsu`) |
| Permanent domain — **`store` commands** | `rd3sqk-f2.myshopify.com` |
| Alias domain — **`theme` commands** | `instamom-university.myshopify.com` |
| Live theme | Dawn `#158107369572` |
| Inventory location | `INSTAMOM U` = `gid://shopify/Location/90382762084` |

Using the wrong domain for the wrong command class is the single most common
first-run error. The driver hard-codes the correct one per command.

## Two kinds of change — never confuse them

| | Theme | Store data |
|---|---|---|
| What | Layout, CSS, Liquid — how pages *look* | Products, prices, inventory, metafields, page bodies, navigation |
| Lives in | `shopify/theme-dawn/` (in git) | Shopify's servers only (**not** in git) |
| Changed by | `$D push <file>` | `$D mutate` / the Shopify admin |
| Reverting | `git revert` + push | No undo — the write is live immediately |

A theme push neither carries nor reverts store data. Product copy edited in the
admin is live the moment it is saved.

## Non-negotiables

1. **`pull-diff` before every push.** The theme editor is used by humans; a blind
   push silently overwrites their edits. `templates/*.json` especially.
2. **Push `sections/` and `snippets/` before any `templates/*.json` that
   references them.** Shopify validates on upload and silently drops references to
   sections it does not know yet.
3. **Set prices AFTER any bundle component change — attach *or* detach — and
   re-read.** `productVariantRelationshipBulkUpdate` silently resets the parent
   variant to **$0.00** and returns no `userError`. Get this wrong and the care
   packages go live free.
4. **Never diagnose purchasability, cart, or shipping through `theme dev`.** The
   local proxy reports every bundle as "already sold out" — a false negative that
   has cost an afternoon and nearly caused a correct fix to be reverted. Use the
   live storefront for anything cart- or checkout-shaped; `theme dev` is for
   rendering and layout only.
5. **A `guide-*` page handle that has been printed on a QR card is frozen.**
   Renaming the page in the admin rewrites the handle by default and every card
   already inside a sealed box scans to a 404. Retitle freely; leave the handle
   alone, or create a `urlRedirectCreate` in the same breath.
6. **Do not work around Shopify's bot challenge.** Storefront customer-form POSTs
   under automation hit "Verifying your connection…" by design. Verify the
   rendered form; a human exercises the round trip in a real browser.
7. **Ask before anything irreversible** — deleting a product or page, changing a
   published price, editing a live policy, or pushing to the live theme when a
   preview theme would do.

## Where the detailed knowledge is

Read the relevant one before acting; they are dense and hard-won.

| File | Covers |
|---|---|
| [`shopify/.claude/skills/run-shopify-store/SKILL.md`](shopify/.claude/skills/run-shopify-store/SKILL.md) | **The main reference.** Driver commands, ~25 documented gotchas, troubleshooting by error message. |
| [`shopify/REVIEWING.md`](shopify/REVIEWING.md) | Getting work in front of the owner; deploy + drift-check workflow. |
| [`shopify/content/README.md`](shopify/content/README.md) | Page bodies, the unlisted `guide-*` QR pages, legal copy provenance. |
| [`shopify/content/OPEN-ITEMS.md`](shopify/content/OPEN-ITEMS.md) | What is still owed by the owner; open decisions. |
| [`shopify/MIGRATION.md`](shopify/MIGRATION.md) | How the store was originally built. Historical, still accurate on structure. |
| [`shopify/theme/THEME.md`](shopify/theme/THEME.md) | The Dawn port — which files are InstaMom-authored. |

**When you learn something the hard way, write it into `SKILL.md` in the same
change.** That file is why this store is maintainable; every gotcha in it cost
someone real time. Keeping it current is part of the job, not overhead.

## Repo conventions

- Branch off `main`, one topic per branch, open a PR. `main` is protected by habit,
  not by rule — do not commit to it directly.
- Keep `shopify/theme/` in sync when you change a file that exists in both it and
  `shopify/theme-dawn/`.
- `index.html` / `script.js` / `styles.css` at the root are the **old GitHub Pages
  prototype**, kept as a fallback. Auto-deploys on push to `main`. Do not develop
  against it; it is not the store.

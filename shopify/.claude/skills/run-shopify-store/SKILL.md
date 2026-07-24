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

## Troubleshooting

- **`OAuth callback store does not match the requested store` / `Shopify returned rd3sqk-f2...`**: you used the alias domain for a `store` command. Re-run with `--store rd3sqk-f2.myshopify.com` (the driver does this).
- **`HTTP 401 Invalid API key or access token`** when curling the Admin API: the token is a `shpss_` client secret, not a `shpat_` Admin token. Abandon the curl/token path; use `shopify store execute`.
- **`shopify store` "command not found"**: the `shopify-ai-toolkit` plugin isn't installed (see Prerequisites), or CLI is too old — `shopify upgrade`.
- **`Could not find a Shopify app configuration file`** from `shopify app execute`: that command needs an app project; it is NOT the tool here. Use `shopify store execute`.
- **`theme dev` errors "Enter your store password"**: pass `--store-password usotsu` (the driver's `preview` does).
- **Admin metafield edits don't save with Cmd/Ctrl-S**: the shortcut doesn't save in the Shopify admin; click the Save button. (Prefer the CLI `mutate` path anyway.)

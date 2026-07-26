#!/usr/bin/env bash
# Driver for the InstaMom University Shopify store + Dawn theme.
# There is no local server to launch — the "app" is the live Shopify store,
# and the `shopify` CLI is the harness. This wraps the exact operations used
# to preview, deploy, and read/write store data. Run subcommands from
# shopify/theme-dawn (the theme root) OR anywhere; the script cd's itself.
#
# Usage:  shopify/.claude/skills/run-shopify-store/driver.sh <command> [args]
set -euo pipefail

# --- store facts (see SKILL.md Gotchas for why there are two domains) --------
ALIAS_DOMAIN="instamom-university.myshopify.com"   # theme commands accept this
PERM_DOMAIN="rd3sqk-f2.myshopify.com"              # store commands REQUIRE this
LIVE_THEME_ID="158107369572"                       # the published "Dawn" theme
STORE_PASSWORD="usotsu"                             # storefront "Opening soon" gate

THEME_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../theme-dawn" && pwd)"

strip() { grep -v -E "Loading|Executing|Cleaning|Uploading|^\[" ; }  # de-noise CLI progress lines

cmd="${1:-help}"; shift || true
cd "$THEME_ROOT"

case "$cmd" in
  auth)   # one-time; opens a browser to authorize. MUST use the permanent domain.
    shopify store auth --store "$PERM_DOMAIN" --scopes "write_products,read_products" ;;

  verify) # proves store auth + execute work (read-only)
    shopify store execute --store "$PERM_DOMAIN" \
      --query 'query { shop { name myshopifyDomain } }' --json </dev/null | strip ;;

  theme-list)
    shopify theme list --store "$ALIAS_DOMAIN" ;;

  preview) # hot-reload local theme at http://127.0.0.1:9292 (needs the storefront password)
    shopify theme dev --store "$ALIAS_DOMAIN" --store-password "$STORE_PASSWORD" ;;

  pull-diff) # drift check: is the LIVE copy of a file the same as local? ($1 = theme-relative path)
    tmp="$(mktemp -d)"
    shopify theme pull --theme "$LIVE_THEME_ID" --store "$ALIAS_DOMAIN" --only "$1" --path "$tmp" --force >/dev/null 2>&1
    if diff -q "$tmp/$1" "$1" >/dev/null 2>&1; then echo "NO DRIFT: live $1 == local"; else echo "DRIFT in $1:"; diff "$tmp/$1" "$1" || true; fi ;;

  push)   # surgical live deploy: push ONLY the named files. e.g. push assets/instamom.css sections/header.liquid
    [ "$#" -ge 1 ] || { echo "usage: push <theme-relative-file> [more files...]"; exit 1; }
    only=(); for f in "$@"; do only+=(--only "$f"); done
    shopify theme push --theme "$LIVE_THEME_ID" --store "$ALIAS_DOMAIN" "${only[@]}" --nodelete --allow-live 2>&1 | strip ;;

  execute) # run a read-only Admin GraphQL op. $1 = query string
    shopify store execute --store "$PERM_DOMAIN" --query "$1" --json </dev/null | strip ;;

  mutate)  # run a mutation. $1 = mutation string, $2 = path to variables JSON file
    shopify store execute --store "$PERM_DOMAIN" --query "$1" --variable-file "$2" --allow-mutations --json </dev/null | strip ;;

  *) cat <<EOF
driver.sh — InstaMom Shopify store/theme

  auth                 one-time store auth (opens browser; permanent domain)
  verify               read-only shop query — confirms store execute works
  theme-list           list themes (marks the live one)
  preview              start hot-reload preview at http://127.0.0.1:9292
  pull-diff <file>     drift check a theme file vs the live copy before pushing
  push <file>...       deploy ONLY the named file(s) to the live theme
  execute <query>      run a read-only Admin GraphQL query
  mutate <query> <varfile>  run a mutation with a JSON variables file
EOF
    ;;
esac

# Order print templates

Shopify's **printed** order documents, from
Settings → Shipping and delivery → **Templates**. Three exist: Pick list,
Packing Slip, and Invoice.

These are **store data, not theme files.** They live on Shopify's servers only.
`driver.sh` cannot deploy them — the Admin API exposes no type for them at all,
the same as the notification templates. The copies here exist so the Liquid is
reviewable in a diff and recoverable if someone hits "Revert to default"; to
change one you paste it into the admin editor by hand.

| File | State |
|---|---|
| `invoice.liquid` | **Customised.** Groups bundle components onto one row. |
| Packing Slip | Stock. Carries no price column, so nothing priced goes inside a gift box. |
| Pick list | Stock. |

## Why `invoice.liquid` is customised

A bundle order's line items carry *allocated* prices — a $58.00 Welcome Week
Starter is stored as eleven line items of $5.27. Shopify's stock Invoice template
loops `order.line_items` with no bundle handling, so it printed all eleven rows
with their $5.27 shares instead of one $58.00 box.

The fix keys off `line_item.groups`, which these templates expose:

- `group.deliverable? == false` → a real bundle. Components collapse into one row
  titled `group.title`, priced at the sum of the group's allocations.
- `group.deliverable? == true` → a separately-shipped add-on grouping, **not** a
  bundle. Those stay on their own rows, as they should.

Prices are summed from the existing allocations rather than recalculated, so
Subtotal, Total and Outstanding Amount are untouched. Verified against Shopify's
sample data in the template preview: a two-component bundle collapsed to one row
at $124.00 → $119.00 with its discount intact, subtotal unchanged at $221.98.

**Known limit:** a collapsed row's quantity uses `group.quantity`, falling back to
the first component's quantity. Every component of every box is currently `1x`,
so this is correct today. Adding a component at `2x` per box would misreport it.

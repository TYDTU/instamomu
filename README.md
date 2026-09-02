# InstaMom University — Store Admin Runbook

Everything you need to run and change the InstaMom University Shopify store, written
for someone who is **not** a developer.

You will not be asked to write code. The way this store is maintained is that you
describe what you want in plain English to an AI assistant, and it makes the change
using the tools set up in this repository. This document explains how to set that up
and how to use it safely.

**If you read only one thing, read [The five rules](#the-five-rules).**

---

## Contents

1. [How this store actually works](#1-how-this-store-actually-works)
2. [The five rules](#the-five-rules)
3. [Set up your computer](#2-set-up-your-computer-one-time)
4. [Set up your AI assistant](#3-set-up-your-ai-assistant) — [Claude](#option-a--claude-code-recommended) · [ChatGPT](#option-b--chatgpt-codex) · [Antigravity](#option-c--google-antigravity)
5. [The runbook — how to do each job](#4-the-runbook)
6. [Showing work to the owner before it goes live](#5-showing-work-before-it-goes-live)
7. [Things that will bite you](#6-things-that-will-bite-you)
8. [When something goes wrong](#7-when-something-goes-wrong)
9. [Where everything is](#8-where-everything-is)

---

## 1. How this store actually works

### The three places things live

**1. The live Shopify store** — <https://instamomuniversity.com>

This is the real thing. It is currently behind a password gate that says "Opening
soon"; the password is `usotsu`. Enter it once per device and you see the real
storefront. Browsing it is safe — nothing charges and nothing ships.

**2. This repository** — the folder on your computer, backed up on GitHub

This holds the *design* of the store (the theme), the *source text* for the legal
and guide pages, and — most valuably — **the written record of everything we
learned building it**. That record is what lets a new assistant pick up where the
last one left off instead of rediscovering the same traps.

**3. The old prototype website**

The files `index.html`, `script.js` and `styles.css` at the top of this repo are the
original demo site, kept as a fallback. It is **not** the store. Ignore it.

### The one distinction that matters: theme vs. store data

Almost every mistake comes from confusing these two.

|  | **Theme** | **Store data** |
|---|---|---|
| **What it is** | How pages *look* — layout, colours, fonts, the shape of a product page | The actual *content* — product names, prices, descriptions, inventory counts, photos, page text, menus |
| **Where it lives** | In this repo, under `shopify/theme-dawn/` | On Shopify's servers **only** |
| **Is it backed up in git?** | Yes | **No** |
| **How it changes** | An assistant edits a file, then deploys it | An assistant sends a command to Shopify, or you edit it in the Shopify admin |
| **Can you undo it?** | Yes — it is in version history | **No.** The change is live the instant it is made |

Two consequences worth internalising:

- **Editing a price or product description is live immediately.** There is no draft,
  no preview, no undo. Say so out loud before you ask for one.
- **Deploying the theme does not touch product text, and editing product text does
  not touch the theme.** They are independent. "I pushed the theme and my price
  change disappeared" cannot happen.

### What "maintained as we built it" means

There is one small script — `driver.sh` — that knows how to talk to this specific
store: which of its two domains to use for which command, which theme is live, how
to check a file before overwriting it. Every AI assistant uses that same script.

And there is one brief — `AGENTS.md` — that every assistant reads before it starts.
It carries the rules and points at the deep notes.

That is the whole portability story. **The script is the hands, the notes are the
memory, and the AI is interchangeable.** Claude, ChatGPT and Antigravity all drive
the same store the same way. You are not locked into any of them.

---

## The five rules

1. **Check before you overwrite.** Anyone can edit the theme in Shopify's visual
   editor. Deploying without checking first silently destroys their work. The
   assistant should always run a "drift check" before deploying. If it doesn't,
   tell it to.

2. **After changing what's inside a box, re-check the price.** Shopify has a bug —
   well, a behaviour — where adding or removing items from a bundle **silently
   resets that box's price to $0.00** and reports success. This has happened. Always
   have the assistant confirm the price afterwards.

3. **Never test "can I buy this?" on the preview server.** The local preview claims
   every box is sold out. It is lying. Test anything involving the cart, checkout,
   or shipping on the real storefront.

4. **Never rename a guide page that has been printed on a QR card.** The cards are
   inside sealed boxes and cannot be recalled. Renaming the page breaks every one of
   them. You can change the *title* freely — it is the *handle* (the bit in the web
   address) that is frozen.

5. **Say when something is irreversible.** Deleting a product, changing a live
   price, editing a published policy. Ask the assistant to confirm what it is about
   to do before it does it. A good assistant will ask you first; a rushed one won't.

---

## 2. Set up your computer (one time)

About 30 minutes. You need a Mac, the store owner's Shopify login, and access to the
`TYDTU/instamomu` GitHub repository.

Everything below happens in **Terminal**. To open it: press `Cmd + Space`, type
`Terminal`, press Enter. You will get a window where you type commands and press
Enter. That is all it is.

> Copy each command exactly, one at a time, and wait for it to finish before the
> next. If something asks for your Mac password, that is normal — the cursor won't
> move as you type, which is also normal.

### Step 1 — Install the basics

Homebrew is the standard installer for Mac developer tools. This installs it:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then the three tools this repo needs — Node (runs the Shopify CLI), Git (version
history), and the GitHub command line:

```bash
brew install node git gh
```

### Step 2 — Install the Shopify command line

```bash
npm install -g @shopify/cli@latest
```

Check it worked:

```bash
shopify version
```

You should see a version number of **4.7.0 or higher**. If you see "command not
found", close Terminal, open it again, and retry.

### Step 3 — Get a copy of this repository

Sign in to GitHub:

```bash
gh auth login
```

Choose **GitHub.com**, then **HTTPS**, then **Login with a web browser**, and follow
the prompts. Then download the repo into your Documents folder:

```bash
gh repo clone TYDTU/instamomu ~/Documents/instamomu
```

From here on, every command in this document assumes you are inside that folder:

```bash
cd ~/Documents/instamomu
```

### Step 4 — Connect to the Shopify store

```bash
shopify/.claude/skills/run-shopify-store/driver.sh auth
```

A browser window opens asking you to authorise access to the store. Approve it. This
is remembered, so you only do it once.

> **If it fails** with `OAuth callback store does not match` — you are signed in to
> the wrong Shopify account. Sign out at <https://accounts.shopify.com> and retry.

### Step 5 — Confirm everything works

```bash
shopify/.claude/skills/run-shopify-store/driver.sh verify
```

Success looks like this:

```json
{
  "shop": {
    "name": "Instamom University",
    "myshopifyDomain": "rd3sqk-f2.myshopify.com"
  }
}
```

A couple of progress lines about "Loading stored store auth" scroll past first. That
is normal. The store **name** is what you are looking for.

If you see that, your computer is set up. If not, jump to
[When something goes wrong](#7-when-something-goes-wrong).

### About that long path

`shopify/.claude/skills/run-shopify-store/driver.sh` is a mouthful. It is the script
that does all the real work. You can give it a short name for the rest of your
Terminal session:

```bash
D=shopify/.claude/skills/run-shopify-store/driver.sh
```

After that, `$D verify` means the same thing. The shortcut is forgotten when you
close Terminal — set it again next time, or just type the long path.

---

## 3. Set up your AI assistant

### Which one should I use?

All three drive the same store through the same script. Pick on cost, preference,
and whether you want to work in a terminal or a window.

| | **Claude Code** | **ChatGPT (Codex)** | **Google Antigravity** |
|---|---|---|---|
| **Made by** | Anthropic | OpenAI | Google |
| **Feels like** | Terminal, or a desktop app | Terminal, or inside ChatGPT | A full editor window |
| **Best for** | Everything this repo was built with | A second opinion; if you already pay for ChatGPT | Seeing files and changes visually |
| **Reads the shared brief?** | Yes — `CLAUDE.md` → `AGENTS.md` | Yes — `AGENTS.md` | Yes — `AGENTS.md` |
| **Cost** | Claude Pro/Max subscription | ChatGPT Plus/Pro subscription | Free preview at time of writing |

**The honest recommendation:** this store was built with Claude Code, and the deep
notes in `SKILL.md` load automatically there. Start with Claude. Set up a second one
if you want a fallback — the point of the shared brief is that you can.

> **Any of them can be told to do the wrong thing confidently.** The assistant is
> fast and knowledgeable, not infallible. The five rules exist because each of them
> was broken at least once. Read what it proposes before you approve it.

### Option A — Claude Code (recommended)

**Install:**

```bash
npm install -g @anthropic-ai/claude-code
```

**Start it** (from inside the repo folder):

```bash
cd ~/Documents/instamomu
claude
```

The first run asks you to sign in with your Claude account through a browser.

**Add the Shopify plugin.** This is what gives Claude the ability to read and write
store data. Run this in Terminal:

```bash
claude plugin install shopify-ai-toolkit@claude-plugins-official
```

(You can also type `/plugin` inside Claude and pick it from the menu.)

**Check it worked.** Ask Claude, in plain English:

```
Run the driver's verify command and tell me what it says.
```

It should come back with the store name, `Instamom University`.

**What Claude reads automatically:** `CLAUDE.md` → `AGENTS.md` (the rules), plus the
`run-shopify-store` skill (the deep notes) whenever you mention deploying, previewing
or store data. You do not need to point it at anything.

---

### Option B — ChatGPT (Codex)

Codex is OpenAI's coding agent. It runs in your terminal and is included with a
ChatGPT Plus or Pro subscription.

**Install:**

```bash
npm install -g @openai/codex
```

**Start it** (from inside the repo folder):

```bash
cd ~/Documents/instamomu
codex
```

Sign in with your ChatGPT account when prompted.

**What Codex reads automatically:** `AGENTS.md` — the shared brief at the top of this
repo. That is the standard file name Codex looks for, which is why the brief is
written there rather than somewhere Claude-specific.

**One thing to set.** Codex sandboxes commands by default and will ask permission
before each one. That is good, but it means it needs to be allowed to run the driver
script. When it asks to run `driver.sh`, approve it. If you want to stop being asked
every time, create the file `~/.codex/config.toml` with:

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

That lets it edit files in this folder without asking each time, while still asking
before anything that reaches outside it.

> Do not use `--yolo` / "bypass approvals" mode on this repo. It removes exactly the
> confirmation step that stops a bad deploy reaching the live store.

**Check it worked.** Ask Codex:

```
Read AGENTS.md, then run the driver's verify command and tell me what it says.
```

---

### Option C — Google Antigravity

Antigravity is Google's agent-based editor. Unlike the other two it is a full
application window rather than a terminal, which some people find easier — you can
see the files and the proposed changes side by side.

**Install:** download it from <https://antigravity.google> and open the app. Sign in
with a Google account.

**Open the repo:** *File → Open Folder →* your `Documents/instamomu` folder.

**What Antigravity reads automatically:** `AGENTS.md`, the same shared brief Codex
uses. Nothing to configure.

**Check it worked.** In the agent panel, ask:

```
Read AGENTS.md, then run the driver's verify command and tell me what it says.
```

**Optional — connect Shopify's own MCP server.** MCP is a way of giving an assistant
direct access to a service. It is not required (the driver script already does
everything), but if you want it: open the `...` menu at the top of the agent panel →
**MCP Servers** → **Manage MCP Servers**, and use the MCP Store to add Shopify. The
raw config lives at `~/.gemini/config/mcp_config.json` if you prefer editing it
directly.

---

### Keeping any of them honest

Whichever you use, these three phrases are worth having ready:

- **"Drift-check that file first."** — before any deploy.
- **"Re-read the price and confirm it, after that component change."** — rule 2.
- **"Show me exactly what you're about to change before you do it."** — always fine
  to ask, always worth asking on anything live.

---

## 4. The runbook

Each job below gives you something to **say** to the assistant, what **should
happen**, and how to **check** it. You do not need to run the commands yourself —
they are shown so you can tell whether the assistant is doing the right thing.

Start every session by opening Terminal and going to the folder:

```bash
cd ~/Documents/instamomu
```

---

### Job 1 — Change a product's wording or description

> **Say:** "Change the description on the Welcome Week Starter box to say X instead
> of Y. Show me the current text first."

**What should happen.** The assistant reads the current description, shows it to you,
you approve, it writes the new one. This is **store data** — it goes live instantly.

**Check it.** Open the product page on <https://instamomuniversity.com> and read it.

**Watch for:** some box copy lives in *metafields* called `custom.lineup_blurb` (the
short line on the homepage) and `custom.whats_inside` (the contents list) rather than
in the main description. If your change doesn't appear where you expected, say so —
the assistant will know which field to look in.

---

### Job 2 — Change a price

> **Say:** "Change the price of the Room Refresh box to $58. Tell me the current
> price first, and confirm the new one after."

**What should happen.** Current price read out, you approve, price set, price
**re-read and confirmed**. That last step is not optional.

**Check it.** The product page, and the collection grid — a $0.00 shows up glaringly
on the grid, which is how a past mistake was caught.

> ⚠️ **If anyone has changed what's inside the box recently, check the price of
> every variant, not just the one you edited.** See rule 2.

---

### Job 3 — Restock a box

This one is counter-intuitive and worth understanding.

**You do not stock the box. You stock the things inside it.** Each box is a *bundle*;
Shopify works out how many boxes it can sell by looking at whichever component has
the fewest left. Set the box's own number and nothing happens.

> **Say:** "We've received 50 more of everything for the Welcome Week Starter. Set
> all its components to 50 at the INSTAMOM U location, then tell me what the box's
> available quantity became."

**What should happen.** The assistant lists the components, reads their current
counts, writes the new ones, then re-checks the box.

> **First time only:** this job needs a permission the initial setup doesn't grant.
> If you see `Access denied`, run the one-time command in
> [Extra permissions](#extra-permissions-for-inventory-work) and try again.

**Check it.** The box's available quantity should rise to match. **It lags by about
15 seconds** — if the assistant says the components updated but the box still reads
the old number, that is expected. Wait and re-check.

---

### Job 4 — Add or replace a product photo

> **Say:** "Replace the photo on the Seasonal Celebrations Birthday variant with
> `~/Desktop/birthday.jpg`. Check the orientation on the live storefront afterwards."

**What should happen.** Uploading an image takes three separate steps behind the
scenes; the assistant handles that. Then it attaches the photo to the right variant.

**Check it — and this is the one that catches people.** Photos taken on an iPhone
carry a hidden "rotate me" instruction. Your Mac obeys it, so the photo looks upright
in Preview. Shopify obeys it *differently*, and serves the picture **sideways**.

The photo looking correct on your Mac proves nothing. **Always look at the live
product page.** If it is sideways, say so — there is a documented fix and the
assistant should not simply rotate it again, which makes it worse.

Also normal: right after upload the image may appear blank or missing for a few
seconds while Shopify processes it.

---

### Job 5 — Take a box off "Coming Soon" (or put one on)

> **Say:** "Take the Coming Soon status off Seasonal Celebrations so the Birthday
> Box can be bought."

**What should happen.** The assistant removes the `coming-soon` tag.

**What you need to know first.** "Coming Soon" is set on the **whole product**, not
per variant. On a box that has several variants — several occasions in one product —
you **cannot** sell one and keep the others as Coming Soon. Removing the tag removes
it from all of them.

The others are still safe to leave: they fall back to a greyed-out "Sold out" button
because they have no stock. But they lose the "Notify me" email signup. That trade
was accepted once before, deliberately, so the Birthday Box could ship. Make it
knowingly, not by accident.

---

### Job 6 — Edit a policy or guide page

The text of these pages is kept as files in `shopify/content/` **and** on the store.
They do not sync. If you edit one in the Shopify admin, the file goes stale and the
next upload overwrites your edit.

> **Say:** "Update the shipping policy — change the processing time to 3 business
> days. Edit the file in `shopify/content/` first, then upload it to the store."

**What should happen.** File edited, committed to git, then uploaded to Shopify. Both
places, one change.

**Check it.** The live page, and that the assistant committed the file change.

---

### Job 7 — Add a video to a guide page

The guide pages are the ones reached by QR codes printed on cards inside the boxes.

> **Say:** "Add the video `<YouTube ID>` titled `<title>` to the College Success
> Videos guide page."

**What should happen.** The page body already contains a ready-made block marked
`SWAP ME` with the correct markup in it. The assistant should copy that block, fill
in the ID and title, and re-upload. No theme change is needed.

**Check it.** Load the guide page. If the heading above the video renders as a white
box with an open bottom edge and a visible seam, the heading is missing a required
CSS class — say so and it is a one-word fix.

> ⚠️ **Do not rename these pages.** See rule 4.

---

### Job 8 — Change how the site looks

This is the theme, and unlike everything above it *is* reversible.

> **Say:** "The three white boxes on the homepage need more space between them. Show
> me a preview before deploying anything."

**What should happen, in order:**

1. The assistant edits the file (usually `assets/instamom.css`).
2. It starts a preview at `http://127.0.0.1:9292` and checks it there.
3. It **drift-checks** the live file — confirming nobody has edited it in Shopify's
   visual editor since.
4. Only then does it deploy, and only the specific files it changed.
5. It drift-checks again to confirm the deploy landed.

**Check it.** Load <https://instamomuniversity.com> and look. If you don't see the
change, do a hard refresh (`Cmd + Shift + R`) — the old file can be cached.

> The `127.0.0.1:9292` preview **only works on the computer running it.** Sending
> that address to the owner will never work. See the next section for how to share.

---

### Job 9 — Find out what's actually in a box

Useful before touching anything.

> **Say:** "List the components of the Homesick Helper box with their current stock
> levels and the box's own price."

Nothing is changed by asking, so this is always safe.

---

## 5. Showing work before it goes live

Three ways to look at a change, and they are not interchangeable.

| Way | Who can see it | Use it for |
|---|---|---|
| `127.0.0.1:9292` preview | **Only the computer running it** | The assistant's own checking |
| **Unpublished preview theme** | Anyone you send the link to | **Owner review of unfinished work** |
| Deploy to live | Anyone with the store password | Changes that are agreed and done |

**The default should be a preview theme.** It puts a real, shareable version of the
site in front of the owner without touching what customers would see.

> **Say:** "Push this to an unpublished preview theme and give me a link I can send."

You get back a link like `https://instamom-university.myshopify.com/?preview_theme_id=…`
Send that **plus the storefront password `usotsu`** — the recipient needs both.

Delete the preview theme once the review is done, so the theme list stays readable.

**For the owner receiving a link:** open it, enter `usotsu` at the "Opening soon"
gate, and you are looking at the real site. Clicking "Add to cart" is safe — nothing
charges and nothing ships. If someone sends you an address starting `127.0.0.1` or
`localhost`, it will never load for you; ask for a proper preview link.

---

## 6. Things that will bite you

The full list — around 25 of them, each one discovered the hard way — is in
[`SKILL.md`](shopify/.claude/skills/run-shopify-store/SKILL.md). Your assistant reads
that file. These are the ones **you** should recognise, because they produce results
that look fine until they aren't.

**A box's price silently becomes $0.00.** Adding or removing anything from a bundle
resets its price to zero and reports success. Every variant, not just the one
touched. If care packages go live free, this is why. → Always confirm the price after
any change to a box's contents.

**A photo is sideways on the store but upright on your Mac.** iPhone photos carry a
hidden rotation flag that Shopify applies and macOS hides. → Only the live storefront
tells you the truth.

**The preview server says every box is sold out.** It is wrong; they are fine on the
real site. This once nearly caused a correct shipping fix to be reverted. → Never
judge cart, checkout, stock or shipping from the preview.

**Someone's visual-editor work vanishes after a deploy.** Deploying overwrites
whatever is on the store, including edits made in Shopify's own editor. → Drift-check
first, every time.

**A QR code on a printed card leads to a 404.** Renaming a guide page rewrites its
web address, and the cards are already inside sealed boxes. → Retitle freely; never
change the handle.

**A change to a collection or tag "didn't work".** Smart collections take about 30
seconds to re-evaluate, and a bundle's stock count lags its components by about 15.
→ Wait and re-check before concluding anything failed.

**Adding 9999 of something to the cart works.** The store does not enforce stock at
the cart — only at checkout. → A successful add-to-cart proves nothing about
inventory.

**Some boxes cannot have their contents edited at all.** Shopify gives ownership of a
bundle's contents to whichever app created them, permanently. Boxes from the original
import are owned by a different app, and the only fix is rebuilding the product from
scratch. This has been necessary three times. → If the assistant says a box needs
rebuilding, it is not being lazy; budget an afternoon.

---

## 7. When something goes wrong

**First, the general answer:** paste the exact error message to your assistant. Most
of these are already documented by error text in `SKILL.md`, and it will recognise
them.

| What you see | What it means | What to do |
|---|---|---|
| `command not found: shopify` | The Shopify CLI isn't installed, or Terminal needs restarting | Close and reopen Terminal. Still failing → redo [Step 2](#step-2--install-the-shopify-command-line) |
| `shopify store` "command not found" | The Shopify plugin isn't installed | Redo the plugin step for your assistant |
| `OAuth callback store does not match` | Wrong Shopify account, or a command used the wrong store address | Sign out at <https://accounts.shopify.com>, re-run `driver.sh auth` |
| `HTTP 401 Invalid API key or access token` | Something is trying to use a manual API token | Tell the assistant to use `shopify store execute` instead. This store has no such token and chasing one wastes hours |
| `Access denied for … field` | The connection lacks permission for that kind of data | See [Extra permissions](#extra-permissions-for-inventory-work) below — `driver.sh auth` alone will **not** fix this |
| `Failed to prompt` on a deploy | A safety flag is missing | The driver handles this — make sure the assistant is using `driver.sh push`, not raw commands |
| "Verifying your connection…" | Shopify's bot protection, triggered by automation | Expected. That form has to be tested by hand in a real browser. Do not try to bypass it |
| A price reads $0.00 | Rule 2 | Set the price again, on every variant, then re-read |
| The site looks unchanged after a deploy | Cached file | Hard refresh: `Cmd + Shift + R` |
| A box shows old stock after a restock | Normal lag | Wait 15 seconds and re-check |

### Extra permissions (for inventory work)

The one-time `driver.sh auth` in Step 4 grants permission to read and write
**products only**. That covers most jobs. But inventory, warehouse locations,
publishing and customer data each need their own permission, so the first time you
try [Job 3 — Restock a box](#job-3--restock-a-box) you will hit
`Access denied for … field`.

That is expected, and it is a one-time fix. Run this once — a browser opens, approve
it — and inventory work will keep working from then on:

```bash
shopify store auth --store rd3sqk-f2.myshopify.com --scopes "write_products,read_products,read_publications,write_publications,read_locations,read_inventory,write_inventory"
```

If a job later needs customer data too, add `read_customers` to that list and run it
again. The rule is that the list must be the **complete** set you want — each run
replaces the last, it does not add to it.

**If a change went wrong and you need it back:**

- **Theme** (how it looks) — recoverable. Ask: *"Revert the last theme change and
  redeploy."* Git has the history.
- **Store data** (prices, text, inventory) — **not** recoverable automatically. Ask
  the assistant what the previous value was; if it made the change in this session it
  will know. If not, Shopify's admin keeps some history per product.

---

## 8. Where everything is

### The documents

| File | What it is | Read it when |
|---|---|---|
| **This file** | The runbook you are reading | Start here |
| [`AGENTS.md`](AGENTS.md) | The brief every AI assistant reads | If an assistant is behaving oddly, check it read this |
| [`SKILL.md`](shopify/.claude/skills/run-shopify-store/SKILL.md) | **The deep reference** — every command, every trap, troubleshooting by error | The assistant reads this. You'd read it to check a claim |
| [`shopify/REVIEWING.md`](shopify/REVIEWING.md) | Sharing work for review; the deploy procedure | Before a review round |
| [`shopify/content/README.md`](shopify/content/README.md) | Page text, the QR guide pages, where legal copy came from | Before touching any page |
| [`shopify/content/OPEN-ITEMS.md`](shopify/content/OPEN-ITEMS.md) | **What is still owed by the owner** — policy blanks, unresolved decisions | Before launch. Genuinely unfinished business lives here |
| [`shopify/MIGRATION.md`](shopify/MIGRATION.md) | How the store was originally built | Background |
| [`shopify/theme/THEME.md`](shopify/theme/THEME.md) | Which theme files are ours vs. stock Shopify | Before a design change |

### The folders

```
instamomu/
├── README.md              ← you are here
├── AGENTS.md              ← the shared brief for AI assistants
├── index.html, script.js  ← the OLD prototype site. Not the store. Ignore.
├── assets/                ← product photography and logos
└── shopify/
    ├── MIGRATION.md       ← how the store was built
    ├── REVIEWING.md       ← how to share work
    ├── content/           ← the source text for policy + guide pages
    ├── theme-dawn/        ← THE LIVE THEME. Design changes happen here.
    ├── theme/             ← a documentation copy of our theme files
    └── .claude/skills/run-shopify-store/
        ├── SKILL.md       ← the deep reference
        └── driver.sh      ← the script that does everything
```

### The numbers worth having

| | |
|---|---|
| Storefront | <https://instamomuniversity.com> — password `usotsu` |
| Shopify admin | <https://admin.shopify.com> |
| Repository | <https://github.com/TYDTU/instamomu> |
| Live theme | Dawn `#158107369572` |
| Warehouse location | `INSTAMOM U` |

---

## Keeping this working

One habit matters more than the rest.

**When something goes wrong and you work out why, have the assistant write it into
`SKILL.md` as part of the same change.** That file is the reason this store is
maintainable by someone who wasn't there when it was built. Every entry in it cost
somebody an afternoon. Adding to it is the job, not paperwork.

Ask for it directly: *"Add what we just learned to the gotchas in SKILL.md."*

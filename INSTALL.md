# Install Guide — Saudi NDS UI Skills

Agent Skills for this repo live under root [`skills/`](skills/). Source of truth for installs is GitHub:

**https://github.com/aboalrejal-ai/saudi-nds-ui**

Catalog page (after push): [skills.sh/aboalrejal-ai/saudi-nds-ui](https://skills.sh/aboalrejal-ai/saudi-nds-ui)

Layout matches [skills.sh / Skills CLI](https://github.com/vercel-labs/skills):

| File | Role |
| --- | --- |
| `skills/saudi-nds-ui/` | Government / formal NDS (`@dga` registry) |
| `skills/saudi-soft/` | Soft studio track (upstream shadcn + Soft theme) — standalone |
| [`skills.sh.json`](skills.sh.json) | Groupings for the skills.sh repo page |
| [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) | Interactive category picker |

## Prerequisites

- Node.js 18+
- A supported coding agent (Cursor, Claude Code, Codex, …)

## Install (recommended)

Target **one agent** with `-a` and pick skills in the interactive picker:

```bash
npx skills add aboalrejal-ai/saudi-nds-ui -a cursor
```

```bash
npx skills add aboalrejal-ai/saudi-nds-ui -a claude-code
```

```bash
npx skills add aboalrejal-ai/saudi-nds-ui -a agents
```

> **Never use `--all`.** In the Skills CLI, `--all` means every skill into *every* agent and scatters stray folders. Always pass `-a <agent>`.

## Install one skill

```bash
# Government NDS
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-nds-ui -a cursor

# Soft (studio / portfolio / SaaS)
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-soft -a cursor
```

## Install both skills (one agent)

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --skill '*' -a cursor -y
```

## List skills in the package

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --list
```

## Install from a local clone

```bash
git clone https://github.com/aboalrejal-ai/saudi-nds-ui.git
cd saudi-nds-ui
npx skills add . -a cursor
```

After you change files under `skills/` and push to GitHub, consumers refresh with:

```bash
npx skills update
```

Or re-add:

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-soft -a cursor
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-nds-ui -a cursor
```

## Which skill?

| Skill | Use when |
| --- | --- |
| `saudi-nds-ui` | Formal government / DGA NDS — install components via `@dga` / `nds.aboalrejal.com` |
| `saudi-soft` | Studio, portfolio, SaaS — Soft theme + upstream `npx shadcn@latest` + lucide (self-contained folder) |

Use **one product track per project**. Do not mix `@dga` installs with Soft in the same app without an explicit choice.

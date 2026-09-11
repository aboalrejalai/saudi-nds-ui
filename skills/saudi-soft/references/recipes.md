# Soft composition recipes

Do **not** paste full component source here. Install primitives with the shadcn CLI, then compose.

## Status badge

Outline badge + soft fill trio (mu-ai StatusBadge pattern):

```tsx
<Badge
  variant="outline"
  className="border-success/30 bg-success/10 text-success"
>
  Active
</Badge>
```

Swap `success` for `warning` / `destructive` / `info` as needed. Prefer semantic CSS vars from the Soft bridge over palette greens/reds.

## Page shell

Typical hub page:

1. Header row — title + short description + primary action (`Button`)
2. Exactly **three** stat cards when showing KPIs (use Card + muted label + bold value; or add a small local `StatWidget` in the app — not required in this skill)
3. Filter row — `Button` pills (`rounded-full`) + `Select` where needed
4. Content grid — `gap-4`, full-width fluid unless a reading column is intentional

## Empty / loading / callout

Use shadcn primitives (see shadcn skill composition rules):

- Empty → `Empty` family
- Loading → `Skeleton`
- Callout → `Alert`
- Toast → `sonner` (Radix) or project toast per `shadcn info` base

## Forms

Follow shadcn `rules/forms.md`: `FieldGroup` + `Field` + `FieldLabel`; validation via `data-invalid` / `aria-invalid`. Soft only changes token colors — not form structure.

## Charts

```bash
npx shadcn@latest add chart
```

Use `--chart-1` … `--chart-5` from Soft theme. Do not invent a second chart palette.

## Overlay chrome

Dialogs / sheets: prefer `bg-foreground/40` + `backdrop-blur-md` for scrims when customizing overlays (mu-ai overlay ≈ 40% + 16px blur). Prefer semantic tokens over `bg-black/80`.

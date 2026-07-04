# Quick Start Guide

,
}


  <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
    DGA Components
  </h1>
  <div className="text-muted-foreground max-w-2xl text-lg">
    <span>UI component library based on the </span>
    <strong>Digital Government Authority (DGA)</strong>
    <span> Platforms Code design system. Production-ready components for </span>
    <strong>React, Next.js, Laravel, Vite, Astro, and TanStack</strong>
    <span> — built on </span>
    <a
      href="https://ui.shadcn.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground font-medium underline underline-offset-4"
    >
      shadcn/ui
    </a>
    <span>
      {" "}
      with DGA design tokens, full RTL support, and IBM Plex Sans Arabic
      typography.
    </span>
  
  <div className="text-muted-foreground max-w-2xl text-sm">
    هيئة الحكومة الرقمية — مكتبة مكونات واجهة المستخدم
  </div>
</div>


  
    Get Started
  
  
    Browse Components
  


---

## Installation

Choose your framework to get started:

---

## Add the DGA Registry

After initialization, add the DGA registry to your `components.json` to enable short-hand `@dga/` imports:

---

## Installing Components

Add any component to your project with a single command:

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/[component].json`

---

## Example

After installing the `Button` component:

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

---

## Components

<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
  
</div>

---

## Supported Frameworks

DGA Components work seamlessly with the most popular frameworks in the ecosystem:

- **Next.js** — Full App Router support with server components
- **React + Vite** — Lightning-fast development with HMR
- **Laravel** — Inertia.js integration with Blade templates
- **Astro** — Static-first with island architecture (coming soon)
- **TanStack Start** — Type-safe full-stack React (coming soon)

---

## Why DGA Components?

- **Based on Platforms Code** — Follows the DGA national design system guidelines
- **RTL First** — Native right-to-left support for Arabic interfaces
- **IBM Plex Sans Arabic** — Typography used in government applications
- **Accessible** — WCAG 2.1 AA compliant components
- **Open Source** — Free to use in any Saudi government or private sector project

---

# DGA Components Documentation (RTL & Saudi NDS)

Saudi Digital Government Authority (DGA) component registry documentation optimized for AI agents.

---

## Component: BADGE

BadgeAsLink,
  BadgeChips,
  BadgeSizes,
  BadgeVariants,
  BadgeWithIcons,
} from "./demos"

# Badge

Displays a badge or a component that looks like a badge.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/badge.json`

## Variants

| Variant       | Description             |
| ------------- | ----------------------- |
| `default`     | Primary badge           |
| `secondary`   | Secondary style         |
| `destructive` | Dangerous / error state |
| `outline`     | Bordered badge          |
| `ghost`       | No background           |
| `link`        | Styled as a link        |

```tsx
// Usage Example
<Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
```

## Chip Variants

DGA-specific chip styles for selection and filtering contexts.

| Variant                 | Description             |
| ----------------------- | ----------------------- |
| `chip-primary`          | Primary chip            |
| `chip-primary-selected` | Primary chip (selected) |
| `chip-neutral`          | Neutral chip            |
| `chip-neutral-selected` | Neutral chip (selected) |

```tsx
// Usage Example
<Badge variant="chip-primary">Primary Chip</Badge>
        <Badge variant="chip-primary-selected">Primary Selected</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="chip-neutral">Neutral Chip</Badge>
        <Badge variant="chip-neutral-selected">Neutral Selected</Badge>
```

## Sizes

| Size      | Description       |
| --------- | ----------------- |
| `default` | Inline text badge |
| `sm`      | 20px height       |
| `md`      | 24px height       |
| `lg`      | 32px height       |

```tsx
// Usage Example
<Badge size="default">Default</Badge>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
```

## With Icons

Badges with leading or trailing icons.

```tsx
// Usage Example
<Badge variant="default">
          <HugeiconsIcon icon={Tick02Icon} width={12} height={12} /> Approved
        </Badge>
        <Badge variant="secondary">
          <HugeiconsIcon icon={InformationCircleIcon} width={12} height={12} />{" "}
          Info
        </Badge>
        <Badge variant="destructive">
          <HugeiconsIcon icon={Alert02Icon} width={12} height={12} /> Error
        </Badge>
        <Badge variant="outline">
          <HugeiconsIcon icon={StarIcon} width={12} height={12} /> Featured
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">
          Next <HugeiconsIcon icon={ArrowRight02Icon} width={12} height={12} />
        </Badge>
        <Badge variant="destructive">
          Remove <HugeiconsIcon icon={Cancel01Icon} width={12} height={12} />
        </Badge>
```

## As Link

Use `asChild` to render the badge as an anchor or any other element.

```tsx
// Usage Example
<Badge asChild variant="default">
          <a href="#">Clickable</a>
        </Badge>
        <Badge asChild variant="secondary">
          <a href="#">Secondary Link</a>
        </Badge>
        <Badge asChild variant="outline">
          <a href="#">Outline Link</a>
        </Badge>
```

## Props

| Prop        | Type      | Default     | Description                    |
| ----------- | --------- | ----------- | ------------------------------ |
| `variant`   | `string`  | `"default"` | Visual style variant           |
| `size`      | `string`  | `"default"` | Badge size                     |
| `asChild`   | `boolean` | `false`     | Merge props onto child element |
| `className` | `string`  | —           | Additional CSS classes         |

---

## Component: BREADCRUMB

BreadcrumbAsChild,
  BreadcrumbCollapsed,
  BreadcrumbCustomSeparator,
  BreadcrumbDefault,
  BreadcrumbLongLabels,
} from "./demos"

# Breadcrumb

Displays the current page location within a navigational hierarchy.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/breadcrumb.json`

## Default

Standard breadcrumb with link items and a current page item.

```tsx
// Usage Example
<Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
```

## Custom Separator

Use a custom separator character instead of the default icon.

```tsx
// Usage Example
<Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Analytics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
```

## Collapsed Path

Display long hierarchies using `BreadcrumbEllipsis`.

```tsx
// Usage Example
<Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Knowledge Base</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
```

## Multi-Line Labels

Breadcrumb labels support wrapping for long text values.

```tsx
// Usage Example
<Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Data Governance Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Compliance Monitoring Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Monthly Summary</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
```

## AsChild Link

Use `asChild` to render breadcrumb links with custom elements.

```tsx
// Usage Example
<Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="#">Home</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="#">Settings</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Preferences</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
```

## Props

| Component             | Prop        | Type                          | Default    | Description                                  |
| --------------------- | ----------- | ----------------------------- | ---------- | -------------------------------------------- |
| `Breadcrumb`          | `...props`  | `React.ComponentProps<"nav">` | —          | Root nav wrapper (`aria-label="breadcrumb"`) |
| `BreadcrumbList`      | `className` | `string`                      | —          | Styles the ordered list layout               |
| `BreadcrumbItem`      | `className` | `string`                      | —          | Styles each list item                        |
| `BreadcrumbLink`      | `asChild`   | `boolean`                     | `false`    | Renders link as child element                |
| `BreadcrumbPage`      | `className` | `string`                      | —          | Current page label                           |
| `BreadcrumbSeparator` | `children`  | `ReactNode`                   | arrow icon | Custom separator content                     |
| `BreadcrumbEllipsis`  | `className` | `string`                      | —          | Collapsed indicator for long paths           |

---

## Component: BUTTON

ButtonCombo,
  ButtonIconOnly,
  ButtonLeadingIcon,
  ButtonLoading,
  ButtonSizes,
  ButtonTrailingIcon,
  ButtonVariants,
} from "./demos"

# Button

Displays a button or a component that looks like a button.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/button.json`

## Variants

Each variant shown in its default and disabled state.

| Variant                 | Description             |
| ----------------------- | ----------------------- |
| `default`               | Primary action button   |
| `secondary`             | Secondary action        |
| `outline`               | Bordered button         |
| `destructive`           | Dangerous actions       |
| `destructive-secondary` | Secondary danger        |
| `ghost`                 | No background           |
| `link`                  | Styled as a link        |
| `black`                 | Dark button             |
| `on-color`              | For colored backgrounds |
| `transparent`           | Fully transparent       |

```tsx
// Usage Example
<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        <Button variant="default">Default</Button>
        <Button variant="default" disabled>
          Default Disabled
        </Button>

        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>

        <Button variant="outline">Outline</Button>
        <Button variant="outline" disabled>
          Outline Disabled
        </Button>

        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive" disabled>
          Destructive Disabled
        </Button>

        <Button variant="destructive-secondary">Danger Secondary</Button>
        <Button variant="destructive-secondary" disabled>
          Danger Sec Disabled
        </Button>

        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost" disabled>
          Ghost Disabled
        </Button>

        <Button variant="link">Link</Button>
        <Button variant="link" disabled>
          Link Disabled
        </Button>

        <Button variant="black">Black</Button>
        <Button variant="black" disabled>
          Black Disabled
        </Button>

        <Button variant="on-color">On-Color</Button>
        <Button variant="on-color" disabled>
          On-Color Disabled
        </Button>

        <Button variant="transparent">Transparent</Button>
        <Button variant="transparent" disabled>
          Transparent Disabled
        </Button>
      </div>
```

## Sizes

Text buttons in xs, sm, default, and lg sizes.

| Size      | Height  |
| --------- | ------- |
| `xs`      | 24px    |
| `sm`      | 32px    |
| `default` | 36px    |
| `lg`      | 40px    |
| `icon-xs` | 24×24px |
| `icon-sm` | 32×32px |
| `icon`    | 36×36px |
| `icon-lg` | 40×40px |

```tsx
// Usage Example
<Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
```

## With Icons

### Leading Icon

Icon placed before the label, across all sizes and variants.

```tsx
// Usage Example
<Button size="xs">
          <HugeiconsIcon icon={Mail01Icon} width={12} height={12} /> Mail
        </Button>
        <Button size="sm">
          <HugeiconsIcon icon={Download04Icon} width={14} height={14} />{" "}
          Download
        </Button>
        <Button>
          <HugeiconsIcon icon={Upload04Icon} width={16} height={16} /> Upload
        </Button>
        <Button size="lg">
          <HugeiconsIcon icon={Search01Icon} width={18} height={18} /> Search
        </Button>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <Button variant="default">
          <HugeiconsIcon icon={PlusSignIcon} width={16} height={16} /> Add New
        </Button>
        <Button variant="secondary">
          <HugeiconsIcon icon={Settings01Icon} width={16} height={16} />{" "}
          Settings
        </Button>
        <Button variant="outline">
          <HugeiconsIcon icon={Share01Icon} width={16} height={16} /> Share
        </Button>
        <Button variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} width={16} height={16} /> Delete
        </Button>
        <Button variant="destructive-secondary">
          <HugeiconsIcon icon={Delete02Icon} width={16} height={16} /> Remove
        </Button>
        <Button variant="black">
          <HugeiconsIcon icon={ArrowRight02Icon} width={16} height={16} />{" "}
          Continue
        </Button>
        <Button variant="ghost">
          <HugeiconsIcon icon={PencilEdit01Icon} width={16} height={16} /> Edit
        </Button>
```

### Trailing Icon

Icon placed after the label — useful for dropdowns, navigation, expand/collapse.

```tsx
// Usage Example
<Button>
          Next <HugeiconsIcon icon={ArrowRight02Icon} width={16} height={16} />
        </Button>
        <Button variant="secondary">
          Options{" "}
          <HugeiconsIcon icon={ArrowDown01Icon} width={16} height={16} />
        </Button>
        <Button variant="outline">
          More <HugeiconsIcon icon={ArrowDown01Icon} width={16} height={16} />
        </Button>
        <Button variant="ghost">
          Expand <HugeiconsIcon icon={ArrowDown01Icon} width={16} height={16} />
        </Button>
```

### Icon Only

Dedicated icon sizes: `icon-xs` (24px), `icon-sm` (32px), `icon` (36px), `icon-lg` (40px).

```tsx
// Usage Example
{/* Size comparison */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-1">
          <Button size="icon-xs" variant="default">
            <HugeiconsIcon icon={PlusSignIcon} width={12} height={12} />
          </Button>
          <span className="text-muted-foreground text-[10px]">icon-xs</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button size="icon-sm" variant="default">
            <HugeiconsIcon icon={PlusSignIcon} width={14} height={14} />
          </Button>
          <span className="text-muted-foreground text-[10px]">icon-sm</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button size="icon" variant="default">
            <HugeiconsIcon icon={PlusSignIcon} width={16} height={16} />
          </Button>
          <span className="text-muted-foreground text-[10px]">icon</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button size="icon-lg" variant="default">
            <HugeiconsIcon icon={PlusSignIcon} width={18} height={18} />
          </Button>
          <span className="text-muted-foreground text-[10px]">icon-lg</span>
        </div>
      </div>

      {/* All variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon" variant="default">
          <HugeiconsIcon icon={PlusSignIcon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="secondary">
          <HugeiconsIcon icon={Settings01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="outline">
          <HugeiconsIcon icon={Search01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="destructive-secondary">
          <HugeiconsIcon icon={Cancel01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="ghost">
          <HugeiconsIcon icon={PencilEdit01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="black">
          <HugeiconsIcon icon={ArrowRight02Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="transparent">
          <HugeiconsIcon icon={FavouriteIcon} width={16} height={16} />
        </Button>
      </div>

      {/* Disabled */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon" variant="default" disabled>
          <HugeiconsIcon icon={PlusSignIcon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="secondary" disabled>
          <HugeiconsIcon icon={Settings01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="outline" disabled>
          <HugeiconsIcon icon={Search01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="destructive" disabled>
          <HugeiconsIcon icon={Delete02Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="ghost" disabled>
          <HugeiconsIcon icon={PencilEdit01Icon} width={16} height={16} />
        </Button>
        <Button size="icon" variant="black" disabled>
          <HugeiconsIcon icon={ArrowRight02Icon} width={16} height={16} />
        </Button>
      </div>
```

## Loading State

Use a spinning icon with `animate-spin` and disable the button.

```tsx
// Usage Example
<Button disabled>
          <HugeiconsIcon
            icon={Loading03Icon}
            width={16}
            height={16}
            className="animate-spin"
          />{" "}
          Please wait
        </Button>
        <Button variant="secondary" disabled>
          <HugeiconsIcon
            icon={Loading03Icon}
            width={16}
            height={16}
            className="animate-spin"
          />{" "}
          Loading
        </Button>
        <Button variant="outline" disabled>
          <HugeiconsIcon
            icon={Loading03Icon}
            width={16}
            height={16}
            className="animate-spin"
          />{" "}
          Processing
        </Button>
        <Button size="icon" disabled>
          <HugeiconsIcon
            icon={Loading03Icon}
            width={16}
            height={16}
            className="animate-spin"
          />
        </Button>
```

## Combined Icons

Both a leading and trailing icon in one button.

```tsx
// Usage Example
<Button>
          <HugeiconsIcon icon={Tick02Icon} width={16} height={16} /> Confirm{" "}
          <HugeiconsIcon icon={ArrowRight02Icon} width={16} height={16} />
        </Button>
        <Button variant="secondary">
          <HugeiconsIcon icon={Mail01Icon} width={16} height={16} /> Send{" "}
          <HugeiconsIcon icon={ArrowRight02Icon} width={16} height={16} />
        </Button>
        <Button variant="outline">
          <HugeiconsIcon icon={Download04Icon} width={16} height={16} /> Export{" "}
          <HugeiconsIcon icon={ArrowDown01Icon} width={16} height={16} />
        </Button>
```

## Props

| Prop        | Type      | Default     | Description                    |
| ----------- | --------- | ----------- | ------------------------------ |
| `variant`   | `string`  | `"default"` | Visual style variant           |
| `size`      | `string`  | `"default"` | Button size                    |
| `asChild`   | `boolean` | `false`     | Merge props onto child element |
| `disabled`  | `boolean` | `false`     | Disabled state                 |
| `className` | `string`  | —           | Additional CSS classes         |

---

## Component: CARD

CardActions,
  CardCompact,
  CardDetail,
  CardImage,
  CardMinimal,
  CardSelectable,
} from "./demos"

# Card

Displays a card with header, content, and footer sections.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/card.json`

## Image Cards

Cards with hero images, text content, and action buttons.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-amber-400">
          <img
            src={IMG_BG}
            alt="Background station"
            className="aspect-video w-full rounded-xl object-cover"
          />
          <CardContent>
            <CardTitle>Background</CardTitle>
            <CardDescription>
              Background stations are not influenced significantly by single
              sources but by an integrated contribution of all sources. (Colored
              Border
```

## Compact Cards

Compact row-style cards with icon, title, and description.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex-row items-center gap-3">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            width={24}
            height={24}
            className="shrink-0 text-[var(--icon-icon-primary
```

## Detail Cards

Detailed cards with nested sub-cards for data display.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <img
            src={IMG_BG}
            alt="Station image"
            className="aspect-video w-full rounded-xl object-cover"
          />
          <CardContent className="gap-4">
            <h2 className="text-2xl font-semibold text-[var(--text-text-display
```

## Selectable Cards

Cards with checkbox selection — supports default, selected, and disabled states.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex-row items-center gap-3">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            width={24}
            height={24}
            className="shrink-0 text-[var(--icon-icon-primary
```

## Cards with Actions

Cards with icon header, content body, and action button footer.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              width={32}
              height={32}
              className="text-[var(--icon-icon-primary
```

## Minimal Cards

Simple text-only cards with title and description.

```tsx
// Usage Example
<div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent>
            <CardTitle>Coordinates</CardTitle>
            <CardDescription>24.7136° N, 46.6753° E</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Altitude</CardTitle>
            <CardDescription>612 m</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Kerb Distance</CardTitle>
            <CardDescription>15 m</CardDescription>
          </CardContent>
        </Card>
      </div>
```

## Sub-components

| Component         | Description                                       |
| ----------------- | ------------------------------------------------- |
| `Card`            | Root wrapper. Accepts `disabled` prop.            |
| `CardHeader`      | Top section for icons or meta.                    |
| `CardTitle`       | Primary heading text.                             |
| `CardDescription` | Supporting description text.                      |
| `CardAction`      | Slot for interactive elements (checkbox, button). |
| `CardContent`     | Main content area.                                |
| `CardFooter`      | Bottom section for actions.                       |

## Props

| Prop        | Type      | Default | Description                           |
| ----------- | --------- | ------- | ------------------------------------- |
| `disabled`  | `boolean` | `false` | Disables interaction and mutes colors |
| `className` | `string`  | —       | Additional CSS classes                |

---

## Component: CAROUSEL

CarouselAutoplay,
  CarouselCustomIcons,
  CarouselDefault,
  CarouselMultiple,
  CarouselVertical,
  CarouselWithApi,
} from "./demos"

# Carousel

A carousel with motion and swipe built using Embla.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/carousel.json`

## Default

Basic carousel with navigation arrows.

<CarouselPreview>
  

```tsx
// Usage Example
<Carousel className="w-full max-w-xs" dir={direction} opts={{ direction }}>
      <CarouselContent>
        {Array.from({ length: 5 }
```

</CarouselPreview>

## Multiple Items

Show multiple slides at once using basis classes.

<CarouselPreview>
  

```tsx
// Usage Example
<Carousel className="w-full max-w-sm" dir={direction} opts={{ direction }}>
      <CarouselContent className="-ms-1">
        {Array.from({ length: 5 }
```

</CarouselPreview>

## Vertical Orientation

Carousel with vertical scrolling.

<CarouselPreview>
  

```tsx
// Usage Example
<Carousel
      opts={{ align: "start", direction }}
      orientation="vertical"
      className="w-full max-w-xs"
      dir={direction}
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }
```

</CarouselPreview>

## Autoplay

Carousel with automatic slide advancement. Pauses on hover.

<CarouselPreview>
  

```tsx
// Usage Example
<Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      dir={direction}
      opts={{ direction }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }
```

</CarouselPreview>

## With API

Access the carousel API to display current slide state.

<CarouselPreview>
  

```tsx
// Usage Example
<div>
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs"
        dir={direction}
        opts={{ direction }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }
```

</CarouselPreview>

## Custom Icons

Use different icons for the navigation buttons.

<CarouselPreview>
  

```tsx
// Usage Example
<Carousel className="w-full max-w-xs" dir={direction} opts={{ direction }}>
      <CarouselContent>
        {Array.from({ length: 5 }
```

</CarouselPreview>

## Props

| Component          | Prop          | Type                         | Default            | Description                     |
| ------------------ | ------------- | ---------------------------- | ------------------ | ------------------------------- |
| `Carousel`         | `opts`        | `EmblaOptionsType`           | —                  | Embla carousel options          |
| `Carousel`         | `plugins`     | `EmblaPluginType[]`          | —                  | Embla plugins (e.g., Autoplay)  |
| `Carousel`         | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"`     | Scroll direction                |
| `Carousel`         | `setApi`      | `(api) => void`              | —                  | Callback to access carousel API |
| `Carousel`         | `dir`         | `"ltr" \| "rtl"`             | —                  | Text direction for the carousel |
| `CarouselItem`     | `className`   | `string`                     | —                  | Basis classes for sizing        |
| `CarouselPrevious` | `variant`     | `string`                     | `"outline"`        | Button variant                  |
| `CarouselPrevious` | `icon`        | `HugeIcon`                   | `ArrowLeft01Icon`  | Custom icon                     |
| `CarouselNext`     | `variant`     | `string`                     | `"outline"`        | Button variant                  |
| `CarouselNext`     | `icon`        | `HugeIcon`                   | `ArrowRight01Icon` | Custom icon                     |

## RTL Support

When localizing the carousel for RTL languages, set the `direction` option in `opts` to match the text direction. This ensures the carousel scrolls in the correct direction.

```tsx
<Carousel dir={dir} opts={{ direction: dir }}>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  
  
</Carousel>
```

---

## Component: CHANGELOG

# Changelog

Track updates to DGA Components — new components, improvements, and fixes.

---

## May 2026

### New Components

- **Navigation Menu** — Full RTL support with keyboard navigation
- **Carousel** — Embla-based with swipe and RTL direction
- **Skeleton** — Loading placeholders with RTL-aware animations
- **Sonner (Toast)** — Notification banners with 5 variants (error, warning, success, info, neutral), RTL auto-flip, customizable icons, and mobile-responsive positioning

### Improvements

- Updated all components to match latest Platforms Code design tokens
- Added IBM Plex Sans Arabic as default font
- Full RTL support across all existing components

### Infrastructure

- Added shadcn registry support (`@dga/` prefix)
- Multi-framework installation: Next.js, Vite, Laravel
- SEO optimization with structured data

---

## April 2026

### Initial Release

- **Badge** — Status indicators with multiple variants
- **Breadcrumb** — Navigation hierarchy
- **Button** — Multiple variants, sizes, loading states
- **Card** — Flexible container component
- **Checkbox** — Toggle control with RTL support
- **Input** — Form input with Arabic placeholder support
- **Radio Group** — Single-select radio buttons
- **Select** — Dropdown with RTL positioning
- **Table** — Responsive data table with selection
- **Tabs** — Tabbed content panels

---

## Roadmap

Components planned based on the [Platforms Code](https://www.figma.com/community/file/1392264328585493958) design system:

- Accordion
- Alert / Alert Dialog
- Avatar
- Charts
- Chips / Tags
- Code Snippet
- Date Picker
- Dialog / Modal
- Divider
- Drawer / Slide-out Menu
- Dropdown Menu
- File Uploader
- Floating Button
- Footer
- Form / Field validation
- Hover Card
- Metric
- Nav Header
- Nav Drawer
- Number Input
- Pagination
- Progress Bar / Indicator
- Quote
- Rating
- Search Box
- Slider
- Stepper (Radial)
- Structured List
- Toast / Notifications
- Tooltip

---

## Component: CHECKBOX

CheckboxBasicStates,
  CheckboxControlled,
  CheckboxForms,
  CheckboxGroups,
  CheckboxInLists,
  CheckboxPollutants,
  CheckboxWithLabels,
} from "./demos"

# Checkbox

A control that allows the user to toggle between checked and not checked.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/checkbox.json`

## Basic States

Default, checked, and disabled states of the checkbox.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox id="unchecked" />
          <label
            htmlFor="unchecked"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Unchecked
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="checked" defaultChecked />
          <label
            htmlFor="checked"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Checked (default
```

## With Labels

Checkboxes with different label configurations.

```tsx
// Usage Example
<div className="flex items-start gap-2">
          <Checkbox id="single-line" className="mt-0.5" />
          <label htmlFor="single-line" className="text-sm">
            Single line label
          </label>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="multi-line" className="mt-0.5" />
          <div className="grid gap-1.5">
            <label htmlFor="multi-line" className="text-sm font-medium">
              Multi-line Label
            </label>
            <p className="text-muted-foreground text-sm">
              This checkbox has a descriptive text that explains what accepting
              this option means for the user.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="with-link" className="mt-0.5" />
          <div className="grid gap-1.5">
            <label htmlFor="with-link" className="text-sm font-medium">
              I accept the terms and conditions
            </label>
            <p className="text-muted-foreground text-sm">
              You agree to our{" "}
              <a href="#" className="text-primary underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
```

## Controlled Checkbox

Checkbox with controlled state.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked
```

## Checkbox Groups

Multiple checkboxes for selecting multiple options.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-6">
        {/* Station Types */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Select Station Types</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="background" />
              <label htmlFor="background" className="text-sm">
                Background Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="suburban" />
              <label htmlFor="suburban" className="text-sm">
                Suburban Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="traffic" />
              <label htmlFor="traffic" className="text-sm">
                Traffic Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="industrial" />
              <label htmlFor="industrial" className="text-sm">
                Industrial Station
              </label>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked
```

## Pollutant Selection

Select multiple pollutants for monitoring (controlled group).

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="pm25"
              checked={pollutants.includes("pm25"
```

## Form Examples

Real-world form scenarios using checkboxes.

```tsx
// Usage Example
<div className="space-y-8">
        {/* User Preferences Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">User Preferences</h3>
          <form className="space-y-4">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Data Display Options
              </legend>
              <div className="flex items-center gap-2">
                <Checkbox id="show-charts" defaultChecked />
                <label htmlFor="show-charts" className="text-sm">
                  Show charts and graphs
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="show-tables" defaultChecked />
                <label htmlFor="show-tables" className="text-sm">
                  Display data tables
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="show-map" />
                <label htmlFor="show-map" className="text-sm">
                  Show station map view
                </label>
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Alert Settings</legend>
              <div className="flex items-center gap-2">
                <Checkbox id="alert-high" defaultChecked />
                <label htmlFor="alert-high" className="text-sm">
                  Alert on high pollution levels
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="alert-moderate" />
                <label htmlFor="alert-moderate" className="text-sm">
                  Alert on moderate pollution levels
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="daily-summary" defaultChecked />
                <label htmlFor="daily-summary" className="text-sm">
                  Send daily summary
                </label>
              </div>
            </fieldset>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </div>

        {/* Station Registration Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Station Registration</h3>
          <form className="space-y-4">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Available Equipment
              </legend>
              <div className="flex items-start gap-2">
                <Checkbox id="equipment-pm" className="mt-0.5" />
                <div className="grid gap-1">
                  <label htmlFor="equipment-pm" className="text-sm">
                    Particulate Matter Analyzer
                  </label>
                  <p className="text-muted-foreground text-xs">
                    PM2.5 and PM10 measurement capability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="equipment-gas" className="mt-0.5" />
                <div className="grid gap-1">
                  <label htmlFor="equipment-gas" className="text-sm">
                    Gas Analyzer
                  </label>
                  <p className="text-muted-foreground text-xs">
                    NO₂, SO₂, O₃, CO measurement capability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="equipment-weather" className="mt-0.5" />
                <div className="grid gap-1">
                  <label htmlFor="equipment-weather" className="text-sm">
                    Weather Station
                  </label>
                  <p className="text-muted-foreground text-xs">
                    Temperature, humidity, wind speed, pressure
                  </p>
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Data Sharing Permissions
              </legend>
              <div className="flex items-center gap-2">
                <Checkbox id="share-public" defaultChecked />
                <label htmlFor="share-public" className="text-sm">
                  Share data publicly
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="share-research" />
                <label htmlFor="share-research" className="text-sm">
                  Allow data use for research
                </label>
              </div>
            </fieldset>

            <div className="flex items-start gap-2 rounded-md border p-4">
              <Checkbox id="station-terms" className="mt-0.5" />
              <div className="grid gap-1">
                <label htmlFor="station-terms" className="text-sm font-medium">
                  I certify that all information is accurate
                </label>
                <p className="text-muted-foreground text-xs">
                  By checking this box, you confirm that the station details and
                  equipment specifications are correct and up to date.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Register Station</Button>
            </div>
          </form>
        </div>
      </div>
```

## Checkbox in Lists

Checkboxes used for item selection in lists.

```tsx
// Usage Example
<Checkbox id="select-all" />
        <label htmlFor="select-all" className="text-sm font-semibold">
          Select All Stations
        </label>
      </div>
      <div className="divide-y">
        <div className="hover:bg-accent/50 flex items-center gap-3 p-4">
          <Checkbox id="station-1" />
          <div className="flex-1">
            <label htmlFor="station-1" className="text-sm font-medium">
              Prince Sultan Humanity City
            </label>
            <p className="text-muted-foreground text-xs">
              Riyadh • Background Station
            </p>
          </div>
        </div>
        <div className="hover:bg-accent/50 flex items-center gap-3 p-4">
          <Checkbox id="station-2" />
          <div className="flex-1">
            <label htmlFor="station-2" className="text-sm font-medium">
              Al Hair
            </label>
            <p className="text-muted-foreground text-xs">
              Riyadh • Suburban Station
            </p>
          </div>
        </div>
        <div className="hover:bg-accent/50 flex items-center gap-3 p-4">
          <Checkbox id="station-3" />
          <div className="flex-1">
            <label htmlFor="station-3" className="text-sm font-medium">
              Diplomatic Quarter
            </label>
            <p className="text-muted-foreground text-xs">
              Riyadh • Traffic Station
            </p>
          </div>
        </div>
        <div className="hover:bg-accent/50 flex items-center gap-3 p-4">
          <Checkbox id="station-4" />
          <div className="flex-1">
            <label htmlFor="station-4" className="text-sm font-medium">
              Jeddah Corniche
            </label>
            <p className="text-muted-foreground text-xs">
              Jeddah • Background Station
            </p>
          </div>
        </div>
```

## Props

| Prop              | Type                         | Default | Description                       |
| ----------------- | ---------------------------- | ------- | --------------------------------- |
| `checked`         | `boolean`                    | —       | Controlled checked state          |
| `defaultChecked`  | `boolean`                    | `false` | Default checked state             |
| `onCheckedChange` | `(checked: boolean) => void` | —       | Called when checked state changes |
| `disabled`        | `boolean`                    | `false` | Disables the checkbox             |
| `aria-invalid`    | `string`                     | —       | Marks checkbox as invalid         |
| `className`       | `string`                     | —       | Additional CSS classes            |

---

## Component: INPUT

InputAdvanced,
  InputBasicStates,
  InputFileUpload,
  InputForms,
  InputSizing,
  InputTypes,
  InputWithIcons,
} from "./demos"

# Input

Displays a form input field or a component that looks like an input field.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/input.json`

## Basic States

Default, disabled, invalid, and read-only states.

```tsx
// Usage Example
<div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Default</label>
          <Input placeholder="Enter text..." />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">With Value</label>
          <Input defaultValue="This input has a value" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Disabled</label>
          <Input placeholder="Disabled input" disabled />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Invalid</label>
          <Input
            placeholder="Invalid input"
            aria-invalid="true"
            defaultValue="invalid@incomplete"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Read Only</label>
          <Input defaultValue="Read-only value" readOnly />
        </div>
```

## Input Types

Different HTML input types supported.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Text</label>
          <Input type="text" placeholder="Enter text" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="email@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" placeholder="Enter password" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Number</label>
          <Input type="number" placeholder="Enter number" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tel</label>
          <Input type="tel" placeholder="+1 (555
```

## Input with Icons

Examples of inputs styled with icons using wrapper divs.

```tsx
// Usage Example
<div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Search with Icon</label>
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2"
            />
            <Input className="ps-9" placeholder="Search..." />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email with Icon</label>
          <div className="relative">
            <HugeiconsIcon
              icon={Mail01Icon}
              className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2"
            />
            <Input
              type="email"
              className="ps-9"
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Password with Icon</label>
          <div className="relative">
            <HugeiconsIcon
              icon={SquareLock02Icon}
              className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2"
            />
            <Input
              type="password"
              className="ps-9"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Username with Icon</label>
          <div className="relative">
            <HugeiconsIcon
              icon={UserIcon}
              className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2"
            />
            <Input className="ps-9" placeholder="Username" />
          </div>
        </div>
```

## Form Examples

Real-world form scenarios using the Input component.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="space-y-8">
        {/* Login Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Login Form</h3>
          <form className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="login-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="login-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>

        {/* Registration Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Registration Form</h3>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="first-name" className="text-sm font-medium">
                  First Name
                </label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last-name" className="text-sm font-medium">
                  Last Name
                </label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="reg-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="reg-email"
                type="email"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="+1 (555
```

## Input Sizing

Inputs with different width constraints.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Full Width (default
```

## File Upload

File input with custom styling.

```tsx
// Usage Example
<div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Single File</label>
          <Input type="file" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Multiple Files</label>
          <Input type="file" multiple />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Accept Images Only</label>
          <Input type="file" accept="image/*" />
        </div>
```

## Advanced Patterns

Complex input patterns and combinations.

```tsx
// Usage Example
<div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Input with Button</label>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Search with Action Button
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <HugeiconsIcon
                icon={Search01Icon}
                className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2"
              />
              <Input className="ps-9" placeholder="Search stations..." />
            </div>
            <Button variant="outline">
              <HugeiconsIcon icon={Search01Icon} className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Input Group</label>
          <div className="flex">
            <span className="bg-muted border-input text-muted-foreground inline-flex items-center rounded-s-md border border-e-0 px-3 text-sm">
              https://
            </span>
            <Input
              className="rounded-s-none"
              placeholder="example.com"
              type="url"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Input with Suffix Text</label>
          <div className="flex">
            <Input
              className="rounded-e-none"
              placeholder="Enter amount"
              type="number"
            />
            <span className="bg-muted border-input text-muted-foreground inline-flex items-center rounded-e-md border border-s-0 px-3 text-sm">
              SAR
            </span>
          </div>
        </div>
```

## Props

| Prop           | Type      | Default  | Description            |
| -------------- | --------- | -------- | ---------------------- |
| `type`         | `string`  | `"text"` | HTML input type        |
| `placeholder`  | `string`  | —        | Placeholder text       |
| `disabled`     | `boolean` | `false`  | Disables the input     |
| `readOnly`     | `boolean` | `false`  | Makes input read-only  |
| `aria-invalid` | `string`  | —        | Marks input as invalid |
| `className`    | `string`  | —        | Additional CSS classes |

---

## Component: NAVIGATION-MENU

# Navigation Menu

A collection of links for navigating websites. Supports full RTL layout with Arabic and Hebrew translations.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/navigation-menu.json`

## Demo

Toggle between English and Arabic to see the RTL layout in action.

```tsx
// Usage Example
<div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {lang === "ar" ? "عرض باللغة العربية" : "Displaying in English"}
        </p>
        <Button size="sm" onClick={toggleLanguage}>
          {lang === "ar" ? "English" : "العربية"}
        </Button>
      </div>
      <div className="border-border h-16 rounded-md border">
        <NavigationMenuRtl dir={dir} lang={lang} />
      </div>
```

## Sub-components

| Component                 | Description                             |
| ------------------------- | --------------------------------------- |
| `NavigationMenu`          | Root wrapper with viewport container.   |
| `NavigationMenuList`      | Top-level list of menu items.           |
| `NavigationMenuItem`      | Individual menu item wrapper.           |
| `NavigationMenuTrigger`   | Button that opens a dropdown panel.     |
| `NavigationMenuContent`   | Dropdown panel content area.            |
| `NavigationMenuLink`      | Styled link element.                    |
| `NavigationMenuIndicator` | Active indicator bar.                   |
| `NavigationMenuViewport`  | Animated viewport for dropdown content. |

## Props

| Prop        | Type             | Default | Description                    |
| ----------- | ---------------- | ------- | ------------------------------ |
| `dir`       | `"ltr" \| "rtl"` | —       | Text direction for RTL support |
| `lang`      | `string`         | —       | Language code for translations |
| `className` | `string`         | —       | Additional CSS classes         |

---

## Component: RADIO-GROUP

RadioGroupBasic,
  RadioGroupCards,
  RadioGroupControlled,
  RadioGroupDescriptions,
  RadioGroupForms,
  RadioGroupGrid,
  RadioGroupHorizontal,
} from "./demos"

# Radio Group

A set of checkable buttons — known as radio buttons — where only one button can be checked at a time.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/radio-group.json`

## Basic Radio Group

Simple radio groups with default, disabled, and individual disabled item states.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Select Station Type</label>
          <RadioGroup defaultValue="background">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="background" id="r1-background" />
              <label htmlFor="r1-background" className="text-sm">
                Background Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="suburban" id="r1-suburban" />
              <label htmlFor="r1-suburban" className="text-sm">
                Suburban Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="traffic" id="r1-traffic" />
              <label htmlFor="r1-traffic" className="text-sm">
                Traffic Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="industrial" id="r1-industrial" />
              <label htmlFor="r1-industrial" className="text-sm">
                Industrial Station
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Disabled Radio Group</label>
          <RadioGroup defaultValue="option1" disabled>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option1" id="disabled-1" />
              <label
                htmlFor="disabled-1"
                className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Option 1 (Selected, Disabled
```

## Radio Group with Descriptions

Radio options with additional descriptive text.

```tsx
// Usage Example
<label className="text-sm font-medium">
          Select Data Aggregation Method
        </label>
        <RadioGroup defaultValue="hourly">
          <div className="flex items-start gap-2">
            <RadioGroupItem value="raw" id="agg-raw" className="mt-0.5" />
            <div className="grid gap-1">
              <label htmlFor="agg-raw" className="text-sm font-medium">
                Raw Data
              </label>
              <p className="text-muted-foreground text-xs">
                Unprocessed measurements as recorded by sensors
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <RadioGroupItem value="hourly" id="agg-hourly" className="mt-0.5" />
            <div className="grid gap-1">
              <label htmlFor="agg-hourly" className="text-sm font-medium">
                Hourly Average
              </label>
              <p className="text-muted-foreground text-xs">
                Average values calculated for each hour
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <RadioGroupItem value="daily" id="agg-daily" className="mt-0.5" />
            <div className="grid gap-1">
              <label htmlFor="agg-daily" className="text-sm font-medium">
                Daily Average
              </label>
              <p className="text-muted-foreground text-xs">
                Average values calculated for each day
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <RadioGroupItem value="weekly" id="agg-weekly" className="mt-0.5" />
            <div className="grid gap-1">
              <label htmlFor="agg-weekly" className="text-sm font-medium">
                Weekly Average
              </label>
              <p className="text-muted-foreground text-xs">
                Average values calculated for each week
              </p>
            </div>
          </div>
        </RadioGroup>
```

## Controlled Radio Group

Radio group with controlled state and value display.

```tsx
// Usage Example
<div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Select Station Type</label>
          <RadioGroup value={stationType} onValueChange={setStationType}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="background" id="controlled-background" />
              <label htmlFor="controlled-background" className="text-sm">
                Background Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="suburban" id="controlled-suburban" />
              <label htmlFor="controlled-suburban" className="text-sm">
                Suburban Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="traffic" id="controlled-traffic" />
              <label htmlFor="controlled-traffic" className="text-sm">
                Traffic Station
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="industrial" id="controlled-industrial" />
              <label htmlFor="controlled-industrial" className="text-sm">
                Industrial Station
              </label>
            </div>
          </RadioGroup>
          {stationType && (
            <div className="bg-card rounded-md border p-4">
              <p className="text-sm">
                Selected Type: <strong>{stationType}</strong>
              </p>
```

## Horizontal Layout

Radio groups displayed in a horizontal row.

```tsx
// Usage Example
<div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Select Time Range</label>
          <RadioGroup
            defaultValue="24h"
            className="flex flex-row flex-wrap gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="1h" id="time-1h" />
              <label htmlFor="time-1h" className="text-sm">
                1 Hour
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="24h" id="time-24h" />
              <label htmlFor="time-24h" className="text-sm">
                24 Hours
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="7d" id="time-7d" />
              <label htmlFor="time-7d" className="text-sm">
                7 Days
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="30d" id="time-30d" />
              <label htmlFor="time-30d" className="text-sm">
                30 Days
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Status Filter</label>
          <RadioGroup defaultValue="all" className="flex flex-row gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="all" id="filter-all" />
              <label htmlFor="filter-all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="active" id="filter-active" />
              <label htmlFor="filter-active" className="text-sm">
                Active
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="inactive" id="filter-inactive" />
              <label htmlFor="filter-inactive" className="text-sm">
                Inactive
              </label>
            </div>
          </RadioGroup>
        </div>
```

## Card Style Radio Group

Radio options styled as cards for better visual hierarchy.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Select Data Export Format</label>
        <RadioGroup defaultValue="csv">
          <label
            htmlFor="format-csv"
            className="hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-accent flex cursor-pointer items-start gap-3 rounded-md border p-4"
          >
            <RadioGroupItem value="csv" id="format-csv" className="mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium">CSV (Comma Separated
```

## Form Examples

Real-world form scenarios using radio groups.

```tsx
// Usage Example
<div className="space-y-8">
        {/* Data Query Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Data Query Form</h3>
          <form className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Select Region</label>
              <RadioGroup
                value={region}
                onValueChange={setRegion}
                className="grid gap-3 sm:grid-cols-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="riyadh" id="region-riyadh" />
                  <label htmlFor="region-riyadh" className="text-sm">
                    Riyadh Region
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="jeddah" id="region-jeddah" />
                  <label htmlFor="region-jeddah" className="text-sm">
                    Jeddah Region
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="dammam" id="region-dammam" />
                  <label htmlFor="region-dammam" className="text-sm">
                    Dammam Region
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="makkah" id="region-makkah" />
                  <label htmlFor="region-makkah" className="text-sm">
                    Makkah Region
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Time Period</label>
              <RadioGroup value={timeRange} onValueChange={setTimeRange}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="1h" id="form-time-1h" />
                  <label htmlFor="form-time-1h" className="text-sm">
                    Last Hour
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="24h" id="form-time-24h" />
                  <label htmlFor="form-time-24h" className="text-sm">
                    Last 24 Hours
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="7d" id="form-time-7d" />
                  <label htmlFor="form-time-7d" className="text-sm">
                    Last 7 Days
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="30d" id="form-time-30d" />
                  <label htmlFor="form-time-30d" className="text-sm">
                    Last 30 Days
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="custom" id="form-time-custom" />
                  <label htmlFor="form-time-custom" className="text-sm">
                    Custom Range
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Data Quality</label>
              <RadioGroup defaultValue="validated">
                <div className="flex items-start gap-2">
                  <RadioGroupItem
                    value="all"
                    id="quality-all"
                    className="mt-0.5"
                  />
                  <div className="grid gap-1">
                    <label htmlFor="quality-all" className="text-sm">
                      All Data
                    </label>
                    <p className="text-muted-foreground text-xs">
                      Include all measurements regardless of quality flags
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem
                    value="validated"
                    id="quality-validated"
                    className="mt-0.5"
                  />
                  <div className="grid gap-1">
                    <label htmlFor="quality-validated" className="text-sm">
                      Validated Only
                    </label>
                    <p className="text-muted-foreground text-xs">
                      Only include quality-checked and validated measurements
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline">
                Reset
              </Button>
              <Button type="submit">Query Data</Button>
            </div>
          </form>
        </div>

        {/* Settings Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Alert Settings</h3>
          <form className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Alert Frequency</label>
              <RadioGroup defaultValue="immediate">
                <div className="flex items-start gap-2">
                  <RadioGroupItem
                    value="immediate"
                    id="freq-immediate"
                    className="mt-0.5"
                  />
                  <div className="grid gap-1">
                    <label htmlFor="freq-immediate" className="text-sm">
                      Immediate
                    </label>
                    <p className="text-muted-foreground text-xs">
                      Receive alerts as soon as thresholds are exceeded
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem
                    value="hourly"
                    id="freq-hourly"
                    className="mt-0.5"
                  />
                  <div className="grid gap-1">
                    <label htmlFor="freq-hourly" className="text-sm">
                      Hourly Digest
                    </label>
                    <p className="text-muted-foreground text-xs">
                      Receive a summary of alerts once per hour
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem
                    value="daily"
                    id="freq-daily"
                    className="mt-0.5"
                  />
                  <div className="grid gap-1">
                    <label htmlFor="freq-daily" className="text-sm">
                      Daily Summary
                    </label>
                    <p className="text-muted-foreground text-xs">
                      Receive a daily summary of all alerts
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Severity Threshold</label>
              <RadioGroup defaultValue="moderate">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="low" id="severity-low" />
                  <label htmlFor="severity-low" className="text-sm">
                    Low and above
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="moderate" id="severity-moderate" />
                  <label htmlFor="severity-moderate" className="text-sm">
                    Moderate and above
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="high" id="severity-high" />
                  <label htmlFor="severity-high" className="text-sm">
                    High only
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="critical" id="severity-critical" />
                  <label htmlFor="severity-critical" className="text-sm">
                    Critical only
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Settings</Button>
            </div>
          </form>
        </div>
      </div>
```

## Grid Layout

Radio groups displayed in a grid for better space utilization.

```tsx
// Usage Example
<label className="text-sm font-medium">Select Station</label>
        <RadioGroup
          defaultValue="pshc"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="pshc" id="station-pshc" />
            <label htmlFor="station-pshc" className="text-sm">
              Prince Sultan Humanity City
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="al-hair" id="station-al-hair" />
            <label htmlFor="station-al-hair" className="text-sm">
              Al Hair
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="diplomatic" id="station-diplomatic" />
            <label htmlFor="station-diplomatic" className="text-sm">
              Diplomatic Quarter
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="corniche" id="station-corniche" />
            <label htmlFor="station-corniche" className="text-sm">
              Jeddah Corniche
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="north-jeddah" id="station-north-jeddah" />
            <label htmlFor="station-north-jeddah" className="text-sm">
              North Jeddah
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="dammam" id="station-dammam" />
            <label htmlFor="station-dammam" className="text-sm">
              Dammam Center
            </label>
          </div>
        </RadioGroup>
```

## Props

### RadioGroup

| Prop            | Type                      | Default | Description                 |
| --------------- | ------------------------- | ------- | --------------------------- |
| `defaultValue`  | `string`                  | —       | The default selected value  |
| `value`         | `string`                  | —       | Controlled selected value   |
| `onValueChange` | `(value: string) => void` | —       | Callback when value changes |
| `disabled`      | `boolean`                 | `false` | Disables the entire group   |
| `className`     | `string`                  | —       | Additional CSS classes      |

### RadioGroupItem

| Prop        | Type      | Default | Description                   |
| ----------- | --------- | ------- | ----------------------------- |
| `value`     | `string`  | —       | The value of the radio item   |
| `disabled`  | `boolean` | `false` | Disables this specific item   |
| `id`        | `string`  | —       | HTML id for label association |
| `className` | `string`  | —       | Additional CSS classes        |

---

## Component: SELECT

SelectBasic,
  SelectControlled,
  SelectForms,
  SelectGrouped,
  SelectSizes,
  SelectWidths,
  SelectWithIcons,
} from "./demos"

# Select

Displays a list of options for the user to pick from — triggered by a button.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/select.json`

## Basic Select

Simple select examples with different options and disabled state.

```tsx
// Usage Example
<div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Station Type</label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a station type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="background">Background</SelectItem>
              <SelectItem value="suburban">Suburban</SelectItem>
              <SelectItem value="traffic">Traffic</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Region</label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="riyadh">Riyadh</SelectItem>
              <SelectItem value="jeddah">Jeddah</SelectItem>
              <SelectItem value="dammam">Dammam</SelectItem>
              <SelectItem value="makkah">Makkah</SelectItem>
              <SelectItem value="madinah">Madinah</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Disabled Select</label>
          <Select disabled>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
```

## Select Sizes

Different size variants of the select component.

```tsx
// Usage Example
<div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Default Size</label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Default size select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Small Size</label>
          <Select>
            <SelectTrigger size="sm" className="w-[280px]">
              <SelectValue placeholder="Small size select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
```

## Grouped Select

Select with grouped options, labels, and separators.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Select Station by Region
          </label>
          <Select>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select a station" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Riyadh Region</SelectLabel>
                <SelectItem value="riyadh-pshc">
                  Prince Sultan Humanity City
                </SelectItem>
                <SelectItem value="riyadh-al-hair">Al Hair</SelectItem>
                <SelectItem value="riyadh-diplomatic">
                  Diplomatic Quarter
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Jeddah Region</SelectLabel>
                <SelectItem value="jeddah-corniche">Corniche</SelectItem>
                <SelectItem value="jeddah-north">North Jeddah</SelectItem>
                <SelectItem value="jeddah-south">South Jeddah</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Eastern Province</SelectLabel>
                <SelectItem value="dammam-center">Dammam Center</SelectItem>
                <SelectItem value="dhahran">Dhahran</SelectItem>
                <SelectItem value="khobar">Al Khobar</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Select Pollutant by Category
          </label>
          <Select>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select a pollutant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Particulate Matter</SelectLabel>
                <SelectItem value="pm25">PM2.5</SelectItem>
                <SelectItem value="pm10">PM10</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Gases</SelectLabel>
                <SelectItem value="no2">NO₂ (Nitrogen Dioxide
```

## Select with Icons

Select items with icon prefixes.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Station Type</label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="background">
                <HugeiconsIcon icon={MapPinIcon} className="size-4" />
                Background
              </SelectItem>
              <SelectItem value="traffic">
                <HugeiconsIcon icon={ActivityIcon} className="size-4" />
                Traffic
              </SelectItem>
              <SelectItem value="industrial">
                <HugeiconsIcon icon={Building02Icon} className="size-4" />
                Industrial
              </SelectItem>
              <SelectItem value="suburban">
                <HugeiconsIcon icon={UserMultipleIcon} className="size-4" />
                Suburban
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Language</label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">
                <HugeiconsIcon icon={GlobeIcon} className="size-4" />
                English
              </SelectItem>
              <SelectItem value="ar">
                <HugeiconsIcon icon={GlobeIcon} className="size-4" />
                العربية (Arabic
```

## Controlled Select

Select with controlled state and value display.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Station</label>
          <Select value={selectedStation} onValueChange={setSelectedStation}>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select a station" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pshc">Prince Sultan Humanity City</SelectItem>
              <SelectItem value="al-hair">Al Hair</SelectItem>
              <SelectItem value="diplomatic">Diplomatic Quarter</SelectItem>
              <SelectItem value="corniche">Jeddah Corniche</SelectItem>
            </SelectContent>
          </Select>
          {selectedStation && (
            <p className="text-muted-foreground text-sm">
              Selected: <strong>{selectedStation}</strong>
            </p>
```

## Form Examples

Real-world form scenarios using the Select component.

```tsx
// Usage Example
<div className="space-y-8">
        {/* Station Configuration Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Station Configuration</h3>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="station-type" className="text-sm font-medium">
                  Station Type
                </label>
                <Select>
                  <SelectTrigger id="station-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="background">Background</SelectItem>
                    <SelectItem value="suburban">Suburban</SelectItem>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="region" className="text-sm font-medium">
                  Region
                </label>
                <Select>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">Riyadh</SelectItem>
                    <SelectItem value="jeddah">Jeddah</SelectItem>
                    <SelectItem value="dammam">Dammam</SelectItem>
                    <SelectItem value="makkah">Makkah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Configuration</Button>
            </div>
          </form>
        </div>

        {/* Data Query Form */}
        <div className="border-border bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Data Query</h3>
          <form className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="query-station" className="text-sm font-medium">
                Station
              </label>
              <Select>
                <SelectTrigger id="query-station">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Riyadh Region</SelectLabel>
                    <SelectItem value="pshc">
                      Prince Sultan Humanity City
                    </SelectItem>
                    <SelectItem value="al-hair">Al Hair</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Jeddah Region</SelectLabel>
                    <SelectItem value="corniche">Corniche</SelectItem>
                    <SelectItem value="north-jeddah">North Jeddah</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="time-range" className="text-sm font-medium">
                  Time Range
                </label>
                <Select>
                  <SelectTrigger id="time-range">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pollutant" className="text-sm font-medium">
                  Pollutant
                </label>
                <Select>
                  <SelectTrigger id="pollutant">
                    <SelectValue placeholder="Select pollutant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pm25">PM2.5</SelectItem>
                    <SelectItem value="pm10">PM10</SelectItem>
                    <SelectItem value="no2">NO₂</SelectItem>
                    <SelectItem value="so2">SO₂</SelectItem>
                    <SelectItem value="o3">O₃</SelectItem>
                    <SelectItem value="co">CO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="aggregation" className="text-sm font-medium">
                Aggregation
              </label>
              <Select>
                <SelectTrigger id="aggregation">
                  <SelectValue placeholder="Select aggregation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw">Raw Data</SelectItem>
                  <SelectItem value="hourly">Hourly Average</SelectItem>
                  <SelectItem value="daily">Daily Average</SelectItem>
                  <SelectItem value="weekly">Weekly Average</SelectItem>
                  <SelectItem value="monthly">Monthly Average</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Query Data
            </Button>
          </form>
        </div>
      </div>
```

## Width Variations

Select with different width configurations.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Small Width (200px
```

## Props

### Select

| Prop            | Type                      | Default | Description                 |
| --------------- | ------------------------- | ------- | --------------------------- |
| `defaultValue`  | `string`                  | —       | The default selected value  |
| `value`         | `string`                  | —       | Controlled selected value   |
| `onValueChange` | `(value: string) => void` | —       | Callback when value changes |
| `disabled`      | `boolean`                 | `false` | Disables the select         |

### SelectTrigger

| Prop        | Type                | Default     | Description            |
| ----------- | ------------------- | ----------- | ---------------------- |
| `size`      | `"default" \| "sm"` | `"default"` | Size variant           |
| `className` | `string`            | —           | Additional CSS classes |

### SelectItem

| Prop       | Type        | Default | Description                |
| ---------- | ----------- | ------- | -------------------------- |
| `value`    | `string`    | —       | The value of the item      |
| `disabled` | `boolean`   | `false` | Disables this item         |
| `children` | `ReactNode` | —       | Item content (text, icons) |

---

## Component: SKELETON

SkeletonBasic,
  SkeletonCard,
  SkeletonForm,
  SkeletonProfile,
  SkeletonTable,
} from "./demos"

# Skeleton

A placeholder preview of content before data loads. Uses a shimmer animation effect.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/skeleton.json`

## Basic Usage

Simple skeleton lines for text content.

```tsx
// Usage Example
<Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
```

## Card Skeleton

Skeleton layout for cards with image and text.

```tsx
// Usage Example
<Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
```

## Profile Skeleton

Avatar with name and details skeleton.

```tsx
// Usage Example
<Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
```

## Table Skeleton

Loading placeholder for tabular data.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
        {/* Rows */}
        {[...Array(3
```

## Form Skeleton

Loading placeholder for form inputs.

```tsx
// Usage Example
<div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>
```

## Props

| Prop        | Type     | Default | Description                                     |
| ----------- | -------- | ------- | ----------------------------------------------- |
| `className` | `string` | —       | Additional CSS classes for custom sizing/shapes |

## Styling

The skeleton uses a shimmer animation with a gradient background. Customize dimensions using utility classes:

```tsx
<Skeleton className="h-4 w-[200px]" />        // Line
<Skeleton className="h-12 w-12 rounded-full" /> // Circle
<Skeleton className="h-[125px] rounded-xl" />  // Card image
```

---

## Component: SONNER

SonnerCustomIcon,
  SonnerPositions,
  SonnerShowToast,
  SonnerVariants,
  SonnerWithoutTitle,
} from "./demos"

# Sonner

Toast notification banners with five semantic variants, automatic RTL positioning, customizable icons, and mobile-responsive layout.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/sonner.json`

## Usage

Add the `` component to your root layout, then call the toast helpers anywhere in your app.

```tsx
// app/layout.tsx

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        
      </body>
    </html>
  )
}
```

```tsx
// Trigger a toast from any component

toastSuccess("Changes saved successfully.", "Success")
```

## Variants

Five semantic variants styled from DGA Figma design tokens.

| Variant   | Background | Text Color | Use Case                 |
| --------- | ---------- | ---------- | ------------------------ |
| `error`   | `#fef3f2`  | `#b42318`  | Errors & failures        |
| `warning` | `#fffaeb`  | `#b54708`  | Warnings & caution       |
| `success` | `#ecfdf3`  | `#067647`  | Success confirmations    |
| `info`    | `#eff8ff`  | `#175cd3`  | Informational notices    |
| `neutral` | `#f9fafb`  | `#384250`  | General-purpose messages |

```tsx
// Usage Example
<div className="bg-background flex flex-wrap gap-3 rounded-lg border p-6">
      <Button
        className="bg-[var(--background-background-error
```

## Without Title

Toasts can be shown with just a message — the title is optional.

```tsx
// Usage Example
<div className="bg-background flex flex-wrap gap-3 rounded-lg border p-6">
      <Button
        variant="default"
        onClick={(
```

## showToast Shorthand

Use the `showToast` object for a convenient API:

```tsx

showToast.error("Something went wrong.")
showToast.warning("Check your input.", "Warning")
showToast.success("Saved!", "Done")
showToast.info("Update available.")
showToast.neutral("3 pending items.")
```

```tsx
// Usage Example
<div className="bg-background flex flex-wrap gap-3 rounded-lg border p-6">
      <Button
        variant="outline"
        onClick={(
```

## Custom Icons

Override the default icon for any variant by passing an `options` object:

```tsx

toastInfo("You earned a gold star!", "Achievement", {
  icon: StarIcon,
  iconType: "solid",
})
```

```tsx
// Usage Example
<div className="bg-background flex flex-wrap gap-3 rounded-lg border p-6">
      <Button
        variant="secondary"
        onClick={(
```

## Positioning

Control where toasts appear with the `position` prop on ``. Click a position to preview it live.

| Position        | Description                |
| --------------- | -------------------------- |
| `top-left`      | Top-left corner            |
| `top-center`    | Top-center                 |
| `top-right`     | Top-right corner (default) |
| `bottom-left`   | Bottom-left corner         |
| `bottom-center` | Bottom-center              |
| `bottom-right`  | Bottom-right corner        |

```tsx
<Toaster position="bottom-right" />
```

```tsx
// Usage Example
<div className="bg-background space-y-4 rounded-lg border p-6">
      <div className="grid grid-cols-3 gap-2">
        {POSITIONS.map((pos
```

## RTL Support

The `` automatically flips `left`↔`right` positions when inside an RTL ``. On mobile, toasts always appear at `bottom-center`.

## Toaster Offset

Use `<ToasterOffsetProvider>` and `<SetToasterOffset>` to dynamically push toasts below a fixed header:

```tsx

  SetToasterOffset,
  Toaster,
  ToasterOffsetProvider,
} from "@/components/ui/sonner"

function Layout({ children }) {
  return (
    <ToasterOffsetProvider>
      <SetToasterOffset value={64} />
      {children}
      
    </ToasterOffsetProvider>
  )
}
```

Or use the `useToasterOffset` hook to measure dynamically (e.g. from a header component):

```tsx

function AppHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const { setOffset } = useToasterOffset()

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setOffset(Math.round(entry.contentRect.height))
    })
    setOffset(el.offsetHeight)
    observer.observe(el)
    return () => {
      observer.disconnect()
      setOffset(0)
    }
  }, [setOffset])

  return <header ref={headerRef}>...</header>
}
```

## Toaster Props

| Prop       | Type       | Default       | Description                                                     |
| ---------- | ---------- | ------------- | --------------------------------------------------------------- |
| `position` | `Position` | `"top-right"` | Toast position (auto-flipped in RTL, `bottom-center` on mobile) |

## Toast Helper Functions

| Function       | Parameters                    | Description        |
| -------------- | ----------------------------- | ------------------ |
| `toastError`   | `(message, title?, options?)` | Show error toast   |
| `toastWarning` | `(message, title?, options?)` | Show warning toast |
| `toastSuccess` | `(message, title?, options?)` | Show success toast |
| `toastInfo`    | `(message, title?, options?)` | Show info toast    |
| `toastNeutral` | `(message, title?, options?)` | Show neutral toast |

### Toast Options

| Option        | Type                  | Default         | Description               |
| ------------- | --------------------- | --------------- | ------------------------- |
| `icon`        | `IconDefinition`      | Variant default | Override the variant icon |
| `iconType`    | `"solid" \| "stroke"` | Variant default | Icon style                |
| `dismissIcon` | `IconDefinition`      | `Cancel01Icon`  | Override the dismiss icon |

## Exports

| Export                  | Type      | Description                         |
| ----------------------- | --------- | ----------------------------------- |
| `Toaster`               | Component | Place in root layout                |
| `ToasterOffsetProvider` | Component | Wrap around Toaster for offset      |
| `SetToasterOffset`      | Component | Set dynamic offset value            |
| `useToasterOffset`      | Hook      | Access offset context directly      |
| `toastError`            | Function  | Show error toast                    |
| `toastWarning`          | Function  | Show warning toast                  |
| `toastSuccess`          | Function  | Show success toast                  |
| `toastInfo`             | Function  | Show info toast                     |
| `toastNeutral`          | Function  | Show neutral toast                  |
| `showToast`             | Object    | Shorthand `{ error, warning, ... }` |
| `Position`              | Type      | `"top-left" \| "top-center" \| ...` |

---

## Component: TABLE

TableDataFull,
  TableRcrcLtr,
  TableRcrcRtl,
  TableRtlPreview,
  TableSimple,
} from "./demos"

# Table

A responsive table component with selection, tags, status indicators, links, and action buttons.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/table.json`

## Data Table

Full-featured data table with checkbox selection, badge tags, status indicators, link columns, and row actions.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <div className="overflow-hidden rounded-md">
        <Table>
          <TableHeader className="bg-[var(--colors-primary-s-a-flag200
```

## RCRC Table — LTR

Full-featured data table matching the RCRC Main Design File component (LTR layout).

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Header</TableHead>
            <TableHead className="w-12">
              <HugeiconsIcon
                icon={FilterIcon}
                className="text-muted-foreground size-4"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rcrcLtrRows.map((row
```

## RCRC Table — RTL

Same table with Arabic layout — column order and alignment reverse automatically.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6" dir="rtl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <HugeiconsIcon
                icon={FilterIcon}
                className="text-muted-foreground size-4"
              />
            </TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead className="w-12">
              <Checkbox aria-label="تحديد الكل" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rcrcRtlRows.map((row
```

## Simple Table

A minimal table with caption, header, body, and footer sections.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6">
      <Table>
        <TableCaption>A list of recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-end">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            {
              invoice: "INV-0001",
              status: "Paid",
              method: "Bank Transfer",
              amount: "12,500.00 SAR",
            },
            {
              invoice: "INV-0002",
              status: "Pending",
              method: "Credit Card",
              amount: "3,200.00 SAR",
            },
            {
              invoice: "INV-0003",
              status: "Overdue",
              method: "SADAD",
              amount: "8,750.00 SAR",
            },
            {
              invoice: "INV-0004",
              status: "Paid",
              method: "Bank Transfer",
              amount: "1,100.00 SAR",
            },
            {
              invoice: "INV-0005",
              status: "Paid",
              method: "Credit Card",
              amount: "22,000.00 SAR",
            },
          ].map((row
```

## RTL Table Preview

Arabic data table with right-to-left text direction.

```tsx
// Usage Example
<div className="bg-background rounded-lg border p-6" dir="rtl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead>عنوان العمود</TableHead>
            <TableHead className="text-end">المبلغ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            {
              name: "أحمد الفارسي",
              dept: "التحول الرقمي",
              ref: "REF-1001",
              amount: "١٢,٥٠٠ ر.س",
            },
            {
              name: "سارة الدوسري",
              dept: "حوكمة البيانات",
              ref: "REF-1002",
              amount: "٣,٢٠٠ ر.س",
            },
            {
              name: "محمد القحطاني",
              dept: "الامتثال",
              ref: "REF-1003",
              amount: "٨,٧٥٠ ر.س",
            },
            {
              name: "فاطمة الحربي",
              dept: "التقنية",
              ref: "REF-1004",
              amount: "١,١٠٠ ر.س",
            },
          ].map((row
```

## Sub-components

| Component      | Description                                           |
| -------------- | ----------------------------------------------------- |
| `Table`        | Root `<table>` wrapper.                               |
| `TableHeader`  | `<thead>` element.                                    |
| `TableBody`    | `<tbody>` element.                                    |
| `TableFooter`  | `<tfoot>` element.                                    |
| `TableHead`    | `<th>` header cell.                                   |
| `TableRow`     | `<tr>` row element. Supports `data-state="selected"`. |
| `TableCell`    | `<td>` cell element.                                  |
| `TableCaption` | `<caption>` element.                                  |

## Props

| Prop         | Type         | Default | Description                                |
| ------------ | ------------ | ------- | ------------------------------------------ |
| `className`  | `string`     | —       | Additional CSS classes                     |
| `data-state` | `"selected"` | —       | Applied to `TableRow` for selected styling |

---

## Component: TABS

TabsDefault,
  TabsDefaultFadeEdges,
  TabsDefaultScrollable,
  TabsDefaultScrollableSnap,
  TabsLine,
  TabsLineFadeEdges,
  TabsLineScrollable,
  TabsLineScrollableSnap,
  TabsVerticalDefault,
  TabsVerticalLine,
} from "./demos"

# Tabs

A set of layered sections of content — known as tab panels — displayed one at a time.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/tabs.json`

## Default

`variant="default"` — centered, equal spacing.

```tsx
// Usage Example
<Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="fourth">Fourth</TabsTrigger>
      </TabsList>
      <DemoContent value="account" />
    </Tabs>
```

## Line

`variant="line"` — left-aligned, minimal underline indicator.

```tsx
// Usage Example
<Tabs defaultValue="account" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="fourth">Fourth</TabsTrigger>
      </TabsList>
      <DemoContent value="account" />
    </Tabs>
```

## Default + Scrollable

`scrollable` — overflow becomes horizontal scroll instead of wrapping.

```tsx
// Usage Example
<Tabs defaultValue="Account" className="w-full">
      <TabsList scrollable>
        {MANY_TABS.map((t
```

## Line + Scrollable

`variant="line" scrollable` — underline style with horizontal scroll.

```tsx
// Usage Example
<Tabs defaultValue="Account" className="w-full">
      <TabsList variant="line" scrollable>
        {MANY_TABS.map((t
```

## Default + Scrollable + Snap

`scrollable snap` — each tab locks into place while scrolling.

```tsx
// Usage Example
<Tabs defaultValue="Account" className="w-full">
      <TabsList scrollable snap>
        {MANY_TABS.map((t
```

## Line + Scrollable + Snap

`variant="line" scrollable snap`

```tsx
// Usage Example
<Tabs defaultValue="Account" className="w-full">
      <TabsList variant="line" scrollable snap>
        {MANY_TABS.map((t
```

## Default + Scrollable + Snap + FadeEdges

`scrollable snap fadeEdges` — gradient fades reveal hidden tabs on either side.

```tsx
// Usage Example
<Tabs defaultValue="Account" className="w-full">
      <TabsList scrollable snap fadeEdges>
        {MANY_TABS.map((t
```

## Line + Scrollable + Snap + FadeEdges

`variant="line" scrollable snap fadeEdges` — full production config.

```tsx
// Usage Example
<Tabs defaultValue="Account" className="w-full">
      <TabsList variant="line" scrollable snap fadeEdges>
        {MANY_TABS.map((t
```

## Vertical — Default

`orientation="vertical"` — tabs stack on the side.

```tsx
// Usage Example
<Tabs defaultValue="account" orientation="vertical" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="fourth">Fourth</TabsTrigger>
      </TabsList>
      <DemoContent value="account" />
    </Tabs>
```

## Vertical — Line

`orientation="vertical" variant="line"`

```tsx
// Usage Example
<Tabs defaultValue="account" orientation="vertical" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="fourth">Fourth</TabsTrigger>
      </TabsList>
      <DemoContent value="account" />
    </Tabs>
```

## TabsList Props

| Prop         | Type                  | Default     | Description                                 |
| ------------ | --------------------- | ----------- | ------------------------------------------- |
| `variant`    | `"default" \| "line"` | `"default"` | Visual style variant                        |
| `scrollable` | `boolean`             | `false`     | Enable horizontal scrolling                 |
| `snap`       | `boolean`             | `false`     | Enable scroll snapping                      |
| `fadeEdges`  | `boolean`             | `false`     | Show gradient fade on edges when scrollable |
| `className`  | `string`              | —           | Additional CSS classes                      |

## Tabs Props

| Prop           | Type                         | Default        | Description            |
| -------------- | ---------------------------- | -------------- | ---------------------- |
| `defaultValue` | `string`                     | —              | Initially active tab   |
| `orientation`  | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction       |
| `className`    | `string`                     | —              | Additional CSS classes |

---


## Component: ACCORDION

DGA approved accordion component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/accordion.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: ALERT-DIALOG

DGA approved alert-dialog component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/alert-dialog.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: ASPECT-RATIO

DGA approved aspect-ratio component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/aspect-ratio.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: AVATAR

DGA approved avatar component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/avatar.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: BUTTON-GROUP

DGA approved button-group component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/button-group.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: CALENDAR

DGA approved calendar component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/calendar.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: CHART

DGA approved chart component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/chart.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: COLLAPSIBLE

DGA approved collapsible component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/collapsible.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: COMBOBOX

DGA approved combobox component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/combobox.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: COMMAND

DGA approved command component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/command.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: CONTEXT-MENU

DGA approved context-menu component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/context-menu.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: DIALOG

DGA approved dialog component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/dialog.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: DIRECTION

DGA approved direction component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/direction.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: DRAWER

DGA approved drawer component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/drawer.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: DROPDOWN-MENU

DGA approved dropdown-menu component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/dropdown-menu.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: EMPTY

DGA approved empty component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/empty.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: FIELD

DGA approved field component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/field.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: FORM

DGA approved form component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/form.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: HOVER-CARD

DGA approved hover-card component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/hover-card.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: INPUT-GROUP

DGA approved input-group component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/input-group.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: INPUT-OTP

DGA approved input-otp component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/input-otp.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: ITEM

DGA approved item component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/item.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: KBD

DGA approved kbd component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/kbd.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: LABEL

DGA approved label component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/label.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: MENUBAR

DGA approved menubar component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/menubar.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: NATIVE-SELECT

DGA approved native-select component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/native-select.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: PAGINATION

DGA approved pagination component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/pagination.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: POPOVER

DGA approved popover component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/popover.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: PROGRESS

DGA approved progress component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/progress.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: RESIZABLE

DGA approved resizable component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/resizable.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SCROLL-AREA

DGA approved scroll-area component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/scroll-area.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SEPARATOR

DGA approved separator component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/separator.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SHEET

DGA approved sheet component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/sheet.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SIDEBAR

DGA approved sidebar component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/sidebar.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SLIDER

DGA approved slider component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/slider.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SPINNER

DGA approved spinner component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/spinner.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: SWITCH

DGA approved switch component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/switch.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: TEXTAREA

DGA approved textarea component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/textarea.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: TOGGLE-GROUP

DGA approved toggle-group component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/toggle-group.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

## Component: TOOLTIP

DGA approved tooltip component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** `npx shadcn@latest add https://nds.aboalrejal.com/r/tooltip.json`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---

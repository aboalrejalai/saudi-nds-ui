## Component: QUOTE

DGA-approved **Quote** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/quote.json
```

**NPM dependencies:** `@radix-ui/react-slot`, `class-variance-authority`, `@aboalrejal/nds-icons`

### Variants

- **variant:** `default`, `pullquote`, `testimonial`, `plain`

### Exports

`Quote`, `QuoteAuthor`, `QuoteCaption`, `QuoteContent`, `QuoteSource`, `quoteVariants`

### Usage

```tsx
import { Quote } from "@/components/ui/quote";

<Quote variant="default">Quote</Quote>
```

### Source (`registry/dga/ui/quote.tsx`)

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { QuotesSolid } from '@aboalrejal/nds-icons';

const quoteVariants = cva('relative', {
  variants: {
    variant: {
      default: 'border-l-4 border-primary pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6 my-6',
      pullquote: 'text-center text-2xl font-semibold leading-relaxed text-foreground my-8',
      testimonial: 'border bg-card shadow-sm rounded-xl p-6 flex flex-col gap-4',
      plain: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface QuoteProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof quoteVariants> {
  children?: React.ReactNode;
  quoteMark?: boolean;
  avatar?: React.ReactNode;
  author?: React.ReactNode;
  byline?: React.ReactNode;
  source?: React.ReactNode;
  cite?: string;
}

function Quote({
  variant,
  quoteMark = false,
  avatar,
  author,
  byline,
  source,
  cite,
  className,
  children,
  ...props
}: QuoteProps) {
  const hasAttribution = author != null || byline != null || source != null;
  const mark = quoteMark ? (
    <QuotesSolid
      aria-hidden="true"
      className={cn(
        "text-primary/20",
        variant === 'pullquote' ? "w-12 h-12 mx-auto mb-4" : "w-8 h-8 mb-2 absolute -top-4 -left-2 rtl:-right-2 rtl:left-auto opacity-50"
      )}
    />
  ) : null;

  if (!hasAttribution) {
    return (
      <blockquote
        className={cn(quoteVariants({ variant }), className)}
        cite={cite}
        {...props}
      >
        {mark}
        <QuoteContent>{children}</QuoteContent>
      </blockquote>
    );
  }

  return (
    <figure
      className={cn(quoteVariants({ variant }), className)}
      {...props}
    >
      <blockquote className="relative" cite={cite}>
        {mark}
        <QuoteContent className={variant === 'testimonial' ? 'text-lg italic' : ''}>
          {children}
        </QuoteContent>
      </blockquote>
      <QuoteCaption className={cn(
        "mt-4 flex items-center gap-3",
        variant === 'pullquote' && "justify-center mt-6"
      )}>
        {avatar != null ? (
          <span aria-hidden="true" className="flex-shrink-0">
            {avatar}
          </span>
        ) : null}
        <span className="flex flex-col">
          {author != null ? <QuoteAuthor>{author}</QuoteAuthor> : null}
          {byline != null ? <span className="text-sm text-muted-foreground">{byline}</span> : null}
          {source != null ? <QuoteSource>{source}</QuoteSource> : null}
        </span>
      </QuoteCaption>
    </figure>
  );
}

function QuoteContent({ asChild, className, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return <Comp className={cn('text-foreground leading-relaxed', className)} {...props} />;
}

function QuoteCaption({ asChild, className, ...props }: React.ComponentProps<'figcaption'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'figcaption';
  return <Comp className={className} {...props} />;
}

function QuoteAuthor({ asChild, className, ...props }: React.ComponentProps<'span'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp className={cn('font-semibold text-foreground', className)} {...props} />;
}

function QuoteSource({ asChild, className, ...props }: React.ComponentProps<'cite'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'cite';
  return <Comp className={cn('text-sm text-muted-foreground italic not-italic', className)} {...props} />;
}

export { Quote, QuoteContent, QuoteCaption, QuoteAuthor, QuoteSource, quoteVariants };
export type { QuoteProps };
```

---

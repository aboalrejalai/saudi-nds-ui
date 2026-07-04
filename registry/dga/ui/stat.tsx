import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ArrowUp01Stroke, ArrowDown01Stroke, MinusSignStroke } from '@/components/icons';

const statVariants = cva('flex flex-col gap-1 p-6 rounded-xl', {
  variants: {
    variant: {
      flat: 'border bg-card text-card-foreground',
      elevated: 'border-none shadow-md bg-card text-card-foreground',
      accent: 'bg-primary/5 text-primary border border-primary/20',
      gradient: 'bg-gradient-to-br from-primary/10 to-transparent border border-primary/10',
    },
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
  },
  defaultVariants: {
    variant: 'flat',
    size: 'md',
  },
});

type Trend = 'up' | 'down' | 'flat';
type Sentiment = 'positive' | 'negative' | 'neutral';

const TREND_ICONS: Record<Trend, React.ReactNode> = {
  up: <ArrowUp01Stroke className="w-4 h-4" aria-hidden="true" />,
  down: <ArrowDown01Stroke className="w-4 h-4" aria-hidden="true" />,
  flat: <MinusSignStroke className="w-4 h-4" aria-hidden="true" />,
};

const TREND_SENTIMENT: Record<Trend, Sentiment> = {
  up: 'positive',
  down: 'negative',
  flat: 'neutral',
};

function resolveSentiment(trend?: Trend, sentiment?: Sentiment): Sentiment | undefined {
  if (sentiment) return sentiment;
  if (trend) return TREND_SENTIMENT[trend];
  return undefined;
}

interface StatProps extends React.ComponentProps<'div'>, VariantProps<typeof statVariants> {
  label?: React.ReactNode;
  value?: React.ReactNode;
  change?: React.ReactNode;
  changeLabel?: React.ReactNode;
  trend?: Trend;
  sentiment?: Sentiment;
  changeVariant?: 'text' | 'chip';
  icon?: React.ReactNode;
}

function Stat({
  variant,
  size,
  label,
  value,
  change,
  changeLabel,
  trend,
  sentiment,
  changeVariant = 'text',
  icon,
  className,
  children,
  ...props
}: StatProps) {
  const resolvedSentiment = resolveSentiment(trend, sentiment);
  return (
    <div
      className={cn(statVariants({ variant, size }), className)}
      {...props}
    >
      {label || icon ? (
        <div className="flex items-center justify-between">
          {label ? <div className="text-sm font-medium text-muted-foreground">{label}</div> : null}
          {icon ? (
            <span className="w-5 h-5 text-muted-foreground" aria-hidden="true">
              {icon}
            </span>
          ) : null}
        </div>
      ) : null}
      
      {value ? <div className="text-3xl font-bold">{value}</div> : null}
      
      {change || changeLabel ? (
        <div className="flex items-center gap-2 mt-1">
          {change ? (
            <StatChange trend={trend} sentiment={sentiment} variant={changeVariant}>
              {change}
            </StatChange>
          ) : null}
          {changeLabel ? <span className="text-xs text-muted-foreground">{changeLabel}</span> : null}
        </div>
      ) : null}
      
      {children}
    </div>
  );
}

interface StatChangeProps extends React.ComponentProps<'div'> {
  trend?: Trend;
  sentiment?: Sentiment;
  variant?: 'text' | 'chip';
}

function StatChange({ trend, sentiment, variant, className, children, ...props }: StatChangeProps) {
  const resolvedSentiment = resolveSentiment(trend, sentiment);
  
  const sentimentStyles = {
    positive: 'text-emerald-600 dark:text-emerald-500',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  const chipStyles = {
    positive: 'bg-emerald-500/15',
    negative: 'bg-destructive/15',
    neutral: 'bg-muted',
  };

  return (
    <div
      className={cn(
        'flex items-center text-sm font-semibold',
        resolvedSentiment && sentimentStyles[resolvedSentiment],
        variant === 'chip' && 'px-2 py-0.5 rounded-full',
        variant === 'chip' && resolvedSentiment && chipStyles[resolvedSentiment],
        className
      )}
      {...props}
    >
      {trend ? <span className="mr-1 rtl:ml-1 rtl:mr-0">{TREND_ICONS[trend]}</span> : null}
      {children}
    </div>
  );
}

export { Stat, StatChange, statVariants };
export type { StatProps, StatChangeProps };

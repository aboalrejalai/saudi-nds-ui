import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getUIComponents } from "@/lib/get-components";

export function HomeHero() {
  const t = useTranslations('Home');
  const components = getUIComponents();

  return (
    <div className="space-y-2">
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground mb-4">
        {t('badgeText', { count: components.length })}
      </div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight bg-gradient-to-br from-[#1B8354] to-[#104d31] bg-clip-text text-transparent">
        {t('title')}
      </h1>
      <div className="text-muted-foreground max-w-2xl text-lg">
        <span>{t('descriptionPrefix')}</span>
        <strong>{t('dga')}</strong>
        <span>{t('descriptionSuffix')}</span>
      </div>
      <div className="text-muted-foreground max-w-2xl text-sm mt-2 font-semibold">
        {t('subtitle')}
      </div>
    </div>
  );
}

export function HomeButtons() {
  const t = useTranslations('Home');

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <a
        href="/installation/nextjs"
        className="bg-gradient-to-r from-[#1B8354] to-[#166A45] text-white hover:opacity-90 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold shadow-lg shadow-[#1b8354]/20 transition-all hover:scale-105"
      >
        {t('getStarted')}
      </a>
      <a
        href="/button"
        className="border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium shadow-sm transition-all hover:scale-105"
      >
        {t('browseComponents')}
      </a>
    </div>
  );
}

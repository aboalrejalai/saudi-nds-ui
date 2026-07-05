import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export default getRequestConfig(async (configParams) => {
  // Try to get locale from either property
  // @ts-ignore
  let locale = configParams.locale || (configParams.requestLocale ? await configParams.requestLocale : undefined);

  if (!locale) {
    locale = routing.defaultLocale;
  }

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

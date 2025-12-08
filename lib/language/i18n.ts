import { getRequestConfig } from 'next-intl/server';

export type LocaleType = 'pt' | 'en';

export const locales: LocaleType[] = ['pt', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure a valid locale is used
  if (!locale || !locales.includes(locale as LocaleType)) {
    locale = 'pt';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

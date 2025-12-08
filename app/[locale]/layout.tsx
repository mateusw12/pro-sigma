import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from "@/components/common";
import StyledComponentsRegistry from "@/lib/registry";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "../globals.css";

const locales = ['pt', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <AntdRegistry>
              <StyledComponentsRegistry>
                {children}
              </StyledComponentsRegistry>
            </AntdRegistry>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {
    title: locale === 'pt' ? "Pro Sigma - Sistema de Análise Six Sigma" : "Pro Sigma - Six Sigma Analysis System",
    description: locale === 'pt'
      ? "Plataforma completa para análise de dados Six Sigma"
      : "Complete platform for Six Sigma data analysis",
  };
}

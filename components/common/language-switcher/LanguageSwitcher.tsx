'use client';

import { Select } from 'antd';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FlagIcon, OptionContent, StyledSelect } from './styled';

const { Option } = Select;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    // Navigate to the same page with the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <StyledSelect
      value={locale}
      onChange={(value) => handleChange(value as string)}
    >
      <Option value="pt">
        <OptionContent>
          <FlagIcon>
            <Image
              src="/assets/langFlags/pt-BR.png"
              alt="Português"
              width={18}
              height={18}
            />
          </FlagIcon>
        </OptionContent>
      </Option>
      <Option value="en">
        <OptionContent>
          <FlagIcon>
            <Image
              src="/assets/langFlags/en-US.png"
              alt="English"
              width={18}
              height={18}
            />
          </FlagIcon>
        </OptionContent>
      </Option>
    </StyledSelect>
  );
}

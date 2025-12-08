'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Select } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';

const { Option } = Select;

const FlagIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 2px;
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSelect = styled(Select)`
  width: 60px !important;

  .ant-select-selector {
    background: transparent !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    padding: 4px 8px !important;
  }

  .ant-select-arrow {
    color: rgba(255, 255, 255, 0.8);
  }

  &:hover .ant-select-selector {
    border-color: rgba(255, 255, 255, 0.5) !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
  }
`;

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

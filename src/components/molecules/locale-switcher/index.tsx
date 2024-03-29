import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/libs/next-intl/config'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'
import { SelectItem } from '@/components/atoms/select'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale} placeholder={t('label')}>
      {locales.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  )
}

import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

type Props = {
    params: {locale: string};
};

export default function SignIn({params: {locale}}: Props) {
    unstable_setRequestLocale(locale);
    const t = useTranslations('IndexPage');
    return (
        <div>Sign In <p>{t('title')}</p></div>
    )
}

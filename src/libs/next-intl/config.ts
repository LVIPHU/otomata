import {Pathnames} from 'next-intl/navigation';

export const locales = ['vi', 'en'] as const;

export const pathnames = {
    '/': '/',
    '/sign-in': {
        vi: '/dang-nhap',
        en: '/sign-in'
    }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
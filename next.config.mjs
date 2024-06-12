import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const withNextIntl = createNextIntlPlugin('./src/libs/next-intl/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        // this includes files from the monorepo base two directories up
        outputFileTracingRoot: path.join(process.cwd(), '../../'),
    }
}

export default withNextIntl(nextConfig)

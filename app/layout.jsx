import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import {NextIntlClientProvider} from 'next-intl';
import getRequestConfig from '@/i18n/request'

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "GoCart. - Shop smarter",
    description: "GoCart. - Shop smarter",
};

export default async function RootLayout({ children }) {
    const {locale, messages} = await getRequestConfig()
    return (
        <html lang={locale}>
            <body className={`${outfit.className} antialiased`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <StoreProvider>
                        <Toaster />
                        <SiteShell>{children}</SiteShell>
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

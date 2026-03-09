import GoogleAnalytics from '../components/seo/GoogleAnalytics';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GoogleAnalytics />
            {children}
        </>
    );
}

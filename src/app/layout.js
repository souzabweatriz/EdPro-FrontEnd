import Header from './components/Header/Header'; 

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <Header />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
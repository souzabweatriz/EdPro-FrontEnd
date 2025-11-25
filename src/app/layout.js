import "./globals.css";
import BackTop from "./components/BackTop/BackTop.jsx";

export const metadata = {
    title: "EdPro",
    description: "Plataforma de cursos.",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                {children}
                <BackTop />
            </body>
        </html>
    );
}
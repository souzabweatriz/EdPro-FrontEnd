import "./globals.css";
import BackTop from "./components/BackTop/BackTop.jsx";
import localFont from "next/font/local";

const inter = localFont({
    src: [
        {
            path: "../../public/fonts/Inter_18pt-Regular.ttf",
            weight: "500",
            style: "regular",
        },
    ],
    variable: "--font-inter",
    display: "swap",
});

const montserrat = localFont({
    src: [
        {
            path: "../../public/fonts/Montserrat-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-montserrat",
    display: "swap",
});

const quicksand = localFont({
    src: [
        {
            path: "../../public/fonts/Quicksand-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
    ],
    variable: "--font-quicksand",
    display: "swap",
});

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
            <body className={`${inter.variable} ${montserrat.variable} ${quicksand.variable}`}>
                {children}
                <BackTop />
            </body>
        </html>
    );
}

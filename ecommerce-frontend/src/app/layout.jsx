import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({subsets: ['latin'], weight: ['300', '400', '700']})
const montserrat = Montserrat({subsets: ['latin'], weight: ['300', '400', '700']})

export const metadata = {
  title: "eCommerceDesign",
  description: "Criado por Leandro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

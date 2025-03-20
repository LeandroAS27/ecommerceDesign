import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const poppins = Poppins({subsets: ['latin'], weight: ['300', '400', '700']})
const montserrat = Montserrat({subsets: ['latin'], weight: ['300', '400', '700']})

export const metadata = {
  title: "eCommerceDesign",
  description: "Criado por Leandro",
};

export default function RootLayout({ children }) {
  return (
      <html lang="pt-br">
        <body className={`${poppins.className} ${montserrat.className} antialiased`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}

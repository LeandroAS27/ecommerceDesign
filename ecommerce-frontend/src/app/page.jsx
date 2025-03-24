"use client"

import Image from "next/image";
import Header from "./components/header";
import Carousel from "./components/carousel";
import FindLook from "./components/findLook";
import Trending from "./components/trending";
import Footer from "./components/footer";
import ModalCart from "./components/modalCart";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCartModal = () => {
      setIsModalOpen((prev) => !prev)
      console.log(`Mudou o estado para: ${isModalOpen}`)
  }
  
  return (
    <>
      <div className="relative max-w-9/10 mx-auto px-2">
        <header>
          <Header onCartClick={handleCartModal}/>
          <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
          <Carousel/>
        </header>

        <main className="relative flex flex-col items-center w-full mt-16">
          <section className="w-full">
            <FindLook/>
          </section>

          <section className="w-full">
            <Trending/>
          </section>

          <section className="w-full">
            <Carousel/>
          </section>
        </main>

      </div>
        <footer className="mt-16">
          <Footer/>
        </footer>
    </>
  );
}

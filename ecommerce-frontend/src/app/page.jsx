"use client"

//components
import Header from "./components/header";
import Carousel from "./components/carousel";
import FindLook from "./components/findLook";
import Trending from "./components/trending";
import Footer from "./components/footer";
import ModalCart from "./components/modalCart";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "./redux/modalSlice";


//react
import { useEffect } from "react";


export default function Home() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modalCart.isModalOpen)


  const handleCartModal = () => {
    dispatch(toggleCart())
  }

  useEffect(() => {
    if(typeof window !== 'undefined'){
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.reveal', {
          distance: '40px',
          duration: 1000,
          easing: 'ease-in-out',
          origin: 'bottom',
          interval: 200,
          reset: false
        });
      })
    }
  }, [])

  return (
    <>
      <div className="relative max-w-9/10 mx-auto px-2">
        <header>
          <Header onCartClick={handleCartModal}/>
          <ModalCart isOpen={isModalOpen} onClose={handleCartModal}/>
          <Carousel/>
        </header>

        <main className="relative flex flex-col items-center w-full mt-16">
          <section className="w-full reveal">
            <FindLook/>
          </section>

          <section className="w-full reveal">
            <Trending/>
          </section>

          <section className="w-full reveal">
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

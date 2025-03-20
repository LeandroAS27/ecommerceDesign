
import Image from "next/image";
import Header from "./components/header";
import Carousel from "./components/carousel";
import FindLook from "./components/findLook";
import Trending from "./components/trending";

export default function Home() {

  return (
    <>
      <div className="relative max-w-9/10 mx-auto px-2">
        <header>
          <Header/>
          <Carousel/>
        </header>

        <main className="relative flex flex-col items-center w-full mt-16">
          <section className="w-full">
            <FindLook/>
          </section>

          <section className="w-full">
            <Trending/>
          </section>
        </main>
      </div>
    </>
  );
}

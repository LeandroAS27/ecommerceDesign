
import Image from "next/image";
import Header from "./components/header";
import Carousel from "./components/carousel";

export default function Home() {

  return (
    <>
      <div className="max-w-9/10 mx-auto px-2">
        <Header/>
        <Carousel/>
      </div>
    </>
  );
}

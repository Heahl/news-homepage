import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CtaArticles,
  NewArticles,
  NumberedListArticles,
  type Article,
} from "@/components/Articles";

interface MenuIconProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ menuOpen, toggleMenu }) => {
  return (
    <>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className={`relative h-full w-16 items-center justify-center`}
        >
          <div
            className={`flex transform items-center justify-center transition-all duration-500 ease-in-out ${menuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          >
            <Image
              src={"/images/icon-menu.svg"}
              width={24}
              height={24}
              alt="Menu Icon"
              className="h-6 w-8"
            />
          </div>
        </button>

        {menuOpen && (
          <div
            className="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-50"
            onClick={toggleMenu}
          ></div>
        )}

        <div
          className={`fixed bottom-0 right-0 top-0 transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"} z-30 bg-white`}
          style={{ width: "250px" }}
        >
          <button onClick={toggleMenu}>
            <Image
              src={"/images/icon-menu-close.svg"}
              width={24}
              height={24}
              alt="Close Menu Icon"
              className="absolute right-5 top-5 h-8 w-8"
            />
          </button>

          <div className="mt-[25%] flex flex-col items-start gap-6 pl-6 text-xl font-light tracking-wide">
            <button>Home</button>
            <button>New</button>
            <button>Popular</button>
            <button>Trending</button>
            <button>Categories</button>
          </div>
        </div>
      </div>

      <div className="hidden gap-6 px-6 text-lg font-light tracking-wide md:flex lg:text-xl">
        <button className="hover:cursor-pointer hover:text-soft-red">
          Home
        </button>
        <button className="hover:cursor-pointer hover:text-soft-red">
          New
        </button>
        <button className="hover:cursor-pointer hover:text-soft-red">
          Popular
        </button>
        <button className="hover:cursor-pointer hover:text-soft-red">
          Trending
        </button>
        <button className="hover:cursor-pointer hover:text-soft-red">
          Categories
        </button>
      </div>
    </>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    fetch("/data/articles.json")
      .then((response) => response.json() as Promise<Article[]>)
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const ctaArticles = articles.filter((article) => article.type === "cta");
  const newArticles = articles.filter((article) => article.type === "new");
  const numberedListArticles = articles.filter(
    (article) => article.type === "numberedList",
  );

  return (
    <>
      <Head>
        <title>News Homepage</title>
        <meta name="description" content="news-homepage-main" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <main className="flex min-h-screen max-w-[1400px] flex-col items-center justify-center bg-off-white md:p-8">
        {/* Menu Bar */}
        <div className="fixed top-0 z-10 flex h-20 w-full max-w-[1400px] items-center justify-between bg-off-white md:p-8 md:pt-20">
          <Image
            src={"/images/logo.svg"}
            width={34}
            height={22}
            alt="Logo"
            className="ml-4 h-6 md:h-8 md:w-auto "
          />
          <MenuIcon menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>
        {/* Content */}
        <div className="mt-20 flex h-[100vh] w-full flex-col gap-4 px-4 pb-20 md:grid md:grid-cols-3 md:grid-rows-5 md:pb-0 md:pt-14 lg:gap-8">
          <CtaArticles articles={ctaArticles} />
          <NewArticles articles={newArticles} />
          <NumberedListArticles articles={numberedListArticles} />
        </div>
      </main>
    </>
  );
}

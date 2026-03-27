'use client';
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Cat, getCategories } from "@/fetchApi/Social-Accounts";
import Link from "next/link";
import Image from 'next/image'


const Home = () => {
  const [categories, setCategories] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const result = await getCategories();
        setCategories(result ?? []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally { setLoading(false) }
    };

    fetchCategories();
  }, [])

  return (
    <section id="faq" className=" ">
      <div className="max-w-280 mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#8a8a8a]  ">
          Buy Social Accounts
        </h2>
        {loading ? (
          <p className="text-center text-accent text-lg"> Loading...</p>
        ) : (
          <div className="space-y-4">
            {categories.map((cat, index) => (
              <div key={index} className="cursor-pointer shadow-md overflow-hidden border rounded-sm bg-surface-secondary border-b border-border-subtle text-accent">
                <Link
                  key={cat.id}
                  href={`/accounts`}
                  className="w-full flex justify-between items-center px-6 cursor-pointer py-3 text-left  font-medium text-sm md:text-base  focus:outline-none"
                >
                  <div className="flex gap-2 items-center">
                    <Image
                    className="rounded-md"
                      src={cat.image}
                      width={25}
                      height={25}
                      alt={cat.slug}
                    />
                    <span>{cat.title}</span>

                  </div>
                  <span><ArrowRight size={15}/></span>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Home;

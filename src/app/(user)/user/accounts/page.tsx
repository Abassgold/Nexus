'use client';
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Cat, getCategories } from "@/fetchApi/Social-Accounts";
import Link from "next/link";
import Image from 'next/image'


const Accounts = () => {
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
    <section className="py-12 bg-surface-primary">
  <div className="max-w-280 mx-auto px-4">
    {/* Title updated to match your brand typography */}
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-txt-primary tracking-tight">
      Buy Social Accounts
    </h2>

    {loading ? (
      <div className="flex justify-center items-center py-10">
        <div className="animate-pulse text-accent font-medium text-sm">
          Loading marketplace...
        </div>
      </div>
    ) : (
      <div className="grid gap-3">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="group bg-surface-secondary border border-border-subtle rounded-sm transition-all hover:border-accent/40 hover:shadow-lg"
          >
            <Link
              href={`/user/accounts/${cat.id}`}
              className="w-full flex justify-between items-center px-5 py-2 focus:outline-none"
            >
              <div className="flex gap-4 items-center">
                {/* Image container with subtle border */}
                <div className="w-10 h-10 flex items-center justify-center bg-surface-tertiary rounded-sm border border-border-subtle overflow-hidden">
                  <Image
                    src={cat.image}
                    width={28}
                    height={28}
                    alt={cat.slug}
                    className="object-contain"
                  />
                </div>
                
                <span className="font-semibold text-txt-primary text-sm md:text-base group-hover:text-accent transition-colors">
                  {cat.title}
                </span>
              </div>

              {/* Icon moves slightly on hover for better UX */}
              <div className="text-txt-muted group-hover:text-accent group-hover:translate-x-1 transition-all">
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
  );
};

export default Accounts;

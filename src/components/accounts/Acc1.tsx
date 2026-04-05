import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Cat } from "@/fetchApi/Social-Accounts";
import Link from "next/link";
import Image from 'next/image'

interface Server1Props {
  categories: Cat[]
}
const Server1 = ({ categories }: Server1Props) => {

  return (
    <section className=" bg-surface-primary">
      <div className="max-w-280 mx-auto px-4">
        {/* Title updated to match your brand typography */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-txt-primary tracking-tight">
          Buy Social Accounts
        </h2>
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
      </div>
    </section>
  );
};

export default Server1;

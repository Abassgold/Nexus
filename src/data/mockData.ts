
export interface Product {
            id: 1,
            title: string,
            slug: string,
            price: string,
            available_stock: number,
            sold: number,
            category: { id: string, title: string, slug: string},
            subcategory: { id: number; title: string; slug: string; }
        }

export interface SubCategory {
  name: string;
  items: string[];
}

export interface Category {
  name: string;
  subcategories?: SubCategory[];
}

export const flatCategoryLinks = [
  {name:'Features', link:'#features'},
  {name:'How it Works', link:'#how-it-work'},
  {name:'Testimonials', link:'#testimonials'},
  {name:'About Us', link:'#about-us'},
  {name:'FAQ', link:'#faq'},
];











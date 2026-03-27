
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

export const megaMenuCategories: Category[] = [
  {
    name: 'Accounts',
    subcategories: [
      {
        name: 'Social Media',
        items: ['Instagram', 'Twitter/X', 'TikTok', 'Facebook']
      },
      { name: 'Streaming', items: ['Netflix', 'Spotify', 'Disney+', 'Hulu'] },
      { name: 'Gaming', items: ['Steam', 'Epic Games', 'PlayStation', 'Xbox'] }]
  },
  {
    name: 'Software Licenses',
    subcategories: [
      {
        name: 'Productivity',
        items: ['Microsoft Office', 'Adobe CC', 'Notion Plus']
      },
      {
        name: 'Development',
        items: ['JetBrains', 'GitHub Copilot', 'AWS Credits']
      }]

  },
  {
    name: 'Gift Cards',
    subcategories: [
      { name: 'Retail', items: ['Amazon', 'Apple', 'Google Play'] },
      { name: 'Crypto', items: ['Binance', 'Coinbase', 'Kraken'] }]

  },
  { name: 'Digital Services' },
  { name: 'VPN & Security' },
  { name: 'Cloud Storage' }];


export const flatCategoryLinks = [
  {name:'Accounts', link:'/'},
  {name:'Account Boosting', link:'/account-boosting'},
  {name:'SMS Number', link:'/virtual-number'},
  {name:'Software', link:'/software'},
  {name:'Gift Cards', link:'/gift-cards'},
  {name:'Game Keys', link:'/kame-keys'},
  {name:'VPN & Security', link:'/security'},
  {name:'Subscriptions', link:'/subscriptions'},
];











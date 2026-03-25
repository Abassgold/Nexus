export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  stockCount: number;
  price: number;
  inStock: boolean;
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


export const mockProductsAccounts: Product[] = [
  {
    id: 'acc-1',
    name: 'Aged Twitter/X Account (2015)',
    description:
      'High quality aged account, phone verified, original email included.',
    category: 'Accounts',
    stockCount: 14,
    price: 12.5,
    inStock: true
  },
  {
    id: 'acc-2',
    name: 'Instagram 10k+ Followers',
    description: 'Organic growth, niche: luxury/lifestyle. Full access.',
    category: 'Accounts',
    stockCount: 2,
    price: 85.0,
    inStock: true
  },
  {
    id: 'acc-3',
    name: 'Netflix Premium (1 Month)',
    description: 'Shared screen, 4K UHD, instant delivery.',
    category: 'Accounts',
    stockCount: 0,
    price: 3.5,
    inStock: false
  },
  {
    id: 'acc-4',
    name: 'Spotify Premium Upgrade',
    description: 'Upgrade your own account to premium for 12 months.',
    category: 'Accounts',
    stockCount: 105,
    price: 18.99,
    inStock: true
  },
  {
    id: 'acc-5',
    name: 'Steam Account - CS:GO Prime',
    description: 'Fresh account with CS:GO Prime status enabled.',
    category: 'Accounts',
    stockCount: 42,
    price: 14.0,
    inStock: true
  }];


export const mockProductsSoftware: Product[] = [
  {
    id: 'soft-1',
    name: 'Windows 11 Pro OEM Key',
    description: 'Lifetime activation key for 1 PC. Instant delivery.',
    category: 'Software Licenses',
    stockCount: 890,
    price: 4.99,
    inStock: true
  },
  {
    id: 'soft-2',
    name: 'Adobe Creative Cloud (1 Year)',
    description: 'Full suite access, private account, warranty included.',
    category: 'Software Licenses',
    stockCount: 5,
    price: 120.0,
    inStock: true
  },
  {
    id: 'soft-3',
    name: 'JetBrains All Products Pack',
    description: '1 Year educational license, works globally.',
    category: 'Software Licenses',
    stockCount: 0,
    price: 15.0,
    inStock: false
  },
  {
    id: 'soft-4',
    name: 'Microsoft Office 2021 Pro Plus',
    description: 'Bind to your Microsoft account. Lifetime.',
    category: 'Software Licenses',
    stockCount: 34,
    price: 12.5,
    inStock: true
  }];


export const mockProductsGiftCards: Product[] = [
  {
    id: 'gc-1',
    name: 'Amazon $50 Gift Card',
    description: 'US Region only. Instant digital delivery.',
    category: 'Gift Cards',
    stockCount: 50,
    price: 48.0,
    inStock: true
  },
  {
    id: 'gc-2',
    name: 'Apple $25 Gift Card',
    description: 'App Store & iTunes. Global activation.',
    category: 'Gift Cards',
    stockCount: 120,
    price: 24.0,
    inStock: true
  },
  {
    id: 'gc-3',
    name: 'Google Play $15',
    description: 'US Region. Valid for apps, games, movies.',
    category: 'Gift Cards',
    stockCount: 0,
    price: 14.5,
    inStock: false
  },
  {
    id: 'gc-4',
    name: 'Steam Wallet $20',
    description: 'Global key. Adds funds directly to your wallet.',
    category: 'Gift Cards',
    stockCount: 8,
    price: 19.5,
    inStock: true
  },
  {
    id: 'gc-5',
    name: 'PlayStation Store $50',
    description: 'US PSN Network. Instant code.',
    category: 'Gift Cards',
    stockCount: 15,
    price: 47.5,
    inStock: true
  }];


export const mockProductsGameKeys: Product[] = [
  {
    id: 'gk-1',
    name: 'Elden Ring (Steam)',
    description: 'Global Steam Key. Base game.',
    category: 'Game Keys',
    stockCount: 22,
    price: 39.99,
    inStock: true
  },
  {
    id: 'gk-2',
    name: 'Cyberpunk 2077 (GOG)',
    description: 'GOG DRM-Free Key. Global.',
    category: 'Game Keys',
    stockCount: 45,
    price: 29.99,
    inStock: true
  },
  {
    id: 'gk-3',
    name: "Baldur's Gate 3 (Steam)",
    description: 'Global Steam Key. RPG of the year.',
    category: 'Game Keys',
    stockCount: 0,
    price: 54.99,
    inStock: false
  },
  {
    id: 'gk-4',
    name: 'Starfield (Steam)',
    description: 'Global Steam Key. Premium Edition.',
    category: 'Game Keys',
    stockCount: 12,
    price: 45.0,
    inStock: true
  },
  {
    id: 'gk-5',
    name: 'Red Dead Redemption 2',
    description: 'Rockstar Social Club Key. Global.',
    category: 'Game Keys',
    stockCount: 88,
    price: 19.99,
    inStock: true
  }];


export const mockProductsVPN: Product[] = [
  {
    id: 'vpn-1',
    name: 'NordVPN (2 Years)',
    description: 'Private account. Full warranty.',
    category: 'VPN & Security',
    stockCount: 150,
    price: 25.0,
    inStock: true
  },
  {
    id: 'vpn-2',
    name: 'ExpressVPN (1 Year)',
    description: 'Shared account. 1 device limit.',
    category: 'VPN & Security',
    stockCount: 40,
    price: 15.0,
    inStock: true
  },
  {
    id: 'vpn-3',
    name: 'Surfshark (2 Years)',
    description: 'Unlimited devices. Private account.',
    category: 'VPN & Security',
    stockCount: 0,
    price: 20.0,
    inStock: false
  },
  {
    id: 'vpn-4',
    name: 'ProtonVPN Plus (1 Year)',
    description: 'High speed servers. Secure core.',
    category: 'VPN & Security',
    stockCount: 18,
    price: 35.0,
    inStock: true
  }];


export const mockProductsSubscriptions: Product[] = [
  {
    id: 'sub-1',
    name: 'ChatGPT Plus (1 Month)',
    description: 'Shared account. GPT-4 access.',
    category: 'Subscriptions',
    stockCount: 30,
    price: 8.0,
    inStock: true
  },
  {
    id: 'sub-2',
    name: 'Canva Pro (Lifetime)',
    description: 'Added to your own account via team invite.',
    category: 'Subscriptions',
    stockCount: 500,
    price: 5.0,
    inStock: true
  },
  {
    id: 'sub-3',
    name: 'Grammarly Premium (1 Year)',
    description: 'Private account. Full features.',
    category: 'Subscriptions',
    stockCount: 12,
    price: 25.0,
    inStock: true
  },
  {
    id: 'sub-4',
    name: 'YouTube Premium (6 Months)',
    description: 'Upgrade your own account via family invite.',
    category: 'Subscriptions',
    stockCount: 0,
    price: 12.0,
    inStock: false
  }];
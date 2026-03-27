import { ProductSection } from '@/components/ProductSection';
import { getListings, getSubCategories } from '@/fetchApi/Social-Accounts';

async function Accounts() {
    const res = await getSubCategories(22);

    const listingsPerSubcategory = await Promise.all(
        res.map(item => getListings(22,  item.id ))
    );

    return (
        <>
            <div className="mb-8 mt-8">
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-txt-primary tracking-tight mb-2">
                    Marketplace Overview
                </h1>
                <p className="text-sm text-txt-secondary font-body">
                    Browse our curated selection of premium digital assets and licenses.
                </p>
            </div>
            {res.map((item, index) => (
                <ProductSection
                    key={item.id}
                    title={item.title}
                    products={listingsPerSubcategory[index]}
                    accentLabel="HOT"
                />
            ))}
        </>
    );
}

export default Accounts;
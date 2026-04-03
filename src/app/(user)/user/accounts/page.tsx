import { ProductSection } from '@/components/ProductSection';
import { getListings, getSubCategories } from '@/fetchApi/Social-Accounts';

async function Accounts() {
    const res = await getSubCategories(22);

    const listingsPerSubcategory = await Promise.all(
        res.data.subcategories.map(item => getListings(22,  item.id ))
    );

    return (
        <div className='mt-8'>
            {res.data.subcategories.map((item, index) => (
                <ProductSection
                    key={item.id}
                    category={res.data.category.title}
                    title={item.title}
                    products={listingsPerSubcategory[index]}
                    accentLabel="HOT"
                />
            ))}
        </div>
    );
}

export default Accounts;
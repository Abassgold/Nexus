import { ProductSection } from '@/components/ProductSection';
import { getListings, getSubCategories } from '@/fetchApi/Social-Accounts';

async function Account({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const res = await getSubCategories(parseFloat(id));

    const listingsPerSubcategory = await Promise.all(
        res.data.subcategories.map(item => getListings(parseFloat(id),  item.id ))
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

export default Account;
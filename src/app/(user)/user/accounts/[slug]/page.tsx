import ProductDetails from "@/components/accounts/ProductDetails";
import { getListingBySlug } from "@/fetchApi/Social-Accounts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const token = (await cookies()).get('accessToken')?.value;
    const { slug } = await params
    const res = await getListingBySlug(slug.trim())
    console.log(res)
    if(!res.success) return <div>product not found</div>
    return (
        <>
            <ProductDetails details={res.data}/>
        </>
    );
};


export default Page;

import ProductDetails from "@/components/accounts/ProductDetails";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const token = (await cookies()).get('accessToken')?.value;
    const id = (await params).slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })



    if (!res.ok) return redirect('/login')
    const data = await res.json()
    const user = data.user
    return (
        <>
        <ProductDetails/>
        </>
    );
};


export default Page;

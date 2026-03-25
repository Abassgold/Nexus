import { FetchServer } from '@/components/virtualNumber/FetchService';
import VirtualNumber from '@/components/virtualNumber/VirtualNumber';

const Page = async () => {
    const server = await FetchServer();
    return (
        <>
            <VirtualNumber
                countries={server?.countries}
                services={server?.serviceList}
            />
            
        </>
    )
}

export default Page;
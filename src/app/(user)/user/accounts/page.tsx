import { getCategories, listResources } from "@/fetchApi/Social-Accounts";
import Accounts from "@/page/Accounts";

const Page = async() => {
  const [server1, server2] = await Promise.all([
        getCategories(),
        listResources()
    ])
  return (
    <>
      <Accounts 
      acc1={server1}
      acc2={server2}
      />
    </>
  );
};

export default Page;

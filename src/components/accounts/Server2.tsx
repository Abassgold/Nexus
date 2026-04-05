import { MTPListResourceResponse } from '@/fetchApi/Social-Accounts'
import React from 'react'
import { Acc2ProductSection } from '../Acc2ProductSection'
interface AccountsProps {
    categories: MTPListResourceResponse
}
const Server2 = ({categories}:AccountsProps) => {
  return (
    <div>
       {categories.categories.map((item, index) => (
                      <Acc2ProductSection
                          key={item.id}
                          category={item.name}
                          title={item.name}
                          products={item.accounts}
                          accentLabel="HOT"
                      />
                  ))}
    </div>
  )
}

export default Server2;
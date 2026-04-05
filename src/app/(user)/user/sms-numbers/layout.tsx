import SmsHistory from '@/components/virtualNumber/SmsHistory'
import React from 'react'

const SmsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <div className='mt-6'>
            <SmsHistory />
            </div>
        </div>
    )
}

export default SmsLayout
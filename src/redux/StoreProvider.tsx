'use client'
import { AppStore, makeStore } from './store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import IsDarkModeWrapper from './IsDarkModeWrapper'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>
      <IsDarkModeWrapper>
        {children}
      </IsDarkModeWrapper>
    </Provider>
  )
}
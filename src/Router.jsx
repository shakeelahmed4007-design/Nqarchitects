import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

/* Pages that map to nav ids */
export const PAGES = ['home','services','portfolio','pricing','faq','about','contact']

export function RouterProvider({ children }) {
  const getPage = () => {
    const hash = window.location.hash.replace('#', '')
    return PAGES.includes(hash) ? hash : 'home'
  }

  const [page, setPageState] = useState(getPage)

  /* Listen to browser back/forward */
  useEffect(() => {
    const onHash = () => setPageState(getPage())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((id) => {
    window.location.hash = id
    setPageState(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <RouterContext.Provider value={{ page, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}

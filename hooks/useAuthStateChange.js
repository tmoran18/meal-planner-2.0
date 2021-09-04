import { useEffect } from 'react'

const useAuthStateChange = () => {
  useEffect(() => {
    console.log('custom hook running')
  }, [])
}

export default useAuthStateChange

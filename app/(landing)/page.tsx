'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const GarapinCloud = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/home')
  }, [])
  return (
    <div>GarapinCloud</div>
  )
}

export default GarapinCloud
import { memo, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'

export const PaymentMethods = memo(() => {
    const { role: userRole } = useAppSelector(selectUser)

    useEffect(() => {
        console.log(userRole);
    })

  return (
    <div>
        Hello
    </div>
  )
})

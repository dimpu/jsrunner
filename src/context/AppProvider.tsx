

import React, { FC, useState } from 'react'
import { AppContext } from './AppContext'

interface Props {
  children: React.ReactNode
}

const AppProvider: FC<Props> = ({ children }) => {
  const [code, setCode] = useState("")

  return (
    <AppContext.Provider value={{ code, setCode }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

"use client"

import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Appslider } from './_compomonents/Appslider'
import Appheader from './_compomonents/Appheader'

function Provider({ children, ...props }) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
    <SidebarProvider>
    
    <Appslider/>
    <div className='w-full'>

    <Appheader/>{children}</div>
      
      </SidebarProvider>
    </NextThemesProvider>
  )
}

export default Provider

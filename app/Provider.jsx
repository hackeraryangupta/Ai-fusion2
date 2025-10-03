"use client"

import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Appslider } from './_compomonents/Appslider'

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
    <SidebarTrigger/>
    <Appslider/>
      {children}
      </SidebarProvider>
    </NextThemesProvider>
  )
}

export default Provider

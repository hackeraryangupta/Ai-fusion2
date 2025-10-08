"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Appslider } from "./_compomonents/Appslider";
import Appheader from "./_compomonents/Appheader";
import { useUser } from "@clerk/nextjs";
 // make sure this path is correct
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/Firebase";
import { Aiselected } from "@/context/Aiselected";
import { DefaultModel } from "@/shared/AiModels";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children, ...props }) {
  const { user } = useUser();
  const [aiselectedmodels,setaiselectedmodels]=useState(DefaultModel);
  const [userDetail,setUserDetail]=useState();


  // create new user in Firestore when logged in
  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const userRef = doc(db, "users", userEmail); // collection name should be plural
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("✅ Existing user found");
        const userInfo=userSnap.data();
        setaiselectedmodels(userInfo?.selectedModelpref);
        setUserDetail(userInfo);
        return;
      } else {
        const userData = {
          name: user?.fullName,
          email: userEmail,
          createdAt: new Date(),
          remainingMsg: 5,
          plan: "Free",
          credits: 1000,
        };
        await setDoc(userRef, userData);
        console.log("🆕 New user data saved:", userData);
        setUserDetail(userData);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      
    >
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    <Aiselected.Provider value={{aiselectedmodels,setaiselectedmodels}}>
      <SidebarProvider>
        <Appslider />
        <div className="w-full">
          <Appheader />
          {children}
        </div>
      </SidebarProvider>
      </Aiselected.Provider>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}

export default Provider;

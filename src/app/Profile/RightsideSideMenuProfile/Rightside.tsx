"use client";
import React, { useMemo } from "react";
import "../style.css";
import ProfileForm from "@/app/componets/Profile/ProfileForm";
import Myreview from "../Myreview/page";
import TermCondition from "../TermCondition/page";
import Privacypolicy from "../Privacypolicy/page";
import MyFavorite from "../MyFavorite/Page";
import LeftSide from "../LeftSideMenuProfile/LeftSide";

interface RightsideProps {
  activeComponent: string;
}

function Rightside({ activeComponent }: RightsideProps) {
  // Memoize the rendered component based on activeComponent
  const renderComponent = useMemo(() => {
    switch (activeComponent) {
      case "ProfileForm":
        return <ProfileForm />;
      case "Myreview":
        return <Myreview />;
      case "TermCondition":
        return <TermCondition />;
      case "Privacypolicy":
        return <Privacypolicy />;
      case "MyFavorite":
        return <MyFavorite />;
      default:
        return <ProfileForm />;
    }
  }, [activeComponent]); // Re-run when activeComponent changes

  // useMemo(() => {
  //   console.log("my active component is " + activeComponent);
  // }, [activeComponent]);

  return (
    <>
      <div className="rightsidebordershadow w-full h-auto rounded-xl xl:px-6 xl:py-10">
        {/* Conditionally render components based on activeComponent */}
        {renderComponent}
      </div>

      
    </>
  );
}

export default Rightside;

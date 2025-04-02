import React from "react";
import MainSectionBlogs from "@/components/Blogs/MainSectionBlogs";
import NavbarGroup from "@/components/Global/NavbarGroup";
const page = () => {
  return (
    <main className="bg-black">
      <NavbarGroup/>
      <MainSectionBlogs />
    </main>
  );
};

export default page;

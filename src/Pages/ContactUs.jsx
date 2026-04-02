import React from "react";
import HeroCard from "../component/HeroCard";
import Form from "../component/Form";
import ContactInformation from "../component/ContactInformation";

const ContactUs = () => {
  return (
    <div>
      <HeroCard
        header={"ContactUs"}
        subHeader={
          " At Beiroot, we are passionate about bringing the vibrant flavors."
        }
      />
      <section className="max-w-[1440px] flex flex-col justify-center  lg:flex-row lg:flex-nowrap mx-auto w-full scroll-0 py-16 px-4 md:px-6 lg:px-8 flex  gap-12 md:gap- lg:gap-4">
        {" "}
        <Form className="flex-1" />
        {/*  */}
        <ContactInformation className="flex-1" />
      </section>
    </div>
  );
};

export default ContactUs;

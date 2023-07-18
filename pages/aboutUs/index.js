import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import AboutUs from "@/components/aboutUs/AboutUs";

const AboutUsPage = () => {
  return (
    <div>
      <Head>
        <title>About Us | Promokh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <AboutUs />
    </div>
  );
}

export default AboutUsPage;
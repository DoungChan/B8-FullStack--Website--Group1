import Head from "next/head";
import Link from "next/link";

const Policy = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <Head>
        <title>Policy | Promokh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="my-36 mx-4">
        <div className="max-w-4xl">
          <h1 className="text-black text-4xl font-semibold mb-6">
            Privacy Policy
          </h1>
          <p className="text-sub_font_color text-sm">
            Last Updated: July 18, 2013
          </p>
          <p className="text-sub_font_color text-base my-10">
            Thank you for using PromoKh, a web application dedicated to
            providing promotions, discounts, and special offers for various
            products and services in Cambodia. This Privacy Policy explains how
            we collect, use, and protect your personal information when you
            access and interact with our website. By using PromoKh, you agree to
            the practices outlined in this Privacy Policy.
          </p>

          <h3 className="text-font_color text-xl">Information We Collect</h3>
          <hr className="my-4 border-1 border-sub_font_color" />
          <ul className="list-disc list-inside	 text-sub_font_color">
            <li>
              Personal Information: When you sign up for an account, we may
              collect personal information such as your email address, and
              contact details.
            </li>
            <li>
              Usage Information: We may gather information about your
              interactions with our website, including the pages you visit, the
              promotions you view, and your search queries.
            </li>
          </ul>

          <h3 className="text-font_color text-xl mt-10">
            How We Use Your Information:
          </h3>
          <hr className="my-4 border-1 border-sub_font_color" />
          <ul className="list-disc list-inside text-sub_font_color">
            <li>
              Service Delivery and Personalization: We use your information to
              provide and improve our services, personalize your experience, and
              deliver relevant promotions based on your interests and
              preferences. This includes recommending promotions, sending
              notifications, and tailoring our website to meet your needs.
            </li>
            <li>
              Communication and Support: We may use your information to
              communicate with you, respond to your inquiries, and provide
              customer support. This includes sending transactional emails,
              service updates, and promotional messages that are relevant to
              your interests.
            </li>
            <li>
              Analytics and Research: We analyze user behavior and usage
              patterns to gain insights into the effectiveness of promotions,
              improve our services, and conduct research. This helps us optimize
              our offerings, enhance user satisfaction, and make data-driven
              decisions to benefit our users.
            </li>
          </ul>

          <h3 className="text-font_color text-xl mt-10">
            Information Sharing:
          </h3>
          <hr className="my-4 border-1 border-sub_font_color" />
          <ul className="list-disc list-inside text-sub_font_color">
            <li>
              We may share your personal information with trusted third-party
              service providers who assist us in delivering our services, such
              as email communication, data analysis, and website hosting.
            </li>
            <li>
              We may disclose your information when required by law or to
              protect the rights, property, or safety of PromoKh, its users, or
              others.
            </li>
          </ul>

          <h3 className="text-font_color text-xl mt-10">Data Security:</h3>
          <hr className="my-4 border-1 border-sub_font_color" />
          <ul className="list-disc list-inside text-sub_font_color">
            <li>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, disclosure, or alteration.
            </li>
            <li>
              However, please note that no method of data transmission over the
              internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </li>
          </ul>

          <h3 className="text-font_color text-xl mt-10">
            Updates to this Privacy Policy:
          </h3>
          <hr className="my-4 border-1 border-sub_font_color" />
          <ul className="list-disc list-inside text-sub_font_color">
            <li>
              We may update this Privacy Policy from time to time. The updated
              version will be posted on our website with the effective date.
              Please review the Privacy Policy periodically to stay informed
              about our practices.
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Policy;
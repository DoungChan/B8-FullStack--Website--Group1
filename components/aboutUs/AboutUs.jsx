import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Members } from "./Members";

const AboutUs = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="my-20">
        <div className="flex flex-col">
          <div className="flex flex-col mt-8">
            <div className="container max-w-4xl	px-4">
              <div className="flex flex-wrap justify-center text-center mb-10">
                <div className="w-full lg:w-8/12	 px-4">
                  <h1 className="text-gray-900 text-2xl font-bold mb-4">
                    Meet the{" "}
                    <span className="underline underline-offset-8 decoration-softPurple decoration-4">
                      Team
                    </span>
                    💜
                  </h1>

                  <p className="text-gray-700 text-base font-normal	">
                    We are Group 1 from KD Bootcamp, a dedicated team of
                    aspiring developers
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap">
                {Members.map((member) => (
                  <div
                    className="w-full md:w-6/12 lg:w-3/12 mb-3 px-6 sm:px-6 lg:px-4"
                    key={member.id}
                  >
                    <div className="flex flex-col">
                      <div className="mx-auto overflow-hidden rounded-lg max-h-[356px] lg:max-h-[217px]">
                        <Image
                          className="object-cover rounded-lg drop-shadow-md transition-all duration-200 delay-100"
                          src={member.member_image}
                          width={300}
                          height={300}
                        />
                      </div>

                      <div className="text-center mt-2">
                        <h1 className="text-font_color text-base font-bold mb-1">
                          🫰{member.member_name}
                        </h1>

                        <div className="text-gray-700 text-sm mb-1">
                          {member.member_title}
                        </div>

                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={member.member_github}
                            className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                          >
                            <Image
                              className="mx-auto"
                              src="/social_media_icon/github.svg"
                              alt="github"
                              width={24}
                              height={24}
                            />
                          </a>

                          <a
                            href={member.member_linkedin}
                            className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                          >
                            <Image
                              className="mx-auto"
                              src="/social_media_icon/linkedin.svg"
                              alt="linkedin"
                              width={20}
                              height={20}
                            />
                          </a>
                          <a
                            href={member.member_facebook}
                            className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                          >
                            <Image
                              className="mx-auto"
                              src="/social_media_icon/facebook.svg"
                              alt="linkedin"
                              width={20}
                              height={20}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

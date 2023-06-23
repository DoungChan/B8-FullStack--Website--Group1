import React from "react";
import Image from "next/image";
import signup from "public/signup.svg";
import logo from "public/logo.png";
import close from "public/close.svg";
import loading from "public/loading.svg";
import clientApiClient from "@/utils/clientApiClient";
import { useRecoilState } from "recoil";
import { profileCardAtom } from "@/state/recoilAtoms";
export default function SignUpModal() {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isProfileOpen, setIsProfileOpen] = useRecoilState(profileCardAtom);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const url = "api/auth/register";

    try {
      const response = await clientApiClient.post(url, {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data.data;
      clientApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setShowModal(false);
      setErrorMessage("");
    } catch (error) {
      if (error.response.data.status === 409) {
        setErrorMessage(
          "Email already registered. Please try a different one."
        );
      } else {
        setErrorMessage("Registration failed.");
      }
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      <button
        className="flex w-full justify-start items-center p-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <Image src={signup} className="w-4 h-4" alt="Love" />
        <p className="text-primary font-sans font-thin text-sm pl-2">Sign up</p>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4  my-6 mx-6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-end items-center">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 mr-2 mt-2 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Image src={close} className="w-4 h-4" alt="Love" />
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <Image src={logo} width={270} alt="PromoKH" />
                </div>
                <div className="flex flex-col px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pb-10">
                  <div className="text-black text-3xl mb-3 font-medium">
                    Create new account
                  </div>
                  <form onSubmit={handleSubmit}>
                    <input
                      className="appearance-none border-2 border-slate-400 w-full focus:outline-none focus:bg-white focus:border-primary rounded-md p-2 px-4 mb-3 text-black"
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                    <input
                      className="appearance-none border-2 border-slate-400 w-full focus:outline-none focus:bg-white focus:border-primary rounded-md p-2 px-4 mb-3 text-black"
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      minLength={6}
                      maxLength={60}
                    />
                    {errorMessage && (
                      <div className="flex justify-center text-red-500 text-sm text-center">
                        {errorMessage}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="flex justify-center w-full bg-primary hover:opacity-50 text-white rounded-lg mt-8 font-bold text-xl py-2"
                    >
                      {isLoading ? (
                        <Image
                          src={loading}
                          className="animate-spin w-7 h-7"
                          alt="Love"
                        />
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </form>
                  <div className="flex justify-center text-gray-500 text-xs mt-3">
                    Already have an account? Login
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

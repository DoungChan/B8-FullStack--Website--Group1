import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import { RecoilRoot } from "recoil";
export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

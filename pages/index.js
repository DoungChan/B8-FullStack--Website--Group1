import UnauthorizeComponent from "./components/UnauthorizeComponent";

UnauthorizeComponent;

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center text-font_color">
          Welcome to{" "}
          <a
            className="text-blue-600 hover:underline"
            href="https://nextjs.org"
          >
            Next.js!
          </a>
        </h1>
        <div className=" flex-col items-center ">
          <UnauthorizeComponent />
        </div>
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <section className="bg-gray-50 h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold text-Primary sm:text-5xl">
              Understand User Flow.
              <strong className="font-extrabold text-Secondary sm:block"> Increase Conversion. </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-Primary">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
              numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link
                  className="block w-full rounded hover:bg-Tertiary bg-Secondary px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                  href="#"
                >
                  Get Started
                </Link>
              </Button>
              <Button className=" bg-white text-black shadow-sm hover:shadow-lg hover:bg-white" asChild>
                <Link
                  href="#"
                >
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className=" flex flex-col items-stretch min-h-screen">
        <div className=" max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back</h1>

              <p className="mt-1.5 text-sm text-gray-500">Let&apos;s write a new blog post! 🎉</p>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> View Website </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>

              <button
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
        {children}
      </section>
    </>
  );
}
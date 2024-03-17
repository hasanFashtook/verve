import BreadCrumb from "@/components/shared/BreadCrumb";

export default function Layout({
  children,
  details,
  related
}: {
  children: React.ReactNode,
  details: React.ReactNode,
  related: React.ReactNode
}) {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 my-6">
        <BreadCrumb />
        <div className=" my-6">
          <div className="min-h-[calc(100vh-9rem)]">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Product Details</h1>
              <p className="mt-1.5 text-sm text-gray-500">More info about the product</p>
            </div>
            {details}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Related Products</h1>
            <p className="mt-1.5 text-sm text-gray-500">products to suit your preferences</p>
          </div>
          {related}
        </div>
      </div>
    </>
  );
}
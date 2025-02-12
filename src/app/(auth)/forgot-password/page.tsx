import ForgotPassword from "./ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="w-full flex justify-between items-center h-full">
      <section className="flex flex-col w-full px-8">
      <h1 className="text-6xl w-full text-center font-bold mb-2">
            mift
          </h1>
          <p className="text-center">forgot password?</p>
          <ForgotPassword />
        </section>
      </div>
    </>
  );
}

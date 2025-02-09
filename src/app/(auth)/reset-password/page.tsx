import ResetPassword from "./ResetPassword";

export default function ResetPasswordPage() {
  return (
      <div className="w-full flex justify-between items-center h-full">
        <section className="flex flex-col w-[400px] px-8">
        <h1 className="text-6xl w-full text-center font-bold mb-2">
            mift
          </h1>
          <p className="text-center">rester your password</p>
          <ResetPassword />
        </section>
      </div>
  );
}

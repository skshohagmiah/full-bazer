import GoogleSignIn from "@/components/auth/GoogleSignIn";
import EmailSignUpForm from "@/components/auth/EmailSignUpForm";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-5 bg-white rounded-md shadow-md dark:bg-gray-800">
        <div>
          <h2 className="text-3xl font-extrabold text-start text-gray-900 dark:text-gray-100">
            Welcome to Nextify
          </h2>
          <small className="text-muted-foreground">
            Sign up to shop anything and manage your account.
          </small>
        </div>

        <GoogleSignIn text="Sign up with Google" />

        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative px-4 text-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
            Or continue with
          </div>
        </div>

        <EmailSignUpForm />
      </div>
    </div>
  );
}

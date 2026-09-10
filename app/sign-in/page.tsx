import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading Sign In form...</div>}>
      <SignInForm />
    </Suspense>
  );
}
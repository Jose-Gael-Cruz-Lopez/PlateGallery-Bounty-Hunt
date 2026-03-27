import type { ReactNode } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) &&
  !String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY).includes("placeholder");

function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-panel">{children}</div>
    </div>
  );
}

export function SignInPage() {
  return (
    <AuthShell>
      {clerkEnabled ? <SignIn /> : <p>Set `VITE_CLERK_PUBLISHABLE_KEY` to enable the themed Clerk sign-in flow.</p>}
    </AuthShell>
  );
}

export function SignUpPage() {
  return (
    <AuthShell>
      {clerkEnabled ? <SignUp /> : <p>Set `VITE_CLERK_PUBLISHABLE_KEY` to enable the themed Clerk sign-up flow.</p>}
    </AuthShell>
  );
}

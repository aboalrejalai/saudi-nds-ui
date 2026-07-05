/**
 * login-form-example.tsx
 *
 * Reference composition showing how NDS components interlock in a real screen:
 * Card (structure) + Label + Input (form fields) + Button (submit).
 *
 * It is an Arabic, RTL-first form. Copy it into your app (e.g. at
 * `components/examples/login-form.tsx`) and render `<LoginForm />`.
 *
 * Install the components it depends on first:
 *   npx shadcn@latest add @dga/button @dga/input @dga/label @dga/card
 */
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // NOTE: spacing uses logical utilities (gap-y, mb-*) which are direction-agnostic,
  // so the same markup renders correctly in both rtl and ltr.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    // TODO: replace with your auth call.
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  }

  return (
    // The page already sets <html lang="ar" dir="rtl">; this card simply inherits it.
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>تسجيل الدخول</CardTitle>
        <CardDescription>أدخل بياناتك للوصول إلى حسابك</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-y-4">
          {/* Each field pairs a <Label> (htmlFor) with an <Input> (id) so screen
              readers announce the relationship — always link them explicitly. */}
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="mt-6 flex flex-col gap-y-3">
          {/* `variant="default"` is the DGA primary green. Use the `loading`
              state to disable the button and prevent duplicate submits. */}
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? "جارٍ الدخول..." : "دخول"}
          </Button>
          <Button type="button" variant="ghost" className="w-full">
            نسيت كلمة المرور؟
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default LoginForm;

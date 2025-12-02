"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { loginSchame, loginSchameType } from "@/lib/schemas/authSchema";
import { useAppDispatch } from "@/lib/store/hooks";
import { userLogin } from "@/lib/store/auth/authSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchameType>({
    resolver: zodResolver(loginSchame),
  });

  const onSubmit = async (data: loginSchameType) => {
    const result: any = await dispatch(userLogin(data));

    if (result?.payload?.success) {
      alert("Login Successfully!");
    } else {
      alert(result?.payload?.message || "Login Failed!");
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center px-4 py-6">
      {/* Back */}
      <a
        href="/"
        className="text-gray-600 text-sm flex items-center gap-1 mb-6"
      >
        ← Back to Home
      </a>

      {/* Logo */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-3xl">🔒</span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-gray-900">
          Welcome to DSA Body
        </h1>

        <p className="text-gray-500 text-sm">
          Editor and Enroll Course Platform Online
        </p>
      </div>

      {/* Card */}
      <Card className="mt-8 w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-xs text-gray-500">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="mt-1 bg-gray-100 border-gray-300"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Password
              </Label>

              <div className="mt-1 flex items-center border rounded-lg px-3 bg-gray-100">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                  {...register("password")}
                />

                {/* Show/Hide Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/forgot-password" className="text-green-600">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-green-600">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

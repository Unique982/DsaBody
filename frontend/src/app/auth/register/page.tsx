"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { registerSchameType } from "@/lib/schemas/authSchema";
import { registerSchame } from "@/lib/schemas/authSchema";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/lib/store/hooks";
import { userRegister } from "@/lib/store/auth/authSlice";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showCPassword, setShowCPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchameType>({
    resolver: zodResolver(registerSchame),
  });

  const onSubmit = async (data: any) => {
    const result: any = await dispatch(userRegister(data));

    if (result.success) {
      toast.success("Registration Successful! Please login.");
      setTimeout(() => (window.location.href = "/auth/login"), 1200);
    } else {
      toast.error(result.message || "Registration Failed!");
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
          Join DSA Body
        </h1>

        <p className="text-gray-500 text-sm text-center">
          Create Your Account — Editor and Enroll Course Platform Online
        </p>
      </div>

      {/* Card */}
      <Card className="mt-8 w-full max-w-lg sm:max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Register using your information below
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
              OR REGISTER WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* First Name */}
              <div className="w-full sm:w-1/2">
                <Label className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="mt-1 bg-gray-100 border-gray-300"
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="w-full sm:w-1/2">
                <Label className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="mt-1 bg-gray-100 border-gray-300"
                  {...register("lastname")}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {/* <div>
              <Label className="text-sm font-medium text-gray-700">
                Country
              </Label>
              <Select onValueChange={(value) => setValue("role", value)}>
                <SelectTrigger className="mt-1 bg-gray-100 border-gray-300">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>

              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div> */}

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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>

              <div className="mt-1 flex items-center border rounded-lg px-3 bg-gray-100">
                <input
                  type={showCPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowCPassword(!showCPassword)}
                  className="text-gray-600"
                >
                  {showCPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <input type="checkbox" className="mt-1" />
              <p>
                I agree to the{" "}
                <a className="text-green-600 underline" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-green-600 underline" href="#">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Submit */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-green-600">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

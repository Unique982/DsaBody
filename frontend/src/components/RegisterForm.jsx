export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4">
      {/* Back to Home */}
      <div className="w-full max-w-md mb-4">
        <a href="/" className="text-gray-600 text-sm flex items-center gap-1">
          ← Back to Home
        </a>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl">
            🔒
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Join Doclock
          </h2>
          <p className="text-gray-500 text-sm">
            Create your secure file sharing account
          </p>
        </div>

        {/* Google Button */}
        <button className="mt-6 w-full border rounded-lg flex items-center justify-center gap-2 py-2 text-gray-700 hover:bg-gray-50">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-xs text-gray-500">
            OR REGISTER WITH EMAIL
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 border rounded-lg px-3 py-2 text-sm focus:outline-green-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 border rounded-lg px-3 py-2 text-sm focus:outline-green-500"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-green-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-green-500"
          />

          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <p className="text-xs text-gray-600">
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

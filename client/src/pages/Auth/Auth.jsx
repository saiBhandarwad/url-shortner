import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Seo from "../../components/common/Seo";
import { getMe, login, signup } from "../../api/auth.api";
import { toast } from "sonner";

const schemas = {
  login: z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must have 6 characters"),
  }),
  signup: z.object({
    name: z.string().min(2, "Enter your name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Use at least 8 characters"),
  }),
  forgot: z.object({ email: z.string().email("Enter a valid email") }),
};
export default function Auth({ type }) {
  const [show, setShow] = useState(false),
    [loading, setLoading] = useState(false),
    [sent, setSent] = useState(false);
  const { loginAuthContext } = useAuth(),
    go = useNavigate();
  const isSignup = type === "signup",
    isLogin = type === "login",
    isForgot = type === "forgot";
  const {user} = useAuth()
  const fetchCurrentUser = async () => {
    if(user){
      go("/dashboard")
      return
    }
    try {
      const token =
        localStorage.getItem("accessToken");
      if (!token) {
        return;
      }
      const response = await getMe();
      if (response.data?.success) {
        console.log({ response });
        loginAuthContext()
        toast.success("logged in successfully!");
        go("/dashboard")
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemas[type]) });
  
  const submit = async (data) => {
    const { name, email, password } = data
    try {
      if (isSignup) {
        const response = await signup({ name, email, password })
        if (response.data.success) {
          localStorage.setItem("accessToken", response.data?.data?.accessToken)
          toast.success("Account created successfully!");
          loginAuthContext()
          go("/dashboard");
        }
      }
      if (isLogin) {
        const response = await login({ email, password })
        if (response.data.success) {
          localStorage.setItem("accessToken", response.data?.data?.accessToken)
          toast.success("Welcome back!");
          loginAuthContext()
          go("/dashboard");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };
  const title = isSignup
    ? "Create your workspace"
    : isForgot
      ? "Reset your password"
      : "Welcome back";
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-5 dark:bg-slate-950">
      <Seo title={`${title} — Linklane`} />
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-2 text-xl font-extrabold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white">
            <Link2 size={19} />
          </span>
          Linklane
        </Link>
        <div className="card mt-8 p-7 sm:p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {isForgot
              ? "We’ll email you a secure reset link."
              : isSignup
                ? "Start measuring what matters today."
                : "Sign in to your Linklane workspace."}
          </p>
          {sent ? (
            <div className="mt-7 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
              If an account exists, a reset link is on its way.
            </div>
          ) : (
            <form onSubmit={handleSubmit(submit)} className="mt-7 space-y-4">
              {isSignup && (
                <Field label="Full name" error={errors.name}>
                  <input
                    className="input"
                    placeholder="Alex Morgan"
                    {...register("name")}
                  />
                </Field>
              )}
              <Field label="Email address" error={errors.email}>
                <input
                  className="input"
                  placeholder="you@company.com"
                  {...register("email")}
                />
              </Field>
              {!isForgot && (
                <Field label="Password" error={errors.password}>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      className="input pr-11"
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-3 top-2.5 text-slate-400"
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </Field>
              )}
              <button disabled={loading} className="btn-primary w-full">
                {loading
                  ? "Please wait…"
                  : isForgot
                    ? "Send reset link"
                    : isSignup
                      ? "Create account"
                      : "Sign in"}
              </button>
            </form>
          )}{" "}
          {!isForgot && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
                OR
              </div>
              <button className="btn-secondary w-full">
                Continue with Google
              </button>
            </>
          )}
          <p className="mt-6 text-center text-sm text-slate-500">
            {isForgot ? (
              <Link to="/login" className="font-semibold text-indigo-600">
                Back to sign in
              </Link>
            ) : isSignup ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-indigo-600">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New to Linklane?{" "}
                <Link to="/signup" className="font-semibold text-indigo-600">
                  Create an account
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1.5">{children}</div>
      {error && (
        <span className="mt-1 block text-xs text-red-500">{error.message}</span>
      )}
    </label>
  );
}

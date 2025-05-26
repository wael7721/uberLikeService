import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Mail, Lock, Loader2 } from "lucide-react";
import IconInput from "./iconInput";
import { useRouter } from "next/router";
import { useState } from "react";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, actions) => {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (data.type === "success") {
          toast.success(`Welcome back!`);
          actions.resetForm();
          router.push("/dashboard");
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      className="animate-fade-in flex flex-col gap-5 bg-white w-[90%] sm:w-[60%] md:w-[40%] lg:w-[35%] justify-center aspect-square rounded-2xl shadow-2xl p-8 text-gray-900"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <h2 className="text-center text-2xl font-bold text-yellow-600 mb-4">
        Sign In
      </h2>

      <IconInput
        id="email"
        label="Email"
        icon={<Mail className="w-5 h-5 text-yellow-600" />}
        type="email"
        fieldProps={formik.getFieldProps("email")}
        error={
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
        }
        touched={formik.touched.email}
      />

      <div className="flex flex-col">
        <IconInput
          id="password"
          label="Password"
          icon={<Lock className="w-5 h-5 text-yellow-600" />}
          type="password"
          fieldProps={formik.getFieldProps("password")}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          touched={formik.touched.password}
        />
        <a
          href="/forgot-password"
          className="mt-1 text-sm text-yellow-600 hover:underline text-right"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 rounded-md transition ${
          isSubmitting
            ? "cursor-not-allowed opacity-70"
            : "hover:bg-yellow-700"
        }`}
      >
        {isSubmitting && (
          <Loader2 className="animate-spin w-4 h-4" />
        )}
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      <div className="text-center text-sm mt-2">
        New user?{" "}
        <a href="/signup" className="text-yellow-600 hover:underline">
          Sign up!
        </a>
      </div>
    </form>
  );
}

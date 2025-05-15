import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Mail, Lock, Calendar, User, Car } from "lucide-react";
import IconInput from "./iconInput";

type UserType = "passenger" | "taxi";

type FormValues = {
  name: string;
  email: string;
  password: string;
  dob: string;
  userType: "" | UserType;
};

export default function SignUpPage() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      dob: "",
      userType: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Required minimum 8 characters")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
      dob: Yup.date()
        .max(new Date(), "Date of birth must be in the past")
        .required("Date of birth is required"),
      userType: Yup.mixed<UserType>()
        .oneOf(["passenger", "taxi"], "Select a valid user type")
        .required("User type is required"),
    }),

    onSubmit: async (values, actions) => {
      try {
        const res = await fetch("/api/SignUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (data.type === "success") {
          toast.success(`Thank you, ${values.name}!`);
          actions.resetForm();
        } else {
          toast.error(data.message || "Something went wrong!");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
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
        Sign Up
      </h2>

      <IconInput
        id="name"
        label="Name"
        icon={<User className="w-5 h-5 text-yellow-600" />}
        fieldProps={formik.getFieldProps("name")}
        error={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
        touched={formik.touched.name}
      />

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

      <IconInput
        id="dob"
        label="Date of Birth"
        icon={<Calendar className="w-5 h-5 text-yellow-600" />}
        type="date"
        fieldProps={formik.getFieldProps("dob")}
        error={formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""}
        touched={formik.touched.dob}
      />

      {/* User Type */}
      <div className="relative mt-4">
        <label className="mb-1 block text-yellow-700 font-medium">
          Are you a
        </label>

        <div className="relative w-full max-w-m mx-auto">
          {/* Sliding background */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-yellow-600 rounded-full transition-transform duration-300 ease-in-out z-0 ${
              formik.values.userType === ""?"opacity-0":formik.values.userType==="taxi"
                ? "translate-x-full"
                : "translate-x-0"
            }`}
          />

          {/* Toggle container */}
          <div className="relative z-10 flex text-sm font-medium text-center text-yellow-600 border border-yellow-400 rounded-full overflow-hidden">
            {/* Passenger Button */}
            <button
              type="button"
              onClick={() => formik.setFieldValue("userType", "passenger")}
              className={`w-1/2 px-4 py-2 flex items-center justify-center gap-2 transition-colors duration-300 ${
                formik.values.userType === "passenger"
                  ? "text-white"
                  : "text-yellow-600"
              }`}
            >
              <User className="w-4 h-4" />
              Passenger
            </button>

            {/* Driver Button */}
            <button
              type="button"
              onClick={() => formik.setFieldValue("userType", "taxi")}
              className={`w-1/2 px-4 py-2 flex items-center justify-center gap-2 transition-colors duration-300 ${
                formik.values.userType === "taxi"
                  ? "text-white"
                  : "text-yellow-600"
              }`}
            >
              <Car className="w-4 h-4" />
              Driver
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
}

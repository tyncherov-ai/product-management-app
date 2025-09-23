import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { registerThunk } from "../store/slices/authSlice";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Input } from "../components/ui/Input";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await dispatch(registerThunk(data))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  };

  return (
    <AuthLayout>
      <div className="w-full md:max-w-md bg-white rounded-2xl shadow-xl p-8 max-sm:px-4 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 max-sm:text-2xl">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mt-2 max-sm:text-sm">
          Get started with ProductHub today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <Input
            label="Full Name"
            type="text"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <Input
            label="Email Address"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 rounded-lg text-white font-bold text-sm transition-opacity disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" /> : "Create Account"}
            </button>
            {error && (
              <p className="text-red-500 text-sm font-semibold mt-2">{error}</p>
            )}
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;

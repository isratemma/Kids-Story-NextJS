'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { registerUser } from '@/actions/server/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');

    // Step 1: save user to DB
    const result = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (result?.error) {
      setLoading(false);
      setServerError(result.error);
      return;
    }

    // Step 2: auto-login via next-auth/react (client-side, can set cookies correctly)
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      // Registration succeeded but auto-login failed — send to login
      router.push('/login?registered=1');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
            <p className="mt-2 text-sm text-gray-500">Join Kids Story and start exploring</p>
          </div>

          {serverError && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <FiUser className="h-4 w-4" aria-hidden="true" />
                </span>
                <input id="name" name="name" type="text" autoComplete="name" required
                  value={form.name} onChange={handleChange} placeholder="Your name"
                  className={`input input-bordered w-full pl-9 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary ${errors.name ? 'input-error' : ''}`} />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <FiMail className="h-4 w-4" aria-hidden="true" />
                </span>
                <input id="email" name="email" type="email" autoComplete="email" required
                  value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className={`input input-bordered w-full pl-9 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary ${errors.email ? 'input-error' : ''}`} />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <FiLock className="h-4 w-4" aria-hidden="true" />
                </span>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password" required value={form.password} onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`input input-bordered w-full pl-9 pr-10 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary ${errors.password ? 'input-error' : ''}`} />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <FiLock className="h-4 w-4" aria-hidden="true" />
                </span>
                <input id="confirm" name="confirm" type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password" required value={form.confirm} onChange={handleChange}
                  placeholder="Repeat password"
                  className={`input input-bordered w-full pl-9 pr-10 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary ${errors.confirm ? 'input-error' : ''}`} />
                <button type="button" aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                  {showConfirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirm && <p className="mt-1.5 text-xs text-red-500">{errors.confirm}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full rounded-xl text-white font-semibold mt-2">
              {loading ? <span className="loading loading-spinner loading-sm" /> : 'Create account'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <hr className="flex-1 border-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

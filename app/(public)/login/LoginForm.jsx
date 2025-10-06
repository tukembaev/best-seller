'use client'

import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { loginStart, loginSuccess, loginFailure } from "@/lib/features/auth/authSlice"
import { loginUser } from "@/app/actions/authActions"

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      dispatch(loginStart())
      
      try {
        const result = await loginUser(formData)
        
        if (result.success) {
          dispatch(loginSuccess(result.user))
          
          // Save to localStorage
          localStorage.setItem('authUser', JSON.stringify(result.user))
          
          toast.success('Login successful!')
          
          // Redirect based on user role
          if (result.user.role === 'admin') {
            router.push('/admin')
          } else if (result.user.store) {
            router.push('/store')
          } else {
            router.push('/')
          }
        } else {
          dispatch(loginFailure(result.error))
          toast.error(result.error || 'Login failed')
        }
      } catch (error) {
        dispatch(loginFailure('Network error'))
        toast.error('Network error')
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
            Password
          </label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={loading || isPending}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 disabled:opacity-50"
        >
          {loading || isPending ? 'Signing in...' : 'Sign in'}
        </button>
        <Link href={'/'}>
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-white-600 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          >
            Back to shop
          </button>
        </Link>
      </div>
    </form>
  )
}

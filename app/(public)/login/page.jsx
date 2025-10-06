import LoginForm from "./LoginForm"

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto dark:hidden"
        />
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto not-dark:hidden"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <div className="mt-10 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">Test Accounts:</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> admin@store.test / password123</p>
            <p><strong>Store Owner:</strong> owner@example.com / password123</p>
            <p><strong>Test Users:</strong> user1@test.com to user20@test.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
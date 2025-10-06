'use client'

import { useState } from 'react'
import { testAuth } from '@/app/actions/testAuth'

export default function TestAuthPage() {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleTest = async () => {
        setLoading(true)
        try {
            const response = await testAuth()
            setResult(response)
        } catch (error) {
            setResult({ success: false, error: error.message })
        }
        setLoading(false)
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Test Authentication</h1>
            
            <button
                onClick={handleTest}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Testing...' : 'Test Auth'}
            </button>

            {result && (
                <div className="mt-4 p-4 border rounded">
                    <h3 className="font-semibold mb-2">Result:</h3>
                    <pre className="bg-gray-100 p-2 rounded text-sm">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}

            <div className="mt-8">
                <h3 className="font-semibold mb-2">Test Credentials:</h3>
                <div className="bg-gray-100 p-4 rounded">
                    <p><strong>Email:</strong> owner@example.com</p>
                    <p><strong>Password:</strong> password123</p>
                    <p className="text-sm text-gray-600 mt-2">
                        Use these credentials to login and test the template functionality.
                    </p>
                </div>
            </div>
        </div>
    )
}

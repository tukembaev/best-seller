import { cookies, headers } from 'next/headers'

export async function getCurrentUser() {
    try {
        // Try to get from cookies first
        const cookieStore = cookies()
        const userCookie = cookieStore.get('authUser')
        
        if (userCookie) {
            const user = JSON.parse(userCookie.value)
            return user
        }
        
        // Try to get from headers (for API requests)
        const headersList = headers()
        const authHeader = headersList.get('authorization')
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7)
            try {
                const user = JSON.parse(Buffer.from(token, 'base64').toString())
                return user
            } catch (e) {
                // Invalid token format
            }
        }
        
        return null
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}

export async function requireAuth() {
    const user = await getCurrentUser()
    
    if (!user) {
        throw new Error('Unauthorized')
    }
    
    return user
}

// Client-side auth helper
export function getClientUser() {
    if (typeof window === 'undefined') return null
    
    try {
        const userData = localStorage.getItem('authUser')
        return userData ? JSON.parse(userData) : null
    } catch (error) {
        console.error('Error getting client user:', error)
        return null
    }
}

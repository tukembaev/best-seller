'use server'

import { getCurrentUser } from '@/lib/auth'

export async function testAuth() {
    try {
        const user = await getCurrentUser()
        
        if (!user) {
            return { success: false, error: 'No user found' }
        }
        
        return { success: true, user: { id: user.id, name: user.name, email: user.email } }
    } catch (error) {
        console.error('Error testing auth:', error)
        return { success: false, error: error.message }
    }
}

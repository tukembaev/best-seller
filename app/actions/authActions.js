'use server'

import prisma from "@/lib/prisma.js"
import bcrypt from "bcryptjs"
import { cookies } from 'next/headers'

export async function authenticateUser(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        store: true // Include store relation
      }
    })
    
    if (!user || !user.password) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error('Error authenticating user:', error)
    return { success: false, error: 'Authentication failed' }
  }
}

export async function loginUser(formData) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        store: true // Include store relation
      }
    })
    
    if (!user || !user.password) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    
    // Set cookie for server-side authentication
    const cookieStore = cookies()
    cookieStore.set('authUser', JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error('Error authenticating user:', error)
    return { success: false, error: 'Authentication failed' }
  }
}

export async function getUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        isMember: true
      }
    })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    return { success: true, user }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { success: false, error: 'Failed to fetch user' }
  }
}

export async function logoutUser() {
  try {
    const cookieStore = cookies()
    cookieStore.delete('authUser')
    return { success: true }
  } catch (error) {
    console.error('Error logging out user:', error)
    return { success: false, error: 'Logout failed' }
  }
}
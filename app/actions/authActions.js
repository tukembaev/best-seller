'use server'

import prisma from "@/lib/prisma.js"
import bcrypt from "bcryptjs"

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

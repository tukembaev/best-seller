'use server'

import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function createTemplate(formData) {
    try {
        const user = await requireAuth()

        const templateData = {
            name: formData.get('name'),
            userId: user.id,
            collection: formData.get('collection') || null,
            mechanism: formData.get('mechanism') || null,
            gender: formData.get('gender') || null,
            caseSize: formData.get('caseSize') || null,
            caseMaterial: formData.get('caseMaterial') || null,
            strapMaterial: formData.get('strapMaterial') || null,
            waterResistance: formData.get('waterResistance') || null,
        }

        const template = await prisma.productTemplate.create({
            data: templateData
        })

        return { success: true, template }
    } catch (error) {
        console.error('Error creating template:', error)
        return { success: false, error: 'Failed to create template' }
    }
}

export async function getTemplates() {
    try {
        const user = await requireAuth()

        const templates = await prisma.productTemplate.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return { success: true, templates }
    } catch (error) {
        console.error('Error fetching templates:', error)
        return { success: false, error: 'Failed to fetch templates' }
    }
}

export async function deleteTemplate(templateId) {
    try {
        const user = await requireAuth()

        await prisma.productTemplate.delete({
            where: {
                id: templateId,
                userId: user.id
            }
        })

        return { success: true }
    } catch (error) {
        console.error('Error deleting template:', error)
        return { success: false, error: 'Failed to delete template' }
    }
}

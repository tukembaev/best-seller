'use client'

import { useState, useEffect } from 'react'
import { getTemplates } from '@/app/actions/templateActions'

export default function TemplateTabs({ onTemplateSelect, selectedTemplate }) {
    const [templates, setTemplates] = useState([])
    const [loading, setLoading] = useState(true)

    const handleTemplateClick = (template) => {
        // Если кликнули на уже активный таб, отключаем его
        if (selectedTemplate?.id === template.id) {
            onTemplateSelect(null)
        } else {
            onTemplateSelect(template)
        }
    }

    useEffect(() => {
        const fetchTemplates = async () => {
            const result = await getTemplates()
            if (result.success) {
                setTemplates(result.templates)
            }
            setLoading(false)
        }
        fetchTemplates()
    }, [])

    if (loading) {
        return (
            <div className="flex space-x-2">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
                <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateClick(template)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        selectedTemplate?.id === template.id
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                >
                    {template.name}
                </button>
            ))}
            {templates.length === 0 && (
                <div className="text-sm text-gray-500 italic">
                    No templates available
                </div>
            )}
        </div>
    )
}

'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { createTemplate } from '@/app/actions/templateActions'
import { CASE_MATERIAL_OPTIONS, CASE_SIZE_OPTIONS, STRAP_MATERIAL_OPTIONS, WATER_RESISTANCE_OPTIONS } from '@/shared/watchOptions'

export default function TemplateModal({ isOpen, onClose, onTemplateCreated }) {
    const [loading, setLoading] = useState(false)
    const [templateData, setTemplateData] = useState({
        name: '',
        collection: '',
        mechanism: '',
        gender: '',
        caseSize: '',
        caseMaterial: '',
        strapMaterial: '',
        waterResistance: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        Object.keys(templateData).forEach(key => {
            formData.append(key, templateData[key])
        })

        const result = await createTemplate(formData)
        
        if (result.success) {
            toast.success('Template created successfully!')
            onTemplateCreated(result.template)
            setTemplateData({
                name: '',
                collection: '',
                mechanism: '',
                gender: '',
                caseSize: '',
                caseMaterial: '',
                strapMaterial: '',
                waterResistance: ''
            })
            onClose()
        } else {
            toast.error(result.error || 'Failed to create template')
        }
        
        setLoading(false)
    }

    const handleChange = (e) => {
        setTemplateData({ ...templateData, [e.target.name]: e.target.value })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add New Template</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Template Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={templateData.name}
                            onChange={handleChange}
                            placeholder="e.g., Plastic Men's Watch"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Collection
                            </label>
                            <input
                                type="text"
                                name="collection"
                                value={templateData.collection}
                                onChange={handleChange}
                                placeholder="e.g., Submariner"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mechanism
                            </label>
                            <select
                                name="mechanism"
                                value={templateData.mechanism}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select movement type</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual Winding">Manual Winding</option>
                                <option value="Quartz">Quartz</option>
                                <option value="Solar">Solar</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={templateData.gender}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select gender</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Case Size
                            </label>
                            <select
                                name="caseSize"
                                value={templateData.caseSize}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select case size</option>
                                {CASE_SIZE_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Case Material
                            </label>
                            <select
                                name="caseMaterial"
                                value={templateData.caseMaterial}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select case material</option>
                                {CASE_MATERIAL_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Strap Material
                            </label>
                            <select
                                name="strapMaterial"
                                value={templateData.strapMaterial}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select strap material</option>
                                {STRAP_MATERIAL_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Water Resistance
                            </label>
                            <select
                                name="waterResistance"
                                value={templateData.waterResistance}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select water resistance</option>
                                {WATER_RESISTANCE_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Template'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

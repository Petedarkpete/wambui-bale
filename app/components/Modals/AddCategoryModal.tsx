import { useState } from 'react'
import { X, Loader2, AlertCircle } from 'lucide-react'
import { Description } from '@radix-ui/react-toast'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const AddCategoryModal = ({ onClose }: Props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
    })

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
        setForm({ name, slug, description: form.description })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to create category')
            }

            onClose()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-black/70 backdrop-blur-md p-4 py-8">
            <div className="relative bg-white dark:bg-zinc-950 w-full max-w-md rounded-2xl border border-input shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-input bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm rounded-t-2xl">
                    <h2 className="text-xl font-bold text-foreground">Add New Category</h2>
                    <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Women, Kids, Mixed"
                            value={form.name}
                            onChange={handleNameChange}
                            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            Slug
                            <span className="text-xs text-muted-foreground font-normal">(auto-generated)</span>
                        </label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={e => setForm({ ...form, slug: e.target.value })}
                            placeholder="e.g. women-clothes"
                            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none text-muted-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description
                            <span className="text-xs text-muted-foreground font-normal ml-2">(optional)</span>
                        </label>
                        <textarea
                            rows={3}
                            placeholder="e.g. Second-hand women's clothing bales from Turkey"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none resize-none"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {error}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-input">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2 rounded-lg bg-gradient-to-r from-black from-80% to-green-600 text-white font-medium hover:to-green-500 transition-all shadow-lg active:scale-95 disabled:opacity-60 flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? 'Saving...' : 'Add Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
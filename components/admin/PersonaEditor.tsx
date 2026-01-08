'use client'

import { useState, useTransition } from 'react'
import { PersonaContent, PersonaType } from '@/data/house-data'
import { updateHouseContent } from '@/lib/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea" // Need to check if exists, if not use Input
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PersonaEditorProps {
    persona: PersonaType
    initialData: PersonaContent
}

export function PersonaEditor({ persona, initialData }: PersonaEditorProps) {
    const [data, setData] = useState<PersonaContent>(initialData)
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState<string>('')

    const handleChange = (section: keyof PersonaContent, key: string, value: any, subKey?: string) => {
        setData(prev => {
            const newData = { ...prev }
            if (section === 'Headline' || section === 'Subheadline' || section === 'SpaceHack_Label' || section === 'SpaceHack_Desc' || section === 'Concierge_Greeting' || section === 'CallToAction' || section === 'Detailed_Description' || section === 'Location_Highlights') {
                // Bilingual Text
                newData[section] = { ...newData[section] as any, [key]: value }
            } else if (section === 'HeroImage') {
                newData[section] = value
            }
            else if (section === 'Engineering_Focus') {
                // Complex nested
                const eng = newData.Engineering_Focus || { Title: { ru: '', en: '' }, Text: { ru: '', en: '' } }
                if (subKey) {
                    (eng as any)[key][subKey] = value
                }
                newData.Engineering_Focus = eng
            }
            return newData
        })
    }

    // Direct handler for nested objects to simplify generic logic above
    const updateBilingual = (field: keyof PersonaContent, lang: 'ru' | 'en', value: string) => {
        setData(prev => ({
            ...prev,
            [field]: { ...prev[field] as any, [lang]: value }
        }))
    }

    const save = () => {
        setStatus('Saving...')
        startTransition(async () => {
            try {
                await updateHouseContent(persona, data)
                setStatus('Saved!')
                setTimeout(() => setStatus(''), 2000)
            } catch (e) {
                console.error(e)
                setStatus('Error saving')
            }
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg sticky top-0 z-10 backdrop-blur">
                <div>
                    <h3 className="text-lg font-bold">{persona} Editor</h3>
                    <p className="text-sm text-gray-500">{status}</p>
                </div>
                <Button onClick={save} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <Tabs defaultValue="main">
                <TabsList>
                    <TabsTrigger value="main">Main Info</TabsTrigger>
                    <TabsTrigger value="details">Details & Text</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    {/* Add more tabs for Amenities later */}
                </TabsList>

                <TabsContent value="main" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Hero Image URL</Label>
                                <Input
                                    value={data.HeroImage || ''}
                                    onChange={e => setData(p => ({ ...p, HeroImage: e.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Headline (RU)</Label>
                                    <Input value={data.Headline.ru} onChange={e => updateBilingual('Headline', 'ru', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Headline (EN)</Label>
                                    <Input value={data.Headline.en} onChange={e => updateBilingual('Headline', 'en', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Subheadline (RU)</Label>
                                    <Input value={data.Subheadline.ru} onChange={e => updateBilingual('Subheadline', 'ru', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subheadline (EN)</Label>
                                    <Input value={data.Subheadline.en} onChange={e => updateBilingual('Subheadline', 'en', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Call to Action (RU)</Label>
                                    <Input value={data.CallToAction?.ru || ''} onChange={e => updateBilingual('CallToAction', 'ru', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Call to Action (EN)</Label>
                                    <Input value={data.CallToAction?.en || ''} onChange={e => updateBilingual('CallToAction', 'en', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                <div className="space-y-2">
                                    <Label>Concierge Greeting (RU)</Label>
                                    <Input value={data.Concierge_Greeting?.ru || ''} onChange={e => updateBilingual('Concierge_Greeting', 'ru', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Concierge Greeting (EN)</Label>
                                    <Input value={data.Concierge_Greeting?.en || ''} onChange={e => updateBilingual('Concierge_Greeting', 'en', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Descriptions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Detailed Description (RU)</Label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                    value={data.Detailed_Description?.ru || ''}
                                    onChange={e => updateBilingual('Detailed_Description', 'ru', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Detailed Description (EN)</Label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                    value={data.Detailed_Description?.en || ''}
                                    onChange={e => updateBilingual('Detailed_Description', 'en', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Space Hack (Value Prop)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Label (RU)</Label>
                                    <Input value={data.SpaceHack_Label?.ru} onChange={e => updateBilingual('SpaceHack_Label', 'ru', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Label (EN)</Label>
                                    <Input value={data.SpaceHack_Label?.en} onChange={e => updateBilingual('SpaceHack_Label', 'en', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Description (RU)</Label>
                                    <Input value={data.SpaceHack_Desc?.ru} onChange={e => updateBilingual('SpaceHack_Desc', 'ru', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description (EN)</Label>
                                    <Input value={data.SpaceHack_Desc?.en} onChange={e => updateBilingual('SpaceHack_Desc', 'en', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Special Blocks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Engineering Focus */}
                            <div className="space-y-4">
                                <Label className="font-bold">Engineering Focus Block</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Title (RU)</Label>
                                        <Input
                                            value={data.Engineering_Focus?.Title?.ru || ''}
                                            onChange={e => handleChange('Engineering_Focus', 'Title', e.target.value, 'ru')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Title (EN)</Label>
                                        <Input
                                            value={data.Engineering_Focus?.Title?.en || ''}
                                            onChange={e => handleChange('Engineering_Focus', 'Title', e.target.value, 'en')}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Text (RU)</Label>
                                        <Input
                                            value={data.Engineering_Focus?.Text?.ru || ''}
                                            onChange={e => handleChange('Engineering_Focus', 'Text', e.target.value, 'ru')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Text (EN)</Label>
                                        <Input
                                            value={data.Engineering_Focus?.Text?.en || ''}
                                            onChange={e => handleChange('Engineering_Focus', 'Text', e.target.value, 'en')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location Highlights */}
                            <div className="space-y-4 border-t pt-4">
                                <Label className="font-bold">Location Highlight</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Text (RU)</Label>
                                        <Input value={data.Location_Highlights?.ru || ''} onChange={e => updateBilingual('Location_Highlights', 'ru', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Text (EN)</Label>
                                        <Input value={data.Location_Highlights?.en || ''} onChange={e => updateBilingual('Location_Highlights', 'en', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics Bars</CardTitle>
                            <CardDescription>Edit the data visualization bars.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Section Title (RU)</Label>
                                    <Input value={data.Analytics?.Title.ru} onChange={e => setData(p => ({ ...p, Analytics: { ...p.Analytics!, Title: { ...p.Analytics!.Title, ru: e.target.value } } }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Title (EN)</Label>
                                    <Input value={data.Analytics?.Title.en} onChange={e => setData(p => ({ ...p, Analytics: { ...p.Analytics!, Title: { ...p.Analytics!.Title, en: e.target.value } } }))} />
                                </div>
                            </div>

                            {data.Analytics?.Items.map((item, idx) => (
                                <div key={idx} className="border p-4 rounded-lg space-y-4">
                                    <div className="font-semibold text-sm">Bar #{idx + 1}</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Label (RU)</Label>
                                            <Input
                                                value={item.label.ru}
                                                onChange={e => {
                                                    const newItems = [...data.Analytics!.Items];
                                                    newItems[idx].label.ru = e.target.value;
                                                    setData(p => ({ ...p, Analytics: { ...p.Analytics!, Items: newItems } }))
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Label (EN)</Label>
                                            <Input
                                                value={item.label.en}
                                                onChange={e => {
                                                    const newItems = [...data.Analytics!.Items];
                                                    newItems[idx].label.en = e.target.value;
                                                    setData(p => ({ ...p, Analytics: { ...p.Analytics!, Items: newItems } }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="space-y-2 w-1/3">
                                            <Label>Value</Label>
                                            <Input
                                                value={item.value}
                                                onChange={e => {
                                                    const newItems = [...data.Analytics!.Items];
                                                    newItems[idx].value = e.target.value;
                                                    setData(p => ({ ...p, Analytics: { ...p.Analytics!, Items: newItems } }))
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2 w-1/3">
                                            <Label>Bar % (0-100)</Label>
                                            <Input
                                                type="number"
                                                value={item.barPercent}
                                                onChange={e => {
                                                    const newItems = [...data.Analytics!.Items];
                                                    newItems[idx].barPercent = parseInt(e.target.value);
                                                    setData(p => ({ ...p, Analytics: { ...p.Analytics!, Items: newItems } }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

import { getLeads, getHouseProfile, updateHeadlines, updateVisuals, createSeoPage, deleteSeoPage, getSeoPages } from '@/lib/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import type { Lead, SeoPage } from "@prisma/client"
import { PersonaEditor } from "@/components/admin/PersonaEditor"
import { HOUSE_DATA, PersonaContent, PersonaType } from '@/data/house-data'

export default async function AdminPage() {
    const leads = await getLeads()
    const house = await getHouseProfile()
    const seoPages = await getSeoPages()

    if (!house) return <div>House Profile not found. Seed DB first.</div>

    // Safe cast or fallback
    const cmsData = (house.cms_data as any) || HOUSE_DATA.Content;

    // Ensure we have valid objects for each persona to prevent crashes if DB is partial
    const getContent = (p: PersonaType) => cmsData[p] || HOUSE_DATA.Content[p];

    return (
        <div className="container mx-auto py-10 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                </div>
            </div>

            <Tabs defaultValue="personas" className="w-full">
                <TabsList className="mb-4 bg-muted/80 p-1">
                    <TabsTrigger value="personas" className="data-[state=active]:bg-background">Persona Content</TabsTrigger>
                    <TabsTrigger value="global" className="data-[state=active]:bg-background">Global & Visuals</TabsTrigger>
                    <TabsTrigger value="crm" className="data-[state=active]:bg-background">CRM / Leads</TabsTrigger>
                    <TabsTrigger value="seo" className="data-[state=active]:bg-background">SEO Engine</TabsTrigger>
                </TabsList>

                <TabsContent value="personas">
                    <Card className="border-none shadow-none bg-transparent">
                        <Tabs defaultValue="family" className="w-full">
                            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                                <TabsTrigger value="family" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1">Family</TabsTrigger>
                                <TabsTrigger value="investor" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1">Investor</TabsTrigger>
                                <TabsTrigger value="party" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1">Social / Party</TabsTrigger>
                            </TabsList>

                            <div className="mt-6">
                                <TabsContent value="family">
                                    <PersonaEditor persona="Target_Family" initialData={getContent('Target_Family')} />
                                </TabsContent>
                                <TabsContent value="investor">
                                    <PersonaEditor persona="Target_Investor" initialData={getContent('Target_Investor')} />
                                </TabsContent>
                                <TabsContent value="party">
                                    <PersonaEditor persona="Target_Party" initialData={getContent('Target_Party')} />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </Card>
                </TabsContent>

                <TabsContent value="global">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Global Settings</CardTitle>
                                <CardDescription>Settings that apply to all personas.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={updateHeadlines} className="space-y-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="price_display">Price Display</Label>
                                        <Input id="price_display" name="price_display" defaultValue={house.price_display} />
                                        <input type="hidden" name="headline_family" value={house.headline_family} />
                                        <input type="hidden" name="headline_investor" value={house.headline_investor} />
                                        <input type="hidden" name="headline_party" value={house.headline_party} />
                                    </div>
                                    <Button type="submit">Save Global</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Visual Configuration</CardTitle>
                                <CardDescription>Customize the look and feel of the landing page.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={updateVisuals} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="hero_image_url">Default Hero Image (Fallback)</Label>
                                        <Input
                                            id="hero_image_url"
                                            name="hero_image_url"
                                            defaultValue={house.hero_image_url}
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="hero_overlay_opacity">Overlay Opacity (0-100%)</Label>
                                        <div className="flex items-center gap-4">
                                            <Input
                                                id="hero_overlay_opacity"
                                                name="hero_overlay_opacity"
                                                type="number"
                                                min="0"
                                                max="100"
                                                className="w-24"
                                                defaultValue={house.hero_overlay_opacity}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="accent_color">Accent Color (HEX)</Label>
                                        <div className="flex items-center gap-4">
                                            <Input
                                                id="accent_color"
                                                name="accent_color"
                                                type="color"
                                                className="w-20 h-10 p-1 cursor-pointer"
                                                defaultValue={house.accent_color}
                                            />
                                        </div>
                                    </div>

                                    {/* Preserving updateVisuals requirement for hidden fields if any */}
                                    <input type="hidden" name="concierge_bg" value={cmsData.concierge || ''} />

                                    <Button type="submit">Save Visuals</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="crm">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leads</CardTitle>
                            <CardDescription>Incoming requests from the landing page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Persona</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leads.map((lead: Lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>{lead.phone}</TableCell>
                                            <TableCell>{lead.persona}</TableCell>
                                            <TableCell>{lead.status}</TableCell>
                                        </TableRow>
                                    ))}
                                    {leads.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">No leads yet.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* SEO Generator */}
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Page Generator</CardTitle>
                                <CardDescription>Create new landing pages in seconds.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={createSeoPage} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="keyword">Base Keyword (e.g. "School", "Gym")</Label>
                                        <Input id="keyword" name="keyword" placeholder="Gym" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="minutes">Minutes by car</Label>
                                        <Input id="minutes" name="minutes" type="number" defaultValue="10" required />
                                    </div>
                                    <Button type="submit" className="w-full">Generate Page</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Existing Pages List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Pages ({seoPages.length})</CardTitle>
                                <CardDescription>Manage your programmatic SEO pages.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                    {seoPages.map((page: SeoPage) => (
                                        <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <div className="font-medium">{page.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    /location/{page.slug} • {page.minutes} min •
                                                    <span className="text-green-600 font-bold ml-1">{page.views} views</span>
                                                </div>
                                            </div>
                                            <form action={deleteSeoPage.bind(null, page.id)}>
                                                <Button variant="destructive" size="sm">Delete</Button>
                                            </form>
                                        </div>
                                    ))}
                                    {seoPages.length === 0 && <div className="text-center text-gray-500">No pages yet.</div>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

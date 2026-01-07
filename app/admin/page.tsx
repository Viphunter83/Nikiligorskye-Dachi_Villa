import { getLeads, getHouseProfile, updateHeadlines, updateVisuals, createSeoPage, deleteSeoPage, getSeoPages } from '@/lib/actions'
import { revalidatePath } from 'next/cache'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import type { Lead, SeoPage } from "@prisma/client"

export default async function AdminPage() {
    const leads = await getLeads()
    const house = await getHouseProfile()
    const seoPages = await getSeoPages()

    if (!house) return <div>House Profile not found. Seed DB first.</div>

    const cmsData = house.cms_data as any || {};

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <Tabs defaultValue="marketing" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="marketing">Marketing Control</TabsTrigger>
                    <TabsTrigger value="visuals">Site Visuals</TabsTrigger>
                    <TabsTrigger value="crm">CRM / Leads</TabsTrigger>
                    <TabsTrigger value="seo">SEO Engine</TabsTrigger>
                </TabsList>

                <TabsContent value="marketing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Headlines</CardTitle>
                            <CardDescription>Update the main selling points for each persona.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={updateHeadlines} className="space-y-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="headline_family">Family Persona Headline</Label>
                                    <Input id="headline_family" name="headline_family" defaultValue={house.headline_family} />
                                </div>

                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="headline_investor">Investor Persona Headline</Label>
                                    <Input id="headline_investor" name="headline_investor" defaultValue={house.headline_investor} />
                                </div>

                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="headline_party">Party Persona Headline</Label>
                                    <Input id="headline_party" name="headline_party" defaultValue={house.headline_party} />
                                </div>

                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="price_display">Price Display</Label>
                                    <Input id="price_display" name="price_display" defaultValue={house.price_display} />
                                </div>

                                <Button type="submit">Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="visuals">
                    <Card>
                        <CardHeader>
                            <CardTitle>Visual Configuration</CardTitle>
                            <CardDescription>Customize the look and feel of the landing page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={updateVisuals} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="hero_image_url">Hero Background Image URL</Label>
                                    <Input
                                        id="hero_image_url"
                                        name="hero_image_url"
                                        defaultValue={house.hero_image_url}
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-muted-foreground">Link to any high-res image (Unsplash, etc).</p>
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
                                        <div className="text-sm text-gray-500">Lower = Brighter Image, Higher = Darker</div>
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
                                        <Input
                                            type="text"
                                            defaultValue={house.accent_color}
                                            className="w-32"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <Button type="submit">Save Visuals</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Engineering Photos</CardTitle>
                                <CardDescription>Update the 4 images in the Bento Grid.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={updateVisuals} className="space-y-4">
                                    <input type="hidden" name="hero_image_url" value={house.hero_image_url} />
                                    <input type="hidden" name="hero_overlay_opacity" value={house.hero_overlay_opacity} />
                                    <input type="hidden" name="accent_color" value={house.accent_color} />
                                    <input type="hidden" name="concierge_bg" value={cmsData.concierge || '/Facade3.jpeg'} />

                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <Label>Image {i} URL</Label>
                                            <Input
                                                name={`eng_img_${i}`}
                                                defaultValue={cmsData.engineering?.[i - 1] || ''}
                                                placeholder={`/photos/bento_0${i}.png`}
                                            />
                                        </div>
                                    ))}
                                    <Button type="submit" variant="secondary">Update Bento</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Concierge</CardTitle>
                                <CardDescription>Background image for AI Assistant.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={updateVisuals} className="space-y-4">
                                    {/* Preserve other values */}
                                    <input type="hidden" name="hero_image_url" value={house.hero_image_url} />
                                    <input type="hidden" name="hero_overlay_opacity" value={house.hero_overlay_opacity} />
                                    <input type="hidden" name="accent_color" value={house.accent_color} />
                                    {cmsData.engineering?.map((img: string, i: number) => (
                                        <input key={i} type="hidden" name={`eng_img_${i + 1}`} value={img} />
                                    ))}

                                    <div className="space-y-2">
                                        <Label>Background Image URL</Label>
                                        <Input
                                            name="concierge_bg"
                                            defaultValue={cmsData.concierge || '/Facade3.jpeg'}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <Button type="submit" variant="secondary">Update Concierge</Button>
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
                                <div className="space-y-4">
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

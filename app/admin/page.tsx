import { getLeads, getHouseProfile, updateHeadlines, createSeoPage, deleteSeoPage, getSeoPages } from '@/lib/actions'
import { revalidatePath } from 'next/cache'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Lead, SeoPage } from "@prisma/client"

export default async function AdminPage() {
    const leads = await getLeads()
    const house = await getHouseProfile()
    const seoPages = await getSeoPages()

    if (!house) return <div>House Profile not found. Seed DB first.</div>

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <Tabs defaultValue="marketing" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="marketing">Marketing Control</TabsTrigger>
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
                                                <div className="text-sm text-gray-500">/location/{page.slug} • {page.minutes} min</div>
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

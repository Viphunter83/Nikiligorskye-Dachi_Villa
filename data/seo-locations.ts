export interface SeoLocation {
    slug: string;
    title: string;
    minutes: number;
}

export const SEO_LOCATIONS: SeoLocation[] = [
    { slug: 'shkola-president', title: 'Дом рядом со школой Президент', minutes: 7 },
    { slug: 'pride-wellness', title: 'Особняк у Pride Wellness Club', minutes: 12 },
    { slug: 'moscow-river', title: 'Резиденция у Москвы-реки', minutes: 15 },
    { slug: 'rublevka', title: 'Вилла на Рублевке', minutes: 10 },
    { slug: 'barvikha', title: 'Рядом с Барвиха Luxury Village', minutes: 14 }
];

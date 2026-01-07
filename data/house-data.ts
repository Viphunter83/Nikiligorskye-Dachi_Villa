// data/house-data.ts

export type PersonaType = 'Target_Family' | 'Target_Investor' | 'Target_Party';
export type Language = 'ru' | 'en';

export type BilingualText = Record<Language, string>;

export interface PersonaContent {
    Headline: BilingualText;
    HeroImage?: string; // Main background for Hero
    Subheadline: BilingualText;
    Description?: BilingualText;
    Tags?: BilingualText[];
    CallToAction?: BilingualText;
    Amenities?: (BilingualText & { image?: string })[];
    Detailed_Description?: BilingualText;
    SpaceHack_Label?: BilingualText;
    SpaceHack_Desc?: BilingualText;
    Engineering_Focus?: {
        Title: BilingualText;
        Text: BilingualText;
    };
    Location_Highlights?: BilingualText;
    Analytics?: {
        Title: BilingualText;
        Items: Array<{
            label: BilingualText;
            value: string;
            prefix?: string;
            suffix?: string;
            barPercent: number; // For visualization
            highlight?: boolean;
        }>;
    };
    Concierge_Greeting?: BilingualText;
}

export const HOUSE_DATA = {
    Meta: {
        Project_Name: {
            ru: "Резиденция «Никологорские Дачи»",
            en: "Residence Nikologorskie Dachi"
        },
        Coordinates: [55.733, 37.158],
    },
    Specs: {
        Area_Legal: 506,
        Area_Total: 746,
        Plot: 14,
        Bedrooms: 7, // 1 on 1st, 4 on 2nd, 2 staff rooms in basement
        Bathrooms: 7, // 2 on 1st, 3 on 2nd, 2 in basement + staff
        CeilingHeight: 7, // meters (Living room)
        YearBuilt: 2025,
        // PDF Extracted Tech Specs
        Tech: {
            Heating: "Buderus (Germany)",
            Electric: "ABB, Schneider",
            Appliances: "Liebherr, Bosch",
            Climate: "Channel Inverter AC + Supply Ventilation"
        }
    },
    // DYNAMIC CONTENT RULES
    Content: {
        Target_Family: {
            HeroImage: '/Facade1.jpeg',
            Headline: {
                ru: "Родовое гнездо на Новой Риге: Безопасность и приватность",
                en: "Family Estate on New Riga: Safety & Privacy"
            },
            Subheadline: {
                ru: "506 м² фамильного уюта и 240 м² свободы для игр на 14 сотках приватной территории.",
                en: "506 m² of family comfort and 240 m² of freedom for games on 14 acres of private land."
            },
            SpaceHack_Label: {
                ru: "Игровые зоны на воздухе",
                en: "Outdoor Play Zones"
            },
            SpaceHack_Desc: {
                ru: "Лишние метры — это безопасное пространство для игр на террасе, за которые не нужно переплачивать налог.",
                en: "Extra meters mean safe play space on the terrace, without the extra tax burden."
            },
            Analytics: {
                Title: { ru: "Ценность для семьи", en: "Family Value" },
                Items: [
                    {
                        label: { ru: "Эффективная площадь", en: "Effective Area" },
                        value: "746",
                        suffix: " м²",
                        barPercent: 100,
                        highlight: true
                    },
                    {
                        label: { ru: "Площадь по документам (налог)", en: "Taxable Area" },
                        value: "506",
                        suffix: " м²",
                        barPercent: 67
                    },
                    {
                        label: { ru: "Экономия на налогах (10 лет)", en: "Tax Savings (10yr)" },
                        value: "~1.2",
                        suffix: " млн ₽",
                        barPercent: 30
                    }
                ]
            },
            Amenities: [
                { ru: "Детская игровая зона", en: "Kids Play Zone", image: '/photos/feat_kids_zone.png' },
                { ru: "Безопасный периметр", en: "Safe Perimeter", image: '/photos/feat_security.png' },
                { ru: "Комната для няни", en: "Nanny Room", image: '/photos/feat_nanny_room.png' },
                { ru: "Эко-материалы", en: "Eco Materials", image: '/photos/feat_eco_materials.png' },
                { ru: "Рядом школы", en: "Nearby Schools", image: '/photos/feat_schools.png' }
            ],
            Detailed_Description: {
                ru: "Дом спроектирован так, чтобы каждый член семьи чувствовал себя комфортно. Просторная гостиная для общих вечеров, безопасная терраса для детских игр и приватные зоны для отдыха родителей. Интерьеры в неоклассическом стиле с использованием натуральных материалов создают атмосферу уюта и статуса.",
                en: "The house is designed so that every family member feels comfortable. A spacious living room for shared evenings, a safe terrace for children's games, and private relaxation zones for parents. Neoclassical interiors using natural materials create an atmosphere of comfort and status."
            },
            Engineering_Focus: {
                Title: { ru: "Здоровье семьи", en: "Family Health" },
                Text: {
                    ru: "5-ступенчатая очистка воды, гипоаллергенная вентиляция, техника Bosch/Liebherr.",
                    en: "5-stage water purification, hypoallergenic ventilation, Bosch/Liebherr appliances."
                }
            },
            CallToAction: {
                ru: "Запланировать семейную экскурсию",
                en: "Schedule a Family Tour"
            },
            Location_Highlights: {
                ru: "24 км от МКАД. Рядом: Ломоносовская школа, парк Раздолье.",
                en: "24 km from MKAD. Nearby: Lomonosov School, Razdolye Park."
            },
            Concierge_Greeting: {
                ru: "Здравствуйте! Готовы запланировать семейный визит?",
                en: "Hello! Ready to schedule a family visit?"
            }
        },
        Target_Investor: {
            HeroImage: '/Facade3.jpeg',
            Headline: {
                ru: "Недооцененный актив Premium-класса",
                en: "Undervalued Premium Asset"
            },
            Subheadline: {
                ru: "Уникальный актив: 746 м² реальной площади по цене 506 м².",
                en: "Unique Asset: 746 m² of actual area for the price of 506 m²."
            },
            SpaceHack_Label: {
                ru: "Капитализация актива",
                en: "Asset Capitalization"
            },
            SpaceHack_Desc: {
                ru: "Эффективная стоимость квадратного метра ниже рынка за счет неучтенных 240 м² полезной площади.",
                en: "Effective cost per sq.m. below market due to 240 m² of unaccounted useful area."
            },
            Analytics: {
                Title: { ru: "Инвестиционный потенциал", en: "Investment Potential" },
                Items: [
                    {
                        label: { ru: "Средняя цена в поселке", en: "Avg Market Price" },
                        value: "350",
                        prefix: "$",
                        suffix: "k / сотка",
                        barPercent: 100
                    },
                    {
                        label: { ru: "Цена предложения", en: "Offer Price" },
                        value: "290",
                        prefix: "$",
                        suffix: "k / сотка",
                        barPercent: 82,
                        highlight: true
                    },
                    {
                        label: { ru: "Прогноз роста (3 года)", en: "Growth Forecast (3yr)" },
                        value: "+35",
                        suffix: "%",
                        barPercent: 35
                    }
                ]
            },
            Amenities: [
                { ru: "Высокая ликвидность", en: "High Liquidity", image: '/Facade3.jpeg' },
                { ru: "Рост стоимости", en: "Value Growth", image: '/Stair.jpeg' },
                { ru: "Арендный потенциал", en: "Rental Potential", image: '/Living2.jpeg' },
                { ru: "Премиальная локация", en: "Premium Location", image: '/Facade1.jpeg' },
                { ru: "Низкие расходы", en: "Low Expenses", image: '/Techroom.jpeg' }
            ],
            Detailed_Description: {
                ru: "Сдержанная стилистика американского архитектора Ллойда Райта. Фасад из кирпича ручной формовки и натуральной меди гарантирует долговечность. Уникальное предложение: площадь фактически 746 м² (по документам 506 м²). Идеальный актив для сохранения капитала.",
                en: "Restrained style of American architect Lloyd Wright. Facade made of hand-molded brick and natural copper guarantees durability. Unique offer: actual area 746 m² (legal 506 m²). The ideal asset for capital preservation."
            },
            Engineering_Focus: {
                Title: { ru: "Низкий OPEX", en: "Low OPEX" },
                Text: {
                    ru: "Котельная Buderus и автоматика ABB снижают стоимость владения.",
                    en: "Buderus boiler and ABB automation reduce ownership costs."
                }
            },
            CallToAction: {
                ru: "Получить расчет ROI и техпаспорт",
                en: "Get ROI Calculation & Tech Passport"
            },
            Location_Highlights: {
                ru: "Ильинское шоссе, 24 км. Инфраструктура: Рестораны, SPA.",
                en: "Ilyinskoe highway, 24 km. Infrastructure: Restaurants, SPA."
            },
            Concierge_Greeting: {
                ru: "Добрый день. Отправить расчет инвестиционной модели?",
                en: "Good day. Send the investment model calculation?"
            }
        },
        Target_Party: {
            HeroImage: '/Cinema1.jpeg',
            Headline: {
                ru: "Резиденция в стиле Райта с видом на Сити",
                en: "Wright-Style Residence with City Views"
            },
            Subheadline: {
                ru: "Кинотеатр, Chill-out зоны, Патио. Жизнь на полной скорости.",
                en: "Cinema, Chill-out zones, Patio. Life at full speed."
            },
            SpaceHack_Label: {
                ru: "Lounge & Party Zones",
                en: "Lounge & Party Zones"
            },
            SpaceHack_Desc: {
                ru: "Патио и крышные террасы — идеальные локации для вечеринок, вынесенные за пределы жилого контура.",
                en: "Patios and roof terraces are perfect party locations, extended beyond the living quarters."
            },
            Analytics: {
                Title: { ru: "Event-потенциал", en: "Event Potential" },
                Items: [
                    {
                        label: { ru: "Вместимость (Event)", en: "Event Capacity" },
                        value: "50+",
                        suffix: " гостей",
                        barPercent: 100,
                        highlight: true
                    },
                    {
                        label: { ru: "Зоны отдыха", en: "Chillout Zones" },
                        value: "5",
                        suffix: " локаций",
                        barPercent: 50
                    },
                    {
                        label: { ru: "Паркинг", en: "Parking" },
                        value: "10",
                        suffix: " машин",
                        barPercent: 20
                    }
                ]
            },
            Amenities: [
                { ru: "Кинотеатр", en: "Home Cinema", image: '/Cinema1.jpeg' },
                { ru: "Зона BBQ", en: "BBQ Zone", image: '/Openzone.jpeg' },
                { ru: "Паркинг на 10 авто", en: "Parking for 10", image: '/Garage.jpeg' },
                { ru: "SPA комплекс", en: "SPA Complex", image: '/Bathroom1.jpeg' },
                { ru: "Приватность", en: "Privacy", image: '/Facade5.jpeg' }
            ],
            Detailed_Description: {
                ru: "Это не просто дом, а ваша личная резиденция для развлечений. Огромный атриум для вечеринок, профессиональный кинозал в цоколе и лаунж-зоны на свежем воздухе. Здесь можно устроить шумную вечеринку или расслабиться в кругу близких друзей, не мешая соседям.",
                en: "This is not just a house, but your personal entertainment residence. A huge atrium for parties, a professional cinema in the basement, and outdoor lounge zones. Here you can throw a loud party or relax with close friends without disturbing the neighbors."
            },
            Engineering_Focus: {
                Title: { ru: "Smart & Fast", en: "Smart & Fast" },
                Text: {
                    ru: "Мощная климатика для вечеринок и оптика для стриминга 8K.",
                    en: "Powerful climate control for parties and fiber optics for 8K streaming."
                }
            },
            CallToAction: {
                ru: "Заехать на кофе вечером",
                en: "Drop by for evening coffee"
            },
            Location_Highlights: {
                ru: "25 минут до Сити по платной трассе. Такси бизнес-класса.",
                en: "25 min to City via toll road. Business class taxi."
            },
            Concierge_Greeting: {
                ru: "Привет! Хочешь увидеть дом вживую?",
                en: "Hi! Want to see the house in real life?"
            }
        }
    } as Record<PersonaType, PersonaContent>
} as const;

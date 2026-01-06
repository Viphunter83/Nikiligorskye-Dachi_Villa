// data/house-data.ts

export type PersonaType = 'Target_Family' | 'Target_Investor' | 'Target_Party';
export type Language = 'ru' | 'en';

export type BilingualText = Record<Language, string>;

export interface PersonaContent {
    Headline: BilingualText;
    Subheadline: BilingualText;
    Description?: BilingualText;
    Tags?: BilingualText[];
    CallToAction?: BilingualText;
    SpaceHack_Label?: BilingualText;
    SpaceHack_Desc?: BilingualText;
    Engineering_Focus?: {
        Title: BilingualText;
        Text: BilingualText;
    };
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
        Bedrooms: 7,
        Bathrooms: 7,
        CeilingHeight: 7, // meters
        YearBuilt: 2025,
    },
    // DYNAMIC CONTENT RULES
    Content: {
        Target_Family: {
            Headline: {
                ru: "Родовое гнездо на Новой Риге: Безопасность и приватность",
                en: "Family Estate on New Riga: Safety & Privacy"
            },
            Subheadline: {
                ru: "506 м² уюта + 240 м² свободы для игр ваших детей на участке 14 сот.",
                en: "506 m² of comfort + 240 m² of freedom for your children on 14 acres."
            },
            SpaceHack_Label: {
                ru: "Игровые зоны на воздухе",
                en: "Outdoor Play Zones"
            },
            SpaceHack_Desc: {
                ru: "Лишние метры — это безопасное пространство для игр на террасе, за которые не нужно переплачивать налог.",
                en: "Extra meters mean safe play space on the terrace, without the extra tax burden."
            },
            Engineering_Focus: {
                Title: { ru: "Здоровье семьи", en: "Family Health" },
                Text: {
                    ru: "5-ступенчатая очистка воды и гипоаллергенная вентиляция.",
                    en: "5-stage water purification and hypoallergenic ventilation."
                }
            },
            CallToAction: {
                ru: "Запланировать семейную экскурсию",
                en: "Schedule a Family Tour"
            }
        },
        Target_Investor: {
            Headline: {
                ru: "Недооцененный актив Premium-класса",
                en: "Undervalued Premium Asset"
            },
            Subheadline: {
                ru: "Инвестиционная аномалия: платите за 506 м², получаете 746 м².",
                en: "Investment Anomaly: Pay for 506 m², get 746 m²."
            },
            SpaceHack_Label: {
                ru: "Капитализация актива",
                en: "Asset Capitalization"
            },
            SpaceHack_Desc: {
                ru: "Эффективная стоимость квадратного метра ниже рынка за счет неучтенных 240 м² полезной площади.",
                en: "Effective cost per sq.m. below market due to 240 m² of unaccounted useful area."
            },
            Engineering_Focus: {
                Title: { ru: "Низкий OPEX", en: "Low OPEX" },
                Text: {
                    ru: "Энергоэффективный Buderus и ABB снижают стоимость владения.",
                    en: "Energy-efficient Buderus and ABB systems reduce ownership costs."
                }
            },
            CallToAction: {
                ru: "Получить расчет ROI и техпаспорт",
                en: "Get ROI Calculation & Tech Passport"
            }
        },
        Target_Party: {
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
            }
        }
    } as Record<PersonaType, PersonaContent>
} as const;

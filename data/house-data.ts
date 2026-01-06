// data/house-data.ts

export type PersonaType = 'Target_Family' | 'Target_Investor' | 'Target_Party';

export interface PersonaContent {
    Headline: string;
    Subheadline: string;
    Description?: string;
    Tags?: string[];
    CallToAction?: string;
    SpaceHack_Label?: string;
    SpaceHack_Desc?: string;
    Engineering_Focus?: {
        Title: string;
        Text: string;
    };
}

export const HOUSE_DATA = {
    Meta: {
        Project_Name: "Residence Nikologorskie Dachi",
        Coordinates: [55.733, 37.158], // Approx location
    },
    Specs: {
        Area_Legal: 506,
        Area_Total: 746,
        Plot: 14,
        Bedrooms: 7,
        Bathrooms: 7,
    },
    // DYNAMIC CONTENT RULES: This is where the magic happens
    Content: {
        Target_Family: {
            Headline: "Родовое гнездо на Новой Риге: Безопасность и приватность",
            Subheadline: "506 м² уюта + 240 м² свободы для игр ваших детей.",
            SpaceHack_Label: "Игровые зоны на воздухе",
            SpaceHack_Desc: "Лишние метры — это безопасное пространство для игр на террасе, за которые не нужно переплачивать налог.",
            Engineering_Focus: {
                Title: "Здоровье семьи",
                Text: "5-ступенчатая очистка воды и гипоаллергенная вентиляция."
            },
            CallToAction: "Запланировать семейную экскурсию"
        },
        Target_Investor: {
            Headline: "Недооцененный актив Premium-класса",
            Subheadline: "Инвестиционная аномалия: платите за 506 м², получаете 746 м².",
            SpaceHack_Label: "Капитализация актива",
            SpaceHack_Desc: "Эффективная стоимость квадратного метра ниже рынка за счет неучтенных 240 м² полезной площади.",
            Engineering_Focus: {
                Title: "Низкий OPEX",
                Text: "Энергоэффективный Buderus и ABB снижают стоимость владения."
            },
            CallToAction: "Получить расчет ROI и техпаспорт"
        },
        Target_Party: {
            Headline: "Резиденция в стиле Райта с видом на Сити",
            Subheadline: "Кинотеатр, Chill-out зоны, Патио. Жизнь на полной скорости.",
            SpaceHack_Label: "Lounge & Party Zones",
            SpaceHack_Desc: "Патио и крышные террасы — идеальные локации для вечеринок, вынесенные за пределы жилого контура.",
            Engineering_Focus: {
                Title: "Smart & Fast",
                Text: "Мощная климатика для вечеринок и оптика для стриминга 8K."
            },
            CallToAction: "Заехать на кофе вечером"
        }
    } as Record<PersonaType, PersonaContent>
} as const;

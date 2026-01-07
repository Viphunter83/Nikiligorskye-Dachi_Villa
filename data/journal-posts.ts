import { Language } from './house-data';

export interface BlogPost {
  id: string;
  slug: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  coverImage: string;
  content: Record<Language, string>;
  date: Record<Language, string>;
  readTime: Record<Language, string>;
}

export const JOURNAL_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'privacy-ultimate-luxury',
    title: {
      ru: 'Приватность как главная роскошь: Почему 14 соток важнее, чем кажется',
      en: 'Privacy as the Ultimate Luxury: Why 14 Acres Matter More Than You Think'
    },
    excerpt: {
      ru: 'Исследуем, как архитектура и ландшафт «Никологорских Дач» создают безопасный мир для вашей семьи, где у каждого есть свое пространство.',
      en: 'Exploring how the architecture and landscape of "Nikologorskie Dachi" create a safe world for your family, where everyone has their own space.'
    },
    coverImage: '/photos/living.jpg',
    readTime: {
      ru: '6 мин',
      en: '6 min'
    },
    date: {
      ru: '7 Янв 2026',
      en: 'Jan 7, 2026'
    },
    content: {
      ru: `
        <h2>Больше, чем просто участок</h2>
        <p>В элитном сегменте размер участка часто измеряется не сотками, а ощущением свободы. <strong>14 соток</strong> в нашей резиденции — это не просто земля, это буферная зона, гарантирующая тишину и покой. Прямой выход к лесу визуально расширяет границы владения до бесконечности, создавая ощущение жизни в парке.</p>
        
        <h2>Автономия персонала — комфорт семьи</h2>
        <p>Истинная премиальность кроется в деталях быта. Мы спроектировали отдельный <strong>блок для персонала</strong> (2 комнаты в цоколе) с собственным входом. Это обеспечивает полную автономность помощников: они поддерживают идеальный порядок, оставаясь невидимыми для вас и ваших гостей.</p>
  
        <h2>Безопасность периметра</h2>
        <p>Дом — это крепость. Современные системы видеонаблюдения и контроля доступа интегрированы в ландшафт. Вы можете спокойно отпускать детей играть во двор, зная, что территория полностью безопасна и закрыта от посторонних глаз.</p>
  
        <h2>Инфраструктура для наследников</h2>
        <p>Локация выбрана стратегически: в доступа Ломоносовская школа и парк "Раздолье". Это место, где ваши дети не просто растут, а развиваются в безопасной и статусной среде.</p>
      `,
      en: `
        <h2>More Than Just a Plot</h2>
        <p>In the luxury segment, plot size is often measured not in acres, but in the sense of freedom. <strong>14 acres (sotok)</strong> in our residence is not just land; it is a buffer zone guaranteeing peace and quiet. Direct access to the forest visually expands the boundaries of the property to infinity, creating the feeling of living in a park.</p>
        
        <h2>Staff Autonomy — Family Comfort</h2>
        <p>True premium quality lies in the details of daily life. We designed a separate <strong>staff block</strong> (2 rooms in the basement) with its own entrance. This ensures complete autonomy for helpers: they maintain perfect order while remaining invisible to you and your guests.</p>
  
        <h2>Perimeter Security</h2>
        <p>A home is a fortress. Modern video surveillance and access control systems are integrated into the landscape. You can safely let your children play in the yard, knowing that the territory is completely secure and closed to prying eyes.</p>
  
        <h2>Infrastructure for Heirs</h2>
        <p>The location was chosen strategically: Lomonosov School and Razdolye Park are within easy reach. This is a place where your children don't just grow up, but develop in a safe and prestigious environment.</p>
      `
    }
  },
  {
    id: '2',
    slug: 'invest-in-engineering',
    title: {
      ru: 'Инвестируйте в инженерию, а не просто в стены',
      en: 'Invest in Engineering, Not Just Walls'
    },
    excerpt: {
      ru: 'Разбираем, почему немецкое оборудование и «скрытые» метры делают этот дом активом с низким OPEX и высокой ликвидностью.',
      en: 'Analyzing why German equipment and "hidden" meters make this house an asset with low OPEX and high liquidity.'
    },
    coverImage: '/photos/facade.jpg',
    readTime: {
      ru: '8 мин',
      en: '8 min'
    },
    date: {
      ru: '7 Янв 2026',
      en: 'Jan 7, 2026'
    },
    content: {
      ru: `
        <h2>Скрытая ценность: 506 м² vs 746 м²</h2>
        <p>На рынке недвижимости редко встречаются такие аномалии. Юридически вы приобретаете <strong>506 м²</strong>, но фактически получаете в пользование <strong>746 м²</strong>. Эти дополнительные 240 метров — полезные площади (террасы, эксплуатируемая кровля, тех. зоны), которые повышают капитализацию актива, не увеличивая налоговую нагрузку.</p>
        
        <h2>OPEX под контролем</h2>
        <p>Стоимость владения домом определяется качеством инженерии. Мы не экономили на "сердце" дома:</p>
        <ul>
          <li><strong>Котельная Buderus (Германия):</strong> Эталон надежности и энергоэффективности.</li>
          <li><strong>Электрика ABB и Schneider:</strong> Безопасность и долговечность.</li>
          <li><strong>Системы очистки воды:</strong> 5 ступеней фильтрации продлевают жизнь сантехнике и заботятся о вашем здоровье.</li>
        </ul>
  
        <h2>Готовый арендный бизнес</h2>
        <p>Дом полностью готов ("под ключ", 2025 год). Это исключает риски долгостроя и позволяет начать получать доход от сдачи в аренду сразу после сделки. В данной локации спрос на качественные современные дома значительно превышает предложение.</p>
  
        <h2>Ликвидность материалов</h2>
        <p>Фасад из кирпича ручной формовки и натуральной меди не требует обслуживания десятилетиями, лишь благородно старея со временем. Это инвестиция, которая защищена от инфляции и модных веяний.</p>
      `,
      en: `
        <h2>Hidden Value: 506 m² vs 746 m²</h2>
        <p>Such anomalies are rare in the real estate market. Legally, you acquire <strong>506 m²</strong>, but in fact, you get <strong>746 m²</strong> of usable space. These additional 240 meters are useful areas (terraces, exploitable roof, technical zones) that increase the asset's capitalization without increasing the tax burden.</p>
        
        <h2>OPEX Under Control</h2>
        <p>The cost of home ownership is determined by the quality of engineering. We didn't save on the "heart" of the house:</p>
        <ul>
          <li><strong>Buderus Boiler House (Germany):</strong> The standard of reliability and energy efficiency.</li>
          <li><strong>ABB and Schneider Electric:</strong> Safety and durability.</li>
          <li><strong>Water Purification Systems:</strong> 5 stages of filtration extend the life of plumbing and care for your health.</li>
        </ul>
  
        <h2>Ready Rental Business</h2>
        <p>The house is completely ready ("turnkey", 2025). This eliminates long-term construction risks and allows you to start generating rental income immediately after the deal. In this location, demand for quality modern homes significantly exceeds supply.</p>
  
        <h2>Material Liquidity</h2>
        <p>The facade made of hand-molded brick and natural copper requires no maintenance for decades, only aging gracefully over time. This is an investment protected from inflation and fashion trends.</p>
      `
    }
  },
  {
    id: '3',
    slug: 'art-of-entertainment',
    title: {
      ru: 'Искусство развлечений: Дом, который живет в вашем ритме',
      en: 'The Art of Entertainment: A House That Lives in Your Rhythm'
    },
    excerpt: {
      ru: 'От приватного кинотеатра до шумных вечеринок на патио — как зонирование меняет сценарии жизни и впечатляет гостей.',
      en: 'From a private cinema to loud parties on the patio — how zoning changes life scenarios and impresses guests.'
    },
    coverImage: '/photos/cinema.jpg',
    readTime: {
      ru: '5 мин',
      en: '5 min'
    },
    date: {
      ru: '7 Янв 2026',
      en: 'Jan 7, 2026'
    },
    content: {
      ru: `
        <h2>Сценарии для вечеринок</h2>
        <p>Архитектура дома диктует сценарий идеального вечера. Гости собираются в просторной <strong>гостиной со вторым светом</strong> (высота потолков 7 метров!), где воздух и объем создают торжественную атмосферу. Затем поток плавно перетекает на открытое <strong>патио</strong> или крышную террасу, где можно встречать закаты под музыку.</p>
        
        <h2>Технологии комфорта</h2>
        <p>Шумная вечеринка требует мощной поддержки:</p>
        <ul>
          <li><strong>Климат:</strong> Канальное кондиционирование и приточная вентиляция справятся с любой нагрузкой, обеспечивая свежий воздух даже при большом скоплении людей.</li>
          <li><strong>Связь:</strong> Высокоскоростная оптика позволяет стримить контент в 8K без задержек.</li>
        </ul>
  
        <h2>Приватные зоны отдыха</h2>
        <p>Когда хочется сменить ритм, к вашим услугам профессиональный <strong>кинотеатр</strong> в цокольном этаже. Звукоизоляция позволяет наслаждаться блокбастерами на полной громкости, не мешая тем, кто уже отдыхает в спальнях на втором этаже. А собственный <strong>SPA-комплекс</strong> станет идеальным завершением выходных.</p>
  
        <h2>Впечатление, которое остается</h2>
        <p>Этот дом создан, чтобы удивлять. От дизайнерских фасадов до продуманных зон chill-out — каждая деталь работает на ваш имидж и удовольствие от жизни.</p>
      `,
      en: `
        <h2>Party Scenarios</h2>
        <p>The architecture of the house dictates the scenario for a perfect evening. Guests gather in a spacious <strong>living room with a second light</strong> (ceiling height 7 meters!), where air and volume create a festive atmosphere. Then the flow smoothly transitions to an open <strong>patio</strong> or roof terrace, where you can meet sunsets with music.</p>
        
        <h2>Comfort Technologies</h2>
        <p>A loud party requires powerful support:</p>
        <ul>
          <li><strong>Climate:</strong> Channel air conditioning and supply ventilation can handle any load, ensuring fresh air even with huge crowds.</li>
          <li><strong>Connectivity:</strong> High-speed optics allow streaming content in 8K without delays.</li>
        </ul>
  
        <h2>Private Relaxation Zones</h2>
        <p>When you want to change the pace, a professional <strong>cinema</strong> in the basement is at your disposal. Soundproofing allows you to enjoy blockbusters at full volume without disturbing those already resting in the bedrooms on the second floor. And your own <strong>SPA complex</strong> will be the perfect end to the weekend.</p>
  
        <h2>An Impression That Lasts</h2>
        <p>This house is created to surprise. From designer facades to thoughtful chill-out zones — every detail works for your image and enjoyment of life.</p>
      `
    }
  }
];

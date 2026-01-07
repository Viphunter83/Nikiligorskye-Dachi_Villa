import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { HOUSE_DATA, PersonaType, Language } from '@/data/house-data';

// Font should be registered in the API route using fs.readFileSync to ensure reliability in serverless

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: 'BrochureDebug',
    },
    // COVER PAGE STYLES
    coverPage: {
        flexDirection: 'column',
        backgroundColor: '#111111',
        height: '100%',
        padding: 0, // Reset padding for full split
        position: 'relative',
        fontFamily: 'BrochureDebug',
    },
    coverImageContainer: {
        height: '65%',
        width: '100%',
        position: 'relative',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    coverTextContainer: {
        height: '35%',
        padding: 40,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center', // Center children horizontally
    },
    projectTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
        opacity: 0.8,
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    coverHeadline: {
        fontSize: 32, // Slightly smaller to avoid aggressive wrapping
        fontWeight: 'bold',
        color: '#D4AF37', // Gold
        marginBottom: 15,
        lineHeight: 1.2,
        textAlign: 'center',
    },
    coverSub: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        lineHeight: 1.4,
        textAlign: 'center',
        maxWidth: '80%',
    },

    // CONTENT PAGE STYLES
    contentPage: {
        padding: 40,
        backgroundColor: '#FFFFFF',
        fontFamily: 'BrochureDebug',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1pt solid #D4AF37',
        paddingBottom: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 10,
        color: '#666666',
        textTransform: 'uppercase',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#0A0A0A',
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    descriptionText: {
        fontSize: 11,
        color: '#333333',
        lineHeight: 1.6,
        marginBottom: 20,
        textAlign: 'justify',
    },

    // HIGHLIGHT BOX
    highlightBox: {
        backgroundColor: '#F9F9F9',
        borderLeft: '4pt solid #D4AF37',
        padding: 15,
        marginBottom: 20,
    },
    highlightTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0A0A0A',
        marginBottom: 5,
    },
    highlightText: {
        fontSize: 10,
        color: '#444444',
        lineHeight: 1.4,
    },

    // SPECS GRID
    specsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        borderBottom: '1pt solid #EEEEEE',
        paddingBottom: 20,
        marginBottom: 20,
    },
    specItem: {
        width: '33%',
        marginBottom: 15,
    },
    specLabel: {
        fontSize: 9,
        color: '#888888',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    specValue: {
        fontSize: 12,
        color: '#0A0A0A',
        fontWeight: 'bold',
    },

    // AMENITIES
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    amenityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '6 12',
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        marginBottom: 8,
        marginRight: 8,
    },
    amenityText: {
        fontSize: 10,
        color: '#333333',
    },

    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTop: '1pt solid #EEEEEE',
        paddingTop: 10,
        fontSize: 9,
        color: '#999999',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    // ANALYTICS BLOCK
    analyticsContainer: {
        marginTop: 10,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#F0F4F8',
        borderRadius: 4,
    },
    analyticsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    analyticsLabel: {
        width: '40%',
        fontSize: 10,
        color: '#555555',
    },
    analyticsBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    analyticsBar: {
        height: 6,
        backgroundColor: '#D4AF37', // Gold
        borderRadius: 3,
        marginRight: 8,
    },
    analyticsValue: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111111',
    }
});

interface BrochureProps {
    persona: PersonaType;
    language?: Language;
    heroImagePath?: string;
}

export const BrochureDocument = ({ persona, language = 'en', heroImagePath }: BrochureProps) => {
    const content = HOUSE_DATA.Content[persona];
    const meta = HOUSE_DATA.Meta;
    const projectTitle = meta.Project_Name[language];

    // Fallbacks
    const headline = content?.Headline?.[language] || "Luxury Residence";
    const subheadline = content?.Subheadline?.[language] || "";
    const description = content?.Detailed_Description?.[language] || subheadline;

    const spaceHackLabel = content?.SpaceHack_Label?.[language] || "Smart Space";
    const spaceHackDesc = content?.SpaceHack_Desc?.[language] || "";

    const engineeringTitle = content?.Engineering_Focus?.Title?.[language] || "Engineering";
    const engineeringText = content?.Engineering_Focus?.Text?.[language] || "";

    // Hero Image Handling (Ensure public paths are absolute URLs if needed, but react-pdf handles relative from public often)
    // Note: react-pdf images work best with absolute URLs or base64. 
    // For this environment, we'll try to use the path directly.
    const heroImage = content?.HeroImage || '/Living.jpeg';

    return (
        <Document>
            {/* PAGE 1: COVER */}
            <Page size="A4" style={styles.coverPage}>
                {/* Top Section: Photo */}
                <View style={styles.coverImageContainer}>
                    {heroImagePath && (
                        <Image
                            src={heroImagePath}
                            style={styles.coverImage}
                        />
                    )}
                </View>

                {/* Bottom Section: Text */}
                <View style={styles.coverTextContainer}>
                    <Text style={styles.projectTitle}>{projectTitle}</Text>
                    <Text style={styles.coverHeadline}>{headline}</Text>
                    <Text style={styles.coverSub}>{subheadline}</Text>
                </View>

                {/* Decorative Footer Line */}
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 15,
                    backgroundColor: '#D4AF37'
                }} />
            </Page>

            {/* PAGE 2: DETAILS & SPECS */}
            <Page size="A4" style={styles.contentPage}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>{projectTitle}</Text>
                    <Text style={styles.headerText}>{persona.replace('Target_', '')}</Text>
                </View>

                {/* Main Description */}
                <View>
                    <Text style={styles.sectionTitle}>{language === 'ru' ? 'О Проекте' : 'About Project'}</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>

                {/* Secret "Space Hack" Box */}
                <View style={styles.highlightBox}>
                    <Text style={styles.highlightTitle}>{spaceHackLabel}</Text>
                    <Text style={styles.highlightText}>{spaceHackDesc}</Text>
                </View>

                {/* ANALYTICS SECTION (NEW) */}
                {content.Analytics && (
                    <View style={styles.analyticsContainer}>
                        <Text style={styles.highlightTitle}>{content.Analytics.Title[language]}</Text>
                        {content.Analytics.Items.map((item, idx) => (
                            <View key={idx} style={styles.analyticsRow}>
                                <Text style={styles.analyticsLabel}>{item.label[language]}</Text>
                                <View style={styles.analyticsBarContainer}>
                                    <View style={{
                                        ...styles.analyticsBar,
                                        width: `${item.barPercent}%`,
                                        backgroundColor: item.highlight ? '#D4AF37' : '#CCCCCC'
                                    }} />
                                    <Text style={styles.analyticsValue}>
                                        {item.prefix}{item.value}{item.suffix}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Engineering Box */}
                <View style={{ ...styles.highlightBox, borderLeftColor: '#0A0A0A' }}>
                    <Text style={styles.highlightTitle}>{engineeringTitle}</Text>
                    <Text style={styles.highlightText}>{engineeringText}</Text>
                </View>

                {/* Specifications */}
                <Text style={styles.sectionTitle}>{language === 'ru' ? 'Характеристики' : 'Specifications'}</Text>
                <View style={styles.specsContainer}>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>{language === 'ru' ? 'Общая Площадь' : 'Total Area'}</Text>
                        <Text style={styles.specValue}>{HOUSE_DATA.Specs.Area_Total} m²</Text>
                    </View>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>{language === 'ru' ? 'Участок' : 'Plot Size'}</Text>
                        <Text style={styles.specValue}>{HOUSE_DATA.Specs.Plot} {language === 'ru' ? 'соток' : 'acres'}</Text>
                    </View>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>{language === 'ru' ? 'Спальни' : 'Bedrooms'}</Text>
                        <Text style={styles.specValue}>{HOUSE_DATA.Specs.Bedrooms}</Text>
                    </View>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>{language === 'ru' ? 'Потолки' : 'Ceiling'}</Text>
                        <Text style={styles.specValue}>{HOUSE_DATA.Specs.CeilingHeight} m</Text>
                    </View>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>{language === 'ru' ? 'Отопление' : 'Heating'}</Text>
                        <Text style={styles.specValue}>{HOUSE_DATA.Specs.Tech.Heating}</Text>
                    </View>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>{language === 'ru' ? 'Статус' : 'Status'}</Text>
                        <Text style={styles.specValue}>Turnkey {HOUSE_DATA.Specs.YearBuilt}</Text>
                    </View>
                </View>

                {/* Amenities */}
                <Text style={styles.sectionTitle}>{language === 'ru' ? 'Особенности' : 'Amenities'}</Text>
                <View style={styles.amenitiesGrid}>
                    {content.Amenities?.map((amenity, idx) => (
                        <View key={idx} style={styles.amenityBadge}>
                            <Text style={styles.amenityText}>{amenity[language]}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>www.nikologorskie.ru</Text>
                    <Text>Generated by Alfred Concierge</Text>
                    <Text>+7 999 ...</Text>
                </View>
            </Page>
        </Document>
    );
};

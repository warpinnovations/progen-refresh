import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Social Media Services That Build",
  subtitle: "Engagement and Influence",
  tagline:
    "Prometheus Enterprises delivers strategic social media services designed to strengthen brand presence, grow audience engagement, and drive meaningful conversations across digital platforms.",
  cta: "Let's Elevate Your Social Presence",
  sectionSubtitle:
    "We provide end-to-end social media solutions that combine strategy, analytics, content planning, and campaign execution to help brands stay relevant.",
  services: [
    {
      name: "KPI Monitoring & Social Listening",
      description:
        "We track key performance indicators and monitor online conversations to understand audience sentiment and measure campaign effectiveness.",
    },
    {
      name: "Social Media Strategy",
      description:
        "We create data-driven strategies that define content direction, platform focus, and engagement goals aligned with brand objectives.",
    },
    {
      name: "Digital Brand Analysis",
      description:
        "We evaluate brand performance across social platforms to identify strengths, gaps, and opportunities for improvement.",
    },
    {
      name: "Content Planning",
      description:
        "We plan content calendars and curate meaningful conversations that encourage engagement and build community interaction.",
    },
    {
      name: "Influencer and KOL Marketing",
      description:
        "We manage influencer and KOL partnerships that amplify brand messaging and extend reach to targeted audiences.",
    },
    {
      name: "Campaign Management",
      description:
        "We oversee end-to-end social media campaigns, ensuring consistent execution, engagement, and performance tracking across platforms.",
    },
  ],
  closingTitle: "Social Media Campaigns with Prometheus",
  closingText:
    "From strategy to execution, Prometheus helps brands build strong digital communities and impactful social media campaigns that drive engagement and visibility.",
};

export const metadata = {
  title: "Social Media Services | Prometheus PH",
  description:
    "Strategic social media services that build engagement and influence — from content planning to influencer and KOL marketing.",
};

export default function SocialMediaServicesPage() {
  return <ServicePageTemplate {...data} />;
}

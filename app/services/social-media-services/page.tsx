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
      name: "Social Listening & KPI Monitoring",
      description:
        "We track key performance indicators, monitor online conversations, analyze audience sentiment, and measure campaign effectiveness through Meltwater, our social intelligence platform.",
    },
    {
      name: "Social Media Strategy",
      description:
        "We craft data-driven strategies that define content direction, platform focus, and engagement goals aligned with brand objectives.",
    },
    {
      name: "Content Planning & Production",
      description:
        "We plan content calendars and curate meaningful content that encourages engagement and builds community interaction.",
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

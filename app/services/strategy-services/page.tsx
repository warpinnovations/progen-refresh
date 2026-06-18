import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Strategy Services for Smarter",
  subtitle: "Brand and Business Decisions",
  tagline:
    "Prometheus Enterprises helps organizations and brands make informed, data-driven decisions through strategy solutions designed to improve audience understanding, strengthen campaigns, and support long-term business growth.",
  cta: "Let's Plan Your Next Move",
  sectionSubtitle:
    "We provide strategic support to help brands better understand their audiences, strengthen their campaigns, and make more informed business decisions.",
  services: [
    {
      name: "Consumer Research",
      description:
        "We gather and analyze consumer data to support audience understanding, campaign planning, and decision-making.",
    },
    {
      name: "Insighting",
      description:
        "We dive deeper to understand consumer behavior, category trends, and cultural insights, helping brands develop more relevant, unique, and effective campaigns.",
    },
    {
      name: "Strategy Development",
      description:
        "We build tailored marketing and communication strategies aligned with brand goals, audience needs, and market opportunities.",
    },
    {
      name: "Social Listening",
      description:
        "We monitor online conversations and audience sentiment before, during, and after running campaigns to stay informed, responsive, and clear on their real impacts.",
    },
    {
      name: "Digital Marketing Workshops",
      description:
        "We conduct Digital Marketing 101 workshops designed to equip teams with practical knowledge on digital platforms, trends, and campaign fundamentals.",
    },
  ],
  closingTitle: "Strategy with Prometheus",
  closingText:
    "From business strategy to reputation management, we help our partners with strategy solutions that turn data into insights and actionable results.",
};

export const metadata = {
  title: "Strategy Services | Prometheus PH",
  description:
    "Data-driven strategy solutions for smarter brand and business decisions — consumer research, insighting, and digital marketing workshops.",
};

export default function StrategyServicesPage() {
  return <ServicePageTemplate {...data} />;
}

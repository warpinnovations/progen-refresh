import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Branding Services That Shape",
  subtitle: "Meaningful Brand Identities",
  tagline:
    "Prometheus Enterprises helps brands build clear, impactful, and memorable identities through strategic branding services designed to strengthen positioning, communication, and audience connection.",
  cta: "Let's Build Your Brand",
  sectionSubtitle:
    "We provide branding solutions that combine strategy, creativity, and communication to help brands stand out.",
  services: [
    {
      name: "Big Idea Development",
      description:
        "We develop strong creative concepts and brand narratives that serve as the foundation for campaigns, positioning, and communication.",
    },
    {
      name: "Brand Mock-Ups and Design",
      description:
        "We create visual mock-ups and branding materials that bring ideas to life and establish a cohesive brand identity across platforms.",
    },
    {
      name: "Target Market Identification",
      description:
        "We identify and analyze target audiences to help brands communicate more effectively and build stronger customer connections.",
    },
    {
      name: "Brand Strategy Development",
      description:
        "We create tailored branding strategies aligned with business goals, market positioning, and audience behavior.",
    },
    {
      name: "Communications Planning",
      description:
        "We develop structured communication plans that ensure consistent messaging across campaigns, platforms, and customer touchpoints.",
    },
    {
      name: "Social Card Design",
      description:
        "We design visually engaging social media cards that support brand visibility, campaign messaging, and digital engagement.",
    },
  ],
  closingTitle: "Branding with Prometheus",
  closingText:
    "From brand development to campaign identity systems, Prometheus creates branding solutions that help organizations communicate with clarity, consistency, and purpose.",
};

export const metadata = {
  title: "Branding Services | Prometheus PH",
  description:
    "Strategic branding services that shape meaningful brand identities — from big idea development to communications planning.",
};

export default function BrandingServicesPage() {
  return <ServicePageTemplate {...data} />;
}

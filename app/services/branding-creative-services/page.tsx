import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Branding & Creative Services That Build",
  subtitle: "Meaningful Connections",
  tagline:
    "Prometheus Enterprises helps brands build clear, impactful, and memorable brand identities through strategic branding services and compelling visual experiences that strengthen positioning, elevate communication, and create meaningful audience connections across platforms.",
  cta: "Let's Share Your Story",
  sectionSubtitle:
    "We provide creative solutions that combine strategy, storytelling, and design to help brands stand out and deliver impactful experiences.",
  services: [
    {
      name: "Brand Development",
      description:
        "We shape brand identities through strategic design and messaging that help organizations stand out and connect with their audiences—whether they're launching a new brand or refreshing an existing one.",
    },
    {
      name: "Campaign Ideation",
      description:
        "We develop strong creative concepts and brand narratives that serve as the foundation for campaigns, positioning, and communication.",
    },
    {
      name: "Graphic Design",
      description:
        "We develop visual materials that communicate your brand clearly across campaigns, presentations, digital platforms, and print assets.",
    },
    {
      name: "Video Production",
      description:
        "We develop storyboards and scripts that provide clear creative direction and support cohesive storytelling across video and campaign materials.",
    },
    {
      name: "Motion Graphics",
      description:
        "We produce animated videos and visual elements that simplify messages, increase engagement, and enhance digital storytelling.",
    },
    {
      name: "Photography Services",
      description:
        "We capture high-quality photos for campaigns, events, products, corporate materials, and brand communications.",
    },
    {
      name: "Copywriting Services",
      description:
        "We create ad copy, social media captions, and campaign messaging designed to strengthen brand communication and audience engagement.",
    },
  ],
  closingTitle: "Branding with Prometheus",
  closingText:
    "From brand development to campaign identity systems, Prometheus creates branding solutions and creative experiences that help organizations communicate with clarity, consistency, and purpose.",
  gallery: [
    { type: "image", src: "/brandingAndCreative/bootcamp-adidas.jpg" },
    { type: "image", src: "/brandingAndCreative/rev.jpg" },
    { type: "image", src: "/brandingAndCreative/social-card.jpg" },
  ],
};

export const metadata = {
  title: "Branding & Creative Services | Prometheus PH",
  description:
    "Strategic branding and creative services that build meaningful connections — from brand development and campaign ideation to graphic design, video production, and photography.",
};

export default function BrandingCreativeServicesPage() {
  return <ServicePageTemplate {...data} />;
}

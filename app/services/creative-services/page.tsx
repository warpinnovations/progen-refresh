import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Creative Services That",
  subtitle: "Bring Brands to Life",
  tagline:
    "Prometheus Enterprises crafts compelling visual and digital experiences through creative services designed to strengthen communication, elevate brand identity, and connect with audiences across platforms.",
  cta: "Let's Create Something Meaningful",
  sectionSubtitle:
    "We provide creative solutions that combine strategy, storytelling, and design to deliver impactful brand experiences.",
  services: [
    {
      name: "Website Design",
      description:
        "We create responsive and user-focused websites designed to strengthen brand presence and improve customer experience online.",
    },
    {
      name: "Graphic Design",
      description:
        "We develop visual materials that communicate your brand clearly across campaigns, presentations, digital platforms, and print assets.",
    },
    {
      name: "Banner Ad Design",
      description:
        "We design attention-grabbing banner ads optimized for digital campaigns, promotions, and audience engagement.",
    },
    {
      name: "Video Production",
      description:
        "We handle video shoots, editing, and production management to create compelling visual content tailored to your brand objectives.",
    },
    {
      name: "Motion Graphics",
      description:
        "We produce animated videos and visual elements that simplify messages, increase engagement, and enhance digital storytelling.",
    },
    {
      name: "Storyboarding and Scripting",
      description:
        "We develop storyboards and scripts that provide clear creative direction and support cohesive storytelling across video and campaign materials.",
    },
    {
      name: "Photography Services",
      description:
        "We capture high-quality photos for campaigns, events, products, corporate materials, and brand communications.",
    },
    {
      name: "Content Planning",
      description:
        "We build structured content plans that align messaging, platform strategy, and campaign objectives across digital channels.",
    },
    {
      name: "Copywriting Services",
      description:
        "We create ad copy, social media captions, and campaign messaging designed to strengthen brand communication and audience engagement.",
    },
  ],
  closingTitle: "Creative Services with Prometheus",
  closingText:
    "From digital campaigns to visual storytelling, Prometheus delivers creative solutions that help brands communicate with clarity, consistency, and impact.",
};

export const metadata = {
  title: "Creative Services | Prometheus PH",
  description:
    "Creative services that bring brands to life — from video production and graphic design to content planning and copywriting.",
};

export default function CreativeServicesPage() {
  return <ServicePageTemplate {...data} />;
}

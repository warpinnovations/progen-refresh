import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Media Services That Maximize",
  subtitle: "Reach and Impact",
  tagline:
    "Prometheus Enterprises provides strategic media services designed to help brands reach the right audiences, maximize campaign performance, and ensure efficient use of media investments across platforms.",
  cta: "Let's Amplify Your Reach",
  sectionSubtitle:
    "We deliver end-to-end media solutions that combine planning, execution, monitoring, and reporting to ensure campaigns perform effectively and reach intended audiences.",
  services: [
    {
      name: "Media Planning and Strategy",
      description:
        "We develop data-driven media strategies that identify the right channels, timing, and audience segments to maximize campaign reach and effectiveness.",
    },
    {
      name: "Media Buying and Deployment",
      description:
        "We execute strategic media placements across traditional and digital platforms to ensure optimal visibility and audience targeting.",
    },
    {
      name: "Media Monitoring and Optimization",
      description:
        "We continuously track campaign performance and make real-time adjustments to improve reach, engagement, and efficiency.",
    },
    {
      name: "Media Reporting and Analysis",
      description:
        "We provide detailed performance reports that measure campaign impact, audience reach, and overall media effectiveness to guide future strategies.",
    },
  ],
  closingTitle: "Media Campaigns with Prometheus",
  closingText:
    "From strategic planning to performance optimization, Prometheus delivers media solutions that ensure brands reach the right audience at the right time with the right message.",
  gallery: [
    { type: "image", src: "/media/vertex-event.jpg" },
    { type: "image", src: "/media/bb-xmas.jpg" },
    { type: "image", src: "/media/marker-calle-real.jpg" },
    { type: "image", src: "/media/damires-hills.jpg" },
    { type: "image", src: "/media/nike-store-opening.jpg" },
  ],
};

export const metadata = {
  title: "Media Services | Prometheus PH",
  description:
    "Strategic media services that maximize reach and impact — media planning, buying, monitoring, and reporting.",
};

export default function MediaServicesPage() {
  return <ServicePageTemplate {...data} />;
}

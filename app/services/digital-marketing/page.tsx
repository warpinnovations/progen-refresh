import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Digital Marketing Services That Drive",
  subtitle: "Visibility and Growth",
  tagline:
    "Prometheus Enterprises delivers results-driven digital marketing services designed to improve visibility, strengthen engagement, and support sustainable brand growth across digital platforms.",
  cta: "Let's Strengthen Your Digital Growth",
  sectionSubtitle:
    "We provide digital marketing solutions that combine strategy, content, and optimization to help brands reach the right audience and achieve measurable results.",
  services: [
    {
      name: "Search Engine Optimization (SEO)",
      description:
        "We optimize website structure, content, and keywords to improve search visibility and help brands rank higher on search engines.",
    },
    {
      name: "Digital Strategy Development",
      description:
        "We create data-informed digital marketing strategies aligned with business goals, audience behavior, and campaign objectives.",
    },
    {
      name: "E-mail Direct Marketing",
      description:
        "We design and execute targeted email campaigns that nurture leads, strengthen customer relationships, and drive conversions.",
    },
    {
      name: "Content Tagging and Optimization",
      description:
        "We implement proper content tagging and structuring to improve discoverability, organization, and performance across digital platforms.",
    },
    {
      name: "Website Development",
      description:
        "We create responsive and user-focused websites designed to strengthen brand presence and improve customer experience online.",
    },
    {
      name: "Content Writing",
      description:
        "We craft clear, persuasive website content that communicates brand value and supports user engagement and conversion goals.",
    },
  ],
  closingTitle: "Digital Marketing with Prometheus",
  closingText:
    "From search visibility to targeted communication, Prometheus helps brands strengthen their digital presence through strategic and performance-driven marketing.",
};

export const metadata = {
  title: "Digital Marketing | Prometheus PH",
  description:
    "Results-driven digital marketing services — SEO, email campaigns, digital strategy, and content optimization.",
};

export default function DigitalMarketingPage() {
  return <ServicePageTemplate {...data} />;
}

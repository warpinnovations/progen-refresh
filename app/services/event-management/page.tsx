import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "End-to-End Event Management",
  subtitle: "for Seamless Brand Experiences",
  tagline:
    "Prometheus Enterprises is committed to helping organizations and brands deliver seamless, high-impact events and experiences that strengthen audience engagement through end-to-end management solutions.",
  cta: "Let's Plan Your Next Event",
  sectionSubtitle: "We address the key demands of planning and executing successful events.",
  services: [
    {
      name: "Strategic Planning",
      description:
        "We develop event concepts, timelines, and program structures that align with your brand and business objectives.",
    },
    {
      name: "Program Management",
      description:
        "We oversee scripting, technical direction, and broadcast coordination to keep every event running smoothly.",
    },
    {
      name: "Guest Management",
      description:
        "We manage registration, attendee communication, and guest flow to create a seamless event experience.",
    },
    {
      name: "Brand Activation",
      description:
        "We create interactive event components that strengthen customer engagement and elevate campaign visibility.",
    },
    {
      name: "On-Site Coordination",
      description:
        "We supervise staging, setup, and real-time operations to ensure smooth execution on event day.",
    },
    {
      name: "Talent Coordination",
      description:
        "We handle coordination with suppliers, performers, and manage influencer/celebrity partnerships to keep every moving part aligned.",
    },
  ],
  closingTitle: "Event Management with Prometheus",
  closingText:
    "From intimate corporate gatherings to large-scale public events, brands and organizations partner with us in transforming ideas into well-executed experiences.",
};

export const metadata = {
  title: "Event Management | Prometheus PH",
  description:
    "End-to-end event management solutions for seamless brand experiences — from strategic planning to on-site coordination.",
};

export default function EventManagementPage() {
  return <ServicePageTemplate {...data} />;
}

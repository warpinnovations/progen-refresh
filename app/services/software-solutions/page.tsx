import ServicePageTemplate from "@/components/Services/ServicePageTemplate";

const data = {
  title: "Software Solutions That Power",
  subtitle: "Digital Experiences",
  tagline:
    "Prometheus Enterprises delivers custom software solutions designed to build high-performing digital platforms, enhance user experience, and support business growth through scalable and conversion-focused development.",
  cta: "Let's Build Your Digital Solution",
  sectionSubtitle:
    "We provide end-to-end software development and optimization services that combine design, functionality, and performance to create effective digital solutions for brands and businesses.",
  services: [
    {
      name: "AR/VR/MR Development",
      description:
        "We develop immersive augmented, virtual, and mixed reality experiences that enhance engagement and create innovative brand interactions.",
    },
    {
      name: "App Development",
      description:
        "We build mobile and web applications that support business operations, improve accessibility, and enhance customer engagement.",
    },
    {
      name: "Custom Website Development",
      description:
        "We build tailored websites designed to meet specific business needs, ensuring engagement, lead generation, and overall conversion performance.",
    },
    {
      name: "Website Design and Re-Design",
      description:
        "We create and refresh website designs to improve user experience, visual appeal, and overall brand consistency.",
    },
    {
      name: "CMS Website Development",
      description:
        "We develop content management system (CMS) websites that allow easy updates, flexibility, and efficient content control.",
    },
    {
      name: "Front-End Custom Design",
      description:
        "We design responsive and interactive front-end interfaces that enhance usability and deliver seamless user experiences across devices.",
    },
  ],
  closingTitle: "Explore Software Solutions with Prometheus",
  closingText:
    "From custom websites to immersive digital experiences, Prometheus develops software solutions that combine functionality, design, and performance to support modern business needs.",
  gallery: [
    { type: "image", src: "/softwareSolutions/prominent-capitol-1.jpg" },
    { type: "image", src: "/softwareSolutions/prominent-maasin-1.jpg" },
    { type: "image", src: "/softwareSolutions/avatar.png" },
    { type: "image", src: "/softwareSolutions/prominent-capitol-2.jpg" },
    { type: "image", src: "/softwareSolutions/prominent-maasin-2.jpg" },
    { type: "image", src: "/softwareSolutions/digital-assessment.png" },
  ],
};

export const metadata = {
  title: "Software Solutions | Prometheus PH",
  description:
    "Custom software solutions that power digital experiences — websites, apps, AR/VR development, and conversion optimization.",
};

export default function SoftwareSolutionsPage() {
  return <ServicePageTemplate {...data} />;
}

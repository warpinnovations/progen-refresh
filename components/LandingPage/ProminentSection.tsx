import Image from 'next/image';

// Import the new SVG icon components
import IconInsights from './icons/IconInsights';
import IconIntegration from './icons/IconIntegration';
import IconDashboards from './icons/IconDashboards';

const features = [
  {
    title: 'Instant Data Insights',
    description: 'Make informed decisions with our up-to-the-minute analytics, keeping your business agile and competitive.',
    icon: IconInsights, 
  },
  {
    title: 'Seamless Integration',
    description: 'Effortlessly integrate with existing systems, ensuring smooth data flow and operational continuity.',
    icon: IconIntegration,
  },
  {
    title: 'Customizable Dashboards',
    description: 'Personalize dashboards to display relevant data and metrics tailored to your business needs.',
    icon: IconDashboards,
  },
];

const ProminentSection = () => {
  return (
    <section className="bg-black text-white w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg flex flex-col items-center lg:items-start">
              <p className="font-semibold tracking-wider uppercase text-gray-300 text-center lg:text-left">
                Transform Your Business
              </p>
              
              <h1 className="mt-1">
                <Image 
                  src="/LandingPageAssets/prominent-logo.png"
                  alt="The Prominent"
                  width={3703}
                  height={1019}
                  className="w-[280px] sm:w-[300px] h-auto"
                  priority
                />
                 <span className="sr-only">The Prominent</span>
              </h1>
              
              <ul className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none text-left">
                {features.map((feature) => {
                    // Here we assign the component from our data to a variable with a capital letter.
                    // This is a requirement in JSX for rendering components dynamically.
                    const IconComponent = feature.icon; 
                    return (
                        <li key={feature.title} className="relative pl-9">
                            <div className="absolute top-1 left-0 flex h-6 w-6 items-center justify-center text-white">
                                <IconComponent className="h-full w-full" />
                            </div>
                            <p className="inline">
                            <strong className="font-semibold text-[#ff9e00]">{feature.title}.</strong> {feature.description}
                            </p>
                        </li>
                    );
                })}
              </ul>

              <div className="mt-10 flex justify-center lg:justify-start">
                 <a
                  href="https://theprominent.ph/"
                  className="inline-block text-center bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-white font-bold rounded-lg h-14 min-w-[160px] px-8 text-lg leading-[56px]"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>

          {/* The glow effect has been updated in the previous step and remains the same. */}
          <div className="w-[48rem] max-w-none rounded-3xl shadow-[-40px_0_80px_-30px_rgba(241,100,243,1),0_0_50px_-20px_rgba(241,100,243,0.4)] sm:w-[57rem] md:-ml-4 lg:w-[48rem] lg:-ml-0 xl:w-[57rem] p-4 sm:p-6 bg-white/5 border border-white/10">
              <Image
                src="/LandingPageAssets/prominent-dashboard.png"
                alt="A screenshot of The Prominent's feature-rich product dashboard."
                width={1500}
                height={1022}
                className="w-full h-auto rounded-xl"
                priority
              />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProminentSection;
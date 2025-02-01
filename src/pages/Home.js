import React from 'react';
import HeroSlider from '../components/HeroSlider';
import FeaturesSection from '../components/FeaturesSection';
import BusinessSection from '../components/BusinessSection';
import TabSection from '../components/TabSection';
import InfoSection from '../components/InfoSection';

function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <FeaturesSection />
      <BusinessSection />
      <FeaturesSection />
      <TabSection/>
      <InfoSection/>
      <section className="relative">
      {/* Background Image Section */}
      <div
        className="relative bg-cover bg-center h-80 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://softstandard.com/wp-content/uploads/2016/05/handshake-background.jpg')`, // Replace with your actual background image URL
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark Overlay */}
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="text-lg uppercase font-semibold mb-4 tracking-wide">
            What People Say
          </h3>
          <p className="italic text-sm leading-relaxed max-w-3xl mx-auto">
            "Although I like the fact that Theplacify is in my backyard
            (Fremont), I would recommend using this company regardless of where
            you are located. They provide excellent resources and their
            turn-around time is amazing (in fact they usually have candidates
            for me before I am even ready to interview them)."
          </p>
          <p className="mt-4 font-medium">
            Applications Development Manager at Leading Financial Company
          </p>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[#00BFB3] text-white text-center py-8">
        <p className="text-lg font-medium max-w-4xl mx-auto">
          Theplacify demonstrates its commitment to quality and cost, not
          just by <span className="font-bold italic">“words”</span>, but by
          actions and results.
        </p>
      </div>
    </section>
    </main>
  );
}

export default Home;


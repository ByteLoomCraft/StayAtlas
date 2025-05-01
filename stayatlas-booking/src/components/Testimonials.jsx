import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import front1 from "../assets/frontv.jpg";
import bedroom from "../assets/bdroom.jpg";
import bedroom2 from "../assets/bdroom2.jpg";

const testimonials = [
  {
    text: "I've been working with these guys for a long time and I can say that my house is in the perfect hands.",
    image: front1,
    name: 'Allan Collins',
  },
  {
    text: 'Working with Sentry Oak is just great—every problem in my house is solved in a matter of days.',
    image: bedroom,
    name: 'Clay Washington',
  },
  {
    text: 'Once a pipe burst in my kitchen and an hour later it was already repaired, thanks to Sentry Oak.',
    image: bedroom2,
    name: 'Tanya Grant',
  }
];

export default function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black">
          What Our Clients Say About Us
        </h2>
        <p className="mt-2 text-gray-600">
          Real feedback from homeowners who trust Sentry Oak.
        </p>
      </div>

      {/* Slider/Responsive grid */}
      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex justify-center gap-6 pb-4">
        {testimonials.map((item, idx) => (
          <article
            key={idx}
            className="snap-center flex-shrink-0 w-80 sm:w-96 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <header className="flex justify-center mb-4">
              <FaQuoteLeft className="text-yellow-500 text-4xl" />
            </header>
            <blockquote className="text-gray-700 italic text-center mb-6 flex-grow">
              “{item.text}”
            </blockquote>
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover mb-2"
              />
              <p className="font-semibold text-gray-800">{item.name}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-8 text-center">
        <h4 className="text-xl sm:text-2xl font-semibold mb-2">
          No Two Homes Are Alike!
        </h4>
        <p className="text-gray-600 max-w-xl mx-auto">
          Our elite network, combined with personalized planning, ensures a home plan tailored just for you.
        </p>
      </div>
    </section>
  );
}

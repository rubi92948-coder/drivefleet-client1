import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "John Doe",
      role: "Business Traveler",
      text: "The booking process was seamless and the car quality was top-notch. Highly recommended!",
    },
    {
      name: "Sarah Smith",
      role: "Luxury Seeker",
      text: "DriveFleet exceeded my expectations. The supercar was delivered on time and in perfect condition.",
    },
    {
      name: "Mike Ross",
      role: "Road Trip Enthusiast",
      text: "Best rental experience I've ever had. Affordable prices for such high-end luxury vehicles.",
    },
  ];

  return (
    <section className="bg-[#020617] py-20 px-4">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-white">
          What Our <span className="text-orange-500">Customers Say</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="group relative bg-[#0f172a] p-8 rounded-2xl border border-slate-800
                       transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/50
                       hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] cursor-pointer"
          >
            {/* subtle glow background */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />

            {/* Stars */}
            <div className="text-orange-500 mb-4 text-xl tracking-wider">
              ★★★★★
            </div>

            {/* Quote */}
            <p className="text-gray-300 italic mb-6 leading-relaxed">
              "{review.text}"
            </p>

            {/* User */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center 
                           text-white font-bold text-lg group-hover:scale-110 transition"
              >
                {review.name[0]}
              </div>

              <div>
                <h4 className="text-white font-bold group-hover:text-orange-400 transition">
                  {review.name}
                </h4>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
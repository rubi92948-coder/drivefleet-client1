import { 
  HiShieldCheck, 
  HiTruck, 
  HiPhone,
  HiCurrencyDollar 
} from "react-icons/hi";

const WhyChooseUs = () => {
  const features = [
    { 
      title: "Verified Fleet", 
      desc: "Every car in our platform undergoes rigorous safety and quality checks.", 
      icon: HiShieldCheck 
    },
    { 
      title: "Luxury Selection", 
      desc: "Choose from a premium collection of supercars and luxury SUVs.", 
      icon: HiTruck 
    },
    { 
      title: "Best Price", 
      desc: "Competitive daily rates with no hidden fees or surprise charges.", 
      icon: HiCurrencyDollar   // 💰 UPDATED HERE
    },
    { 
      title: "24/7 Support", 
      desc: "Our dedicated team is ready to assist you anytime, anywhere.", 
      icon: HiPhone 
    },
  ];

  return (
    <section className="py-20 bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Why Choose <span className="text-orange-500">DriveFleet?</span>
          </h2>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div 
                key={i}
                className="group bg-[#0f172a] p-8 rounded-2xl border border-slate-800
                           hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >

                {/* ICON BOX */}
                <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center
                                bg-orange-500/10 border border-orange-500/20
                                group-hover:bg-orange-500/20 transition-all">

                  <Icon className="w-5 h-5 text-orange-500" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-3">
                  {f.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
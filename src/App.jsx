import React, { useState, useEffect } from "react";

// --- Design Tokens ---
const BRAND = {
  main: "from-sky-700 to-amber-400",
  text: "text-sky-800",
  accent: "text-amber-500",
  bg: "bg-gradient-to-tr from-white via-sky-50 to-amber-50",
  darkText: "text-slate-900",
  glass: "backdrop-blur-md bg-white/70 shadow-2xl",
  border: "border-sky-100",
  nav: "bg-gradient-to-r from-sky-800 to-amber-400",
  navItem: "text-white hover:text-amber-200",
  navActive: "font-bold text-amber-200 underline underline-offset-8",
};
const CTA = {
  main:
    "bg-gradient-to-br from-amber-400 to-sky-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-300/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500",
  secondary:
    "bg-sky-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500",
};

// --- Main App ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showFAB, setShowFAB] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setShowFAB(window.scrollY > 200 && currentPage !== "contact");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPage]);

  // Navigation handler
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${BRAND.bg} font-inter ${BRAND.darkText} transition-colors duration-500`}>
      <Navbar navigate={navigate} currentPage={currentPage} />
      <main>
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "services" && <ServicesPage />}
        {currentPage === "careers" && <CareersPage />}
        {currentPage === "get-started" && <GetStartedPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>
      <Footer navigate={navigate} />
      {showFAB && (
        <button
          className="fixed bottom-8 right-8 z-50 shadow-2xl rounded-full bg-gradient-to-br from-amber-400 to-sky-600 p-4 text-white text-3xl hover:scale-110 transition"
          aria-label="Contact"
          onClick={() => navigate("contact")}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7l10 6 10-6" />
            <rect x="2" y="7" width="20" height="14" rx="3" />
          </svg>
        </button>
      )}
    </div>
  );
}

// --- Navbar ---
function Navbar({ navigate, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "home" },
    { name: "About", path: "about" },
    { name: "Services", path: "services" },
    { name: "Careers", path: "careers" },
    { name: "Get Started", path: "get-started" },
    { name: "Contact", path: "contact" },
  ];
  return (
    <nav className={`${BRAND.nav} shadow-xl fixed w-full z-50`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => navigate("home")}
          className="flex items-center space-x-2 focus:outline-none"
          aria-label="Home"
        >
          <span className="inline-flex items-center justify-center bg-white rounded-full w-10 h-10 shadow border border-amber-100">
            <img src="/logo192.png" alt="Golden Child ABA" className="w-8 h-8 rounded-full" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-white drop-shadow">Golden Child ABA</span>
        </button>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Open menu"
            className="text-2xl text-white focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`transition ${BRAND.navItem} px-2 py-1 rounded focus:outline-none ${
                currentPage === link.path ? BRAND.navActive : ""
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-sky-900/90 backdrop-blur-md shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                setIsOpen(false);
                navigate(link.path);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg mt-1 ${BRAND.navItem} ${
                currentPage === link.path ? BRAND.navActive : ""
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// --- GLASS/GRADIENT HEADINGS ---
function SectionHeading({ children, color = "text-sky-800" }) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-extrabold mb-8 text-center ${color} drop-shadow-lg bg-gradient-to-br from-white/90 to-amber-50/50 rounded-lg px-4 py-3`}
    >
      {children}
    </h2>
  );
}

// --- BUTTONS ---
function PrimaryButton({ children, ...props }) {
  return (
    <button {...props} className={CTA.main + " " + (props.className || "")}>
      {children}
    </button>
  );
}
function SecondaryButton({ children, ...props }) {
  return (
    <button {...props} className={CTA.secondary + " " + (props.className || "")}>
      {children}
    </button>
  );
}

// --- Home Page ---
function HomePage({ navigate }) {
  // Testimonials carousel
  const testimonials = [
    {
      text: "Our experience with Golden Child ABA has been truly transformative. The care and expertise are next-level.",
      author: "Sarah J., Parent",
    },
    {
      text: "Innovative, kind, and always focused on our child's strengths. Highly recommend!",
      author: "David L., Parent",
    },
    {
      text: "A gold standard in ABA. Their approach is modern, holistic, and effective.",
      author: "Dr. Emily R., Pediatrician",
    },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setCurrentTestimonial((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center text-center bg-gradient-to-br from-sky-100 via-amber-50 to-white pt-24 pb-12">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Smiling child playing"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className={`relative z-10 max-w-3xl mx-auto ${BRAND.glass} rounded-3xl p-10`}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-sky-800 leading-tight mb-4 tracking-tight animate-fade-in-down">
            Modern ABA, <br />
            Human Connection
          </h1>
          <p className="text-xl md:text-2xl text-sky-700 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Maryland’s most progressive in-home ABA therapy. Compassionate, evidence-based, and family-focused.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <PrimaryButton onClick={() => navigate("get-started")}>Get Services</PrimaryButton>
            <SecondaryButton onClick={() => navigate("careers")}>Join Our Team</SecondaryButton>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <SectionHeading>Welcome to Golden Child ABA</SectionHeading>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            We unlock every child’s unique potential. Our expert BCBAs and RBTs provide progressive, personalized therapy—right in your home.
          </p>
          <PrimaryButton onClick={() => navigate("about")}>Learn More About Us</PrimaryButton>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-white px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading color="text-sky-700">Our Services</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40"><rect x="6" y="14" width="28" height="18" rx="4" stroke="currentColor" /><path d="M20 32V20" stroke="currentColor" /><circle cx="20" cy="17" r="2" fill="currentColor" /></svg>}
              title="In-Home ABA"
              description="Personalized therapy, delivered where your child thrives most."
            />
            <ServiceCard
              icon={<svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40"><circle cx="20" cy="18" r="12" stroke="currentColor" /><path d="M20 30v4" stroke="currentColor" /><path d="M12 34h16" stroke="currentColor" /></svg>}
              title="Parent Training"
              description="Empowering families with actionable strategies."
            />
            <ServiceCard
              icon={<svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40"><rect x="7" y="10" width="26" height="18" rx="4" stroke="currentColor" /><path d="M20 28v4" stroke="currentColor" /></svg>}
              title="School Collaboration"
              description="We partner with educators for seamless support."
            />
          </div>
          <div className="text-center mt-12">
            <PrimaryButton onClick={() => navigate("services")}>See All Services</PrimaryButton>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <SectionHeading>What Families Say</SectionHeading>
          <div className="relative rounded-2xl shadow-lg bg-gradient-to-br from-amber-50 to-sky-50 p-10">
            <blockquote className="text-2xl md:text-3xl italic text-sky-800 mb-6 transition-opacity duration-700 ease-in-out">
              “{testimonials[currentTestimonial].text}”
            </blockquote>
            <p className="text-lg font-semibold text-amber-600">
              — {testimonials[currentTestimonial].author}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${i === currentTestimonial ? "bg-sky-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA MAP */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <SectionHeading color="text-sky-700">Serving Maryland Families</SectionHeading>
          <p className="text-lg text-gray-700 mb-8">
            We provide in-home ABA therapy across Maryland. Reach out to check your area!
          </p>
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-sky-100 mb-8">
            <img
              src="https://placehold.co/900x400/8ecae6/fff?text=Maryland+Service+Area+Map"
              alt="Maryland Service Area Map"
              className="object-cover w-full h-full"
            />
          </div>
          <PrimaryButton onClick={() => navigate("contact")}>Check Your Area</PrimaryButton>
        </div>
      </section>
    </>
  );
}

// --- Service Card ---
function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white/70 rounded-2xl shadow-xl p-8 text-center hover:scale-105 hover:shadow-2xl transition">
      <div className="mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-sky-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// --- About Page ---
function AboutPage() {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading>About Golden Child ABA</SectionHeading>
        <div className="bg-white/80 rounded-xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-sky-700 mb-4">Mission & Values</h3>
          <p className="text-lg text-gray-700 mb-6">
            Our mission is to empower children with autism to realize their fullest potential—through compassionate, modern, and individualized ABA therapy.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-lg text-gray-700">
            <li>
              <span className={BRAND.accent}>Excellence:</span> Highest clinical standards.
            </li>
            <li>
              <span className={BRAND.accent}>Child-Centered:</span> Every plan is unique.
            </li>
            <li>
              <span className={BRAND.accent}>Family Collaboration:</span> Parents are partners.
            </li>
            <li>
              <span className={BRAND.accent}>Empathy:</span> We lead with kindness.
            </li>
            <li>
              <span className={BRAND.accent}>Growth:</span> Always learning, always improving.
            </li>
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://placehold.co/220x220/FEB302/fff?text=Moshe+Rosen"
            alt="Moshe Rosen, Founder"
            className="rounded-full border-4 border-amber-400 shadow w-44 h-44 object-cover"
          />
          <div>
            <h3 className="text-3xl font-bold text-sky-700 mb-4">Meet Our Founder</h3>
            <p className="text-lg text-gray-700">
              Moshe Rosen, BCBA, brings over a decade of experience and a visionary approach to ABA. His leadership ensures Golden Child ABA is always at the forefront—innovative, ethical, and child-first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Services Page ---
function ServicesPage() {
  const details = [
    {
      icon: "🏠",
      title: "In-Home ABA Therapy",
      desc:
        "Direct, personalized ABA programs in the comfort of your home, tailored to your child’s needs and family routines.",
    },
    {
      icon: "👩‍👧‍👦",
      title: "Parent Empowerment",
      desc:
        "We equip caregivers with practical tools and support for real-world, lasting change.",
    },
    {
      icon: "🏫",
      title: "School Collaboration",
      desc:
        "Our BCBAs work hand-in-hand with educators to ensure consistency and progress in every setting.",
    },
    {
      icon: "🐣",
      title: "Early Intervention",
      desc:
        "Specialized programs for young children—capitalizing on the most important years for development.",
    },
    {
      icon: "💰",
      title: "Insurance & Medicaid",
      desc:
        "We navigate the insurance process for you. In-network with most plans, including Maryland Medicaid.",
    },
    {
      icon: "🤝",
      title: "Community Integration",
      desc:
        "We help children generalize skills into the community, for real-life confidence and independence.",
    },
  ];
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading>Our Comprehensive Services</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {details.map((s) => (
            <div
              key={s.title}
              className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col gap-2"
            >
              <span className="text-4xl mb-2">{s.icon}</span>
              <h3 className="text-2xl font-semibold text-sky-700 mb-1">
                {s.title}
              </h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/90 rounded-xl shadow-xl p-8 mb-12 text-center">
          <h3 className="text-3xl font-bold text-sky-700 mb-4">
            Medicaid & Insurance Friendly
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            We accept Aetna, BCBS, Cigna, Tricare, United, Maryland Medicaid, and more. Our intake team handles the paperwork, so you don’t have to.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xl font-semibold text-amber-600">
            <span>Aetna</span>
            <span>BCBS</span>
            <span>Cigna</span>
            <span>Tricare</span>
            <span>United</span>
            <span>Maryland Medicaid</span>
          </div>
        </div>
        <div className="text-center">
          <PrimaryButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Ready to Start?
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

// --- Careers Page ---
function CareersPage() {
  const jobs = [
    {
      title: "Board Certified Behavior Analyst (BCBA)",
      location: "Maryland (In-Home)",
      desc: "Provide supervision, assessment, and program development for our clients. Must be licensed in Maryland.",
      requirements: ["BCBA certification", "Maryland LBA", "1+ years BCBA experience"],
    },
    {
      title: "Registered Behavior Technician (RBT)",
      location: "Maryland (In-Home)",
      desc: "Deliver direct ABA therapy under BCBA supervision. Make a real difference for children.",
      requirements: ["RBT certification", "HS diploma (Bachelor’s preferred)"],
    },
    {
      title: "Intake Coordinator",
      location: "Baltimore HQ (Hybrid)",
      desc: "Guide families through intake and insurance. Admin skills and empathy required.",
      requirements: ["Bachelor’s preferred", "Healthcare admin/intake exp.", "Strong communication skills"],
    },
  ];
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading color="text-sky-700">Careers</SectionHeading>
        <div className="bg-white/90 rounded-xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-amber-700 mb-4">Our Culture</h3>
          <p className="text-lg text-gray-700 mb-6">
            We’re a modern team—collaborative, innovative, and deeply supportive. We prioritize your growth and work-life balance.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-lg text-gray-700">
            <li>
              <span className="text-sky-500">Collaboration</span>
            </li>
            <li>
              <span className="text-sky-500">Innovation</span>
            </li>
            <li>
              <span className="text-sky-500">Growth</span>
            </li>
            <li>
              <span className="text-sky-500">Balance</span>
            </li>
            <li>
              <span className="text-sky-500">Client-first</span>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {jobs.map((job) => (
            <div key={job.title} className="bg-sky-50 rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-sky-700 mb-1">{job.title}</h4>
              <p className="text-lg text-gray-600 mb-2">{job.location}</p>
              <p className="mb-2 text-gray-700">{job.desc}</p>
              <ul className="list-disc ml-6 text-gray-600">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white/90 rounded-xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-sky-700 mb-4">Ready to Apply?</h3>
          <p className="text-lg text-gray-700 mb-6">
            Email <a href="mailto:careers@goldenchildaba.com" className="text-amber-700 underline">careers@goldenchildaba.com</a> with your resume and cover letter.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Get Started Page ---
function GetStartedPage() {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading>Get Started</SectionHeading>
        <div className="bg-white/90 rounded-xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-sky-700 mb-4">
            3 Steps to Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StepCard
              step="1"
              title="Connect"
              description="Fill out our intake form or call us. We’ll learn about your child and family."
            />
            <StepCard
              step="2"
              title="Verify & Intake"
              description="We handle insurance and guide you through paperwork—stress free."
            />
            <StepCard
              step="3"
              title="Assess & Begin"
              description="A BCBA assesses your child and creates a tailored plan. Services begin!"
            />
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-sky-700 mb-4">Start Your Journey</h3>
          <p className="mb-4 text-lg text-gray-700">
            Submit your info and we’ll get in touch within 1-2 business days.
          </p>
          <form className="max-w-xl mx-auto text-left grid gap-4">
            <Input label="Parent/Guardian Name" type="text" id="parentName" />
            <Input label="Child's Name (Optional)" type="text" id="childName" />
            <Input label="Phone Number" type="tel" id="phone" />
            <Input label="Email" type="email" id="email" />
            <Input label="Zip Code" type="text" id="zip" />
            <div>
              <label htmlFor="message" className="block text-sky-700 font-semibold mb-1">
                Tell us about your needs (optional)
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full rounded-lg border border-sky-200 p-3 focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <PrimaryButton type="submit" className="w-full">Submit</PrimaryButton>
          </form>
          <p className="text-xs text-gray-400 mt-2">
            For production, integrate a HIPAA-compliant intake solution.
          </p>
        </div>
      </div>
    </section>
  );
}
function StepCard({ step, title, description }) {
  return (
    <div className="bg-sky-50 rounded-xl p-6 shadow-md flex flex-col items-center text-center">
      <div className="bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-3 shadow-lg">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-sky-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
function Input({ label, ...props }) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sky-700 font-semibold mb-1"
      >
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-sky-200 p-3 focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
}

// --- Contact Page ---
function ContactPage() {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading color="text-sky-700">Contact Us</SectionHeading>
        <div className="bg-white/90 rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-sky-700 mb-4">We're Here to Help</h3>
            <p className="text-lg text-gray-700 mb-6">
              Call, email, or visit us. We’re always happy to answer questions and guide you.
            </p>
            <div className="space-y-4 text-lg">
              <p className="flex items-center gap-3 text-gray-800">
                <span className="text-amber-500 text-2xl">📞</span>
                <span>
                  <a href="tel:+14105551234" className="text-sky-600 underline hover:text-amber-500">
                    (410) 555-1234
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-3 text-gray-800">
                <span className="text-amber-500 text-2xl">📧</span>
                <span>
                  <a href="mailto:info@goldenchildaba.com" className="text-sky-600 underline hover:text-amber-500">
                    info@goldenchildaba.com
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-3 text-gray-800">
                <span className="text-amber-500 text-2xl">📍</span>
                <span>
                  123 ABA Street, Suite 100<br />
                  Baltimore, MD 21201
                </span>
              </p>
            </div>
          </div>
          <div className="w-full h-60 md:h-80 rounded-xl overflow-hidden shadow border border-sky-200">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3088.196328329606!2d-76.6177!3d39.2894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c8035b80a2d103%3A0x9b30b0e4c2c164e6!2sBaltimore%2C%20MD!5e0!3m2!1sen!2sus!4v1624629192562!5m2!1sen!2sus"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer({ navigate }) {
  return (
    <footer className="bg-sky-900 text-white py-10 px-4 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8">
        <div>
          <div
            className="flex items-center justify-center md:justify-start space-x-2 mb-3 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <img
              src="/logo192.png"
              alt="Golden Child ABA Logo"
              className="rounded-full w-8 h-8"
            />
            <span className="text-xl font-bold tracking-wide">
              Golden Child ABA
            </span>
          </div>
          <p className="text-sm text-sky-200">Empowering Every Child to Shine</p>
          <p className="text-sm text-sky-200 mt-2">
            © {new Date().getFullYear()} Golden Child ABA.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sky-200">
            <li>
              <button
                onClick={() => navigate("home")}
                className="hover:text-amber-200 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("about")}
                className="hover:text-amber-200 transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("services")}
                className="hover:text-amber-200 transition-colors"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("careers")}
                className="hover:text-amber-200 transition-colors"
              >
                Careers
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("contact")}
                className="hover:text-amber-200 transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sky-200">
            <li>
              <a href="tel:+14105551234" className="hover:text-amber-200">
                (410) 555-1234
              </a>
            </li>
            <li>
              <a href="mailto:info@goldenchildaba.com" className="hover:text-amber-200">
                info@goldenchildaba.com
              </a>
            </li>
            <li>123 ABA Street, Suite 100, Baltimore, MD</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

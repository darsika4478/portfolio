// src/components/sections/Contact.tsx
import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const email = "darsikanagaraja@gmail.com";
  const phone = "+94765448776";



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xlgwknlg", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };


  return (
    <section id="contact" className="py-24 relative overflow-visible bg-transparent">
      <div className="w-full px-6 lg:px-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text and Info */}
          <div className="flex flex-col space-y-8 lg:sticky lg:top-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Interested in working together?{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  Let&apos;s Connect
                </span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg">
                I&apos;m always excited to collaborate on challenging projects and
                build innovative web and mobile applications. Whether you have an
                idea, a project, or just want to chat about technology, feel free to
                reach out — I&apos;m just an email away.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Email */}
              <a href={`mailto:${email}`} className="flex items-center gap-5 group cursor-pointer w-max">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white/50 text-sm font-medium mb-1">Email</div>
                  <div className="text-white font-medium text-lg leading-none group-hover:text-cyan-400 transition-colors">{email}</div>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${phone}`} className="flex items-center gap-5 group w-max">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white/50 text-sm font-medium mb-1">Phone</div>
                  <div className="text-white font-medium text-lg leading-none group-hover:text-cyan-400 transition-colors">{phone}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white/5 p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20 pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-white mb-2">Send me a message</h3>
                <p className="text-white/50 text-sm">Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="name" className="text-white/80 text-sm font-medium mb-2 pl-1">Name</label>
                <input type="text" id="name" name="name" required className="bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-light" />
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="email" className="text-white/80 text-sm font-medium mb-2 pl-1">Email</label>
                <input type="email" id="email" name="email" required className="bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-light" />
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="message" className="text-white/80 text-sm font-medium mb-2 pl-1">Message</label>
                <textarea id="message" name="message" required rows={4} className="bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-light resize-none"></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-4 w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-white disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-emerald-400 text-sm font-medium text-center mt-2 bg-emerald-400/10 py-2 rounded-lg border border-emerald-400/20">
                  Message sent successfully! I will get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm font-medium text-center mt-2 bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                  Oops! There was a problem sending your message.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

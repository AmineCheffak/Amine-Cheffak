"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

const EMAIL = "a.cheffak6604@uca.ac.ma";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzma9fkt0A5JKMje7UTxZ547nQIKxCir67wj6_Cdgf7d77M8ROFUZmxtGLUM0XBBAgK/exec";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/AmineCheffak",
  },
  {
    name:"Linkedin",
    href : "https://www.linkedin.com/in/amine-cheffak-59b661387/"
  }
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-all focus:border-red-500/60 focus:bg-red-500/[0.03]";

const labelClass =
  "mb-2 block font-mono text-[10px] tracking-[0.25em] text-neutral-500";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--mx",
      `${e.clientX - rect.left}px`
    );

    e.currentTarget.style.setProperty(
      "--my",
      `${e.clientY - rect.top}px`
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sending) return;

    if (!SCRIPT_URL) {
      setError("Contact service is not configured.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim();

    // Honeypot
    if (website) {
      return;
    }

    // Frontend validation
    if (name.length < 2 || name.length > 80) {
      setError("Name must contain 2 to 80 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || email.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }

    if (message.length < 10 || message.length > 3000) {
      setError("Message must contain 10 to 3000 characters.");
      return;
    }

    setSending(true);
    setSent(false);
    setError("");

    const payload = new URLSearchParams();

    payload.append("name", name);
    payload.append("email", email);
    payload.append("message", message);
    payload.append("website", "");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      setSent(true);
      form.reset();

      setTimeout(() => {
        setSent(false);
      }, 6000);

    } catch (err) {
      console.error("Contact error:", err);

      setError(
        "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-28 text-white md:px-12 lg:px-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-500">
              04 / CONTACT
            </span>

            <h2 className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s work{" "}
              <span className="text-red-500">together</span>.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>

            <span className="font-mono text-xs tracking-widest text-neutral-400">
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <p className="max-w-md text-sm leading-7 text-neutral-400 md:text-base">
              Have a project, an idea, or an opportunity?
              Send me a message and I&apos;ll get back to you
              as soon as possible.
            </p>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-red-500/50 hover:bg-red-500/[0.03]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors group-hover:border-red-500/50 group-hover:text-red-500">
                  <Mail size={20} />
                </span>

                <div>
                  <span className="block font-mono text-[10px] tracking-[0.25em] text-neutral-500">
                    EMAIL
                  </span>

                  <span className="mt-1 block text-sm md:text-base">
                    {EMAIL}
                  </span>
                </div>
              </div>

              <ArrowUpRight
                size={20}
                className="text-neutral-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-500"
              />
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-neutral-400">
                <MapPin size={20} />
              </span>

              <div>
                <span className="block font-mono text-[10px] tracking-[0.25em] text-neutral-500">
                  LOCATION
                </span>

                <span className="mt-1 block text-sm md:text-base">
                  Morocco · Available for remote work
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-neutral-400 transition-colors hover:border-red-500/60 hover:text-white"
                >
                  {link.name}

                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-9"
          >
            {/* Cursor spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.14), transparent 70%)",
              }}
            />

            <form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-5"
            >

              {/* Honeypot: hidden from normal visitors */}
              <div
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">
                  Leave this field empty
                </label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    NAME
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    EMAIL
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                />

                <p className="mt-2 text-right font-mono text-[10px] text-neutral-600">
                  MAX 3000 CHARACTERS
                </p>
              </div>

              {/* Success */}
              {sent && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400"
                >
                  <Check size={18} />
                  Your message has been sent. Thank you!
                </div>
              )}

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
                >
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="group/btn flex w-full items-center justify-center gap-3 rounded-full bg-red-600 px-6 py-4 text-sm font-medium text-white shadow-[0_0_30px_-6px_rgba(220,38,38,0.6)] transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {sending ? (
                  <>
                    Sending...
                    <Loader2 size={17} className="animate-spin" />
                  </>
                ) : sent ? (
                  <>
                    Message sent
                    <Check size={17} />
                  </>
                ) : (
                  <>
                    Send message
                    <Send
                      size={17}
                      className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="font-mono text-[10px] tracking-wider text-neutral-600">
                YOUR INFORMATION IS ONLY USED TO RESPOND TO YOUR MESSAGE.
              </p>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
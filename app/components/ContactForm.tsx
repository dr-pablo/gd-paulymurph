"use client";

import { useEffect, useRef, useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const mountTime = useRef<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    let res: Response;
    try {
      res = await fetch("/api/resume-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _hp: honeypot,
          _t: mountTime.current,
        }),
      });
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Stream the PDF response directly to a browser download
    try {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Paul_Murphy_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setError("Download failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="gradient-border rounded-2xl p-8 text-center glow">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">You&apos;re all set!</h3>
          <p className="text-muted-foreground">
            Thanks, {formData.name.split(" ")[0]}! Your download has started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot — hidden from real users, bots fill it in */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="gradient-border rounded-2xl p-8 glow">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent focus:border-accent focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent focus:border-accent focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent focus:border-accent focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell me about your project or opportunity..."
                className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent focus:border-accent focus:outline-none transition-colors placeholder:text-muted-foreground resize-none"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Get My Resume
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            Your info won&apos;t be shared with anyone. This is just to help me track who&apos;s interested.
          </p>
        </div>
      </form>
    </div>
  );
}

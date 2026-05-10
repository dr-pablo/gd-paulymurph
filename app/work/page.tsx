import { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import { Roadmap, roadmapData } from "../components/Roadmap";

export const metadata: Metadata = {
  title: "Work | Paul Murphy",
  description: "Professional experience and career history of Paul Murphy, Senior Data Analyst specializing in Microsoft Fabric, Azure, and AI-augmented analytics.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text">
            Career Roadmap
          </h1>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <Roadmap items={roadmapData} />
      </section>

      {/* Cloud Certifications */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-8">Cloud Platforms</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Microsoft */}
          <div className="bg-muted/30 rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center p-1">
                <Image src="/azure-logo.svg" alt="Azure" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-semibold">Microsoft Azure</h3>
              </div>
            </div>
          </div>

          {/* AWS */}
          <div className="bg-muted/30 rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center p-1">
                <Image src="/aws-logo.svg" alt="AWS" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-semibold">Amazon AWS</h3>
              </div>
            </div>
          </div>

          {/* GCP */}
          <div className="bg-muted/30 rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center p-1">
                <Image src="/gcp-logo.svg" alt="Google Cloud" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-semibold">Google Cloud</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Download CTA */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want the Full Resume?
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Submit your info and download my complete resume with all positions and details.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
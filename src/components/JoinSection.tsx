import React, { useState } from 'react';
import { SectionHeading } from './shared/SectionHeading';
import { Modal } from './shared/Modal';
import { ArrowRight, Sparkles, Rocket, Users, Award } from 'lucide-react';

export function JoinSection() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'Technical',
    statement: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsApplyModalOpen(false);
      setFormData({ name: '', email: '', domain: 'Technical', statement: '' });
    }, 2500);
  };

  return (
    <section id="join" className="relative w-full bg-[#0B0E14] py-24 md:py-32 px-6 text-[#F5F3EE] border-t border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8A33D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading
          tag="MEMBERSHIP & RECRUITMENT"
          title={
            <>
              Ready to <span className="text-[#E8A33D]">Build the Future?</span>
            </>
          }
          subtitle="Join an active ecosystem of ambitious student founders, engineers, designers, and venture creators across 12 specialized domains."
        />

        {/* Feature / Value Proposition Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="shared-card">
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981] mb-5">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hands-On Ventures</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Ship production software, design complete brand systems, and launch real-world startups backed by campus incubation.
            </p>
          </div>

          <div className="shared-card">
            <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/30 flex items-center justify-center text-[#3b82f6] mb-5">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unicorn Mentorship</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Connect 1-on-1 with venture capitalists, startup operators, and alumni building scaled technology companies.
            </p>
          </div>

          <div className="shared-card">
            <div className="w-12 h-12 rounded-xl bg-[#E8A33D]/15 border border-[#E8A33D]/30 flex items-center justify-center text-[#E8A33D] mb-5">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Seed Grants & Sprints</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Pitch at our flagship E-Summit, unlock non-dilutive grant capital, and build with interdisciplinary peer teams.
            </p>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-[#0B0E14] bg-[#ffffff] hover:bg-[#E8A33D] transition-all duration-300 shadow-xl hover:shadow-[#E8A33D]/25 cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Apply to Join E-Club</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="#domains"
            onClick={(e) => {
              e.preventDefault();
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo('#domains', { offset: -80 });
              } else {
                document.querySelector('#domains')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm text-[#F5F3EE] bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300"
          >
            Explore All 12 Domains
          </a>
        </div>
      </div>

      {/* Application Form Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for E-Club Cohort 2026"
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              Thank you for applying. The executive committee will review your domain preference and reach out via email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E8A33D] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                University Email
              </label>
              <input
                required
                type="email"
                placeholder="alex@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E8A33D] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Preferred Domain
              </label>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#141822] border border-white/15 text-white focus:outline-none focus:border-[#E8A33D] text-sm"
              >
                <option value="Technical">Technical & Engineering</option>
                <option value="Fuel & MySoil">Fuel & MySoil (Agritech & Clean Energy)</option>
                <option value="Chai Chats">Chai Chats (Community & Networking)</option>
                <option value="Event Management">Event Management & Logistics</option>
                <option value="Marketing">Marketing & Growth</option>
                <option value="Finance">Finance & Treasury</option>
                <option value="Design">Creative Design & UI/UX</option>
                <option value="Content">Content & Editorial</option>
                <option value="Operations">Operations & Compliance</option>
                <option value="Outreach">Corporate Outreach & Partnerships</option>
                <option value="Research">Deep Tech Research</option>
                <option value="Media">Media & Production</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Why do you want to join? (Brief)
              </label>
              <textarea
                rows={3}
                required
                placeholder="Share a project you've worked on or what you'd like to build with E-Club..."
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E8A33D] text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl font-bold text-sm text-[#0B0E14] bg-[#E8A33D] hover:bg-white transition-colors duration-200 shadow-lg cursor-pointer"
            >
              Submit Application
            </button>
          </form>
        )}
      </Modal>
    </section>
  );
}

"use client";

import React from "react";
import { CountingNumber } from "@/components/ui/counting-number";
import { Users, DollarSign, Rocket, Globe } from "lucide-react";

const stats = [
  {
    target: 2500,
    prefix: "",
    suffix: "+",
    label: "SIH 2024 Participants",
    description: "Active hackers and builders across 40+ hackathons",
    icon: Users,
    accent: "#10b981",
  },
  {
    target: 12,
    prefix: "$",
    suffix: "M+",
    label: "Venture Capital Raised",
    description: "Total funding secured by student founders",
    icon: DollarSign,
    accent: "#3b82f6",
  },
  {
    target: 85,
    prefix: "",
    suffix: "+",
    label: "Startups Incubated",
    description: "Early-stage ventures launched in our incubator",
    icon: Rocket,
    accent: "#8b5cf6",
  },
  {
    target: 14,
    prefix: "",
    suffix: " Hubs",
    label: "Global Chapters",
    description: "Partner institutions & university chapters",
    icon: Globe,
    accent: "#f59e0b",
  },
];

export function ImpactSection() {
  return (
    <section id="impact" className="impact-section-clean" style={{ padding: '120px 24px', backgroundColor: '#000000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span 
            style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#10b981',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '6px 16px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '16px',
            }}
          >
            ACTIVITY & IMPACT METRICS
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Driving Next-Gen Entrepreneurship
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '600px', margin: '0 auto' }}>
            Empowering students to transform breakthrough ideas into scalable, venture-backed companies.
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 18, 24, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: `rgba(${stat.accent === '#10b981' ? '16, 185, 129' : stat.accent === '#3b82f6' ? '59, 130, 246' : stat.accent === '#8b5cf6' ? '139, 92, 246' : '245, 158, 11'}, 0.15)`,
                      border: `1px solid ${stat.accent}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.accent,
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.4)' }}>
                    0{idx + 1} / METRIC
                  </span>
                </div>

                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'monospace', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  {stat.prefix}
                  <CountingNumber target={stat.target} />
                  {stat.suffix}
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                  {stat.label}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>
                  {stat.description}
                </p>

                <div 
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    height: '4px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div 
                    style={{
                      width: '75%',
                      height: '100%',
                      borderRadius: '9999px',
                      background: stat.accent,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


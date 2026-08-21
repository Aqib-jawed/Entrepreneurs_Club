import React from 'react';
import { Card } from './shared/Card';
import { Domain } from '../data/domains';

interface DomainCardProps {
  domain: Domain;
  onClick: (domain: Domain) => void;
}

export function DomainCard({ domain, onClick }: DomainCardProps) {
  return (
    <div onClick={() => onClick(domain)} className="domain-card-trigger">
      <Card className="domain-card-content group">
        <div className="domain-card-header">
          <span className="domain-card-icon">{domain.icon}</span>
          <span className="domain-card-badge">{domain.memberCount} Members</span>
        </div>

        <div className="domain-card-body">
          <h3 className="domain-card-title">{domain.name}</h3>
          <p className="domain-card-tagline">{domain.tagline}</p>
        </div>

        <div className="domain-card-footer">
          <button className="domain-card-btn" aria-label={`Explore ${domain.name} domain details`}>
            <span>Explore Domain</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { SectionHeading } from './shared/SectionHeading';
import { DomainCard } from './DomainCard';
import { Modal } from './shared/Modal';
import { DOMAINS, Domain } from '../data/domains';

export function DomainsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  // Live filter as-you-type by name or tagline
  const filteredDomains = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return DOMAINS;
    return DOMAINS.filter(
      (domain) =>
        domain.name.toLowerCase().includes(query) ||
        domain.tagline.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section id="domains" className="domains-section">
      <div className="domains-container">
        <SectionHeading
          tag="DISCIPLINARY HUB"
          title="Club Domains"
          subtitle="Explore the 12 active domains driving innovation, venture creation, and specialized skill development across Entrepreneurs Club."
        />

        {/* Live Search Bar */}
        <div className="search-bar-wrapper">
          <div className="search-bar-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Filter domains by keyword, tech, or activity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Domains Grid */}
        {filteredDomains.length > 0 ? (
          <div className="domains-grid">
            {filteredDomains.map((domain) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                onClick={(d) => setSelectedDomain(d)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results-box">
            <p className="no-results-text">
              No domains found matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;.
            </p>
          </div>
        )}
      </div>

      {/* Shared Detail Modal */}
      {selectedDomain && (
        <Modal
          isOpen={!!selectedDomain}
          onClose={() => setSelectedDomain(null)}
          title={`${selectedDomain.icon} ${selectedDomain.name}`}
        >
          <div className="domain-modal-content">
            <p className="domain-modal-tagline">{selectedDomain.tagline}</p>

            {/* Lead & Member Count Card */}
            <div className="domain-modal-lead-card">
              <img
                src={selectedDomain.lead.photo}
                alt={selectedDomain.lead.name}
                className="lead-avatar"
              />
              <div className="lead-info">
                <span className="lead-name">{selectedDomain.lead.name}</span>
                <span className="lead-role">{selectedDomain.lead.role || 'Domain Lead'}</span>
              </div>
              <span className="lead-badge">{selectedDomain.memberCount} Active Members</span>
            </div>

            {/* Detailed Description */}
            <div className="modal-section-block">
              <h4 className="modal-section-title">OVERVIEW</h4>
              <p className="modal-description">{selectedDomain.description}</p>
            </div>

            {/* Key Deliverables / Example Outputs */}
            <div className="modal-section-block">
              <h4 className="modal-section-title">EXAMPLE OUTPUTS & DELIVERABLES</h4>
              <ul className="modal-outputs-list">
                {selectedDomain.exampleOutputs.map((output, idx) => (
                  <li key={idx} className="output-item">
                    <span className="output-bullet">✦</span>
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

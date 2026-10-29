import Image from "next/image";
import { teamEndorsement, teamMembers } from "@/data/team";

function TeamCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="team-marquee__group" aria-hidden={duplicate || undefined}>
      {teamMembers.map((member) => (
        <article className="team-member-card" key={`${duplicate ? "copy-" : ""}${member.id}`}>
          <div className="team-member-card__photo">
            {member.image ? (
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                sizes="(max-width: 599px) 78vw, 256px"
                style={{ objectPosition: member.focus ?? "50% 20%" }}
              />
            ) : (
              <div className="team-member-card__placeholder" aria-hidden="true">✳</div>
            )}
            <div className="team-member-card__caption">
              <h3 title={member.name}>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="team-section" aria-label="E-Club core team">
      <div className="team-container">
        <div className="team-topbar">
          <a className="team-wordmark" href="#team" aria-label="E-Club Team">E-CLUB <span aria-hidden="true">✳</span></a>
          <nav aria-label="Section navigation"><a href="#team" aria-current="location">Team <span aria-hidden="true">↗</span></a></nav>
        </div>

        <header className="team-heading">
          <div className="team-heading__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16.05 12.62a1 1 0 0 1 1.91.02l.74 1.45a1 1 0 0 0 .73.54l1.64.25a1 1 0 0 1 .59 1.8l-1.18 1.17a1 1 0 0 0-.28.87l.26 1.61a1 1 0 0 1-1.54 1.13l-1.46-.75a1 1 0 0 0-.91 0l-1.47.75a1 1 0 0 1-1.54-1.13l.26-1.61a1 1 0 0 0-.28-.87l-1.16-1.15a1 1 0 0 1 .57-1.82l1.63-.25a1 1 0 0 0 .74-.54z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>
          <h2>Meet the <em>Core Team</em></h2>
          <p>[TODO: Add a verified introduction to the E-Club core team.]</p>
        </header>

        <div className="team-marquee" role="region" aria-roledescription="carousel" aria-label="E-Club team members">
          <div className="team-marquee__fade team-marquee__fade--left" aria-hidden="true" />
          <div className="team-marquee__fade team-marquee__fade--right" aria-hidden="true" />
          <div className="team-marquee__track">
            <TeamCards />
            <TeamCards duplicate />
          </div>
        </div>

        <figure className="team-endorsement">
          <div className="team-endorsement__mark" aria-hidden="true">“</div>
          <blockquote>{teamEndorsement.quote}</blockquote>
          <figcaption>— {teamEndorsement.attribution}</figcaption>
        </figure>
      </div>
    </section>
  );
}

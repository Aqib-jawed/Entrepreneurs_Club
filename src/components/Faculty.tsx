import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { facultyMembers, facultyVisible } from "@/data/faculty";

// Let the layout be previewed locally without exposing unconfirmed details in production.
const facultyPreviewVisible = process.env.NODE_ENV === "development";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter((part) => /[a-z]/i.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function FacultyCard({ member }: { member: (typeof facultyMembers)[number] }) {
  return (
    <article
      className="faculty-card"
      tabIndex={0}
      aria-label={`${member.name}, ${member.designation}`}
      role="listitem"
    >
      <div className="faculty-card__media">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name}, ${member.designation}`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            loading="lazy"
            style={{ objectPosition: member.focus ?? "50% 20%" }}
          />
        ) : (
          <span className="faculty-card__initials" aria-hidden="true">{getInitials(member.name)}</span>
        )}
      </div>
      <div className="faculty-card__scrim" aria-hidden="true" />
      <div className="faculty-card__copy">
        <h3>{member.name}</h3>
        <p className="faculty-card__designation">{member.designation}</p>
        <div className="faculty-card__role">
          <span className="faculty-card__role-label">Role in the club</span>
          <p>{member.roleInClub}</p>
        </div>
        {member.profileUrl ? (
          <a className="faculty-card__profile" href={member.profileUrl} target="_blank" rel="noreferrer">
            Profile <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Faculty() {
  if ((!facultyVisible && !facultyPreviewVisible) || facultyMembers.length === 0) return null;

  const isSingle = facultyMembers.length === 1;
  const hasAccordion = facultyMembers.length >= 2;

  return (
    <section id="faculty" className="faculty-section" aria-labelledby="faculty-heading">
      <div className="faculty-container">
        <div className="faculty-topbar">
          <a className="faculty-wordmark" href="#faculty" aria-label="E-Club Faculty">
            E-CLUB <span aria-hidden="true">✳</span>
          </a>
          <nav aria-label="Section navigation">
            <a href="#faculty" aria-current="location">Faculty <span aria-hidden="true">↗</span></a>
          </nav>
        </div>

        <SectionHeading
          id="faculty-heading"
          eyebrow="MENTORSHIP & GUIDANCE"
          title="Backed by"
          titleAccent="experience"
          tagline="Guidance that helps bold ideas grow."
          copy="[TODO: Add verified copy about the faculty's support for E-Club.]"
        />

        <div
          className={`faculty-cards${hasAccordion ? " faculty-cards--accordion" : ""}${isSingle ? " faculty-cards--single" : ""}`}
          aria-label="Faculty members"
          role="list"
        >
          {facultyMembers.map((member) => <FacultyCard key={member.id} member={member} />)}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export function Badge({ children = '#1 IN THE UNIVERSITY' }: { children?: React.ReactNode }) {
  return (
    <div className="badge-tag">
      <span className="badge-sparkle">✦</span>
      <span className="badge-text">{children}</span>
    </div>
  );
}

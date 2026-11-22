"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface TeamMember {
  id: string;
  src: string;
  alt: string;
  name: string;
  credentials: string[];
  role: string;
}

// tarjetas giratorias 3d del equipo
export function TeamCardsGrid({ members }: { members: TeamMember[] }) {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
      {members.map((member) => {
        const isFlipped = flippedId === member.id;
        return (
          <button
            key={member.id}
            type="button"
            aria-pressed={isFlipped}
            aria-label={`${member.name}, ${member.role}`}
            data-flipped={isFlipped ? "true" : "false"}
            onClick={() => toggleCard(member.id)}
            className="flip-card block w-full aspect-square border border-black bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4"
          >
            <span className="flip-card-inner block">
              <span className="flip-card-front block overflow-hidden">
                <Image
                  src={member.src}
                  alt={member.alt}
                  width={1122}
                  height={1122}
                  loading="lazy"
                  sizes="(min-width: 1024px) 256px, 46vw"
                  className="block w-full h-full object-cover grayscale"
                />
              </span>
              <span className="flip-card-back font-mono">
                <span className="block text-[0.95rem] sm:text-[1.05rem] leading-[1.2] font-medium mb-2.5">
                  {member.name}
                </span>
                {member.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="block text-[0.7rem] sm:text-[0.75rem] leading-[1.45] font-normal mb-2"
                  >
                    {cred}
                  </span>
                ))}
                <span className="block text-[0.8rem] sm:text-[0.9rem] leading-[1.25] font-medium mt-1">
                  {member.role}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

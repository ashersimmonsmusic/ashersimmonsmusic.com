import { Container, Eyebrow } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import type { Achievement } from "@/lib/types";

export function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <section className="section-paper border-b border-line-on-paper py-20 md:py-28">
      <Container>
        <Reveal>
          <Eyebrow>Selected Achievements</Eyebrow>
        </Reveal>

        <ul className="hairline mt-10 divide-y divide-line-on-paper border-t">
          {achievements.map((achievement, i) => (
            <Reveal key={achievement._id} delay={i * 0.06}>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-5 md:py-6">
                <span className="font-display text-2xl font-medium md:text-4xl">
                  {achievement.label}
                </span>
                {achievement.detail && (
                  <span className="font-mono-label text-current/60">{achievement.detail}</span>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

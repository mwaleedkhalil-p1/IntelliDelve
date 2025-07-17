import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  delay?: number;
}

export function TestimonialCard({
  name,
  role,
  company,
  content,
  avatar,
  rating,
  delay = 0,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: -50,
          rotateY: -10,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm transform hover:scale-105"
    >
      <div className="flex items-center mb-6">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
            {name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300">{role}</p>
          <p className="text-primary dark:text-sky-300 font-medium">{company}</p>
        </div>
      </div>

      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 text-yellow-400 fill-current animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
        "{content}"
      </blockquote>

      <button className="mt-6 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 font-medium transition-colors duration-200">
        Read more
      </button>
    </div>
  );
}

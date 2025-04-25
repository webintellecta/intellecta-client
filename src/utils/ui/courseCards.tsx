// src/utils/ui/courseCards.tsx
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    _id: string;
    title: string;
    thumbnail?: string;
    gradeLevel?: number;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items?.length > 0 ? (
        items.map((item, idx) => (
          <Link
            to={item.link}
            key={item._id} // Use _id for unique key
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card
              thumbnail={item.thumbnail || "https://via.placeholder.com/150"} // Fallback thumbnail
              gradeLevel={item.gradeLevel || 0} // Fallback gradeLevel
            >
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No courses available.</p>
      )}
    </div>
  );
};

export const Card = ({
  className,
  children,
  thumbnail,
  gradeLevel,
}: {
  className?: string;
  children: React.ReactNode;
  thumbnail: string;
  gradeLevel: number;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <img
          src={thumbnail}
          alt="course thumbnail"
          className="w-full h-52 object-cover rounded-xl mb-4"
        />
        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">
          Grade Level: {gradeLevel}
        </div>
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-gray-800 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
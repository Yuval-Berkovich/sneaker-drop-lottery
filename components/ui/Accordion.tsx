'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion as motionTokens } from '@/lib/tokens';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Only one panel open at a time. Default true. */
  singleOpen?: boolean;
  /** Id of the item open on first render. */
  defaultOpenId?: string;
}

export function Accordion({ items, singleOpen = true, defaultOpenId }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  function toggle(id: string) {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (singleOpen) return isOpen ? [] : [id];
      return isOpen ? current.filter((x) => x !== id) : [...current, id];
    });
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              'group border-b border-border transition-colors duration-200',
              'hover:border-[rgba(167,139,250,0.4)]'
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-8 py-7 text-start"
            >
              <span className="font-body text-[18px] font-medium leading-snug text-fg-primary">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  'shrink-0 text-fg-dim transition-[transform,color] duration-300',
                  'group-hover:text-accent',
                  isOpen && 'rotate-180 text-accent'
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: motionTokens.easeInOut }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[64ch] pb-7 pt-1 font-body text-[16px] leading-[1.7] text-fg-secondary">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

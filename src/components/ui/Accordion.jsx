import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import cn from '../../lib/cn'

/**
 * FAQ accordion (screenshots 26-27). One panel open at a time; the plus icon
 * rotates to a minus when its panel expands.
 */
export default function Accordion({ items = [], className = '' }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item.question}
            className={cn(
              'overflow-hidden rounded-card border transition-colors duration-300',
              isOpen ? 'border-line-strong bg-ink-850' : 'border-line bg-ink-900/80'
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-white">{item.question}</span>
              <Plus
                className={cn(
                  'h-5 w-5 shrink-0 text-muted transition-transform duration-300',
                  isOpen && 'rotate-45 text-white'
                )}
                strokeWidth={1.8}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

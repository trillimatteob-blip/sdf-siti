"use client";

import { useState } from "react";

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-white-warm/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-heading text-lg tracking-wider text-white-warm group-hover:text-gold transition-colors pr-4">
          {question}
        </span>
        <span
          className={`text-gold text-2xl leading-none flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <p className="text-sm text-gray-muted leading-relaxed pb-5 pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

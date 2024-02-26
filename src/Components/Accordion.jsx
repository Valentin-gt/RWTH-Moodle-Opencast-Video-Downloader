/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import "./Accordion.css";

const AccordionContext = createContext();

export default function Accordion({ children, value, onChange }) {
  const [activeIndex, setActiveIndex] = useState(value);

  useEffect(() => {
    onChange?.(activeIndex);
  }, [activeIndex, onChange]);

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, trigger }) {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);

  const open = activeIndex === value;
  const ref = useRef(null);

  return (
    <li
      className={`accordion-container ${
        open ? "accordion-container-open" : ""
      }`}
    >
      <header
        role="button"
        onClick={() => setActiveIndex(open ? null : value)}
        className="accordion-header"
      >
        {trigger}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </header>
      <div
        className="accordion-content"
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      >
        <div
          className={`accordion-child ${open ? "accordion-child-open" : ""}`}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </li>
  );
}

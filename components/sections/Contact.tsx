'use client'

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeUp from '@/components/ui/FadeUp'

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="0" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('dnsuarez@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <section id="contact">
      <div className="max-w-[1440px] mx-auto px-section-x py-section-y">
        <FadeUp>
          <SectionLabel className="mb-12">Based in Argentina / Working remotely</SectionLabel>
        </FadeUp>

        <div className="flex flex-wrap items-center gap-stack-md">
          <FadeUp delay={0.05} className="min-w-0 flex-[1_1_min(100%,300px)]">
            <p className="font-sans font-bold text-body1 text-off-white">
              Open to building products with teams that value craft, curiosity and clarity.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="flex-[0_1_min(100%,380px)]">
            <div className="flex items-center gap-12 min-w-0">
              <div className="flex items-center gap-1">
                <a
                  href="mailto:dnsuarez@gmail.com"
                  className="group relative inline-block font-sans font-semibold text-body2 text-off-white pb-1"
                >
                  dnsuarez@gmail.com
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full group-hover:transition-[width] group-hover:duration-300 group-hover:ease-out" />
                </a>

                <div className="group/copy relative">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="flex items-center justify-center w-6 h-6 text-light-gray hover:text-off-white transition-colors duration-200"
                  >
                    <CopyIcon />
                  </button>
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border border-border bg-surface px-2 py-1 font-sans text-caption uppercase transition-opacity duration-200 ${
                      copied
                        ? 'opacity-100 text-accent'
                        : 'opacity-0 group-hover/copy:opacity-100 text-light-gray'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy email'}
                  </span>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/dnsuarez/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block font-sans font-semibold text-body2 text-off-white pb-1"
              >
                Linkedin
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full group-hover:transition-[width] group-hover:duration-300 group-hover:ease-out" />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

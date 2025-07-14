'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {

  return (
    <footer className=" py-16 mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
          <div className="grid grid-cols-2 gap-8 text-lg">
            <div>
              <ul className="space-y-2 underline text-neutral-600 dark:text-neutral-300 font-medium">
                <li><Link href="/workspace" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">Workspace</Link></li>
                <li><Link href="https://layers.to/arjvnz" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">Layers</Link></li>
                <li><Link href="https://peerlist.io/arjunaditya" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">Peerlist</Link></li>
                <li><Link href="https://discord.gg/a4fv3TRE6S" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">Discord Server</Link></li>
                <li><a href="https://cal.com/nermalcat69" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">Call Me</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 underline text-neutral-600 dark:text-neutral-300 font-medium">
                <li><a href="https://x.com/arjunships" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">X(Twitter)</a></li>
                <li><a href="https://github.com/nermalcat69" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">GitHub</a></li>
                {/* <li><a href="https://hardcover.app/@arjunaditya" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-200">Hardcover</a></li> */}
                <li><a href="https://www.linkedin.com/in/nermalcat69/" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/nermalcat69/" target="_blank" className="cursor-alias hover:text-neutral-900 dark:hover:text-neutral-200">Instagram</a></li>
              </ul>
            </div>
          </div>
          </div>
          {/* <div>
            <div className="max-w-md">
              <h2 className="text-md font-bold mb-4 text-neutral-800 dark:text-neutral-200">Send a Message</h2>
              <p className="mb-6 text-neutral-800 dark:text-neutral-300">Drop a message directly to my Discord server(this is a webhook).</p>
              
               <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="relative border-none bg-white dark:bg-neutral-800">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={5}
                    className="w-full h-full p-3 text-sm resize-none focus:outline-none border-neutral-400 dark:border-neutral-600 focus:border-red-950 dark:focus:border-red-400 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 placeholder-neutral-500 dark:placeholder-neutral-400"
                    maxLength={300}
                  />
                </div>
                {showSuccess && (
                  <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm rounded">
                    Message sent successfully! Thanks for reaching out.
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-neutral-800 dark:bg-neutral-700 text-white py-2 mt-2 hover:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors"
                  aria-label="Submit message"
                >
                  Submit
                </button>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  Max 300 characters.
                </p>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

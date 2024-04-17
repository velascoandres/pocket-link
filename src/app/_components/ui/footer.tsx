import React from 'react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border border-transparent border-t-border text-center w-full h-full p-4 text-sm text-gray-300 flex-1 flex flex-col items-center justify-center">
      <div>
        Built with ❤️ by <Link className="text-primary hover:underline" target="_blank" href="https://github.com/velascoandres">
          <strong>&nbsp;Andrés Velasco</strong>
        </Link>.
        The source code is available on&nbsp;
        <Link className="hover:underline text-primary" target="_blank" href="https://github.com/velascoandres/pocket-link">
          <strong>Github</strong>
        </Link>.
      </div>
    </footer>
  )
}

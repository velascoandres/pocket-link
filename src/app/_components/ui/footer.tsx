import React from 'react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-0 border-gray-600 border-t w-full p-8 text-sm text-gray-300">
        Built with ❤️ by <Link className="text-amber-400 hover:underline" target="_blank" href="https://github.com/velascoandres">
        <strong>Andrés Velasco</strong>
      </Link>.
        The source code is available on&nbsp;
      <Link className="hover:underline text-amber-400" target="_blank" href="https://github.com/velascoandres/pocket-link">
        <strong>Github</strong>
      </Link>.
    </footer>
  )
}

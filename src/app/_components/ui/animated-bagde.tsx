import React from 'react'

interface Props {
    children: React.ReactNode | React.ReactNode[]
    role?: string
    className?: string
    onClick?: () => void
}


export const AnimatedBagde = ({
  children,
  role='',
  className='',
  onClick
}: Props) => {
  return (
    <span role={role} onClick={onClick}  className={`relative inline-flex overflow-hidden rounded-full p-[2px] ${className}`}>
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FBBF24_0%,#21283C_50%,#FBBF24_100%)]"
      ></span>
      <div className="bg-background inline-flex items-center justify-center w-full px-4 py-2 text-lg text-green-800 rounded-full cursor-pointer text-white/80 backdrop-blur-3xl whitespace-nowrap">
        {children}
      </div>
    </span>
  )
}

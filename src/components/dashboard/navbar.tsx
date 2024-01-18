'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

export const Navbar = () => {
	const { data } = useSession()

	if (!data?.user){
		return null
	}

	return (
		<nav className="bg-transparent backdrop-blur-2xl">
			<div className="max-w-screen-2xl flex items-center justify-between mx-auto p-4">
				<div className="flex items-center space-x-3 rtl:space-x-reverse">
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pocket link</span>
				</div>
				<div className="md:w-full md:block" id="navbar-default">
					<ul className="font-medium flex p-0 rounded-lg flex-row space-x-8 rtl:space-x-reverse">
						<li>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage src={data.user.image!} />
										<AvatarFallback>
											{data.user.name}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>{data.user.name}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem 
									  className="cursor-pointer"
										onClick={() => signOut({ callbackUrl: '/' })}
									>
										Sign out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

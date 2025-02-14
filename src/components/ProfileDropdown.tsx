import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Logout from './Logout';
const ProfileDropdown = ({ user }: { user: any }) => {
  return (
    <div><DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="h-12 w-12 cursor-pointer">
      <AvatarImage src={user?.user_metadata.avatar_url} />
      <AvatarFallback>{user?.user_metadata.full_name.split(" ")[0].charAt(0)}</AvatarFallback>
        <span className="sr-only">Toggle user menu</span>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="left" align='start'>
      <DropdownMenuItem className='pointer-events-none'>        
        <div>
        <p className="font-bold text-lg">{user?.user_metadata.full_name}</p>
        <p className="font-medium text-sm">{user?.email}</p>
        </div>
        </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Logout/>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu></div>
  )
}

export default ProfileDropdown
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
      <Avatar className="h-12 w-12">
      <AvatarImage src={user?.user_metadata.avatar_url} />
      <AvatarFallback>U</AvatarFallback>
        <span className="sr-only">Toggle user menu</span>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="left" align='start'>
      <DropdownMenuItem className="font-bold text-lg">{user?.user_metadata.full_name || user?.user_metadata.username}</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <p>{user?.email}</p>
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
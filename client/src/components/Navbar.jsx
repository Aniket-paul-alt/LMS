import { LayoutDashboard, Menu, School, ViewIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    LogOut,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/DarkMode'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const {user} = useSelector(store => store.auth) 
    const [logoutUser, {data, isSuccess}] = useLogoutUserMutation()

    const navigate = useNavigate()

    const logoutHandler = async()=>{
        await logoutUser()
    }

    useEffect(()=>{
        if(isSuccess) {
            toast.success(data.message || "User Logged Out")
            navigate("/login")
        }
    },[isSuccess])
    
    return (
        <div className='h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <Link to="/">
                        <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                    </Link>
                </div>
                {/* user icon and dark mode icon */}
                <div className='cursor-pointer flex items-center gap-5'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <ViewIcon />
                                            <Link to="/my-learning">My Learing</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <User />
                                            <Link to="/profile">Edit Profile</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logoutHandler}>
                                        <LogOut />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                    {
                                        user?.role === "instructor" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <LayoutDashboard />
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </DropdownMenuItem>
                                            </>
                                        )
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={()=> navigate("/login")}>Login</Button>
                                <Button>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>
            </div>
            {/* Mobile Device */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>E-Learing</h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {
    const role = "instructor"
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full hover:bg-gray-200" variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4'>
                    <span className='flex items-center gap-2'><ViewIcon size={"18"} />My Learning</span>
                    <span className='flex items-center gap-2'><User size={"18"} />Edit Profile</span>
                    <p className='flex items-center gap-2'><LogOut size={"18"} />Log out</p>
                </nav>
                {
                    role === 'instructor' && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit"><LayoutDashboard size={"18"} />Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}
"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { quickSearchOptions } from "../_constants/search"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  const { data } = useSession()

  const handleLoginWinthGoogleClick = async () => {
    await signIn("google")
  }

  const handleLogOutClick = async () => {
    signOut()
  }
  console.log(data?.user)

  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>

              <div>
                <p className="font-bold">{data?.user?.name}</p>
                <p className="text-xs">{data?.user?.email}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold">Olá, faça seu login</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"icon"}>
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-md">
                  <DialogHeader>
                    <DialogTitle>Faça seu login</DialogTitle>
                    <DialogDescription>Faça seu login com...</DialogDescription>
                  </DialogHeader>
                  <Button
                    variant={"outline"}
                    className="gap-1 font-bold"
                    onClick={handleLoginWinthGoogleClick}
                  >
                    <Image
                      src={`/google.svg`}
                      alt="Google Icon"
                      width={18}
                      height={18}
                    />
                    Google
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <SheetClose asChild>
            <Button asChild className="justify-start gap-2">
              <Link href={`/`}>
                <HomeIcon size={18} />
                Inicio
              </Link>
            </Button>
          </SheetClose>
          <Button variant={"ghost"} className="justify-start gap-2">
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <Button
              variant={"ghost"}
              className="justify-start gap-2"
              key={option.title}
            >
              <Image
                alt={option.title}
                src={option.imageUrl}
                height={18}
                width={18}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button
            variant={"ghost"}
            className="justify-start gap-2"
            onClick={handleLogOutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </>
  )
}

export default SidebarSheet

import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { quickSearchOptions } from "../_constants/search"
import Image from "next/image"

const SidebarSheet = () => {
  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Avatar>
            <AvatarImage src="/avatar1.jpg" />
          </Avatar>

          <div>
            <p className="font-bold">Pedro Pimpão</p>
            <p className="text-xs">pedro@gmail.com</p>
          </div>
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
          <Button variant={"ghost"} className="justify-start gap-2">
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </>
  )
}

export default SidebarSheet

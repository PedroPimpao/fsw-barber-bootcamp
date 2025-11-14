import { Prisma } from "@/generated/prisma"
import { isFuture } from "date-fns"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import BookingInfoCard from "./booking-info-card"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { BadgeCheckIcon } from "lucide-react"
import BookingSummary from "./booking-summary"
import PhoneItem from "./phone-item"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking

  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full">
          <BookingInfoCard
            isConfirmed={isConfirmed}
            serviceName={booking.service.name}
            barbershopImageURL={barbershop.imageUrl}
            barbershopName={barbershop.name}
            servceDate={booking.date}
          />
        </SheetTrigger>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src="/map.png"
              alt={"Mapa"}
              fill
              className="rounded-xl object-cover"
            />
            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex w-full items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Badge
              variant={isConfirmed ? "default" : "secondary"}
              className="flex w-fit gap-2"
            >
              <BadgeCheckIcon className="w-5" />
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <BookingSummary
              barbershopName={barbershop.name}
              serviceDate={booking.date}
              servicePrice={booking.service.price}
              serviceName={booking.service.name}
            />
            <div className="space-y-3">
              {barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem

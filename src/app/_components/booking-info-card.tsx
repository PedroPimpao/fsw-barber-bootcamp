import { BadgeCheckIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingInfoProps {
    isConfirmed: boolean
    serviceName: string
    barbershopName: string
    barbershopImageURL: string
    servceDate: Date
    openSheet: () => void
}

const BookingInfoCard = ( booking : BookingInfoProps ) => {
  return (
    <Card className="min-w-[100%] cursor-pointer" onClick={booking.openSheet}>
      <CardContent className="flex justify-between p-0">
        {/* Esquerda */}
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            variant={booking.isConfirmed ? "default" : "secondary"}
            className="flex w-fit gap-2"
          >
            <BadgeCheckIcon className="w-5" />
            {booking.isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h3 className="font-bold">{booking.serviceName}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={booking.barbershopImageURL}
              ></AvatarImage>
            </Avatar>
            <p className="text-sm">{booking.barbershopName}</p>
          </div>
        </div>
        {/* Direita */}
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm capitalize">
            {format(booking.servceDate, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">
            {format(booking.servceDate, "dd", { locale: ptBR })}
          </p>
          <p className="text-sm">
            {format(booking.servceDate, "HH:mm", { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingInfoCard

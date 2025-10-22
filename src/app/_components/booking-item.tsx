import { BadgeCheckIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"

interface IDate {
  day: string
  month: string
  hour: string
}

interface IBooking {
  status: string
  typeService: string
  barberName: string
  date: IDate
}

const BookingItem = ({ status, typeService, barberName, date }: IBooking) => {
  return (
    <>
      <Card className="mt-6">
        <CardContent className="flex justify-between p-0">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge variant="default" className="flex w-fit gap-2">
              <BadgeCheckIcon className="w-5" />
              {status}
            </Badge>
            <h3 className="font-bold">{typeService}</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
              </Avatar>
              <p className="text-sm">{barberName}</p>
            </div>
          </div>
          {/* Direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">{date.month}</p>
            <p className="text-2xl">{date.day}</p>
            <p className="text-sm">{date.hour}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem

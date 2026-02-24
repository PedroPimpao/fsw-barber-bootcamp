import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOpitons } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import Subtitle from "../_components/subtitle"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"

const BookingsPage = async () => {
  const session = await getServerSession(authOpitons)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()

  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length == 0 && concludedBookings.length == 0 && (
          <p className="text-gray-400">Você não tem agendamentos</p>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <Subtitle text="Confirmados" />
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={JSON.parse(JSON.stringify(booking.id))}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <Subtitle text="Finalizados" />
            {concludedBookings.map((booking) => (
              <BookingItem
                key={JSON.parse(JSON.stringify(booking.id))}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default BookingsPage

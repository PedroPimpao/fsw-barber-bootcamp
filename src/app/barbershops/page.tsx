import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import Subtitle from "../_components/subtitle"
import { db } from "../_lib/prisma"

interface IBarbershopsPage {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: IBarbershopsPage) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search || "",
        mode: "insensitive",
      },
    },
  })
  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <Subtitle text={`Resultados para "${searchParams.search}"`} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage

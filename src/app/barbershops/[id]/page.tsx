import ServiceItem from "@/app/_components/service-item"
import Subtitle from "@/app/_components/subtitle"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface IBarbershop {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: IBarbershop) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      barbershopServices: true,
    },
  })

  if (!barbershop) {
    notFound()
  }

  console.log(barbershop.barbershopServices)

  return (
    <>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={`Banner ${barbershop.name}`}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute left-4 top-4"
          asChild
        >
          <Link href={`/`}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">{`5,0 (899 avaliações)`}</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-3 border-b border-solid p-5">
        <Subtitle text="Sobre nós" />
        <p className="text-s text-justify">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="p-5">
        <Subtitle text="Serviços" />
        {barbershop.barbershopServices.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
    </>
  )
}

export default BarbershopPage

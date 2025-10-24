import { BarbershopServices } from "@/generated/prisma"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface IServiceItem {
  service: BarbershopServices
}

const ServiceItem = ({ service }: IServiceItem) => {
  return (
    <>
      <Card className="max-w-[400px]">
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGEM */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {/* DIREITA */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            {/* PREÇO E RESERVAR */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant={"secondary"} size={"sm"}>
                Reservar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ServiceItem

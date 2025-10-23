import { db } from "./_lib/prisma"

import Image from "next/image"
import { SearchIcon } from "lucide-react"

import BarbershopItem from "./_components/barbershop-item"
import Header from "./_components/header"

import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import { Card, CardContent } from "./_components/ui/card"

import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Subtitle from "./_components/subtitle"

export default async function Home() {
  // Chamar o banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  console.log({ barbershops })

  return (
    <>
      {/* Header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Pedro</h2>
        <p>Segunda-Feira, 20 de Outubro</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Procure uma barbearia..." className="" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button variant="secondary" className="gap-2" key={option.title}>
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* Agendamento */}
        <Subtitle text="Agendamentos" />

        <BookingItem
          status="Confirmado"
          typeService="Corte de Cabelo"
          barberName="Corte & Estilo"
          date={{ day: "05", month: "Agosto", hour: "20:00" }}
        />

        <Subtitle text="Recomendados" />

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <Subtitle text="Populares" />
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <footer>
        <Card className="">
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </>
  )
}

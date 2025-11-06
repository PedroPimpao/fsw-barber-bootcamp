"use client"

import { Barbershop, BarbershopServices } from "@/generated/prisma"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { TIME_LIST } from "@/app/_constants/time-list"
import { useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "@/hooks/use-toast"
// import { useSession } from "next-auth/react"

interface IServiceItem {
  service: BarbershopServices
  barbershop: Pick<Barbershop, "name">
}

const ServiceItem = ({ service, barbershop }: IServiceItem) => {
  // const { data } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleSelectedDate = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate || !selectedTime) return
      const hour = selectedTime.split(":")[0]
      const minute = selectedTime.split(":")[1]
      const newDate = set(selectedDate, {
        minutes: Number(minute),
        hours: Number(hour),
      })
      await createBooking({
        serviceId: service.id,
        userId: "b12febd7-68d6-42e3-b278-d287ca3e83ca",
        date: newDate,
      })
      toast({
        title: "Sucesso!",
        description: "Reserva criada com sucesso.",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro",
        description:
          "Não foi possível criar a reserva. Tente novamente mais tarde.",
      })
    }
  }

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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} size={"sm"}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="flex justify-center border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDate}
                      onSelect={handleSelectedDate}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDate && (
                    <div className="boder-solid flex gap-4 overflow-x-auto border-b p-5 [&::-webkit-scrollbar]:hidden">
                      {TIME_LIST.map((time) => (
                        <Button
                          key={time}
                          variant={
                            time === selectedTime ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && selectedDate && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDate, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button
                        disabled={selectedDate && selectedTime ? false : true}
                        onClick={handleCreateBooking}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ServiceItem

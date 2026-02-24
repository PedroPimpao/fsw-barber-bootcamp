import Link from "next/link"
import { Button } from "./_components/ui/button"
import Logo from "./_components/logo"

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3">
      <Logo />
      <h1 className="text-2xl font-bold">[404] Página não encontrada</h1>
      <Link href={"/"}>
        <Button className="cursor-pointer"> Voltar para Home </Button>
      </Link>
    </div>
  )
}

export default NotFound

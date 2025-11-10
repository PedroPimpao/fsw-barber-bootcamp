import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import Image from "next/image"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login</DialogTitle>
        <DialogDescription>Faça seu login com...</DialogDescription>
      </DialogHeader>
      <Button
        variant={"outline"}
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image src={`/google.svg`} alt="Google Icon" width={18} height={18} />
        Google
      </Button>
    </>
  )
}

export default SignInDialog

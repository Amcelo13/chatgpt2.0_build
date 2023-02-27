'use-client'
import {signIn, useSession} from "next-auth/react"
import Image from "next/image"

function Login() {
  const { data: session } = useSession()

  return (
    <div className="bg-[#11A37F] h-screen flex flex-col
    items-center justify-center text-center">
        {/* Declaring image in Next.js */}
        <Image src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="logo"
        />
        
        <button onClick={() =>signIn("google")}
        className="text-white font-bold text-3xl 
        animate-pulse ">
          Sign In 
        </button>

    </div>
  )
}

export default Login
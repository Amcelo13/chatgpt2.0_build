import { SessionProvider } from '../components/SessionProvider'
import SideBar from '../components/SideBar'
import '../styles/globals.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Login from '../components/Login'
import ClientProvider from '../components/ClientProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions) 
  return (
    <html lang="en">
      <body>

        <SessionProvider session={session}>

              {/* Conditional Rendering of login session  */}
          {!session ? (<Login/>):(
            <div className='flex'>
            <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
              {/* SideBar */}
              <SideBar/>
            </div>
   
   
             {/* Client-Provider Notification */} 

             {/* This is a client side component to show toaster icon in Next.js so we have to make the component named 'ClientProvider' as a client component and */}
              <ClientProvider/>
           <div className="bg-[#343541] flex-1 h-full">{children}</div>
           </div>
          )}

        </SessionProvider>
      </body>
    </html>
  )
}

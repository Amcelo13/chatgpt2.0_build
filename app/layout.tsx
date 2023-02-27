import { SessionProvider } from '../components/SessionProvider'
import SideBar from '../components/SideBar'
import '../styles/globals.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Login from '../components/Login'


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
   
           <div className="bg-[#343541] flex-1 h-full">{children}</div>
           </div>
          )}

        </SessionProvider>
      </body>
    </html>
  )
}

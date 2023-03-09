import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen
    px-2 text-white ">
        <h1 className="text-5xl font-semibold mb-10">ChatGPT</h1>

        <div className='flex space-x-2 text-center '>
           <div>
              <div className="flex flex-col items-center justify-center mb-5 mt-5">
                {/* Sun Icon */}
                  <SunIcon className="h-6 w-8"/>
                  <h2>Examples</h2>
              </div>

              <div className="space-y-2 ">
              <p className="infoText">"Explain something to me"</p>
              <p className="infoText">"What is the difference between dog and a cat"</p>
              <p className="infoText">"What is the color of the sun"</p>
              </div>
              </div> 
              
           <div>
              <div className="flex flex-col items-center justify-center mb-5">
                {/* Bolt Icon */}
                  <BoltIcon className="h-8 w-8 mt-4"/>
                  <h2>Capabilities</h2>
              </div>

              <div className="space-y-2">
              <p className="infoText">Change the ChatGPT use</p>
              <p className="infoText">Message are stored in Firestore</p>
              <p className="infoText">Hot Toast Notification on thinking!</p>
              </div>
              </div> 
              
           <div>
              <div className="flex flex-col items-center justify-center mb-5">
                {/* ExclamationTriangleIcon Icon */}
                  <ExclamationTriangleIcon className="h-6 w-8 mt-4"/>
                  <h2>Limitations</h2>
              </div>

              <div className="space-y-2">
              <p className="infoText">May ocassionally generate incorrect information</p>
              <p className="infoText">May ocassionally produce harmful instruction</p>
              <p className="infoText">Limited knowledge of the world after 2021</p>
              </div>
              </div> 
              
        </div>
    </div>
  )
}

export default HomePage

import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera } from 'lucide-react'

export const ScanTicket = () => {
  const scannerRef = useRef(null)
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  const startScanner = async () => {
    if (scannerRef.current) return

    const html5QrCode = new Html5Qrcode('reader')
    scannerRef.current = html5QrCode

    try {
      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 220, height: 220 }
        },
        (decodedText) => {
          html5QrCode.stop()
          scannerRef.current = null

          const parsed = JSON.parse(decodedText)
          setScanResult(parsed)
        }
      )
      setIsScanning(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop()
      }
    }
  }, [])

  return (
    <div className="pt-20 mx-auto w-[90%] max-w-[1200px]">

      {!scanResult && (
        <div className="flex flex-col items-center gap-6">

        
          {!isScanning && (
            <button
              onClick={startScanner}
              className="flex items-center gap-3 bg-[var(--primary-color)] px-6 py-3 rounded-lg text-white text-lg cursor-pointer"
            >
              <Camera size={24} />
              Scan Ticket
            </button>
          )}

    
          <div
            id="reader"
            className="w-[260px] h-[260px] md:w-[320px] md:h-[320px]"
          />
        </div>
      )}

      {scanResult && (
        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <img
            src={scanResult.img}
            className="h-80 w-56 rounded-xl mx-auto md:mx-0"
          />

          <div>
            <p className="text-[var(--primary-color)] uppercase">
              {scanResult.language}
            </p>
            <p className="text-white text-3xl font-bold mt-2">
              {scanResult.title}
            </p>
            <p className="mt-3 text-gray-300">{scanResult.date}</p>
            <p className="mt-1 text-gray-400">{scanResult.time}</p>
            <p className="mt-4 text-white">
              Seat: <span className="font-bold">{scanResult.seat}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}



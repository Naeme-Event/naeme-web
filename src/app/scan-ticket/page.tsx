"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QrReader } from "react-qr-reader";

import { FaArrowLeft } from "react-icons/fa";
import { useUserContext } from "@/hooks/useUser";

function QRscanner() {
  const [qrState, setQrState] = useState(false);
  const router = useRouter();

  return (
    <div className="px-4 w-full max-w-screen-md mx-auto mt-20 overflow-hidden left-0 top-0 bottom-0">
      <div className="flex flex-col mt-10 items-center justify-center">
        <h1 className="text-2xl font-sans font-bold">SCAN YOUR TICKETS</h1>
        <strong className="text-sm">FOR EVENT OWNERS ONLY</strong>
        <button
          onClick={() => setQrState(!qrState)}
          className="btn text-md px-4 py-2 mt-44"
        >
          {!qrState ? "Click to scan" : "Stop scanner"}
        </button>
        <div className="h-[500px] w-[340px]">
          {qrState && (
            <QrReader
              scanDelay={1000}
              constraints={{
                facingMode: "environment",
              }}
              onResult={(result: any, error: any) => {
                if (!!result) {
                  // @ts-ignore;
                  const text = result.getText();
                  router.push(`https://www.naeme.app/ticket/${text}`);
                  setQrState(false);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QRscanner;
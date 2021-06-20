import React, { Suspense } from "react";

import StoresTable from "../Components/Stores/StoresTable";

export default function Stores() {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="mb-3 font-bold text-xl">Stores</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <StoresTable />
      </Suspense>
    </div>
  );
}

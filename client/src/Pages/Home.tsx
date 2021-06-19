import React, { Suspense } from "react";

import Table from "../Components/Stores/Table";

export default function Stores() {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="mb-3 font-bold text-xl">Stores</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Table />
      </Suspense>
    </div>
  );
}

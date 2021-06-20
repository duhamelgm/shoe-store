import React, { useEffect, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { fetchStore } from "../atoms/stores.atoms";

import ShoeModelsTable from "../Components/ShoeModels/ShoeModelsTable";

interface RouteParams {
  id: string;
}

export default function Stores() {
  const [store, update] = useAtom(fetchStore);
  const { id } = useParams<RouteParams>();

  useEffect(() => update(id), []);

  if (!store) return <h1>Couldn't find store</h1>;

  return (
    <div className="max-w-6xl mx-auto mt-8 pb-16">
      <h1 className="mb-3 font-bold text-xl">
        <Link to="/stores" className="underline">
          Stores
        </Link>{" "}
        {">"} {store.name}
      </h1>

      <hr className="mt-4 mb-6" />

      <Suspense fallback={<h1>Loading...</h1>}>
        <ShoeModelsTable storeId={id} />
      </Suspense>
    </div>
  );
}

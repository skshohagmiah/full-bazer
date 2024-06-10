"use client";
import React, { useState } from "react";
import SortOptions from "./SortOptions";
import EmptyState from "@/components/others/EmptyState";
import SingleProduct from "@/components/products/SingleProduct";
import { Product } from "@prisma/client";
import ProductListView from "@/components/products/ProductListView";

interface ShopProductContainerProps {
  shopProducts: Product[];
}

const ShopProductContainer = ({ shopProducts }: ShopProductContainerProps) => {
  const [view, setView] = useState('grid');

  return (
    <div className="w-full">
      <SortOptions view={view} setView={setView}/>
      <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center gap-2 md:gap-6 p-4 border">
        {shopProducts.length === 0 && (
          <div className="col-span-2 lg:col-span-3">
            <EmptyState label="No product found!" />
          </div>
        )}
        {shopProducts.map((product) =>
          view === 'list' ? (
            <ProductListView key={product.id} />
          ) : (
            <SingleProduct key={product.id} product={product} />
          )
        )}
      </div>
    </div>
  );
};

export default ShopProductContainer;

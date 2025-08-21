"use client";

import { getProducts } from "@/lib/services/products";
import { ProductType } from "@/lib/types";
import { ProductItem } from "@/components/product";
import React, { useCallback, useEffect, useState } from "react";
import { useGeneral } from "@/context/generalProvider";

const ProductsPage = ({
    searchParams,
}: {
    searchParams?: Promise<{ category?: number }>;
}) => {
    const { loading, category, setCategoryId } = useGeneral();
    const [productLoading, setProductLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [sortBy, setSortBy] = useState<string>("popularity");

    const sortProducts = (sortBy: string, products: ProductType[]) => {
        switch (sortBy) {
            case "popularity":
                return [...products].sort(
                    (a, b) => (b.likes || 0) - (a.likes || 0)
                );
            case "a-z":
                return [...products].sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            default:
                return products;
        }
    };

    const filterAndSortProducts = useCallback(() => {
        let filtered = products;
        if (category) {
            filtered = products.filter((product) =>
                product.categories?.includes(category.id)
            );
        }
        const sorted = sortProducts(sortBy, filtered);
        setFilteredProducts(sorted);
    }, [products, category, sortBy]);

    useEffect(() => {
        const getCategoryId = async () => {
            await searchParams?.then((params) =>
                setCategoryId(params?.category ? params.category : null)
            );
        };
        getCategoryId();
    }, [searchParams, setCategoryId]);

    useEffect(() => {
        const fetchProducts = async () => {
            setProductLoading(true);
            await getProducts()
                .then((data) => {
                    if (!data) return;
                    setProducts(data);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                })
                .finally(() => {
                    setProductLoading(false);
                });
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (!loading && products) {
            filterAndSortProducts();
        }
    }, [products, loading, sortBy, category, filterAndSortProducts]);

    return (
        <div className="flex flex-col gap-14">
            <ul className="flex justify-between items-center">
                <li>
                    <h1>{category?.title || "Alle Produkter"}</h1>
                </li>
                <li>
                    <select
                        name="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-blue-grey rounded-sm w-[240px] py-1.5 px-3"
                    >
                        <option value="popularity">Popularitet</option>
                        <option value="a-z">A-Z</option>
                    </select>
                </li>
            </ul>

            {!productLoading ? (
                <div className="grid grid-cols-1 gap-y-6 gap-x-9 lg:grid-cols-2 xl:gap-x-[73px] xl:gap-y-11">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-[300px]">
                    <span className="block p-5 text-2xl uppercase text-foreground font-Hebrew">
                        Henter Produkter..
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;

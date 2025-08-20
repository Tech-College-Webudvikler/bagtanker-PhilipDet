"use client";

import { getProduct } from "@/lib/services/products";
import { useEffect, useState } from "react";
import { ProductType } from "@/lib/types";
import { RecipeList } from "@/components/recipeList";

const ProductView = ({ params }: { params: Promise<{ id: number }> }) => {
    const [id, setId] = useState<number | null>(null);
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        params.then((p) => setId(Number(p.id)));
    }, [params]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id === null) return;

            await getProduct(id).then((data) => {
                if (!data) return;

                setProduct(data);
            });
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            {product && (
                <RecipeList
                    productId={product.id}
                    durationInMinutes={product?.durationInMinutes ?? null}
                    amount={product?.amount ?? null}
                    items={product?.productIngredients ?? []}
                    likes={product?.likes ?? null}
                />
            )}
            <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
    );
};

export default ProductView;

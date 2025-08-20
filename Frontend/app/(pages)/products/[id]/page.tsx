"use client";

import { getProduct } from "@/lib/services/products";
import { useEffect, useState } from "react";
import { ProductType } from "@/lib/types";

const ProductView = ({ params }: { params: Promise<{ id: number }> }) => {
    const [id, setId] = useState<number | null>(null);
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    useEffect(() => {
        console.log(id);

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
            <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
    );
};

export default ProductView;

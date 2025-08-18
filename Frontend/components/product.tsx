import { ProductType } from "@/lib/types";

export const Product = ({ product }: { product: ProductType }) => {
    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
};

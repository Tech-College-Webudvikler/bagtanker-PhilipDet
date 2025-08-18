import { getProducts } from "@/lib/services/products";

const ProductView = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const product = await getProducts(parseInt(id, 10));

    return (
        <div>
            <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
    );
};

export default ProductView;

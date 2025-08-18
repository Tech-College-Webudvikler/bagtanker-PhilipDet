import { getProducts } from "@/lib/services/products";

const ProductsPage = async () => {
    const products = await getProducts();

    return <pre>{JSON.stringify(products, null, 2)}</pre>;
};

export default ProductsPage;

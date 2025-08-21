"use client";

import { getProduct } from "@/lib/services/products";
import { useEffect, useState } from "react";
import { ProductType, CommentType, ReviewType } from "@/lib/types";
import { RecipeList } from "@/components/recipeList";
import Image from "next/image";
import { formatPrice, validation } from "@/lib/utils";
import { ProductComment } from "@/components/productComment";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useUser } from "@/context/userProvider";
import { createReview } from "@/lib/services/review";

const ProductView = ({ params }: { params: Promise<{ id: number }> }) => {
    const { user, loading } = useUser();
    const [id, setId] = useState<number | null>(null);
    const [product, setProduct] = useState<ProductType | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showComment, setShowComment] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage("");

        if (!validation("message", comment)) {
            setErrorMessage("Ugyldig kommentar.");
            return;
        }

        if (!user || loading || !product) return;

        const result = await createReview(product.id, user.id, comment);

        if (!result) {
            setErrorMessage("Fejl ved oprettelse af kommentar.");
            return;
        }

        const newReview: ReviewType = {
            id: result.id,
            title: result.title,
            comment,
            numStars: result.numStars,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: user,
        };

        setProduct((prev) =>
            prev
                ? { ...prev, reviews: [...(prev.reviews ?? []), newReview] }
                : prev
        );

        setComment("");
    };

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
        <div className="flex flex-col gap-14">
            <div className="grid grid-cols-3 gap-10">
                <Image
                    src={`/assets${product?.imageUrl}`}
                    alt={product?.title ?? ""}
                    width={500}
                    height={500}
                    className="aspect-square object-cover grid-span-2"
                />

                <p>{product?.description}</p>

                {product && (
                    <RecipeList
                        productId={product.id}
                        durationInMinutes={product?.durationInMinutes ?? null}
                        amount={product?.amount ?? null}
                        items={product?.productIngredients ?? []}
                        likes={product?.likes ?? null}
                    />
                )}

                <p className="col-span-2">{product?.procedure}</p>

                <span className="text-3xl font-bold col-span-3">
                    Pris: {formatPrice(product?.price ?? 0)}
                </span>
            </div>

            <div className="flex flex-col gap-4">
                <h1>Kommentarer</h1>

                {!loading && user && (
                    <div className="w-full flex flex-col gap-3">
                        <button
                            onClick={() => setShowComment(!showComment)}
                            className="w-full text-start"
                        >
                            <p className="flex items-center">
                                Skriv kommentar{" "}
                                {showComment ? (
                                    <ChevronDown className="ml-2" />
                                ) : (
                                    <ChevronRight className="ml-2" />
                                )}
                            </p>
                        </button>
                        {showComment && (
                            <div>
                                <form onSubmit={handleComment}>
                                    <textarea
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        value={comment}
                                        placeholder="Skriv din kommentar her..."
                                        className="border border-blue-grey rounded-sm w-full p-2.5 min-h-[115px] max-h-[300px]"
                                    ></textarea>
                                    <ul className="flex justify-between">
                                        {errorMessage && (
                                            <li className="text-red-500">
                                                {errorMessage}
                                            </li>
                                        )}
                                        <li className="ml-auto">
                                            <button
                                                className="form-button"
                                                type="submit"
                                            >
                                                Send
                                            </button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {product?.reviews ? (
                    <ul className="flex flex-col">
                        {product.reviews.map((review) => (
                            <ProductComment key={review.id} review={review} />
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
        </div>
    );
};

export default ProductView;

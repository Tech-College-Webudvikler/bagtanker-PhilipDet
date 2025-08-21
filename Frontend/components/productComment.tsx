import { ReviewType } from "@/lib/types";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export const ProductComment = ({ review }: { review: ReviewType }) => {
    return (
        <li className="flex items-center p-5 gap-7 border-b border-b-[#b1b1b1]">
            <Image
                src={`/assets/images/avatars/${review.user.image}`}
                alt={`${review.user.name}'s avatar`}
                width={120}
                height={120}
                className="aspect-square object-cover"
            />

            <article>
                <span className="text-2xl font-bold">{review.user.name}</span>
                <p>
                    {review.createdAt
                        ? formatDate(review.createdAt.toString())
                        : "Date not available"}
                </p>
                <p>{review.comment}</p>
            </article>
        </li>
    );
};

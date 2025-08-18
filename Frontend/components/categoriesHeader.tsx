import { getCategories } from "@/lib/services/categories";
import { CategoryType } from "@/lib/types";

export const CategoriesHeader = async () => {
    const categories = await getCategories();

    return (
        <ul className="flex justify-start bg-dark-grey lg:justify-center overflow-scroll remove-scroll">
            {categories &&
                categories.map((category: CategoryType) => (
                    <li key={category.id}>
                        <button className="p-5 text-2xl uppercase text-background font-Hebrew hover:text-baked-yellow transition-colors duration-200 cursor-pointer tracking-[0]">
                            {category.title}
                        </button>
                    </li>
                ))}
        </ul>
    );
};

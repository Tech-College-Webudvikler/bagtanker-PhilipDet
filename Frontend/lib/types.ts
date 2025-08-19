export type ProductType = {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    procedure?: string;
    durationInMinutes?: number;
    amount?: number;
    price?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    reviews?: ReviewType[];
    categories?: number[];
    productIngredients?: ProductIngredientType[];
    likes?: number;
};

export type ReviewType = {
    id: number;
    title: string;
    comment: string;
    numStars: number;
    productId?: number;
    userId?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    user: UserType;
};

export type UserType = {
    id: number;
    name: string;
    email?: string;
    description?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    favorites?: number[];
};

export type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    fetchUser: () => Promise<void>;
    loading: boolean;
    logout: () => Promise<void>;
};

export type GeneralContextType = {
    loading: boolean;
    category: CategoryType | null;
    setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
};

export type ProductIngredientType = {
    id: number;
    productId?: number;
    amount?: number;
    title?: string;
    name?: string;
    abbreviation?: string;
    orderNum?: number;
};

export type IngredientType = {
    id: number;
    title: string;
};

export type UnitType = {
    id: number;
    name: string;
    abbreviation: string;
};

export type CategoryType = {
    id: number;
    title: string;
    slug: string;
};

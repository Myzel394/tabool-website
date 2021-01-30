declare module "sort-array" {
    type SingleOrArray<T> = T | T[];

    export enum NullRank {
        Before = -1,
        After = 1,
    }

    export enum UndefinedRank {
        Before = -1,
        After = 1,
    }

    export type PrimitiveOrders = "asc" | "desc";

    export default function sortArray<SingleElement>(
        array: SingleElement[],
        options?: {
            // How to reference to customOrders?
            by: SingleOrArray<string | (keyof SingleElement)>;

            customOrders?: Record<string, string[]>;
            order?: SingleOrArray<PrimitiveOrders | string>;

            computed?: Record<string, (element: SingleElement) => (string | number | boolean | null)>;

            nullRank?: NullRank;
            undefinedRank?: UndefinedRank;
        },
    ): SingleElement[];
}


export const shortner = (diet) => {
    var shortDiet = diet.replace(";", " ").replace(":", " ").replace("-", " ");

    var shortDiet = shortDiet
        ?.replace("vegetarian", "veg")
        ?.replace("gluten free", "gf")
        .replace("lactose free", "df")
        .replace("gluten intolerant", "gf")
        .replace("lactose intolerant", "df")
        .replace("dairy free", "df")
        .replace("one", "1x")
        .replace("two", "2x")
        .replace("three", "3x")
        .replace("four", "4x")
        .trim();
    return shortDiet;
};

type IngredientsTableProps = {
    ingredients: string[];
    measures: string[];
}

export default function IngredientsTable({ ingredients, measures }: IngredientsTableProps) {
    return (
        <div className="flex flex-col items-center overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8 border-2 p-2 rounded-lg mt-6">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table
                            className="min-w-full text-start text-sm lg:text-2xl font-light text-surface dark:text-white">
                            <thead
                                className="border-b border-neutral-200 font-medium dark:border-white/10">
                                <tr>
                                    <th scope="col" className="px-10 py-4">#</th>
                                    <th scope="col" className="px-10 py-4">Ingredient</th>
                                    <th scope="col" className="px-10 py-4">Measures</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((ingredient, index) => {
                                    const measure = measures.map((measure) => measure)
                                    return (
                                        <tr key={`${index}`}className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-10 py-4 font-medium">{index}</td>
                                            <td className="whitespace-nowrap px-10 py-4"
                                                >{ingredient}</td>
                                                <td className="whitespace-nowrap px-10 py-4"
                                                >{measure[index]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
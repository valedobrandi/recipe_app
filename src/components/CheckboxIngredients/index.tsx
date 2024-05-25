import {
    Checkbox,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

type CheckboxIngredientsProps = {
    ingredient: string;
    measures:string[]
    handleCheckBox: (index: number, id: string) => void;
    id:string;
     index:number;
    isChecked:boolean;
}


export default function CheckboxIngredients({ ingredient, handleCheckBox, id, index, isChecked, measures }: CheckboxIngredientsProps) {
    return (
        <ListItem className="p-0">
            <label
                htmlFor={index.toString()}
                className="flex w-full cursor-pointer items-center px-3 py-2"
            >
                <ListItemPrefix className="mr-3">
                    <Checkbox
                        checked={isChecked}
                        id={index.toString()}
                        value={ingredient}
                        onChange={() => handleCheckBox(index, id)}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                            className: "p-0",
                        }}
                    />
                </ListItemPrefix>
                <Typography color="blue-gray"
                 className={`text-sm lg:text-2xl font-semibold ${isChecked ? 'text-red-600' : ""}`}>
                    {ingredient} - <span>{measures[index]}</span>
                </Typography>
            </label>
        </ListItem>
    );
}
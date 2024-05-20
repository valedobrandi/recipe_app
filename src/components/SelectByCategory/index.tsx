import { Select, Option } from "@material-tailwind/react";



type SelectByCategoryPropsType = {
    categories: string[];
    fetchBy: (params: string) => void;
    select: string;
}

export function SelectByCategory({ categories, fetchBy, select }: SelectByCategoryPropsType) {

    const handleEvent = (option: string) => {
        fetchBy(option)
    }
    
    return (
           <div className="w-72 mt-5 m-auto">
            <Select
                className="text-xl"
                value={select}
                label="Select by category"
                onChange={select => handleEvent(select)}
            >
                {categories && categories.map((category, index) => (
                    <Option key={index} value={category}>{category}</Option>

                ))}
            </Select>
        </div> 
    );
}
import { Form } from "react-bootstrap";



type SelectByCategoryPropsType = {
    categories: string[];
    fetchBy: (params: string) => void;
    select: string;
}

export function SelectByCategory({ categories, fetchBy, select }: SelectByCategoryPropsType) {

    return (
        <div className="w-72 mt-2 m-auto">
            <Form.Select
                className="text-xl"
                value={select}
                onChange={(event) => fetchBy(event.currentTarget.value)}
            >
                {categories && categories.map((category, index) => (
                    <option
                        key={index} value={category}>{category}</option>

                ))}
            </Form.Select>
        </div>
    );
}
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

const SelectBox = ({ value, setValue, options }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <Label htmlFor="select">Yıl seçin: </Label>
            <Select name="select" value={value} onValueChange={(e) => {
                setValue(e)
            }} >
                <SelectTrigger className="w-[100px] text-black">
                    <SelectValue placeholder={value} className='bg-red-200' />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) =>
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>

    )
}

export default SelectBox
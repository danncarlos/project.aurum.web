import { EProductCategory } from "../../shared-module/types/enum/eproductCategory"

export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: EProductCategory
}
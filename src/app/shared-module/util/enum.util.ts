import { EProductCategory } from "../types/enum/eproductCategory";

export function getEnumKeyByValue<T extends object>(enumObj: T, value: T[keyof T]): keyof T | undefined {
  return Object.keys(enumObj).find(key => enumObj[key as keyof T] === value) as keyof T | undefined;
}


export interface SignUp{
    name:String,
    password:String,
    email:String
}

export interface login{
    email:String,
    password:String
}
export interface product{
    name:string,
    price:number,
    category:string,
    description:string,
    image: string,
    id:number
    quantity: undefined| number
    productId: undefined | number
}
export interface cart{
    
    name:string,
    price:number,
    category:string,
    description:string,
    image: string,
    id:number |undefined,
    quantity: undefined| number,
    productId:number,
    userId:number 
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number
    total:number,
}
export interface order{
    email:string,
    address:string,
    contact: string,
    totalPrice: number,
    userId: number,
    id: number |undefined;
}
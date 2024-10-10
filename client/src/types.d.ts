export interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    location: string;
    condition: string;
    category: string;
    photo: string;
    user_id: number;
    likes?: number;
}

export interface User {
    id: number,
    username: string,
    avatar?: string,
    token?: string,
    fullname: string,
    password?: string
}

export interface Review {
    readonly id?: number,
    content: string,
    grade: number,
    reviewer: number,
    reviewed: number
}

export interface Chat {
    id: number,
    seller: number,
    interested: number,
    product: string,
    sellerview: boolean,
    interestedview: boolean,
}

export interface Message {
    id: number,
    content: string,
    chat: number,
    sender: number,
    created: Date,
    isedited: boolean
}

export interface Data {
    data: Chat,
    messages: Message[]
}

export interface Like {
    id: number,
    likedby: number,
    product: number
}
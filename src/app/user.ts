import { Timestamp } from "./timestamp";

export interface User {
    id: number;
    username: string;
    password: string;
    times : Timestamp [];
}
export type Developer = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
}

export type LoginUser = {
    password: string
    email: string
}

export type DraftDeveloper = Omit<Developer, 'id'> 
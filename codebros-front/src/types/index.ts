export type Developer = {
    id: string
    name: string
    lastName: string
    email: string
    password: string
    tel: string
}

export type DraftDeveloper = Omit<Developer, 'id'> 
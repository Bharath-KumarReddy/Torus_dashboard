import { ActionType } from "./Actiontype"

interface Allusers {
    type: ActionType.ALLUSER,
    payload: any
}

interface Detailuser {
    type: ActionType.DETAILUSER,
    payload: any
}


export type Action = Allusers | Detailuser 
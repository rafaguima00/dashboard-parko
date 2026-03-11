import { initialState } from "../initialState"

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case "change" : 
            return { ...state, [action.field]: action.value }
        default :
            return { ...state }
    }
}
import { HIDE_ALERT, SHOW_ALERT } from "../types";

const handlers = {
    [HIDE_ALERT]: '',
    [SHOW_ALERT]: '',
    DEFAULT: state => state
}

export const AlertReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
}
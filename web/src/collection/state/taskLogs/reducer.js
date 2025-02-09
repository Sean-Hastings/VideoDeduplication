import initialState from "./initialState";
import {
  ACTION_APPEND_TASK_LOGS,
  ACTION_SET_TASK_LOGS,
  ACTION_SUBSCRIBE_FOR_TASK_LOGS,
  ACTION_UNSUBSCRIBE_FROM_TASK_LOGS,
} from "./actions";

export default function taskLogsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_SUBSCRIBE_FOR_TASK_LOGS:
      return {
        taskId: action.id,
        logs: null,
        more: true,
      };
    case ACTION_UNSUBSCRIBE_FROM_TASK_LOGS:
      return initialState;
    case ACTION_APPEND_TASK_LOGS:
      if (action.id === state.taskId) {
        const existing = state.logs == null ? [] : state.logs;
        return {
          ...state,
          logs: existing.concat(action.logs),
          more: action.more,
        };
      }
      return state;
    case ACTION_SET_TASK_LOGS:
      return {
        taskId: action.id,
        logs: action.logs,
        more: action.more,
      };
    default:
      return state;
  }
}

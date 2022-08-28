// TODO : Convert to RTK createSlice reducers
import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface ISocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: string[];
};

export const initialSocketContextState: ISocketContextState = {
    socket: undefined,
    uid: '',
    users: []
};

export type TSocketContextActions = 'update_socket' | 'update_uid' | 'update_users' | 'remove_user';

export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
};

export const socketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
    console.info(`Message Received - Action: ${action.type} - Payload: `, action.payload);
    switch (action.type) {
        case 'update_socket':
            return { ...state, socket: action.payload as Socket };
        case 'update_uid':
            return { ...state, uid: action.payload as string };
        case 'update_users':
            return { ...state, users: action.payload as string[] };
        case 'remove_user':
            return { ...state, users: state.users.filter((uid) => uid !== (action.payload as string)) };
        default:
            return { ...state };
    }
};

export interface ISocketContextProps {
    socketState: ISocketContextState;
    socketDispatch: React.Dispatch<ISocketContextActions>;
};

export const SocketContext = createContext<ISocketContextProps>({
    socketState: initialSocketContextState,
    socketDispatch: () => { }
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;
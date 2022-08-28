// TODO : Convert to RTK createSlice
import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';

import { initialSocketContextState, SocketContextProvider, socketReducer } from './SocketContext';
import { Spinner } from '../../components';
import { useNotify, useSocket } from '../../hooks';

export const SocketProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;

    const notify = useNotify();
    const socket = useSocket('ws://localhost:5000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false
    });

    const [loading, setLoading] = useState(true);
    const [socketState, socketDispatch] = useReducer(socketReducer, initialSocketContextState);

    useEffect(() => {
        /** Connect to the Web Socket */
        socket.connect();

        /** Save the socket in context */
        socketDispatch({ type: 'update_socket', payload: socket });

        /** Start the event listeners */
        startListeners();

        /** Send the handshake */
        sendHandshake();

        // eslint-disable-next-line
    }, []);

    /**
     * Start Socket IO Event Listeners
     */
    const startListeners = () => {
        /** User connected event */
        socket.on('user_connected', (users: string[]) => {
            console.info('User connected, new user list received');
            socketDispatch({ type: 'update_users', payload: users });
        });

        /** User disconnected event */
        socket.on('user_disconnected', (uid: string) => {
            console.info(`User disconnected: ${uid}`);
            socketDispatch({ type: 'remove_user', payload: uid });
        });

        /** Reconnect event */
        socket.io.on('reconnect', (attempt: number) => {
            console.info(`Reconnect on attempt: ${attempt}`);
        });

        /** Reconnect event */
        socket.io.on('reconnect_attempt', (attempt: number) => {
            console.info(`Reconnection attempt: ${attempt}`);
        });

        /** Reconnect event */
        socket.io.on('error', (error: Error) => {
            console.error(`Reconnection error: ${error}`);
        });

        /** Reconnect event */
        socket.io.on('reconnect_failed', () => {
            console.warn('Reconnection failure');
            notify({
                message: 'We are unable to connect you to the socket',
                variant: 'warning',
                persist: true,
                disableWindowBlurListener: false,
            });
        });
    };

    /**
     * Send Handshake to server
     */
    const sendHandshake = () => {
        console.info('Sending handshake to server...');

        socket.emit('handshake', (uid: string, users: string[]) => {
            console.log('User handshake callback message received');
            socketDispatch({ type: 'update_uid', payload: uid });
            socketDispatch({ type: 'update_users', payload: users });
            setLoading(false);
        });
    };

    if (loading) return <Spinner />;
    return (
        <SocketContextProvider value={{ socketState, socketDispatch }}>
            {children}
        </SocketContextProvider>
    );
};
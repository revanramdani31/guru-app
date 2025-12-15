'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};

let count = 0;

function generateId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}

type State = {
    toasts: ToasterToast[];
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: { type: 'ADD_TOAST' | 'UPDATE_TOAST' | 'DISMISS_TOAST' | 'REMOVE_TOAST'; toast?: ToasterToast; toastId?: string }) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
}

function reducer(state: State, action: { type: string; toast?: ToasterToast; toastId?: string }): State {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [action.toast!, ...state.toasts].slice(0, TOAST_LIMIT),
            };

        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === action.toast!.id ? { ...t, ...action.toast } : t
                ),
            };

        case 'DISMISS_TOAST': {
            const { toastId } = action;
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === toastId || toastId === undefined
                        ? { ...t, open: false }
                        : t
                ),
            };
        }

        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return { ...state, toasts: [] };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            };

        default:
            return state;
    }
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ ...props }: Toast) {
    const id = generateId();

    const update = (props: ToasterToast) =>
        dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } });

    const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open) => {
                if (!open) dismiss();
            },
        },
    });

    // Auto dismiss after delay
    setTimeout(() => {
        dismiss();
    }, TOAST_REMOVE_DELAY);

    return {
        id,
        dismiss,
        update,
    };
}

function useToast() {
    const [state, setState] = useState<State>(memoryState);

    useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, []);

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    };
}

export { useToast, toast };

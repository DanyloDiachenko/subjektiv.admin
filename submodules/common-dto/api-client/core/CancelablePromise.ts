export class CancelError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CancelError';
    }

    public get isCancelled(): boolean {
        return true;
    }
}

export interface OnCancel {
    (cancelHandler: () => void): void;

    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
}

export class CancelablePromise<T> implements Promise<T> {
    isResolved: boolean;
    isRejected: boolean;
    isCancelled: boolean;
    readonly cancelHandlers: (() => void)[];
    readonly promise: Promise<T>;
    resolve?: (value: T | PromiseLike<T>) => void;
    reject?: (reason?: unknown) => void;

    constructor(
        executor: (
            resolve: (value: T | PromiseLike<T>) => void,
            reject: (reason?: unknown) => void,
            onCancel: OnCancel,
        ) => void,
    ) {
        this.isResolved = false;
        this.isRejected = false;
        this.isCancelled = false;
        this.cancelHandlers = [];
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            const onResolve = (value: T | PromiseLike<T>): void => {
                if (this.isResolved || this.isRejected || this.isCancelled) {
                    return;
                }
                this.isResolved = true;
                resolve(value);
            };

            const onReject = (reason?: unknown): void => {
                if (this.isResolved || this.isRejected || this.isCancelled) {
                    return;
                }
                this.isRejected = true;
                reject(reason);
            };

            const onCancel = (cancelHandler: () => void): void => {
                if (this.isResolved || this.isRejected || this.isCancelled) {
                    return;
                }
                this.cancelHandlers.push(cancelHandler);
            };

            Object.defineProperty(onCancel, 'isResolved', {
                get: (): boolean => this.isResolved,
            });

            Object.defineProperty(onCancel, 'isRejected', {
                get: (): boolean => this.isRejected,
            });

            Object.defineProperty(onCancel, 'isCancelled', {
                get: (): boolean => this.isCancelled,
            });

            return executor(onResolve, onReject, onCancel as OnCancel);
        });
    }

    get [Symbol.toStringTag]() {
        return 'Cancellable Promise';
    }

    // eslint-disable-next-line unicorn/no-thenable
    public async then<TResult1 = T, TResult2 = never>(
        onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onRejected?:
            | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
            | null,
    ): Promise<TResult1 | TResult2> {
        return this.promise.then(onFulfilled, onRejected);
    }

    public async catch<TResult = never>(
        onRejected?:
            | ((reason: unknown) => TResult | PromiseLike<TResult>)
            | null,
    ): Promise<T | TResult> {
        return this.promise.catch(onRejected);
    }

    public async finally(onFinally?: (() => void) | null): Promise<T> {
        return this.promise.finally(onFinally);
    }

    public cancel(): void {
        if (this.isResolved || this.isRejected || this.isCancelled) {
            return;
        }
        this.isCancelled = true;
        if (this.cancelHandlers.length > 0) {
            try {
                for (const cancelHandler of this.cancelHandlers) {
                    cancelHandler();
                }
            } catch (error) {
                console.warn('Cancellation threw an error', error);
                return;
            }
        }
        this.cancelHandlers.length = 0;
        this.reject?.(new CancelError('Request aborted'));
    }

    // public get isCancelled(): boolean {
    //     return this.isCancelled;
    // }
}

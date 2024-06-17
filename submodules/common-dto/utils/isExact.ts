export type IsExact<A, B> =
    Required<A> extends Required<B> ? (Required<B> extends Required<A> ? true : false) : false;

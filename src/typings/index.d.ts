import { NextFunction, Request, Response } from "express";

type TypedRequest<P = Record<string, string>> = Request<P>;
type TypedResponse<T> = Response<ApiResponse<T>>;
type TypedNextFn = NextFunction;

type Params<P extends string> = Record<P, string>;

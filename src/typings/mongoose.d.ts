import { Document, InferSchemaType, Model, ObtainSchemaGeneric, Schema, Types } from "mongoose"

type PickModel<T, Skip extends keyof T = never, Dates extends keyof T = never> = Omit<
  T,
  "id" | "createdAt" | "updatedAt" | Skip | Dates
> &
  Record<Dates, Date>

type BaseSchemaType<T, E extends string = never> = Record<
  keyof Omit<T, "id" | "createdAt" | "updatedAt"> | E,
  any
>

type DocumentType<TSchema extends Schema> = InferSchemaType<TSchema> & Document<Types.ObjectId>

type SubDocumentType<TSchema extends Schema> = InferSchemaType<TSchema> & Types.Subdocument<Types.ObjectId>

type ModelType<TSchema extends Schema> = Model<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, "TQueryHelpers">,
  ObtainSchemaGeneric<TSchema, "TInstanceMethods">,
  ObtainSchemaGeneric<TSchema, "TVirtuals">
> &
  ObtainSchemaGeneric<TSchema, "TStaticMethods">

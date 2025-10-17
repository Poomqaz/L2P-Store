
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Book
 * 
 */
export type Book = $Result.DefaultSelection<Prisma.$BookPayload>
/**
 * Model ImportToStock
 * 
 */
export type ImportToStock = $Result.DefaultSelection<Prisma.$ImportToStockPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model Cart
 * 
 */
export type Cart = $Result.DefaultSelection<Prisma.$CartPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderDetail
 * 
 */
export type OrderDetail = $Result.DefaultSelection<Prisma.$OrderDetailPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model SaleDetail
 * 
 */
export type SaleDetail = $Result.DefaultSelection<Prisma.$SaleDetailPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Books
 * const books = await prisma.book.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Books
   * const books = await prisma.book.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): Prisma.BookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importToStock`: Exposes CRUD operations for the **ImportToStock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImportToStocks
    * const importToStocks = await prisma.importToStock.findMany()
    * ```
    */
  get importToStock(): Prisma.ImportToStockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): Prisma.CartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderDetail`: Exposes CRUD operations for the **OrderDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderDetails
    * const orderDetails = await prisma.orderDetail.findMany()
    * ```
    */
  get orderDetail(): Prisma.OrderDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.saleDetail`: Exposes CRUD operations for the **SaleDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SaleDetails
    * const saleDetails = await prisma.saleDetail.findMany()
    * ```
    */
  get saleDetail(): Prisma.SaleDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Book: 'Book',
    ImportToStock: 'ImportToStock',
    Admin: 'Admin',
    Member: 'Member',
    Cart: 'Cart',
    Order: 'Order',
    OrderDetail: 'OrderDetail',
    Sale: 'Sale',
    SaleDetail: 'SaleDetail',
    Review: 'Review'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "book" | "importToStock" | "admin" | "member" | "cart" | "order" | "orderDetail" | "sale" | "saleDetail" | "review"
      txIsolationLevel: never
    }
    model: {
      Book: {
        payload: Prisma.$BookPayload<ExtArgs>
        fields: Prisma.BookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findFirst: {
            args: Prisma.BookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findMany: {
            args: Prisma.BookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          create: {
            args: Prisma.BookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          createMany: {
            args: Prisma.BookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          update: {
            args: Prisma.BookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          deleteMany: {
            args: Prisma.BookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          aggregate: {
            args: Prisma.BookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook>
          }
          groupBy: {
            args: Prisma.BookGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BookFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BookAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BookCountArgs<ExtArgs>
            result: $Utils.Optional<BookCountAggregateOutputType> | number
          }
        }
      }
      ImportToStock: {
        payload: Prisma.$ImportToStockPayload<ExtArgs>
        fields: Prisma.ImportToStockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportToStockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportToStockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>
          }
          findFirst: {
            args: Prisma.ImportToStockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportToStockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>
          }
          findMany: {
            args: Prisma.ImportToStockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>[]
          }
          create: {
            args: Prisma.ImportToStockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>
          }
          createMany: {
            args: Prisma.ImportToStockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ImportToStockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>
          }
          update: {
            args: Prisma.ImportToStockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>
          }
          deleteMany: {
            args: Prisma.ImportToStockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportToStockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ImportToStockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportToStockPayload>
          }
          aggregate: {
            args: Prisma.ImportToStockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportToStock>
          }
          groupBy: {
            args: Prisma.ImportToStockGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportToStockGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ImportToStockFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ImportToStockAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ImportToStockCountArgs<ExtArgs>
            result: $Utils.Optional<ImportToStockCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AdminFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AdminAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MemberFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MemberAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      Cart: {
        payload: Prisma.$CartPayload<ExtArgs>
        fields: Prisma.CartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findFirst: {
            args: Prisma.CartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findMany: {
            args: Prisma.CartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          create: {
            args: Prisma.CartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          createMany: {
            args: Prisma.CartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          update: {
            args: Prisma.CartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          deleteMany: {
            args: Prisma.CartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          aggregate: {
            args: Prisma.CartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCart>
          }
          groupBy: {
            args: Prisma.CartGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CartFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CartAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CartCountArgs<ExtArgs>
            result: $Utils.Optional<CartCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrderFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrderAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderDetail: {
        payload: Prisma.$OrderDetailPayload<ExtArgs>
        fields: Prisma.OrderDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>
          }
          findFirst: {
            args: Prisma.OrderDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>
          }
          findMany: {
            args: Prisma.OrderDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>[]
          }
          create: {
            args: Prisma.OrderDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>
          }
          createMany: {
            args: Prisma.OrderDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>
          }
          update: {
            args: Prisma.OrderDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>
          }
          deleteMany: {
            args: Prisma.OrderDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderDetailPayload>
          }
          aggregate: {
            args: Prisma.OrderDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderDetail>
          }
          groupBy: {
            args: Prisma.OrderDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderDetailGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrderDetailFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrderDetailAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrderDetailCountArgs<ExtArgs>
            result: $Utils.Optional<OrderDetailCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SaleFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SaleAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      SaleDetail: {
        payload: Prisma.$SaleDetailPayload<ExtArgs>
        fields: Prisma.SaleDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          findFirst: {
            args: Prisma.SaleDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          findMany: {
            args: Prisma.SaleDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>[]
          }
          create: {
            args: Prisma.SaleDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          createMany: {
            args: Prisma.SaleDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SaleDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          update: {
            args: Prisma.SaleDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          deleteMany: {
            args: Prisma.SaleDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          aggregate: {
            args: Prisma.SaleDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaleDetail>
          }
          groupBy: {
            args: Prisma.SaleDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleDetailGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SaleDetailFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SaleDetailAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SaleDetailCountArgs<ExtArgs>
            result: $Utils.Optional<SaleDetailCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ReviewFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ReviewAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    book?: BookOmit
    importToStock?: ImportToStockOmit
    admin?: AdminOmit
    member?: MemberOmit
    cart?: CartOmit
    order?: OrderOmit
    orderDetail?: OrderDetailOmit
    sale?: SaleOmit
    saleDetail?: SaleDetailOmit
    review?: ReviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BookCountOutputType
   */

  export type BookCountOutputType = {
    carts: number
    OrderDetails: number
    ImportToStock: number
    saleDetails: number
    Review: number
  }

  export type BookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carts?: boolean | BookCountOutputTypeCountCartsArgs
    OrderDetails?: boolean | BookCountOutputTypeCountOrderDetailsArgs
    ImportToStock?: boolean | BookCountOutputTypeCountImportToStockArgs
    saleDetails?: boolean | BookCountOutputTypeCountSaleDetailsArgs
    Review?: boolean | BookCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookCountOutputType
     */
    select?: BookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountCartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountOrderDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderDetailWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountImportToStockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportToStockWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountSaleDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    sales: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | AdminCountOutputTypeCountSalesArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    sales: number
    Orders: number
    Review: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | MemberCountOutputTypeCountSalesArgs
    Orders?: boolean | MemberCountOutputTypeCountOrdersArgs
    Review?: boolean | MemberCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    OrderDetail: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    OrderDetail?: boolean | OrderCountOutputTypeCountOrderDetailArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountOrderDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderDetailWhereInput
  }


  /**
   * Count Type SaleCountOutputType
   */

  export type SaleCountOutputType = {
    details: number
  }

  export type SaleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    details?: boolean | SaleCountOutputTypeCountDetailsArgs
  }

  // Custom InputTypes
  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleCountOutputType
     */
    select?: SaleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Book
   */

  export type AggregateBook = {
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  export type BookAvgAggregateOutputType = {
    price: number | null
    qty: number | null
    averageRating: number | null
    reviewCount: number | null
  }

  export type BookSumAggregateOutputType = {
    price: number | null
    qty: number | null
    averageRating: number | null
    reviewCount: number | null
  }

  export type BookMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    isbn: string | null
    createdAt: Date | null
    image: string | null
    category: string | null
    qty: number | null
    status: string | null
    averageRating: number | null
    reviewCount: number | null
  }

  export type BookMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    isbn: string | null
    createdAt: Date | null
    image: string | null
    category: string | null
    qty: number | null
    status: string | null
    averageRating: number | null
    reviewCount: number | null
  }

  export type BookCountAggregateOutputType = {
    id: number
    name: number
    price: number
    description: number
    isbn: number
    createdAt: number
    image: number
    category: number
    qty: number
    status: number
    averageRating: number
    reviewCount: number
    _all: number
  }


  export type BookAvgAggregateInputType = {
    price?: true
    qty?: true
    averageRating?: true
    reviewCount?: true
  }

  export type BookSumAggregateInputType = {
    price?: true
    qty?: true
    averageRating?: true
    reviewCount?: true
  }

  export type BookMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    isbn?: true
    createdAt?: true
    image?: true
    category?: true
    qty?: true
    status?: true
    averageRating?: true
    reviewCount?: true
  }

  export type BookMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    isbn?: true
    createdAt?: true
    image?: true
    category?: true
    qty?: true
    status?: true
    averageRating?: true
    reviewCount?: true
  }

  export type BookCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    isbn?: true
    createdAt?: true
    image?: true
    category?: true
    qty?: true
    status?: true
    averageRating?: true
    reviewCount?: true
    _all?: true
  }

  export type BookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Book to aggregate.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookMaxAggregateInputType
  }

  export type GetBookAggregateType<T extends BookAggregateArgs> = {
        [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook[P]>
      : GetScalarType<T[P], AggregateBook[P]>
  }




  export type BookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
    orderBy?: BookOrderByWithAggregationInput | BookOrderByWithAggregationInput[]
    by: BookScalarFieldEnum[] | BookScalarFieldEnum
    having?: BookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookCountAggregateInputType | true
    _avg?: BookAvgAggregateInputType
    _sum?: BookSumAggregateInputType
    _min?: BookMinAggregateInputType
    _max?: BookMaxAggregateInputType
  }

  export type BookGroupByOutputType = {
    id: string
    name: string
    price: number
    description: string | null
    isbn: string | null
    createdAt: Date | null
    image: string | null
    category: string | null
    qty: number
    status: string
    averageRating: number
    reviewCount: number
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookGroupByOutputType[P]>
            : GetScalarType<T[P], BookGroupByOutputType[P]>
        }
      >
    >


  export type BookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    description?: boolean
    isbn?: boolean
    createdAt?: boolean
    image?: boolean
    category?: boolean
    qty?: boolean
    status?: boolean
    averageRating?: boolean
    reviewCount?: boolean
    carts?: boolean | Book$cartsArgs<ExtArgs>
    OrderDetails?: boolean | Book$OrderDetailsArgs<ExtArgs>
    ImportToStock?: boolean | Book$ImportToStockArgs<ExtArgs>
    saleDetails?: boolean | Book$saleDetailsArgs<ExtArgs>
    Review?: boolean | Book$ReviewArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>



  export type BookSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    description?: boolean
    isbn?: boolean
    createdAt?: boolean
    image?: boolean
    category?: boolean
    qty?: boolean
    status?: boolean
    averageRating?: boolean
    reviewCount?: boolean
  }

  export type BookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "description" | "isbn" | "createdAt" | "image" | "category" | "qty" | "status" | "averageRating" | "reviewCount", ExtArgs["result"]["book"]>
  export type BookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carts?: boolean | Book$cartsArgs<ExtArgs>
    OrderDetails?: boolean | Book$OrderDetailsArgs<ExtArgs>
    ImportToStock?: boolean | Book$ImportToStockArgs<ExtArgs>
    saleDetails?: boolean | Book$saleDetailsArgs<ExtArgs>
    Review?: boolean | Book$ReviewArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Book"
    objects: {
      carts: Prisma.$CartPayload<ExtArgs>[]
      OrderDetails: Prisma.$OrderDetailPayload<ExtArgs>[]
      ImportToStock: Prisma.$ImportToStockPayload<ExtArgs>[]
      saleDetails: Prisma.$SaleDetailPayload<ExtArgs>[]
      Review: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      description: string | null
      isbn: string | null
      createdAt: Date | null
      image: string | null
      category: string | null
      qty: number
      status: string
      averageRating: number
      reviewCount: number
    }, ExtArgs["result"]["book"]>
    composites: {}
  }

  type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = $Result.GetResult<Prisma.$BookPayload, S>

  type BookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookCountAggregateInputType | true
    }

  export interface BookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Book'], meta: { name: 'Book' } }
    /**
     * Find zero or one Book that matches the filter.
     * @param {BookFindUniqueArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookFindUniqueArgs>(args: SelectSubset<T, BookFindUniqueArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookFindUniqueOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs>(args: SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookFindFirstArgs>(args?: SelectSubset<T, BookFindFirstArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs>(args?: SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.book.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.book.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookFindManyArgs>(args?: SelectSubset<T, BookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book.
     * @param {BookCreateArgs} args - Arguments to create a Book.
     * @example
     * // Create one Book
     * const Book = await prisma.book.create({
     *   data: {
     *     // ... data to create a Book
     *   }
     * })
     * 
     */
    create<T extends BookCreateArgs>(args: SelectSubset<T, BookCreateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Books.
     * @param {BookCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookCreateManyArgs>(args?: SelectSubset<T, BookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Book.
     * @param {BookDeleteArgs} args - Arguments to delete one Book.
     * @example
     * // Delete one Book
     * const Book = await prisma.book.delete({
     *   where: {
     *     // ... filter to delete one Book
     *   }
     * })
     * 
     */
    delete<T extends BookDeleteArgs>(args: SelectSubset<T, BookDeleteArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book.
     * @param {BookUpdateArgs} args - Arguments to update one Book.
     * @example
     * // Update one Book
     * const book = await prisma.book.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookUpdateArgs>(args: SelectSubset<T, BookUpdateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Books.
     * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.book.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookDeleteManyArgs>(args?: SelectSubset<T, BookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookUpdateManyArgs>(args: SelectSubset<T, BookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Book.
     * @param {BookUpsertArgs} args - Arguments to update or create a Book.
     * @example
     * // Update or create a Book
     * const book = await prisma.book.upsert({
     *   create: {
     *     // ... data to create a Book
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book we want to update
     *   }
     * })
     */
    upsert<T extends BookUpsertArgs>(args: SelectSubset<T, BookUpsertArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * @param {BookFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const book = await prisma.book.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BookFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Book.
     * @param {BookAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const book = await prisma.book.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BookAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.book.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BookCountArgs>(
      args?: Subset<T, BookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookAggregateArgs>(args: Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>

    /**
     * Group by Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookGroupByArgs['orderBy'] }
        : { orderBy?: BookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Book model
   */
  readonly fields: BookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Book.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    carts<T extends Book$cartsArgs<ExtArgs> = {}>(args?: Subset<T, Book$cartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    OrderDetails<T extends Book$OrderDetailsArgs<ExtArgs> = {}>(args?: Subset<T, Book$OrderDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ImportToStock<T extends Book$ImportToStockArgs<ExtArgs> = {}>(args?: Subset<T, Book$ImportToStockArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    saleDetails<T extends Book$saleDetailsArgs<ExtArgs> = {}>(args?: Subset<T, Book$saleDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Review<T extends Book$ReviewArgs<ExtArgs> = {}>(args?: Subset<T, Book$ReviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Book model
   */
  interface BookFieldRefs {
    readonly id: FieldRef<"Book", 'String'>
    readonly name: FieldRef<"Book", 'String'>
    readonly price: FieldRef<"Book", 'Int'>
    readonly description: FieldRef<"Book", 'String'>
    readonly isbn: FieldRef<"Book", 'String'>
    readonly createdAt: FieldRef<"Book", 'DateTime'>
    readonly image: FieldRef<"Book", 'String'>
    readonly category: FieldRef<"Book", 'String'>
    readonly qty: FieldRef<"Book", 'Int'>
    readonly status: FieldRef<"Book", 'String'>
    readonly averageRating: FieldRef<"Book", 'Float'>
    readonly reviewCount: FieldRef<"Book", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Book findUnique
   */
  export type BookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findUniqueOrThrow
   */
  export type BookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findFirst
   */
  export type BookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findFirstOrThrow
   */
  export type BookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findMany
   */
  export type BookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book create
   */
  export type BookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to create a Book.
     */
    data: XOR<BookCreateInput, BookUncheckedCreateInput>
  }

  /**
   * Book createMany
   */
  export type BookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
  }

  /**
   * Book update
   */
  export type BookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to update a Book.
     */
    data: XOR<BookUpdateInput, BookUncheckedUpdateInput>
    /**
     * Choose, which Book to update.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book updateMany
   */
  export type BookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
  }

  /**
   * Book upsert
   */
  export type BookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The filter to search for the Book to update in case it exists.
     */
    where: BookWhereUniqueInput
    /**
     * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
     */
    create: XOR<BookCreateInput, BookUncheckedCreateInput>
    /**
     * In case the Book was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookUpdateInput, BookUncheckedUpdateInput>
  }

  /**
   * Book delete
   */
  export type BookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter which Book to delete.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book deleteMany
   */
  export type BookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to delete.
     */
    limit?: number
  }

  /**
   * Book findRaw
   */
  export type BookFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Book aggregateRaw
   */
  export type BookAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Book.carts
   */
  export type Book$cartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    cursor?: CartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Book.OrderDetails
   */
  export type Book$OrderDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    where?: OrderDetailWhereInput
    orderBy?: OrderDetailOrderByWithRelationInput | OrderDetailOrderByWithRelationInput[]
    cursor?: OrderDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderDetailScalarFieldEnum | OrderDetailScalarFieldEnum[]
  }

  /**
   * Book.ImportToStock
   */
  export type Book$ImportToStockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    where?: ImportToStockWhereInput
    orderBy?: ImportToStockOrderByWithRelationInput | ImportToStockOrderByWithRelationInput[]
    cursor?: ImportToStockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImportToStockScalarFieldEnum | ImportToStockScalarFieldEnum[]
  }

  /**
   * Book.saleDetails
   */
  export type Book$saleDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * Book.Review
   */
  export type Book$ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Book without action
   */
  export type BookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
  }


  /**
   * Model ImportToStock
   */

  export type AggregateImportToStock = {
    _count: ImportToStockCountAggregateOutputType | null
    _avg: ImportToStockAvgAggregateOutputType | null
    _sum: ImportToStockSumAggregateOutputType | null
    _min: ImportToStockMinAggregateOutputType | null
    _max: ImportToStockMaxAggregateOutputType | null
  }

  export type ImportToStockAvgAggregateOutputType = {
    qty: number | null
  }

  export type ImportToStockSumAggregateOutputType = {
    qty: number | null
  }

  export type ImportToStockMinAggregateOutputType = {
    id: string | null
    bookid: string | null
    qty: number | null
    createdAt: Date | null
    updateAt: Date | null
  }

  export type ImportToStockMaxAggregateOutputType = {
    id: string | null
    bookid: string | null
    qty: number | null
    createdAt: Date | null
    updateAt: Date | null
  }

  export type ImportToStockCountAggregateOutputType = {
    id: number
    bookid: number
    qty: number
    createdAt: number
    updateAt: number
    _all: number
  }


  export type ImportToStockAvgAggregateInputType = {
    qty?: true
  }

  export type ImportToStockSumAggregateInputType = {
    qty?: true
  }

  export type ImportToStockMinAggregateInputType = {
    id?: true
    bookid?: true
    qty?: true
    createdAt?: true
    updateAt?: true
  }

  export type ImportToStockMaxAggregateInputType = {
    id?: true
    bookid?: true
    qty?: true
    createdAt?: true
    updateAt?: true
  }

  export type ImportToStockCountAggregateInputType = {
    id?: true
    bookid?: true
    qty?: true
    createdAt?: true
    updateAt?: true
    _all?: true
  }

  export type ImportToStockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportToStock to aggregate.
     */
    where?: ImportToStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportToStocks to fetch.
     */
    orderBy?: ImportToStockOrderByWithRelationInput | ImportToStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportToStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportToStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportToStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImportToStocks
    **/
    _count?: true | ImportToStockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImportToStockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImportToStockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportToStockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportToStockMaxAggregateInputType
  }

  export type GetImportToStockAggregateType<T extends ImportToStockAggregateArgs> = {
        [P in keyof T & keyof AggregateImportToStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportToStock[P]>
      : GetScalarType<T[P], AggregateImportToStock[P]>
  }




  export type ImportToStockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportToStockWhereInput
    orderBy?: ImportToStockOrderByWithAggregationInput | ImportToStockOrderByWithAggregationInput[]
    by: ImportToStockScalarFieldEnum[] | ImportToStockScalarFieldEnum
    having?: ImportToStockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportToStockCountAggregateInputType | true
    _avg?: ImportToStockAvgAggregateInputType
    _sum?: ImportToStockSumAggregateInputType
    _min?: ImportToStockMinAggregateInputType
    _max?: ImportToStockMaxAggregateInputType
  }

  export type ImportToStockGroupByOutputType = {
    id: string
    bookid: string
    qty: number
    createdAt: Date | null
    updateAt: Date | null
    _count: ImportToStockCountAggregateOutputType | null
    _avg: ImportToStockAvgAggregateOutputType | null
    _sum: ImportToStockSumAggregateOutputType | null
    _min: ImportToStockMinAggregateOutputType | null
    _max: ImportToStockMaxAggregateOutputType | null
  }

  type GetImportToStockGroupByPayload<T extends ImportToStockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportToStockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportToStockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportToStockGroupByOutputType[P]>
            : GetScalarType<T[P], ImportToStockGroupByOutputType[P]>
        }
      >
    >


  export type ImportToStockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookid?: boolean
    qty?: boolean
    createdAt?: boolean
    updateAt?: boolean
    Book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importToStock"]>



  export type ImportToStockSelectScalar = {
    id?: boolean
    bookid?: boolean
    qty?: boolean
    createdAt?: boolean
    updateAt?: boolean
  }

  export type ImportToStockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookid" | "qty" | "createdAt" | "updateAt", ExtArgs["result"]["importToStock"]>
  export type ImportToStockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $ImportToStockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImportToStock"
    objects: {
      Book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookid: string
      qty: number
      createdAt: Date | null
      updateAt: Date | null
    }, ExtArgs["result"]["importToStock"]>
    composites: {}
  }

  type ImportToStockGetPayload<S extends boolean | null | undefined | ImportToStockDefaultArgs> = $Result.GetResult<Prisma.$ImportToStockPayload, S>

  type ImportToStockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportToStockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportToStockCountAggregateInputType | true
    }

  export interface ImportToStockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportToStock'], meta: { name: 'ImportToStock' } }
    /**
     * Find zero or one ImportToStock that matches the filter.
     * @param {ImportToStockFindUniqueArgs} args - Arguments to find a ImportToStock
     * @example
     * // Get one ImportToStock
     * const importToStock = await prisma.importToStock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportToStockFindUniqueArgs>(args: SelectSubset<T, ImportToStockFindUniqueArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImportToStock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportToStockFindUniqueOrThrowArgs} args - Arguments to find a ImportToStock
     * @example
     * // Get one ImportToStock
     * const importToStock = await prisma.importToStock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportToStockFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportToStockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportToStock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockFindFirstArgs} args - Arguments to find a ImportToStock
     * @example
     * // Get one ImportToStock
     * const importToStock = await prisma.importToStock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportToStockFindFirstArgs>(args?: SelectSubset<T, ImportToStockFindFirstArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportToStock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockFindFirstOrThrowArgs} args - Arguments to find a ImportToStock
     * @example
     * // Get one ImportToStock
     * const importToStock = await prisma.importToStock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportToStockFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportToStockFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportToStocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImportToStocks
     * const importToStocks = await prisma.importToStock.findMany()
     * 
     * // Get first 10 ImportToStocks
     * const importToStocks = await prisma.importToStock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const importToStockWithIdOnly = await prisma.importToStock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImportToStockFindManyArgs>(args?: SelectSubset<T, ImportToStockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImportToStock.
     * @param {ImportToStockCreateArgs} args - Arguments to create a ImportToStock.
     * @example
     * // Create one ImportToStock
     * const ImportToStock = await prisma.importToStock.create({
     *   data: {
     *     // ... data to create a ImportToStock
     *   }
     * })
     * 
     */
    create<T extends ImportToStockCreateArgs>(args: SelectSubset<T, ImportToStockCreateArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImportToStocks.
     * @param {ImportToStockCreateManyArgs} args - Arguments to create many ImportToStocks.
     * @example
     * // Create many ImportToStocks
     * const importToStock = await prisma.importToStock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportToStockCreateManyArgs>(args?: SelectSubset<T, ImportToStockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ImportToStock.
     * @param {ImportToStockDeleteArgs} args - Arguments to delete one ImportToStock.
     * @example
     * // Delete one ImportToStock
     * const ImportToStock = await prisma.importToStock.delete({
     *   where: {
     *     // ... filter to delete one ImportToStock
     *   }
     * })
     * 
     */
    delete<T extends ImportToStockDeleteArgs>(args: SelectSubset<T, ImportToStockDeleteArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImportToStock.
     * @param {ImportToStockUpdateArgs} args - Arguments to update one ImportToStock.
     * @example
     * // Update one ImportToStock
     * const importToStock = await prisma.importToStock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportToStockUpdateArgs>(args: SelectSubset<T, ImportToStockUpdateArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImportToStocks.
     * @param {ImportToStockDeleteManyArgs} args - Arguments to filter ImportToStocks to delete.
     * @example
     * // Delete a few ImportToStocks
     * const { count } = await prisma.importToStock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportToStockDeleteManyArgs>(args?: SelectSubset<T, ImportToStockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportToStocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImportToStocks
     * const importToStock = await prisma.importToStock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportToStockUpdateManyArgs>(args: SelectSubset<T, ImportToStockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ImportToStock.
     * @param {ImportToStockUpsertArgs} args - Arguments to update or create a ImportToStock.
     * @example
     * // Update or create a ImportToStock
     * const importToStock = await prisma.importToStock.upsert({
     *   create: {
     *     // ... data to create a ImportToStock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImportToStock we want to update
     *   }
     * })
     */
    upsert<T extends ImportToStockUpsertArgs>(args: SelectSubset<T, ImportToStockUpsertArgs<ExtArgs>>): Prisma__ImportToStockClient<$Result.GetResult<Prisma.$ImportToStockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportToStocks that matches the filter.
     * @param {ImportToStockFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const importToStock = await prisma.importToStock.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ImportToStockFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ImportToStock.
     * @param {ImportToStockAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const importToStock = await prisma.importToStock.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ImportToStockAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ImportToStocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockCountArgs} args - Arguments to filter ImportToStocks to count.
     * @example
     * // Count the number of ImportToStocks
     * const count = await prisma.importToStock.count({
     *   where: {
     *     // ... the filter for the ImportToStocks we want to count
     *   }
     * })
    **/
    count<T extends ImportToStockCountArgs>(
      args?: Subset<T, ImportToStockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportToStockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImportToStock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImportToStockAggregateArgs>(args: Subset<T, ImportToStockAggregateArgs>): Prisma.PrismaPromise<GetImportToStockAggregateType<T>>

    /**
     * Group by ImportToStock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportToStockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImportToStockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportToStockGroupByArgs['orderBy'] }
        : { orderBy?: ImportToStockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImportToStockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportToStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImportToStock model
   */
  readonly fields: ImportToStockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImportToStock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportToStockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImportToStock model
   */
  interface ImportToStockFieldRefs {
    readonly id: FieldRef<"ImportToStock", 'String'>
    readonly bookid: FieldRef<"ImportToStock", 'String'>
    readonly qty: FieldRef<"ImportToStock", 'Int'>
    readonly createdAt: FieldRef<"ImportToStock", 'DateTime'>
    readonly updateAt: FieldRef<"ImportToStock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImportToStock findUnique
   */
  export type ImportToStockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * Filter, which ImportToStock to fetch.
     */
    where: ImportToStockWhereUniqueInput
  }

  /**
   * ImportToStock findUniqueOrThrow
   */
  export type ImportToStockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * Filter, which ImportToStock to fetch.
     */
    where: ImportToStockWhereUniqueInput
  }

  /**
   * ImportToStock findFirst
   */
  export type ImportToStockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * Filter, which ImportToStock to fetch.
     */
    where?: ImportToStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportToStocks to fetch.
     */
    orderBy?: ImportToStockOrderByWithRelationInput | ImportToStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportToStocks.
     */
    cursor?: ImportToStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportToStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportToStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportToStocks.
     */
    distinct?: ImportToStockScalarFieldEnum | ImportToStockScalarFieldEnum[]
  }

  /**
   * ImportToStock findFirstOrThrow
   */
  export type ImportToStockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * Filter, which ImportToStock to fetch.
     */
    where?: ImportToStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportToStocks to fetch.
     */
    orderBy?: ImportToStockOrderByWithRelationInput | ImportToStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportToStocks.
     */
    cursor?: ImportToStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportToStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportToStocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportToStocks.
     */
    distinct?: ImportToStockScalarFieldEnum | ImportToStockScalarFieldEnum[]
  }

  /**
   * ImportToStock findMany
   */
  export type ImportToStockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * Filter, which ImportToStocks to fetch.
     */
    where?: ImportToStockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportToStocks to fetch.
     */
    orderBy?: ImportToStockOrderByWithRelationInput | ImportToStockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImportToStocks.
     */
    cursor?: ImportToStockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportToStocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportToStocks.
     */
    skip?: number
    distinct?: ImportToStockScalarFieldEnum | ImportToStockScalarFieldEnum[]
  }

  /**
   * ImportToStock create
   */
  export type ImportToStockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * The data needed to create a ImportToStock.
     */
    data: XOR<ImportToStockCreateInput, ImportToStockUncheckedCreateInput>
  }

  /**
   * ImportToStock createMany
   */
  export type ImportToStockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImportToStocks.
     */
    data: ImportToStockCreateManyInput | ImportToStockCreateManyInput[]
  }

  /**
   * ImportToStock update
   */
  export type ImportToStockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * The data needed to update a ImportToStock.
     */
    data: XOR<ImportToStockUpdateInput, ImportToStockUncheckedUpdateInput>
    /**
     * Choose, which ImportToStock to update.
     */
    where: ImportToStockWhereUniqueInput
  }

  /**
   * ImportToStock updateMany
   */
  export type ImportToStockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImportToStocks.
     */
    data: XOR<ImportToStockUpdateManyMutationInput, ImportToStockUncheckedUpdateManyInput>
    /**
     * Filter which ImportToStocks to update
     */
    where?: ImportToStockWhereInput
    /**
     * Limit how many ImportToStocks to update.
     */
    limit?: number
  }

  /**
   * ImportToStock upsert
   */
  export type ImportToStockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * The filter to search for the ImportToStock to update in case it exists.
     */
    where: ImportToStockWhereUniqueInput
    /**
     * In case the ImportToStock found by the `where` argument doesn't exist, create a new ImportToStock with this data.
     */
    create: XOR<ImportToStockCreateInput, ImportToStockUncheckedCreateInput>
    /**
     * In case the ImportToStock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportToStockUpdateInput, ImportToStockUncheckedUpdateInput>
  }

  /**
   * ImportToStock delete
   */
  export type ImportToStockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
    /**
     * Filter which ImportToStock to delete.
     */
    where: ImportToStockWhereUniqueInput
  }

  /**
   * ImportToStock deleteMany
   */
  export type ImportToStockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportToStocks to delete
     */
    where?: ImportToStockWhereInput
    /**
     * Limit how many ImportToStocks to delete.
     */
    limit?: number
  }

  /**
   * ImportToStock findRaw
   */
  export type ImportToStockFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ImportToStock aggregateRaw
   */
  export type ImportToStockAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ImportToStock without action
   */
  export type ImportToStockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportToStock
     */
    select?: ImportToStockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportToStock
     */
    omit?: ImportToStockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportToStockInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    password: string | null
    level: string | null
    status: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    password: string | null
    level: string | null
    status: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    name: number
    username: number
    password: number
    level: number
    status: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    level?: true
    status?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    level?: true
    status?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    level?: true
    status?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    name: string
    username: string
    password: string
    level: string
    status: string
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    level?: boolean
    status?: boolean
    sales?: boolean | Admin$salesArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>



  export type AdminSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    level?: boolean
    status?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "username" | "password" | "level" | "status", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | Admin$salesArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      username: string
      password: string
      level: string
      status: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * @param {AdminFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const admin = await prisma.admin.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AdminFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Admin.
     * @param {AdminAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const admin = await prisma.admin.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AdminAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends Admin$salesArgs<ExtArgs> = {}>(args?: Subset<T, Admin$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly username: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly level: FieldRef<"Admin", 'String'>
    readonly status: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin findRaw
   */
  export type AdminFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Admin aggregateRaw
   */
  export type AdminAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Admin.sales
   */
  export type Admin$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberAvgAggregateOutputType = {
    points: number | null
  }

  export type MemberSumAggregateOutputType = {
    points: number | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    phone: string | null
    username: string | null
    password: string | null
    status: string | null
    address: string | null
    name: string | null
    profileImage: string | null
    points: number | null
    email: string | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    username: string | null
    password: string | null
    status: string | null
    address: string | null
    name: string | null
    profileImage: string | null
    points: number | null
    email: string | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    phone: number
    username: number
    password: number
    status: number
    address: number
    name: number
    profileImage: number
    points: number
    email: number
    _all: number
  }


  export type MemberAvgAggregateInputType = {
    points?: true
  }

  export type MemberSumAggregateInputType = {
    points?: true
  }

  export type MemberMinAggregateInputType = {
    id?: true
    phone?: true
    username?: true
    password?: true
    status?: true
    address?: true
    name?: true
    profileImage?: true
    points?: true
    email?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    phone?: true
    username?: true
    password?: true
    status?: true
    address?: true
    name?: true
    profileImage?: true
    points?: true
    email?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    phone?: true
    username?: true
    password?: true
    status?: true
    address?: true
    name?: true
    profileImage?: true
    points?: true
    email?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _avg?: MemberAvgAggregateInputType
    _sum?: MemberSumAggregateInputType
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    phone: string
    username: string
    password: string
    status: string
    address: string | null
    name: string | null
    profileImage: string | null
    points: number
    email: string
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    username?: boolean
    password?: boolean
    status?: boolean
    address?: boolean
    name?: boolean
    profileImage?: boolean
    points?: boolean
    email?: boolean
    sales?: boolean | Member$salesArgs<ExtArgs>
    Orders?: boolean | Member$OrdersArgs<ExtArgs>
    Review?: boolean | Member$ReviewArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>



  export type MemberSelectScalar = {
    id?: boolean
    phone?: boolean
    username?: boolean
    password?: boolean
    status?: boolean
    address?: boolean
    name?: boolean
    profileImage?: boolean
    points?: boolean
    email?: boolean
  }

  export type MemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "username" | "password" | "status" | "address" | "name" | "profileImage" | "points" | "email", ExtArgs["result"]["member"]>
  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | Member$salesArgs<ExtArgs>
    Orders?: boolean | Member$OrdersArgs<ExtArgs>
    Review?: boolean | Member$ReviewArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
      Orders: Prisma.$OrderPayload<ExtArgs>[]
      Review: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      username: string
      password: string
      status: string
      address: string | null
      name: string | null
      profileImage: string | null
      points: number
      email: string
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * @param {MemberFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const member = await prisma.member.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MemberFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Member.
     * @param {MemberAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const member = await prisma.member.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MemberAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends Member$salesArgs<ExtArgs> = {}>(args?: Subset<T, Member$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Orders<T extends Member$OrdersArgs<ExtArgs> = {}>(args?: Subset<T, Member$OrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Review<T extends Member$ReviewArgs<ExtArgs> = {}>(args?: Subset<T, Member$ReviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly phone: FieldRef<"Member", 'String'>
    readonly username: FieldRef<"Member", 'String'>
    readonly password: FieldRef<"Member", 'String'>
    readonly status: FieldRef<"Member", 'String'>
    readonly address: FieldRef<"Member", 'String'>
    readonly name: FieldRef<"Member", 'String'>
    readonly profileImage: FieldRef<"Member", 'String'>
    readonly points: FieldRef<"Member", 'Int'>
    readonly email: FieldRef<"Member", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to delete.
     */
    limit?: number
  }

  /**
   * Member findRaw
   */
  export type MemberFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Member aggregateRaw
   */
  export type MemberAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Member.sales
   */
  export type Member$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Member.Orders
   */
  export type Member$OrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Member.Review
   */
  export type Member$ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model Cart
   */

  export type AggregateCart = {
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  export type CartAvgAggregateOutputType = {
    qty: number | null
  }

  export type CartSumAggregateOutputType = {
    qty: number | null
  }

  export type CartMinAggregateOutputType = {
    id: string | null
    bookId: string | null
    memberId: string | null
    qty: number | null
  }

  export type CartMaxAggregateOutputType = {
    id: string | null
    bookId: string | null
    memberId: string | null
    qty: number | null
  }

  export type CartCountAggregateOutputType = {
    id: number
    bookId: number
    memberId: number
    qty: number
    _all: number
  }


  export type CartAvgAggregateInputType = {
    qty?: true
  }

  export type CartSumAggregateInputType = {
    qty?: true
  }

  export type CartMinAggregateInputType = {
    id?: true
    bookId?: true
    memberId?: true
    qty?: true
  }

  export type CartMaxAggregateInputType = {
    id?: true
    bookId?: true
    memberId?: true
    qty?: true
  }

  export type CartCountAggregateInputType = {
    id?: true
    bookId?: true
    memberId?: true
    qty?: true
    _all?: true
  }

  export type CartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cart to aggregate.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carts
    **/
    _count?: true | CartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartMaxAggregateInputType
  }

  export type GetCartAggregateType<T extends CartAggregateArgs> = {
        [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCart[P]>
      : GetScalarType<T[P], AggregateCart[P]>
  }




  export type CartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
    orderBy?: CartOrderByWithAggregationInput | CartOrderByWithAggregationInput[]
    by: CartScalarFieldEnum[] | CartScalarFieldEnum
    having?: CartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartCountAggregateInputType | true
    _avg?: CartAvgAggregateInputType
    _sum?: CartSumAggregateInputType
    _min?: CartMinAggregateInputType
    _max?: CartMaxAggregateInputType
  }

  export type CartGroupByOutputType = {
    id: string
    bookId: string
    memberId: string
    qty: number
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartGroupByOutputType[P]>
            : GetScalarType<T[P], CartGroupByOutputType[P]>
        }
      >
    >


  export type CartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    memberId?: boolean
    qty?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>



  export type CartSelectScalar = {
    id?: boolean
    bookId?: boolean
    memberId?: boolean
    qty?: boolean
  }

  export type CartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookId" | "memberId" | "qty", ExtArgs["result"]["cart"]>
  export type CartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $CartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cart"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookId: string
      memberId: string
      qty: number
    }, ExtArgs["result"]["cart"]>
    composites: {}
  }

  type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = $Result.GetResult<Prisma.$CartPayload, S>

  type CartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartCountAggregateInputType | true
    }

  export interface CartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cart'], meta: { name: 'Cart' } }
    /**
     * Find zero or one Cart that matches the filter.
     * @param {CartFindUniqueArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartFindUniqueArgs>(args: SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartFindUniqueOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartFindFirstArgs>(args?: SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carts
     * const carts = await prisma.cart.findMany()
     * 
     * // Get first 10 Carts
     * const carts = await prisma.cart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartFindManyArgs>(args?: SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cart.
     * @param {CartCreateArgs} args - Arguments to create a Cart.
     * @example
     * // Create one Cart
     * const Cart = await prisma.cart.create({
     *   data: {
     *     // ... data to create a Cart
     *   }
     * })
     * 
     */
    create<T extends CartCreateArgs>(args: SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carts.
     * @param {CartCreateManyArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartCreateManyArgs>(args?: SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cart.
     * @param {CartDeleteArgs} args - Arguments to delete one Cart.
     * @example
     * // Delete one Cart
     * const Cart = await prisma.cart.delete({
     *   where: {
     *     // ... filter to delete one Cart
     *   }
     * })
     * 
     */
    delete<T extends CartDeleteArgs>(args: SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cart.
     * @param {CartUpdateArgs} args - Arguments to update one Cart.
     * @example
     * // Update one Cart
     * const cart = await prisma.cart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartUpdateArgs>(args: SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carts.
     * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
     * @example
     * // Delete a few Carts
     * const { count } = await prisma.cart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartDeleteManyArgs>(args?: SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartUpdateManyArgs>(args: SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cart.
     * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
     * @example
     * // Update or create a Cart
     * const cart = await prisma.cart.upsert({
     *   create: {
     *     // ... data to create a Cart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cart we want to update
     *   }
     * })
     */
    upsert<T extends CartUpsertArgs>(args: SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carts that matches the filter.
     * @param {CartFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const cart = await prisma.cart.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CartFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Cart.
     * @param {CartAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const cart = await prisma.cart.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CartAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartCountArgs} args - Arguments to filter Carts to count.
     * @example
     * // Count the number of Carts
     * const count = await prisma.cart.count({
     *   where: {
     *     // ... the filter for the Carts we want to count
     *   }
     * })
    **/
    count<T extends CartCountArgs>(
      args?: Subset<T, CartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartAggregateArgs>(args: Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>

    /**
     * Group by Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartGroupByArgs['orderBy'] }
        : { orderBy?: CartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cart model
   */
  readonly fields: CartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cart model
   */
  interface CartFieldRefs {
    readonly id: FieldRef<"Cart", 'String'>
    readonly bookId: FieldRef<"Cart", 'String'>
    readonly memberId: FieldRef<"Cart", 'String'>
    readonly qty: FieldRef<"Cart", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Cart findUnique
   */
  export type CartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findUniqueOrThrow
   */
  export type CartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findFirst
   */
  export type CartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findFirstOrThrow
   */
  export type CartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findMany
   */
  export type CartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Carts to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart create
   */
  export type CartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to create a Cart.
     */
    data: XOR<CartCreateInput, CartUncheckedCreateInput>
  }

  /**
   * Cart createMany
   */
  export type CartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
  }

  /**
   * Cart update
   */
  export type CartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to update a Cart.
     */
    data: XOR<CartUpdateInput, CartUncheckedUpdateInput>
    /**
     * Choose, which Cart to update.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart updateMany
   */
  export type CartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to update.
     */
    limit?: number
  }

  /**
   * Cart upsert
   */
  export type CartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The filter to search for the Cart to update in case it exists.
     */
    where: CartWhereUniqueInput
    /**
     * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
     */
    create: XOR<CartCreateInput, CartUncheckedCreateInput>
    /**
     * In case the Cart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartUpdateInput, CartUncheckedUpdateInput>
  }

  /**
   * Cart delete
   */
  export type CartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter which Cart to delete.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart deleteMany
   */
  export type CartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carts to delete
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to delete.
     */
    limit?: number
  }

  /**
   * Cart findRaw
   */
  export type CartFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Cart aggregateRaw
   */
  export type CartAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Cart without action
   */
  export type CartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    total: number | null
  }

  export type OrderSumAggregateOutputType = {
    total: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    createdAt: Date | null
    slipImage: string | null
    status: string | null
    trackCode: string | null
    express: string | null
    remark: string | null
    customerName: string | null
    customerAddress: string | null
    customerPhone: string | null
    total: number | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    createdAt: Date | null
    slipImage: string | null
    status: string | null
    trackCode: string | null
    express: string | null
    remark: string | null
    customerName: string | null
    customerAddress: string | null
    customerPhone: string | null
    total: number | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    memberId: number
    createdAt: number
    slipImage: number
    status: number
    trackCode: number
    express: number
    remark: number
    customerName: number
    customerAddress: number
    customerPhone: number
    total: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    total?: true
  }

  export type OrderSumAggregateInputType = {
    total?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    memberId?: true
    createdAt?: true
    slipImage?: true
    status?: true
    trackCode?: true
    express?: true
    remark?: true
    customerName?: true
    customerAddress?: true
    customerPhone?: true
    total?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    memberId?: true
    createdAt?: true
    slipImage?: true
    status?: true
    trackCode?: true
    express?: true
    remark?: true
    customerName?: true
    customerAddress?: true
    customerPhone?: true
    total?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    memberId?: true
    createdAt?: true
    slipImage?: true
    status?: true
    trackCode?: true
    express?: true
    remark?: true
    customerName?: true
    customerAddress?: true
    customerPhone?: true
    total?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    memberId: string
    createdAt: Date
    slipImage: string
    status: string
    trackCode: string
    express: string
    remark: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total: number
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    createdAt?: boolean
    slipImage?: boolean
    status?: boolean
    trackCode?: boolean
    express?: boolean
    remark?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerPhone?: boolean
    total?: boolean
    Member?: boolean | MemberDefaultArgs<ExtArgs>
    OrderDetail?: boolean | Order$OrderDetailArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    memberId?: boolean
    createdAt?: boolean
    slipImage?: boolean
    status?: boolean
    trackCode?: boolean
    express?: boolean
    remark?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerPhone?: boolean
    total?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "createdAt" | "slipImage" | "status" | "trackCode" | "express" | "remark" | "customerName" | "customerAddress" | "customerPhone" | "total", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Member?: boolean | MemberDefaultArgs<ExtArgs>
    OrderDetail?: boolean | Order$OrderDetailArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      Member: Prisma.$MemberPayload<ExtArgs>
      OrderDetail: Prisma.$OrderDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      createdAt: Date
      slipImage: string
      status: string
      trackCode: string
      express: string
      remark: string
      customerName: string
      customerAddress: string
      customerPhone: string
      total: number
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * @param {OrderFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const order = await prisma.order.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OrderFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Order.
     * @param {OrderAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const order = await prisma.order.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrderAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    OrderDetail<T extends Order$OrderDetailArgs<ExtArgs> = {}>(args?: Subset<T, Order$OrderDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly memberId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly slipImage: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly trackCode: FieldRef<"Order", 'String'>
    readonly express: FieldRef<"Order", 'String'>
    readonly remark: FieldRef<"Order", 'String'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerAddress: FieldRef<"Order", 'String'>
    readonly customerPhone: FieldRef<"Order", 'String'>
    readonly total: FieldRef<"Order", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order findRaw
   */
  export type OrderFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Order aggregateRaw
   */
  export type OrderAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Order.OrderDetail
   */
  export type Order$OrderDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    where?: OrderDetailWhereInput
    orderBy?: OrderDetailOrderByWithRelationInput | OrderDetailOrderByWithRelationInput[]
    cursor?: OrderDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderDetailScalarFieldEnum | OrderDetailScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderDetail
   */

  export type AggregateOrderDetail = {
    _count: OrderDetailCountAggregateOutputType | null
    _avg: OrderDetailAvgAggregateOutputType | null
    _sum: OrderDetailSumAggregateOutputType | null
    _min: OrderDetailMinAggregateOutputType | null
    _max: OrderDetailMaxAggregateOutputType | null
  }

  export type OrderDetailAvgAggregateOutputType = {
    price: number | null
    qty: number | null
  }

  export type OrderDetailSumAggregateOutputType = {
    price: number | null
    qty: number | null
  }

  export type OrderDetailMinAggregateOutputType = {
    id: string | null
    bookId: string | null
    price: number | null
    qty: number | null
    orderId: string | null
  }

  export type OrderDetailMaxAggregateOutputType = {
    id: string | null
    bookId: string | null
    price: number | null
    qty: number | null
    orderId: string | null
  }

  export type OrderDetailCountAggregateOutputType = {
    id: number
    bookId: number
    price: number
    qty: number
    orderId: number
    _all: number
  }


  export type OrderDetailAvgAggregateInputType = {
    price?: true
    qty?: true
  }

  export type OrderDetailSumAggregateInputType = {
    price?: true
    qty?: true
  }

  export type OrderDetailMinAggregateInputType = {
    id?: true
    bookId?: true
    price?: true
    qty?: true
    orderId?: true
  }

  export type OrderDetailMaxAggregateInputType = {
    id?: true
    bookId?: true
    price?: true
    qty?: true
    orderId?: true
  }

  export type OrderDetailCountAggregateInputType = {
    id?: true
    bookId?: true
    price?: true
    qty?: true
    orderId?: true
    _all?: true
  }

  export type OrderDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderDetail to aggregate.
     */
    where?: OrderDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderDetails to fetch.
     */
    orderBy?: OrderDetailOrderByWithRelationInput | OrderDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderDetails
    **/
    _count?: true | OrderDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderDetailMaxAggregateInputType
  }

  export type GetOrderDetailAggregateType<T extends OrderDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderDetail[P]>
      : GetScalarType<T[P], AggregateOrderDetail[P]>
  }




  export type OrderDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderDetailWhereInput
    orderBy?: OrderDetailOrderByWithAggregationInput | OrderDetailOrderByWithAggregationInput[]
    by: OrderDetailScalarFieldEnum[] | OrderDetailScalarFieldEnum
    having?: OrderDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderDetailCountAggregateInputType | true
    _avg?: OrderDetailAvgAggregateInputType
    _sum?: OrderDetailSumAggregateInputType
    _min?: OrderDetailMinAggregateInputType
    _max?: OrderDetailMaxAggregateInputType
  }

  export type OrderDetailGroupByOutputType = {
    id: string
    bookId: string
    price: number
    qty: number
    orderId: string
    _count: OrderDetailCountAggregateOutputType | null
    _avg: OrderDetailAvgAggregateOutputType | null
    _sum: OrderDetailSumAggregateOutputType | null
    _min: OrderDetailMinAggregateOutputType | null
    _max: OrderDetailMaxAggregateOutputType | null
  }

  type GetOrderDetailGroupByPayload<T extends OrderDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderDetailGroupByOutputType[P]>
            : GetScalarType<T[P], OrderDetailGroupByOutputType[P]>
        }
      >
    >


  export type OrderDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    price?: boolean
    qty?: boolean
    orderId?: boolean
    Book?: boolean | BookDefaultArgs<ExtArgs>
    Order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderDetail"]>



  export type OrderDetailSelectScalar = {
    id?: boolean
    bookId?: boolean
    price?: boolean
    qty?: boolean
    orderId?: boolean
  }

  export type OrderDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookId" | "price" | "qty" | "orderId", ExtArgs["result"]["orderDetail"]>
  export type OrderDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Book?: boolean | BookDefaultArgs<ExtArgs>
    Order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderDetail"
    objects: {
      Book: Prisma.$BookPayload<ExtArgs>
      Order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookId: string
      price: number
      qty: number
      orderId: string
    }, ExtArgs["result"]["orderDetail"]>
    composites: {}
  }

  type OrderDetailGetPayload<S extends boolean | null | undefined | OrderDetailDefaultArgs> = $Result.GetResult<Prisma.$OrderDetailPayload, S>

  type OrderDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderDetailCountAggregateInputType | true
    }

  export interface OrderDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderDetail'], meta: { name: 'OrderDetail' } }
    /**
     * Find zero or one OrderDetail that matches the filter.
     * @param {OrderDetailFindUniqueArgs} args - Arguments to find a OrderDetail
     * @example
     * // Get one OrderDetail
     * const orderDetail = await prisma.orderDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderDetailFindUniqueArgs>(args: SelectSubset<T, OrderDetailFindUniqueArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderDetailFindUniqueOrThrowArgs} args - Arguments to find a OrderDetail
     * @example
     * // Get one OrderDetail
     * const orderDetail = await prisma.orderDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailFindFirstArgs} args - Arguments to find a OrderDetail
     * @example
     * // Get one OrderDetail
     * const orderDetail = await prisma.orderDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderDetailFindFirstArgs>(args?: SelectSubset<T, OrderDetailFindFirstArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailFindFirstOrThrowArgs} args - Arguments to find a OrderDetail
     * @example
     * // Get one OrderDetail
     * const orderDetail = await prisma.orderDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderDetails
     * const orderDetails = await prisma.orderDetail.findMany()
     * 
     * // Get first 10 OrderDetails
     * const orderDetails = await prisma.orderDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderDetailWithIdOnly = await prisma.orderDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderDetailFindManyArgs>(args?: SelectSubset<T, OrderDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderDetail.
     * @param {OrderDetailCreateArgs} args - Arguments to create a OrderDetail.
     * @example
     * // Create one OrderDetail
     * const OrderDetail = await prisma.orderDetail.create({
     *   data: {
     *     // ... data to create a OrderDetail
     *   }
     * })
     * 
     */
    create<T extends OrderDetailCreateArgs>(args: SelectSubset<T, OrderDetailCreateArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderDetails.
     * @param {OrderDetailCreateManyArgs} args - Arguments to create many OrderDetails.
     * @example
     * // Create many OrderDetails
     * const orderDetail = await prisma.orderDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderDetailCreateManyArgs>(args?: SelectSubset<T, OrderDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderDetail.
     * @param {OrderDetailDeleteArgs} args - Arguments to delete one OrderDetail.
     * @example
     * // Delete one OrderDetail
     * const OrderDetail = await prisma.orderDetail.delete({
     *   where: {
     *     // ... filter to delete one OrderDetail
     *   }
     * })
     * 
     */
    delete<T extends OrderDetailDeleteArgs>(args: SelectSubset<T, OrderDetailDeleteArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderDetail.
     * @param {OrderDetailUpdateArgs} args - Arguments to update one OrderDetail.
     * @example
     * // Update one OrderDetail
     * const orderDetail = await prisma.orderDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderDetailUpdateArgs>(args: SelectSubset<T, OrderDetailUpdateArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderDetails.
     * @param {OrderDetailDeleteManyArgs} args - Arguments to filter OrderDetails to delete.
     * @example
     * // Delete a few OrderDetails
     * const { count } = await prisma.orderDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDetailDeleteManyArgs>(args?: SelectSubset<T, OrderDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderDetails
     * const orderDetail = await prisma.orderDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderDetailUpdateManyArgs>(args: SelectSubset<T, OrderDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderDetail.
     * @param {OrderDetailUpsertArgs} args - Arguments to update or create a OrderDetail.
     * @example
     * // Update or create a OrderDetail
     * const orderDetail = await prisma.orderDetail.upsert({
     *   create: {
     *     // ... data to create a OrderDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderDetail we want to update
     *   }
     * })
     */
    upsert<T extends OrderDetailUpsertArgs>(args: SelectSubset<T, OrderDetailUpsertArgs<ExtArgs>>): Prisma__OrderDetailClient<$Result.GetResult<Prisma.$OrderDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderDetails that matches the filter.
     * @param {OrderDetailFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const orderDetail = await prisma.orderDetail.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OrderDetailFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OrderDetail.
     * @param {OrderDetailAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const orderDetail = await prisma.orderDetail.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrderDetailAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OrderDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailCountArgs} args - Arguments to filter OrderDetails to count.
     * @example
     * // Count the number of OrderDetails
     * const count = await prisma.orderDetail.count({
     *   where: {
     *     // ... the filter for the OrderDetails we want to count
     *   }
     * })
    **/
    count<T extends OrderDetailCountArgs>(
      args?: Subset<T, OrderDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderDetailAggregateArgs>(args: Subset<T, OrderDetailAggregateArgs>): Prisma.PrismaPromise<GetOrderDetailAggregateType<T>>

    /**
     * Group by OrderDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderDetailGroupByArgs['orderBy'] }
        : { orderBy?: OrderDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderDetail model
   */
  readonly fields: OrderDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderDetail model
   */
  interface OrderDetailFieldRefs {
    readonly id: FieldRef<"OrderDetail", 'String'>
    readonly bookId: FieldRef<"OrderDetail", 'String'>
    readonly price: FieldRef<"OrderDetail", 'Int'>
    readonly qty: FieldRef<"OrderDetail", 'Int'>
    readonly orderId: FieldRef<"OrderDetail", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderDetail findUnique
   */
  export type OrderDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * Filter, which OrderDetail to fetch.
     */
    where: OrderDetailWhereUniqueInput
  }

  /**
   * OrderDetail findUniqueOrThrow
   */
  export type OrderDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * Filter, which OrderDetail to fetch.
     */
    where: OrderDetailWhereUniqueInput
  }

  /**
   * OrderDetail findFirst
   */
  export type OrderDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * Filter, which OrderDetail to fetch.
     */
    where?: OrderDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderDetails to fetch.
     */
    orderBy?: OrderDetailOrderByWithRelationInput | OrderDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderDetails.
     */
    cursor?: OrderDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderDetails.
     */
    distinct?: OrderDetailScalarFieldEnum | OrderDetailScalarFieldEnum[]
  }

  /**
   * OrderDetail findFirstOrThrow
   */
  export type OrderDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * Filter, which OrderDetail to fetch.
     */
    where?: OrderDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderDetails to fetch.
     */
    orderBy?: OrderDetailOrderByWithRelationInput | OrderDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderDetails.
     */
    cursor?: OrderDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderDetails.
     */
    distinct?: OrderDetailScalarFieldEnum | OrderDetailScalarFieldEnum[]
  }

  /**
   * OrderDetail findMany
   */
  export type OrderDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * Filter, which OrderDetails to fetch.
     */
    where?: OrderDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderDetails to fetch.
     */
    orderBy?: OrderDetailOrderByWithRelationInput | OrderDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderDetails.
     */
    cursor?: OrderDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderDetails.
     */
    skip?: number
    distinct?: OrderDetailScalarFieldEnum | OrderDetailScalarFieldEnum[]
  }

  /**
   * OrderDetail create
   */
  export type OrderDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderDetail.
     */
    data: XOR<OrderDetailCreateInput, OrderDetailUncheckedCreateInput>
  }

  /**
   * OrderDetail createMany
   */
  export type OrderDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderDetails.
     */
    data: OrderDetailCreateManyInput | OrderDetailCreateManyInput[]
  }

  /**
   * OrderDetail update
   */
  export type OrderDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderDetail.
     */
    data: XOR<OrderDetailUpdateInput, OrderDetailUncheckedUpdateInput>
    /**
     * Choose, which OrderDetail to update.
     */
    where: OrderDetailWhereUniqueInput
  }

  /**
   * OrderDetail updateMany
   */
  export type OrderDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderDetails.
     */
    data: XOR<OrderDetailUpdateManyMutationInput, OrderDetailUncheckedUpdateManyInput>
    /**
     * Filter which OrderDetails to update
     */
    where?: OrderDetailWhereInput
    /**
     * Limit how many OrderDetails to update.
     */
    limit?: number
  }

  /**
   * OrderDetail upsert
   */
  export type OrderDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderDetail to update in case it exists.
     */
    where: OrderDetailWhereUniqueInput
    /**
     * In case the OrderDetail found by the `where` argument doesn't exist, create a new OrderDetail with this data.
     */
    create: XOR<OrderDetailCreateInput, OrderDetailUncheckedCreateInput>
    /**
     * In case the OrderDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderDetailUpdateInput, OrderDetailUncheckedUpdateInput>
  }

  /**
   * OrderDetail delete
   */
  export type OrderDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
    /**
     * Filter which OrderDetail to delete.
     */
    where: OrderDetailWhereUniqueInput
  }

  /**
   * OrderDetail deleteMany
   */
  export type OrderDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderDetails to delete
     */
    where?: OrderDetailWhereInput
    /**
     * Limit how many OrderDetails to delete.
     */
    limit?: number
  }

  /**
   * OrderDetail findRaw
   */
  export type OrderDetailFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrderDetail aggregateRaw
   */
  export type OrderDetailAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrderDetail without action
   */
  export type OrderDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDetail
     */
    select?: OrderDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderDetail
     */
    omit?: OrderDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderDetailInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    total: number | null
    cashPaid: number | null
    change: number | null
    pointUsed: number | null
  }

  export type SaleSumAggregateOutputType = {
    total: number | null
    cashPaid: number | null
    change: number | null
    pointUsed: number | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    total: number | null
    cashPaid: number | null
    change: number | null
    pointUsed: number | null
    paymentMethod: string | null
    remark: string | null
    adminId: string | null
    memberId: string | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    total: number | null
    cashPaid: number | null
    change: number | null
    pointUsed: number | null
    paymentMethod: string | null
    remark: string | null
    adminId: string | null
    memberId: string | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    createdAt: number
    total: number
    cashPaid: number
    change: number
    pointUsed: number
    paymentMethod: number
    remark: number
    adminId: number
    memberId: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    total?: true
    cashPaid?: true
    change?: true
    pointUsed?: true
  }

  export type SaleSumAggregateInputType = {
    total?: true
    cashPaid?: true
    change?: true
    pointUsed?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    createdAt?: true
    total?: true
    cashPaid?: true
    change?: true
    pointUsed?: true
    paymentMethod?: true
    remark?: true
    adminId?: true
    memberId?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    createdAt?: true
    total?: true
    cashPaid?: true
    change?: true
    pointUsed?: true
    paymentMethod?: true
    remark?: true
    adminId?: true
    memberId?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    createdAt?: true
    total?: true
    cashPaid?: true
    change?: true
    pointUsed?: true
    paymentMethod?: true
    remark?: true
    adminId?: true
    memberId?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    createdAt: Date
    total: number
    cashPaid: number
    change: number
    pointUsed: number
    paymentMethod: string
    remark: string | null
    adminId: string
    memberId: string | null
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    total?: boolean
    cashPaid?: boolean
    change?: boolean
    pointUsed?: boolean
    paymentMethod?: boolean
    remark?: boolean
    adminId?: boolean
    memberId?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    member?: boolean | Sale$memberArgs<ExtArgs>
    details?: boolean | Sale$detailsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>



  export type SaleSelectScalar = {
    id?: boolean
    createdAt?: boolean
    total?: boolean
    cashPaid?: boolean
    change?: boolean
    pointUsed?: boolean
    paymentMethod?: boolean
    remark?: boolean
    adminId?: boolean
    memberId?: boolean
  }

  export type SaleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "total" | "cashPaid" | "change" | "pointUsed" | "paymentMethod" | "remark" | "adminId" | "memberId", ExtArgs["result"]["sale"]>
  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    member?: boolean | Sale$memberArgs<ExtArgs>
    details?: boolean | Sale$detailsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs>
      member: Prisma.$MemberPayload<ExtArgs> | null
      details: Prisma.$SaleDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      total: number
      cashPaid: number
      change: number
      pointUsed: number
      paymentMethod: string
      remark: string | null
      adminId: string
      memberId: string | null
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * @param {SaleFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const sale = await prisma.sale.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SaleFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Sale.
     * @param {SaleAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const sale = await prisma.sale.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SaleAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    member<T extends Sale$memberArgs<ExtArgs> = {}>(args?: Subset<T, Sale$memberArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    details<T extends Sale$detailsArgs<ExtArgs> = {}>(args?: Subset<T, Sale$detailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
    readonly total: FieldRef<"Sale", 'Int'>
    readonly cashPaid: FieldRef<"Sale", 'Float'>
    readonly change: FieldRef<"Sale", 'Float'>
    readonly pointUsed: FieldRef<"Sale", 'Int'>
    readonly paymentMethod: FieldRef<"Sale", 'String'>
    readonly remark: FieldRef<"Sale", 'String'>
    readonly adminId: FieldRef<"Sale", 'String'>
    readonly memberId: FieldRef<"Sale", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to delete.
     */
    limit?: number
  }

  /**
   * Sale findRaw
   */
  export type SaleFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Sale aggregateRaw
   */
  export type SaleAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Sale.member
   */
  export type Sale$memberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    where?: MemberWhereInput
  }

  /**
   * Sale.details
   */
  export type Sale$detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model SaleDetail
   */

  export type AggregateSaleDetail = {
    _count: SaleDetailCountAggregateOutputType | null
    _avg: SaleDetailAvgAggregateOutputType | null
    _sum: SaleDetailSumAggregateOutputType | null
    _min: SaleDetailMinAggregateOutputType | null
    _max: SaleDetailMaxAggregateOutputType | null
  }

  export type SaleDetailAvgAggregateOutputType = {
    qty: number | null
    price: number | null
  }

  export type SaleDetailSumAggregateOutputType = {
    qty: number | null
    price: number | null
  }

  export type SaleDetailMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    bookId: string | null
    qty: number | null
    price: number | null
  }

  export type SaleDetailMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    bookId: string | null
    qty: number | null
    price: number | null
  }

  export type SaleDetailCountAggregateOutputType = {
    id: number
    saleId: number
    bookId: number
    qty: number
    price: number
    _all: number
  }


  export type SaleDetailAvgAggregateInputType = {
    qty?: true
    price?: true
  }

  export type SaleDetailSumAggregateInputType = {
    qty?: true
    price?: true
  }

  export type SaleDetailMinAggregateInputType = {
    id?: true
    saleId?: true
    bookId?: true
    qty?: true
    price?: true
  }

  export type SaleDetailMaxAggregateInputType = {
    id?: true
    saleId?: true
    bookId?: true
    qty?: true
    price?: true
  }

  export type SaleDetailCountAggregateInputType = {
    id?: true
    saleId?: true
    bookId?: true
    qty?: true
    price?: true
    _all?: true
  }

  export type SaleDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleDetail to aggregate.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SaleDetails
    **/
    _count?: true | SaleDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleDetailMaxAggregateInputType
  }

  export type GetSaleDetailAggregateType<T extends SaleDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateSaleDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaleDetail[P]>
      : GetScalarType<T[P], AggregateSaleDetail[P]>
  }




  export type SaleDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithAggregationInput | SaleDetailOrderByWithAggregationInput[]
    by: SaleDetailScalarFieldEnum[] | SaleDetailScalarFieldEnum
    having?: SaleDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleDetailCountAggregateInputType | true
    _avg?: SaleDetailAvgAggregateInputType
    _sum?: SaleDetailSumAggregateInputType
    _min?: SaleDetailMinAggregateInputType
    _max?: SaleDetailMaxAggregateInputType
  }

  export type SaleDetailGroupByOutputType = {
    id: string
    saleId: string
    bookId: string
    qty: number
    price: number
    _count: SaleDetailCountAggregateOutputType | null
    _avg: SaleDetailAvgAggregateOutputType | null
    _sum: SaleDetailSumAggregateOutputType | null
    _min: SaleDetailMinAggregateOutputType | null
    _max: SaleDetailMaxAggregateOutputType | null
  }

  type GetSaleDetailGroupByPayload<T extends SaleDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleDetailGroupByOutputType[P]>
            : GetScalarType<T[P], SaleDetailGroupByOutputType[P]>
        }
      >
    >


  export type SaleDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    bookId?: boolean
    qty?: boolean
    price?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saleDetail"]>



  export type SaleDetailSelectScalar = {
    id?: boolean
    saleId?: boolean
    bookId?: boolean
    qty?: boolean
    price?: boolean
  }

  export type SaleDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "saleId" | "bookId" | "qty" | "price", ExtArgs["result"]["saleDetail"]>
  export type SaleDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $SaleDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SaleDetail"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
      book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      bookId: string
      qty: number
      price: number
    }, ExtArgs["result"]["saleDetail"]>
    composites: {}
  }

  type SaleDetailGetPayload<S extends boolean | null | undefined | SaleDetailDefaultArgs> = $Result.GetResult<Prisma.$SaleDetailPayload, S>

  type SaleDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleDetailCountAggregateInputType | true
    }

  export interface SaleDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SaleDetail'], meta: { name: 'SaleDetail' } }
    /**
     * Find zero or one SaleDetail that matches the filter.
     * @param {SaleDetailFindUniqueArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleDetailFindUniqueArgs>(args: SelectSubset<T, SaleDetailFindUniqueArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SaleDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleDetailFindUniqueOrThrowArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SaleDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailFindFirstArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleDetailFindFirstArgs>(args?: SelectSubset<T, SaleDetailFindFirstArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SaleDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailFindFirstOrThrowArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SaleDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleDetails
     * const saleDetails = await prisma.saleDetail.findMany()
     * 
     * // Get first 10 SaleDetails
     * const saleDetails = await prisma.saleDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleDetailWithIdOnly = await prisma.saleDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleDetailFindManyArgs>(args?: SelectSubset<T, SaleDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SaleDetail.
     * @param {SaleDetailCreateArgs} args - Arguments to create a SaleDetail.
     * @example
     * // Create one SaleDetail
     * const SaleDetail = await prisma.saleDetail.create({
     *   data: {
     *     // ... data to create a SaleDetail
     *   }
     * })
     * 
     */
    create<T extends SaleDetailCreateArgs>(args: SelectSubset<T, SaleDetailCreateArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SaleDetails.
     * @param {SaleDetailCreateManyArgs} args - Arguments to create many SaleDetails.
     * @example
     * // Create many SaleDetails
     * const saleDetail = await prisma.saleDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleDetailCreateManyArgs>(args?: SelectSubset<T, SaleDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SaleDetail.
     * @param {SaleDetailDeleteArgs} args - Arguments to delete one SaleDetail.
     * @example
     * // Delete one SaleDetail
     * const SaleDetail = await prisma.saleDetail.delete({
     *   where: {
     *     // ... filter to delete one SaleDetail
     *   }
     * })
     * 
     */
    delete<T extends SaleDetailDeleteArgs>(args: SelectSubset<T, SaleDetailDeleteArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SaleDetail.
     * @param {SaleDetailUpdateArgs} args - Arguments to update one SaleDetail.
     * @example
     * // Update one SaleDetail
     * const saleDetail = await prisma.saleDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleDetailUpdateArgs>(args: SelectSubset<T, SaleDetailUpdateArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SaleDetails.
     * @param {SaleDetailDeleteManyArgs} args - Arguments to filter SaleDetails to delete.
     * @example
     * // Delete a few SaleDetails
     * const { count } = await prisma.saleDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDetailDeleteManyArgs>(args?: SelectSubset<T, SaleDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleDetails
     * const saleDetail = await prisma.saleDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleDetailUpdateManyArgs>(args: SelectSubset<T, SaleDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SaleDetail.
     * @param {SaleDetailUpsertArgs} args - Arguments to update or create a SaleDetail.
     * @example
     * // Update or create a SaleDetail
     * const saleDetail = await prisma.saleDetail.upsert({
     *   create: {
     *     // ... data to create a SaleDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleDetail we want to update
     *   }
     * })
     */
    upsert<T extends SaleDetailUpsertArgs>(args: SelectSubset<T, SaleDetailUpsertArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SaleDetails that matches the filter.
     * @param {SaleDetailFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const saleDetail = await prisma.saleDetail.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SaleDetailFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SaleDetail.
     * @param {SaleDetailAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const saleDetail = await prisma.saleDetail.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SaleDetailAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SaleDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailCountArgs} args - Arguments to filter SaleDetails to count.
     * @example
     * // Count the number of SaleDetails
     * const count = await prisma.saleDetail.count({
     *   where: {
     *     // ... the filter for the SaleDetails we want to count
     *   }
     * })
    **/
    count<T extends SaleDetailCountArgs>(
      args?: Subset<T, SaleDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SaleDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleDetailAggregateArgs>(args: Subset<T, SaleDetailAggregateArgs>): Prisma.PrismaPromise<GetSaleDetailAggregateType<T>>

    /**
     * Group by SaleDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleDetailGroupByArgs['orderBy'] }
        : { orderBy?: SaleDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SaleDetail model
   */
  readonly fields: SaleDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SaleDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SaleDetail model
   */
  interface SaleDetailFieldRefs {
    readonly id: FieldRef<"SaleDetail", 'String'>
    readonly saleId: FieldRef<"SaleDetail", 'String'>
    readonly bookId: FieldRef<"SaleDetail", 'String'>
    readonly qty: FieldRef<"SaleDetail", 'Int'>
    readonly price: FieldRef<"SaleDetail", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SaleDetail findUnique
   */
  export type SaleDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail findUniqueOrThrow
   */
  export type SaleDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail findFirst
   */
  export type SaleDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleDetails.
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleDetails.
     */
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * SaleDetail findFirstOrThrow
   */
  export type SaleDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleDetails.
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleDetails.
     */
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * SaleDetail findMany
   */
  export type SaleDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetails to fetch.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SaleDetails.
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * SaleDetail create
   */
  export type SaleDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a SaleDetail.
     */
    data: XOR<SaleDetailCreateInput, SaleDetailUncheckedCreateInput>
  }

  /**
   * SaleDetail createMany
   */
  export type SaleDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleDetails.
     */
    data: SaleDetailCreateManyInput | SaleDetailCreateManyInput[]
  }

  /**
   * SaleDetail update
   */
  export type SaleDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a SaleDetail.
     */
    data: XOR<SaleDetailUpdateInput, SaleDetailUncheckedUpdateInput>
    /**
     * Choose, which SaleDetail to update.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail updateMany
   */
  export type SaleDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleDetails.
     */
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyInput>
    /**
     * Filter which SaleDetails to update
     */
    where?: SaleDetailWhereInput
    /**
     * Limit how many SaleDetails to update.
     */
    limit?: number
  }

  /**
   * SaleDetail upsert
   */
  export type SaleDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the SaleDetail to update in case it exists.
     */
    where: SaleDetailWhereUniqueInput
    /**
     * In case the SaleDetail found by the `where` argument doesn't exist, create a new SaleDetail with this data.
     */
    create: XOR<SaleDetailCreateInput, SaleDetailUncheckedCreateInput>
    /**
     * In case the SaleDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleDetailUpdateInput, SaleDetailUncheckedUpdateInput>
  }

  /**
   * SaleDetail delete
   */
  export type SaleDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter which SaleDetail to delete.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail deleteMany
   */
  export type SaleDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleDetails to delete
     */
    where?: SaleDetailWhereInput
    /**
     * Limit how many SaleDetails to delete.
     */
    limit?: number
  }

  /**
   * SaleDetail findRaw
   */
  export type SaleDetailFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SaleDetail aggregateRaw
   */
  export type SaleDetailAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SaleDetail without action
   */
  export type SaleDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    bookId: string | null
    memberId: string | null
    rating: number | null
    comment: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    bookId: string | null
    memberId: string | null
    rating: number | null
    comment: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    bookId: number
    memberId: number
    rating: number
    comment: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    bookId?: true
    memberId?: true
    rating?: true
    comment?: true
    updatedAt?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    bookId?: true
    memberId?: true
    rating?: true
    comment?: true
    updatedAt?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    bookId?: true
    memberId?: true
    rating?: true
    comment?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    bookId: string
    memberId: string
    rating: number
    comment: string | null
    updatedAt: Date
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    memberId?: boolean
    rating?: boolean
    comment?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>



  export type ReviewSelectScalar = {
    id?: boolean
    bookId?: boolean
    memberId?: boolean
    rating?: boolean
    comment?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookId" | "memberId" | "rating" | "comment" | "updatedAt" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
      member: Prisma.$MemberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookId: string
      memberId: string
      rating: number
      comment: string | null
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * @param {ReviewFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const review = await prisma.review.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ReviewFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Review.
     * @param {ReviewAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const review = await prisma.review.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ReviewAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly bookId: FieldRef<"Review", 'String'>
    readonly memberId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review findRaw
   */
  export type ReviewFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review aggregateRaw
   */
  export type ReviewAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const BookScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    description: 'description',
    isbn: 'isbn',
    createdAt: 'createdAt',
    image: 'image',
    category: 'category',
    qty: 'qty',
    status: 'status',
    averageRating: 'averageRating',
    reviewCount: 'reviewCount'
  };

  export type BookScalarFieldEnum = (typeof BookScalarFieldEnum)[keyof typeof BookScalarFieldEnum]


  export const ImportToStockScalarFieldEnum: {
    id: 'id',
    bookid: 'bookid',
    qty: 'qty',
    createdAt: 'createdAt',
    updateAt: 'updateAt'
  };

  export type ImportToStockScalarFieldEnum = (typeof ImportToStockScalarFieldEnum)[keyof typeof ImportToStockScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    username: 'username',
    password: 'password',
    level: 'level',
    status: 'status'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    username: 'username',
    password: 'password',
    status: 'status',
    address: 'address',
    name: 'name',
    profileImage: 'profileImage',
    points: 'points',
    email: 'email'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const CartScalarFieldEnum: {
    id: 'id',
    bookId: 'bookId',
    memberId: 'memberId',
    qty: 'qty'
  };

  export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    createdAt: 'createdAt',
    slipImage: 'slipImage',
    status: 'status',
    trackCode: 'trackCode',
    express: 'express',
    remark: 'remark',
    customerName: 'customerName',
    customerAddress: 'customerAddress',
    customerPhone: 'customerPhone',
    total: 'total'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderDetailScalarFieldEnum: {
    id: 'id',
    bookId: 'bookId',
    price: 'price',
    qty: 'qty',
    orderId: 'orderId'
  };

  export type OrderDetailScalarFieldEnum = (typeof OrderDetailScalarFieldEnum)[keyof typeof OrderDetailScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    total: 'total',
    cashPaid: 'cashPaid',
    change: 'change',
    pointUsed: 'pointUsed',
    paymentMethod: 'paymentMethod',
    remark: 'remark',
    adminId: 'adminId',
    memberId: 'memberId'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const SaleDetailScalarFieldEnum: {
    id: 'id',
    saleId: 'saleId',
    bookId: 'bookId',
    qty: 'qty',
    price: 'price'
  };

  export type SaleDetailScalarFieldEnum = (typeof SaleDetailScalarFieldEnum)[keyof typeof SaleDetailScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    bookId: 'bookId',
    memberId: 'memberId',
    rating: 'rating',
    comment: 'comment',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BookWhereInput = {
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    id?: StringFilter<"Book"> | string
    name?: StringFilter<"Book"> | string
    price?: IntFilter<"Book"> | number
    description?: StringNullableFilter<"Book"> | string | null
    isbn?: StringNullableFilter<"Book"> | string | null
    createdAt?: DateTimeNullableFilter<"Book"> | Date | string | null
    image?: StringNullableFilter<"Book"> | string | null
    category?: StringNullableFilter<"Book"> | string | null
    qty?: IntFilter<"Book"> | number
    status?: StringFilter<"Book"> | string
    averageRating?: FloatFilter<"Book"> | number
    reviewCount?: IntFilter<"Book"> | number
    carts?: CartListRelationFilter
    OrderDetails?: OrderDetailListRelationFilter
    ImportToStock?: ImportToStockListRelationFilter
    saleDetails?: SaleDetailListRelationFilter
    Review?: ReviewListRelationFilter
  }

  export type BookOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    isbn?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    category?: SortOrder
    qty?: SortOrder
    status?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
    carts?: CartOrderByRelationAggregateInput
    OrderDetails?: OrderDetailOrderByRelationAggregateInput
    ImportToStock?: ImportToStockOrderByRelationAggregateInput
    saleDetails?: SaleDetailOrderByRelationAggregateInput
    Review?: ReviewOrderByRelationAggregateInput
  }

  export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    isbn?: string
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    name?: StringFilter<"Book"> | string
    price?: IntFilter<"Book"> | number
    description?: StringNullableFilter<"Book"> | string | null
    createdAt?: DateTimeNullableFilter<"Book"> | Date | string | null
    image?: StringNullableFilter<"Book"> | string | null
    category?: StringNullableFilter<"Book"> | string | null
    qty?: IntFilter<"Book"> | number
    status?: StringFilter<"Book"> | string
    averageRating?: FloatFilter<"Book"> | number
    reviewCount?: IntFilter<"Book"> | number
    carts?: CartListRelationFilter
    OrderDetails?: OrderDetailListRelationFilter
    ImportToStock?: ImportToStockListRelationFilter
    saleDetails?: SaleDetailListRelationFilter
    Review?: ReviewListRelationFilter
  }, "id" | "isbn">

  export type BookOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    isbn?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    category?: SortOrder
    qty?: SortOrder
    status?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
    _count?: BookCountOrderByAggregateInput
    _avg?: BookAvgOrderByAggregateInput
    _max?: BookMaxOrderByAggregateInput
    _min?: BookMinOrderByAggregateInput
    _sum?: BookSumOrderByAggregateInput
  }

  export type BookScalarWhereWithAggregatesInput = {
    AND?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    OR?: BookScalarWhereWithAggregatesInput[]
    NOT?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Book"> | string
    name?: StringWithAggregatesFilter<"Book"> | string
    price?: IntWithAggregatesFilter<"Book"> | number
    description?: StringNullableWithAggregatesFilter<"Book"> | string | null
    isbn?: StringNullableWithAggregatesFilter<"Book"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Book"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"Book"> | string | null
    category?: StringNullableWithAggregatesFilter<"Book"> | string | null
    qty?: IntWithAggregatesFilter<"Book"> | number
    status?: StringWithAggregatesFilter<"Book"> | string
    averageRating?: FloatWithAggregatesFilter<"Book"> | number
    reviewCount?: IntWithAggregatesFilter<"Book"> | number
  }

  export type ImportToStockWhereInput = {
    AND?: ImportToStockWhereInput | ImportToStockWhereInput[]
    OR?: ImportToStockWhereInput[]
    NOT?: ImportToStockWhereInput | ImportToStockWhereInput[]
    id?: StringFilter<"ImportToStock"> | string
    bookid?: StringFilter<"ImportToStock"> | string
    qty?: IntFilter<"ImportToStock"> | number
    createdAt?: DateTimeNullableFilter<"ImportToStock"> | Date | string | null
    updateAt?: DateTimeNullableFilter<"ImportToStock"> | Date | string | null
    Book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type ImportToStockOrderByWithRelationInput = {
    id?: SortOrder
    bookid?: SortOrder
    qty?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    Book?: BookOrderByWithRelationInput
  }

  export type ImportToStockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImportToStockWhereInput | ImportToStockWhereInput[]
    OR?: ImportToStockWhereInput[]
    NOT?: ImportToStockWhereInput | ImportToStockWhereInput[]
    bookid?: StringFilter<"ImportToStock"> | string
    qty?: IntFilter<"ImportToStock"> | number
    createdAt?: DateTimeNullableFilter<"ImportToStock"> | Date | string | null
    updateAt?: DateTimeNullableFilter<"ImportToStock"> | Date | string | null
    Book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id">

  export type ImportToStockOrderByWithAggregationInput = {
    id?: SortOrder
    bookid?: SortOrder
    qty?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    _count?: ImportToStockCountOrderByAggregateInput
    _avg?: ImportToStockAvgOrderByAggregateInput
    _max?: ImportToStockMaxOrderByAggregateInput
    _min?: ImportToStockMinOrderByAggregateInput
    _sum?: ImportToStockSumOrderByAggregateInput
  }

  export type ImportToStockScalarWhereWithAggregatesInput = {
    AND?: ImportToStockScalarWhereWithAggregatesInput | ImportToStockScalarWhereWithAggregatesInput[]
    OR?: ImportToStockScalarWhereWithAggregatesInput[]
    NOT?: ImportToStockScalarWhereWithAggregatesInput | ImportToStockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImportToStock"> | string
    bookid?: StringWithAggregatesFilter<"ImportToStock"> | string
    qty?: IntWithAggregatesFilter<"ImportToStock"> | number
    createdAt?: DateTimeNullableWithAggregatesFilter<"ImportToStock"> | Date | string | null
    updateAt?: DateTimeNullableWithAggregatesFilter<"ImportToStock"> | Date | string | null
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    username?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    level?: StringFilter<"Admin"> | string
    status?: StringFilter<"Admin"> | string
    sales?: SaleListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    level?: SortOrder
    status?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    name?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    level?: StringFilter<"Admin"> | string
    status?: StringFilter<"Admin"> | string
    sales?: SaleListRelationFilter
  }, "id" | "username">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    level?: SortOrder
    status?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
    username?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    level?: StringWithAggregatesFilter<"Admin"> | string
    status?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    phone?: StringFilter<"Member"> | string
    username?: StringFilter<"Member"> | string
    password?: StringFilter<"Member"> | string
    status?: StringFilter<"Member"> | string
    address?: StringNullableFilter<"Member"> | string | null
    name?: StringNullableFilter<"Member"> | string | null
    profileImage?: StringNullableFilter<"Member"> | string | null
    points?: IntFilter<"Member"> | number
    email?: StringFilter<"Member"> | string
    sales?: SaleListRelationFilter
    Orders?: OrderListRelationFilter
    Review?: ReviewListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    address?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    points?: SortOrder
    email?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
    Orders?: OrderOrderByRelationAggregateInput
    Review?: ReviewOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    phone?: StringFilter<"Member"> | string
    password?: StringFilter<"Member"> | string
    status?: StringFilter<"Member"> | string
    address?: StringNullableFilter<"Member"> | string | null
    name?: StringNullableFilter<"Member"> | string | null
    profileImage?: StringNullableFilter<"Member"> | string | null
    points?: IntFilter<"Member"> | number
    sales?: SaleListRelationFilter
    Orders?: OrderListRelationFilter
    Review?: ReviewListRelationFilter
  }, "id" | "username" | "email">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    address?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    points?: SortOrder
    email?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _avg?: MemberAvgOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
    _sum?: MemberSumOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    phone?: StringWithAggregatesFilter<"Member"> | string
    username?: StringWithAggregatesFilter<"Member"> | string
    password?: StringWithAggregatesFilter<"Member"> | string
    status?: StringWithAggregatesFilter<"Member"> | string
    address?: StringNullableWithAggregatesFilter<"Member"> | string | null
    name?: StringNullableWithAggregatesFilter<"Member"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"Member"> | string | null
    points?: IntWithAggregatesFilter<"Member"> | number
    email?: StringWithAggregatesFilter<"Member"> | string
  }

  export type CartWhereInput = {
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    id?: StringFilter<"Cart"> | string
    bookId?: StringFilter<"Cart"> | string
    memberId?: StringFilter<"Cart"> | string
    qty?: IntFilter<"Cart"> | number
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type CartOrderByWithRelationInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    qty?: SortOrder
    book?: BookOrderByWithRelationInput
  }

  export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    bookId?: StringFilter<"Cart"> | string
    memberId?: StringFilter<"Cart"> | string
    qty?: IntFilter<"Cart"> | number
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id">

  export type CartOrderByWithAggregationInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    qty?: SortOrder
    _count?: CartCountOrderByAggregateInput
    _avg?: CartAvgOrderByAggregateInput
    _max?: CartMaxOrderByAggregateInput
    _min?: CartMinOrderByAggregateInput
    _sum?: CartSumOrderByAggregateInput
  }

  export type CartScalarWhereWithAggregatesInput = {
    AND?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    OR?: CartScalarWhereWithAggregatesInput[]
    NOT?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cart"> | string
    bookId?: StringWithAggregatesFilter<"Cart"> | string
    memberId?: StringWithAggregatesFilter<"Cart"> | string
    qty?: IntWithAggregatesFilter<"Cart"> | number
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    memberId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    slipImage?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    trackCode?: StringFilter<"Order"> | string
    express?: StringFilter<"Order"> | string
    remark?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerAddress?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    total?: IntFilter<"Order"> | number
    Member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    OrderDetail?: OrderDetailListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    slipImage?: SortOrder
    status?: SortOrder
    trackCode?: SortOrder
    express?: SortOrder
    remark?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerPhone?: SortOrder
    total?: SortOrder
    Member?: MemberOrderByWithRelationInput
    OrderDetail?: OrderDetailOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    memberId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    slipImage?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    trackCode?: StringFilter<"Order"> | string
    express?: StringFilter<"Order"> | string
    remark?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerAddress?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    total?: IntFilter<"Order"> | number
    Member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    OrderDetail?: OrderDetailListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    slipImage?: SortOrder
    status?: SortOrder
    trackCode?: SortOrder
    express?: SortOrder
    remark?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerPhone?: SortOrder
    total?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    memberId?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    slipImage?: StringWithAggregatesFilter<"Order"> | string
    status?: StringWithAggregatesFilter<"Order"> | string
    trackCode?: StringWithAggregatesFilter<"Order"> | string
    express?: StringWithAggregatesFilter<"Order"> | string
    remark?: StringWithAggregatesFilter<"Order"> | string
    customerName?: StringWithAggregatesFilter<"Order"> | string
    customerAddress?: StringWithAggregatesFilter<"Order"> | string
    customerPhone?: StringWithAggregatesFilter<"Order"> | string
    total?: IntWithAggregatesFilter<"Order"> | number
  }

  export type OrderDetailWhereInput = {
    AND?: OrderDetailWhereInput | OrderDetailWhereInput[]
    OR?: OrderDetailWhereInput[]
    NOT?: OrderDetailWhereInput | OrderDetailWhereInput[]
    id?: StringFilter<"OrderDetail"> | string
    bookId?: StringFilter<"OrderDetail"> | string
    price?: IntFilter<"OrderDetail"> | number
    qty?: IntFilter<"OrderDetail"> | number
    orderId?: StringFilter<"OrderDetail"> | string
    Book?: XOR<BookScalarRelationFilter, BookWhereInput>
    Order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderDetailOrderByWithRelationInput = {
    id?: SortOrder
    bookId?: SortOrder
    price?: SortOrder
    qty?: SortOrder
    orderId?: SortOrder
    Book?: BookOrderByWithRelationInput
    Order?: OrderOrderByWithRelationInput
  }

  export type OrderDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderDetailWhereInput | OrderDetailWhereInput[]
    OR?: OrderDetailWhereInput[]
    NOT?: OrderDetailWhereInput | OrderDetailWhereInput[]
    bookId?: StringFilter<"OrderDetail"> | string
    price?: IntFilter<"OrderDetail"> | number
    qty?: IntFilter<"OrderDetail"> | number
    orderId?: StringFilter<"OrderDetail"> | string
    Book?: XOR<BookScalarRelationFilter, BookWhereInput>
    Order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderDetailOrderByWithAggregationInput = {
    id?: SortOrder
    bookId?: SortOrder
    price?: SortOrder
    qty?: SortOrder
    orderId?: SortOrder
    _count?: OrderDetailCountOrderByAggregateInput
    _avg?: OrderDetailAvgOrderByAggregateInput
    _max?: OrderDetailMaxOrderByAggregateInput
    _min?: OrderDetailMinOrderByAggregateInput
    _sum?: OrderDetailSumOrderByAggregateInput
  }

  export type OrderDetailScalarWhereWithAggregatesInput = {
    AND?: OrderDetailScalarWhereWithAggregatesInput | OrderDetailScalarWhereWithAggregatesInput[]
    OR?: OrderDetailScalarWhereWithAggregatesInput[]
    NOT?: OrderDetailScalarWhereWithAggregatesInput | OrderDetailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderDetail"> | string
    bookId?: StringWithAggregatesFilter<"OrderDetail"> | string
    price?: IntWithAggregatesFilter<"OrderDetail"> | number
    qty?: IntWithAggregatesFilter<"OrderDetail"> | number
    orderId?: StringWithAggregatesFilter<"OrderDetail"> | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    total?: IntFilter<"Sale"> | number
    cashPaid?: FloatFilter<"Sale"> | number
    change?: FloatFilter<"Sale"> | number
    pointUsed?: IntFilter<"Sale"> | number
    paymentMethod?: StringFilter<"Sale"> | string
    remark?: StringNullableFilter<"Sale"> | string | null
    adminId?: StringFilter<"Sale"> | string
    memberId?: StringNullableFilter<"Sale"> | string | null
    admin?: XOR<AdminScalarRelationFilter, AdminWhereInput>
    member?: XOR<MemberNullableScalarRelationFilter, MemberWhereInput> | null
    details?: SaleDetailListRelationFilter
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
    paymentMethod?: SortOrder
    remark?: SortOrder
    adminId?: SortOrder
    memberId?: SortOrder
    admin?: AdminOrderByWithRelationInput
    member?: MemberOrderByWithRelationInput
    details?: SaleDetailOrderByRelationAggregateInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    total?: IntFilter<"Sale"> | number
    cashPaid?: FloatFilter<"Sale"> | number
    change?: FloatFilter<"Sale"> | number
    pointUsed?: IntFilter<"Sale"> | number
    paymentMethod?: StringFilter<"Sale"> | string
    remark?: StringNullableFilter<"Sale"> | string | null
    adminId?: StringFilter<"Sale"> | string
    memberId?: StringNullableFilter<"Sale"> | string | null
    admin?: XOR<AdminScalarRelationFilter, AdminWhereInput>
    member?: XOR<MemberNullableScalarRelationFilter, MemberWhereInput> | null
    details?: SaleDetailListRelationFilter
  }, "id">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
    paymentMethod?: SortOrder
    remark?: SortOrder
    adminId?: SortOrder
    memberId?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    total?: IntWithAggregatesFilter<"Sale"> | number
    cashPaid?: FloatWithAggregatesFilter<"Sale"> | number
    change?: FloatWithAggregatesFilter<"Sale"> | number
    pointUsed?: IntWithAggregatesFilter<"Sale"> | number
    paymentMethod?: StringWithAggregatesFilter<"Sale"> | string
    remark?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    adminId?: StringWithAggregatesFilter<"Sale"> | string
    memberId?: StringNullableWithAggregatesFilter<"Sale"> | string | null
  }

  export type SaleDetailWhereInput = {
    AND?: SaleDetailWhereInput | SaleDetailWhereInput[]
    OR?: SaleDetailWhereInput[]
    NOT?: SaleDetailWhereInput | SaleDetailWhereInput[]
    id?: StringFilter<"SaleDetail"> | string
    saleId?: StringFilter<"SaleDetail"> | string
    bookId?: StringFilter<"SaleDetail"> | string
    qty?: IntFilter<"SaleDetail"> | number
    price?: IntFilter<"SaleDetail"> | number
    sale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type SaleDetailOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    bookId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    sale?: SaleOrderByWithRelationInput
    book?: BookOrderByWithRelationInput
  }

  export type SaleDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleDetailWhereInput | SaleDetailWhereInput[]
    OR?: SaleDetailWhereInput[]
    NOT?: SaleDetailWhereInput | SaleDetailWhereInput[]
    saleId?: StringFilter<"SaleDetail"> | string
    bookId?: StringFilter<"SaleDetail"> | string
    qty?: IntFilter<"SaleDetail"> | number
    price?: IntFilter<"SaleDetail"> | number
    sale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id">

  export type SaleDetailOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    bookId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    _count?: SaleDetailCountOrderByAggregateInput
    _avg?: SaleDetailAvgOrderByAggregateInput
    _max?: SaleDetailMaxOrderByAggregateInput
    _min?: SaleDetailMinOrderByAggregateInput
    _sum?: SaleDetailSumOrderByAggregateInput
  }

  export type SaleDetailScalarWhereWithAggregatesInput = {
    AND?: SaleDetailScalarWhereWithAggregatesInput | SaleDetailScalarWhereWithAggregatesInput[]
    OR?: SaleDetailScalarWhereWithAggregatesInput[]
    NOT?: SaleDetailScalarWhereWithAggregatesInput | SaleDetailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SaleDetail"> | string
    saleId?: StringWithAggregatesFilter<"SaleDetail"> | string
    bookId?: StringWithAggregatesFilter<"SaleDetail"> | string
    qty?: IntWithAggregatesFilter<"SaleDetail"> | number
    price?: IntWithAggregatesFilter<"SaleDetail"> | number
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    bookId?: StringFilter<"Review"> | string
    memberId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    book?: BookOrderByWithRelationInput
    member?: MemberOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookId_memberId?: ReviewBookIdMemberIdCompoundUniqueInput
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    bookId?: StringFilter<"Review"> | string
    memberId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
  }, "id" | "bookId_memberId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    bookId?: StringWithAggregatesFilter<"Review"> | string
    memberId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type BookCreateInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailCreateNestedManyWithoutBookInput
    Review?: ReviewCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartUncheckedCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailUncheckedCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockUncheckedCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailUncheckedCreateNestedManyWithoutBookInput
    Review?: ReviewUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUpdateManyWithoutBookNestedInput
    Review?: ReviewUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUncheckedUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUncheckedUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUncheckedUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUncheckedUpdateManyWithoutBookNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookCreateManyInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
  }

  export type BookUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
  }

  export type BookUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
  }

  export type ImportToStockCreateInput = {
    id?: string
    qty: number
    createdAt?: Date | string | null
    updateAt?: Date | string | null
    Book: BookCreateNestedOneWithoutImportToStockInput
  }

  export type ImportToStockUncheckedCreateInput = {
    id?: string
    bookid: string
    qty: number
    createdAt?: Date | string | null
    updateAt?: Date | string | null
  }

  export type ImportToStockUpdateInput = {
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Book?: BookUpdateOneRequiredWithoutImportToStockNestedInput
  }

  export type ImportToStockUncheckedUpdateInput = {
    bookid?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportToStockCreateManyInput = {
    id?: string
    bookid: string
    qty: number
    createdAt?: Date | string | null
    updateAt?: Date | string | null
  }

  export type ImportToStockUpdateManyMutationInput = {
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportToStockUncheckedUpdateManyInput = {
    bookid?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminCreateInput = {
    id?: string
    name: string
    username: string
    password: string
    level?: string
    status?: string
    sales?: SaleCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    name: string
    username: string
    password: string
    level?: string
    status?: string
    sales?: SaleUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sales?: SaleUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type AdminCreateManyInput = {
    id?: string
    name: string
    username: string
    password: string
    level?: string
    status?: string
  }

  export type AdminUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MemberCreateInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    sales?: SaleCreateNestedManyWithoutMemberInput
    Orders?: OrderCreateNestedManyWithoutMemberInput
    Review?: ReviewCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    sales?: SaleUncheckedCreateNestedManyWithoutMemberInput
    Orders?: OrderUncheckedCreateNestedManyWithoutMemberInput
    Review?: ReviewUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    sales?: SaleUpdateManyWithoutMemberNestedInput
    Orders?: OrderUpdateManyWithoutMemberNestedInput
    Review?: ReviewUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutMemberNestedInput
    Orders?: OrderUncheckedUpdateManyWithoutMemberNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
  }

  export type MemberUpdateManyMutationInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
  }

  export type MemberUncheckedUpdateManyInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
  }

  export type CartCreateInput = {
    id?: string
    memberId: string
    qty: number
    book: BookCreateNestedOneWithoutCartsInput
  }

  export type CartUncheckedCreateInput = {
    id?: string
    bookId: string
    memberId: string
    qty: number
  }

  export type CartUpdateInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneRequiredWithoutCartsNestedInput
  }

  export type CartUncheckedUpdateInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type CartCreateManyInput = {
    id?: string
    bookId: string
    memberId: string
    qty: number
  }

  export type CartUpdateManyMutationInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type CartUncheckedUpdateManyInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type OrderCreateInput = {
    id?: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
    Member: MemberCreateNestedOneWithoutOrdersInput
    OrderDetail?: OrderDetailCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    memberId: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
    OrderDetail?: OrderDetailUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    Member?: MemberUpdateOneRequiredWithoutOrdersNestedInput
    OrderDetail?: OrderDetailUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    OrderDetail?: OrderDetailUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    memberId: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
  }

  export type OrderUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
  }

  export type OrderUncheckedUpdateManyInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
  }

  export type OrderDetailCreateInput = {
    id?: string
    price: number
    qty: number
    Book: BookCreateNestedOneWithoutOrderDetailsInput
    Order: OrderCreateNestedOneWithoutOrderDetailInput
  }

  export type OrderDetailUncheckedCreateInput = {
    id?: string
    bookId: string
    price: number
    qty: number
    orderId: string
  }

  export type OrderDetailUpdateInput = {
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    Book?: BookUpdateOneRequiredWithoutOrderDetailsNestedInput
    Order?: OrderUpdateOneRequiredWithoutOrderDetailNestedInput
  }

  export type OrderDetailUncheckedUpdateInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderDetailCreateManyInput = {
    id?: string
    bookId: string
    price: number
    qty: number
    orderId: string
  }

  export type OrderDetailUpdateManyMutationInput = {
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type OrderDetailUncheckedUpdateManyInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type SaleCreateInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    admin: AdminCreateNestedOneWithoutSalesInput
    member?: MemberCreateNestedOneWithoutSalesInput
    details?: SaleDetailCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    adminId: string
    memberId?: string | null
    details?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneRequiredWithoutSalesNestedInput
    member?: MemberUpdateOneWithoutSalesNestedInput
    details?: SaleDetailUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleCreateManyInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    adminId: string
    memberId?: string | null
  }

  export type SaleUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SaleUncheckedUpdateManyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SaleDetailCreateInput = {
    id?: string
    qty: number
    price: number
    sale: SaleCreateNestedOneWithoutDetailsInput
    book: BookCreateNestedOneWithoutSaleDetailsInput
  }

  export type SaleDetailUncheckedCreateInput = {
    id?: string
    saleId: string
    bookId: string
    qty: number
    price: number
  }

  export type SaleDetailUpdateInput = {
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    sale?: SaleUpdateOneRequiredWithoutDetailsNestedInput
    book?: BookUpdateOneRequiredWithoutSaleDetailsNestedInput
  }

  export type SaleDetailUncheckedUpdateInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SaleDetailCreateManyInput = {
    id?: string
    saleId: string
    bookId: string
    qty: number
    price: number
  }

  export type SaleDetailUpdateManyMutationInput = {
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SaleDetailUncheckedUpdateManyInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    book: BookCreateNestedOneWithoutReviewInput
    member: MemberCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    bookId: string
    memberId: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    book?: BookUpdateOneRequiredWithoutReviewNestedInput
    member?: MemberUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    bookId: string
    memberId: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CartListRelationFilter = {
    every?: CartWhereInput
    some?: CartWhereInput
    none?: CartWhereInput
  }

  export type OrderDetailListRelationFilter = {
    every?: OrderDetailWhereInput
    some?: OrderDetailWhereInput
    none?: OrderDetailWhereInput
  }

  export type ImportToStockListRelationFilter = {
    every?: ImportToStockWhereInput
    some?: ImportToStockWhereInput
    none?: ImportToStockWhereInput
  }

  export type SaleDetailListRelationFilter = {
    every?: SaleDetailWhereInput
    some?: SaleDetailWhereInput
    none?: SaleDetailWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type CartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImportToStockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SaleDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    isbn?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    category?: SortOrder
    qty?: SortOrder
    status?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type BookAvgOrderByAggregateInput = {
    price?: SortOrder
    qty?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type BookMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    isbn?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    category?: SortOrder
    qty?: SortOrder
    status?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type BookMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    isbn?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    category?: SortOrder
    qty?: SortOrder
    status?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type BookSumOrderByAggregateInput = {
    price?: SortOrder
    qty?: SortOrder
    averageRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BookScalarRelationFilter = {
    is?: BookWhereInput
    isNot?: BookWhereInput
  }

  export type ImportToStockCountOrderByAggregateInput = {
    id?: SortOrder
    bookid?: SortOrder
    qty?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ImportToStockAvgOrderByAggregateInput = {
    qty?: SortOrder
  }

  export type ImportToStockMaxOrderByAggregateInput = {
    id?: SortOrder
    bookid?: SortOrder
    qty?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ImportToStockMinOrderByAggregateInput = {
    id?: SortOrder
    bookid?: SortOrder
    qty?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ImportToStockSumOrderByAggregateInput = {
    qty?: SortOrder
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    level?: SortOrder
    status?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    level?: SortOrder
    status?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    level?: SortOrder
    status?: SortOrder
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    address?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    points?: SortOrder
    email?: SortOrder
  }

  export type MemberAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    address?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    points?: SortOrder
    email?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    address?: SortOrder
    name?: SortOrder
    profileImage?: SortOrder
    points?: SortOrder
    email?: SortOrder
  }

  export type MemberSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type CartCountOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    qty?: SortOrder
  }

  export type CartAvgOrderByAggregateInput = {
    qty?: SortOrder
  }

  export type CartMaxOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    qty?: SortOrder
  }

  export type CartMinOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    qty?: SortOrder
  }

  export type CartSumOrderByAggregateInput = {
    qty?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MemberScalarRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    slipImage?: SortOrder
    status?: SortOrder
    trackCode?: SortOrder
    express?: SortOrder
    remark?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerPhone?: SortOrder
    total?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    slipImage?: SortOrder
    status?: SortOrder
    trackCode?: SortOrder
    express?: SortOrder
    remark?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerPhone?: SortOrder
    total?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    slipImage?: SortOrder
    status?: SortOrder
    trackCode?: SortOrder
    express?: SortOrder
    remark?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerPhone?: SortOrder
    total?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderDetailCountOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    price?: SortOrder
    qty?: SortOrder
    orderId?: SortOrder
  }

  export type OrderDetailAvgOrderByAggregateInput = {
    price?: SortOrder
    qty?: SortOrder
  }

  export type OrderDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    price?: SortOrder
    qty?: SortOrder
    orderId?: SortOrder
  }

  export type OrderDetailMinOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    price?: SortOrder
    qty?: SortOrder
    orderId?: SortOrder
  }

  export type OrderDetailSumOrderByAggregateInput = {
    price?: SortOrder
    qty?: SortOrder
  }

  export type AdminScalarRelationFilter = {
    is?: AdminWhereInput
    isNot?: AdminWhereInput
  }

  export type MemberNullableScalarRelationFilter = {
    is?: MemberWhereInput | null
    isNot?: MemberWhereInput | null
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
    paymentMethod?: SortOrder
    remark?: SortOrder
    adminId?: SortOrder
    memberId?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
    paymentMethod?: SortOrder
    remark?: SortOrder
    adminId?: SortOrder
    memberId?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
    paymentMethod?: SortOrder
    remark?: SortOrder
    adminId?: SortOrder
    memberId?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    total?: SortOrder
    cashPaid?: SortOrder
    change?: SortOrder
    pointUsed?: SortOrder
  }

  export type SaleScalarRelationFilter = {
    is?: SaleWhereInput
    isNot?: SaleWhereInput
  }

  export type SaleDetailCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    bookId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
  }

  export type SaleDetailAvgOrderByAggregateInput = {
    qty?: SortOrder
    price?: SortOrder
  }

  export type SaleDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    bookId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
  }

  export type SaleDetailMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    bookId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
  }

  export type SaleDetailSumOrderByAggregateInput = {
    qty?: SortOrder
    price?: SortOrder
  }

  export type ReviewBookIdMemberIdCompoundUniqueInput = {
    bookId: string
    memberId: string
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    memberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type CartCreateNestedManyWithoutBookInput = {
    create?: XOR<CartCreateWithoutBookInput, CartUncheckedCreateWithoutBookInput> | CartCreateWithoutBookInput[] | CartUncheckedCreateWithoutBookInput[]
    connectOrCreate?: CartCreateOrConnectWithoutBookInput | CartCreateOrConnectWithoutBookInput[]
    createMany?: CartCreateManyBookInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type OrderDetailCreateNestedManyWithoutBookInput = {
    create?: XOR<OrderDetailCreateWithoutBookInput, OrderDetailUncheckedCreateWithoutBookInput> | OrderDetailCreateWithoutBookInput[] | OrderDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutBookInput | OrderDetailCreateOrConnectWithoutBookInput[]
    createMany?: OrderDetailCreateManyBookInputEnvelope
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
  }

  export type ImportToStockCreateNestedManyWithoutBookInput = {
    create?: XOR<ImportToStockCreateWithoutBookInput, ImportToStockUncheckedCreateWithoutBookInput> | ImportToStockCreateWithoutBookInput[] | ImportToStockUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImportToStockCreateOrConnectWithoutBookInput | ImportToStockCreateOrConnectWithoutBookInput[]
    createMany?: ImportToStockCreateManyBookInputEnvelope
    connect?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
  }

  export type SaleDetailCreateNestedManyWithoutBookInput = {
    create?: XOR<SaleDetailCreateWithoutBookInput, SaleDetailUncheckedCreateWithoutBookInput> | SaleDetailCreateWithoutBookInput[] | SaleDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutBookInput | SaleDetailCreateOrConnectWithoutBookInput[]
    createMany?: SaleDetailCreateManyBookInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutBookInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CartUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<CartCreateWithoutBookInput, CartUncheckedCreateWithoutBookInput> | CartCreateWithoutBookInput[] | CartUncheckedCreateWithoutBookInput[]
    connectOrCreate?: CartCreateOrConnectWithoutBookInput | CartCreateOrConnectWithoutBookInput[]
    createMany?: CartCreateManyBookInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type OrderDetailUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<OrderDetailCreateWithoutBookInput, OrderDetailUncheckedCreateWithoutBookInput> | OrderDetailCreateWithoutBookInput[] | OrderDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutBookInput | OrderDetailCreateOrConnectWithoutBookInput[]
    createMany?: OrderDetailCreateManyBookInputEnvelope
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
  }

  export type ImportToStockUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<ImportToStockCreateWithoutBookInput, ImportToStockUncheckedCreateWithoutBookInput> | ImportToStockCreateWithoutBookInput[] | ImportToStockUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImportToStockCreateOrConnectWithoutBookInput | ImportToStockCreateOrConnectWithoutBookInput[]
    createMany?: ImportToStockCreateManyBookInputEnvelope
    connect?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<SaleDetailCreateWithoutBookInput, SaleDetailUncheckedCreateWithoutBookInput> | SaleDetailCreateWithoutBookInput[] | SaleDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutBookInput | SaleDetailCreateOrConnectWithoutBookInput[]
    createMany?: SaleDetailCreateManyBookInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CartUpdateManyWithoutBookNestedInput = {
    create?: XOR<CartCreateWithoutBookInput, CartUncheckedCreateWithoutBookInput> | CartCreateWithoutBookInput[] | CartUncheckedCreateWithoutBookInput[]
    connectOrCreate?: CartCreateOrConnectWithoutBookInput | CartCreateOrConnectWithoutBookInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutBookInput | CartUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: CartCreateManyBookInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutBookInput | CartUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: CartUpdateManyWithWhereWithoutBookInput | CartUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type OrderDetailUpdateManyWithoutBookNestedInput = {
    create?: XOR<OrderDetailCreateWithoutBookInput, OrderDetailUncheckedCreateWithoutBookInput> | OrderDetailCreateWithoutBookInput[] | OrderDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutBookInput | OrderDetailCreateOrConnectWithoutBookInput[]
    upsert?: OrderDetailUpsertWithWhereUniqueWithoutBookInput | OrderDetailUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: OrderDetailCreateManyBookInputEnvelope
    set?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    disconnect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    delete?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    update?: OrderDetailUpdateWithWhereUniqueWithoutBookInput | OrderDetailUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: OrderDetailUpdateManyWithWhereWithoutBookInput | OrderDetailUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: OrderDetailScalarWhereInput | OrderDetailScalarWhereInput[]
  }

  export type ImportToStockUpdateManyWithoutBookNestedInput = {
    create?: XOR<ImportToStockCreateWithoutBookInput, ImportToStockUncheckedCreateWithoutBookInput> | ImportToStockCreateWithoutBookInput[] | ImportToStockUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImportToStockCreateOrConnectWithoutBookInput | ImportToStockCreateOrConnectWithoutBookInput[]
    upsert?: ImportToStockUpsertWithWhereUniqueWithoutBookInput | ImportToStockUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ImportToStockCreateManyBookInputEnvelope
    set?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    disconnect?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    delete?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    connect?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    update?: ImportToStockUpdateWithWhereUniqueWithoutBookInput | ImportToStockUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ImportToStockUpdateManyWithWhereWithoutBookInput | ImportToStockUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ImportToStockScalarWhereInput | ImportToStockScalarWhereInput[]
  }

  export type SaleDetailUpdateManyWithoutBookNestedInput = {
    create?: XOR<SaleDetailCreateWithoutBookInput, SaleDetailUncheckedCreateWithoutBookInput> | SaleDetailCreateWithoutBookInput[] | SaleDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutBookInput | SaleDetailCreateOrConnectWithoutBookInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutBookInput | SaleDetailUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: SaleDetailCreateManyBookInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutBookInput | SaleDetailUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutBookInput | SaleDetailUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutBookNestedInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBookInput | ReviewUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBookInput | ReviewUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBookInput | ReviewUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CartUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<CartCreateWithoutBookInput, CartUncheckedCreateWithoutBookInput> | CartCreateWithoutBookInput[] | CartUncheckedCreateWithoutBookInput[]
    connectOrCreate?: CartCreateOrConnectWithoutBookInput | CartCreateOrConnectWithoutBookInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutBookInput | CartUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: CartCreateManyBookInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutBookInput | CartUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: CartUpdateManyWithWhereWithoutBookInput | CartUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type OrderDetailUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<OrderDetailCreateWithoutBookInput, OrderDetailUncheckedCreateWithoutBookInput> | OrderDetailCreateWithoutBookInput[] | OrderDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutBookInput | OrderDetailCreateOrConnectWithoutBookInput[]
    upsert?: OrderDetailUpsertWithWhereUniqueWithoutBookInput | OrderDetailUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: OrderDetailCreateManyBookInputEnvelope
    set?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    disconnect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    delete?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    update?: OrderDetailUpdateWithWhereUniqueWithoutBookInput | OrderDetailUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: OrderDetailUpdateManyWithWhereWithoutBookInput | OrderDetailUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: OrderDetailScalarWhereInput | OrderDetailScalarWhereInput[]
  }

  export type ImportToStockUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<ImportToStockCreateWithoutBookInput, ImportToStockUncheckedCreateWithoutBookInput> | ImportToStockCreateWithoutBookInput[] | ImportToStockUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImportToStockCreateOrConnectWithoutBookInput | ImportToStockCreateOrConnectWithoutBookInput[]
    upsert?: ImportToStockUpsertWithWhereUniqueWithoutBookInput | ImportToStockUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ImportToStockCreateManyBookInputEnvelope
    set?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    disconnect?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    delete?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    connect?: ImportToStockWhereUniqueInput | ImportToStockWhereUniqueInput[]
    update?: ImportToStockUpdateWithWhereUniqueWithoutBookInput | ImportToStockUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ImportToStockUpdateManyWithWhereWithoutBookInput | ImportToStockUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ImportToStockScalarWhereInput | ImportToStockScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<SaleDetailCreateWithoutBookInput, SaleDetailUncheckedCreateWithoutBookInput> | SaleDetailCreateWithoutBookInput[] | SaleDetailUncheckedCreateWithoutBookInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutBookInput | SaleDetailCreateOrConnectWithoutBookInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutBookInput | SaleDetailUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: SaleDetailCreateManyBookInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutBookInput | SaleDetailUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutBookInput | SaleDetailUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput> | ReviewCreateWithoutBookInput[] | ReviewUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBookInput | ReviewCreateOrConnectWithoutBookInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBookInput | ReviewUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ReviewCreateManyBookInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBookInput | ReviewUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBookInput | ReviewUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookCreateNestedOneWithoutImportToStockInput = {
    create?: XOR<BookCreateWithoutImportToStockInput, BookUncheckedCreateWithoutImportToStockInput>
    connectOrCreate?: BookCreateOrConnectWithoutImportToStockInput
    connect?: BookWhereUniqueInput
  }

  export type BookUpdateOneRequiredWithoutImportToStockNestedInput = {
    create?: XOR<BookCreateWithoutImportToStockInput, BookUncheckedCreateWithoutImportToStockInput>
    connectOrCreate?: BookCreateOrConnectWithoutImportToStockInput
    upsert?: BookUpsertWithoutImportToStockInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutImportToStockInput, BookUpdateWithoutImportToStockInput>, BookUncheckedUpdateWithoutImportToStockInput>
  }

  export type SaleCreateNestedManyWithoutAdminInput = {
    create?: XOR<SaleCreateWithoutAdminInput, SaleUncheckedCreateWithoutAdminInput> | SaleCreateWithoutAdminInput[] | SaleUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutAdminInput | SaleCreateOrConnectWithoutAdminInput[]
    createMany?: SaleCreateManyAdminInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<SaleCreateWithoutAdminInput, SaleUncheckedCreateWithoutAdminInput> | SaleCreateWithoutAdminInput[] | SaleUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutAdminInput | SaleCreateOrConnectWithoutAdminInput[]
    createMany?: SaleCreateManyAdminInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleUpdateManyWithoutAdminNestedInput = {
    create?: XOR<SaleCreateWithoutAdminInput, SaleUncheckedCreateWithoutAdminInput> | SaleCreateWithoutAdminInput[] | SaleUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutAdminInput | SaleCreateOrConnectWithoutAdminInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutAdminInput | SaleUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: SaleCreateManyAdminInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutAdminInput | SaleUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutAdminInput | SaleUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<SaleCreateWithoutAdminInput, SaleUncheckedCreateWithoutAdminInput> | SaleCreateWithoutAdminInput[] | SaleUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutAdminInput | SaleCreateOrConnectWithoutAdminInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutAdminInput | SaleUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: SaleCreateManyAdminInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutAdminInput | SaleUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutAdminInput | SaleUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleCreateNestedManyWithoutMemberInput = {
    create?: XOR<SaleCreateWithoutMemberInput, SaleUncheckedCreateWithoutMemberInput> | SaleCreateWithoutMemberInput[] | SaleUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutMemberInput | SaleCreateOrConnectWithoutMemberInput[]
    createMany?: SaleCreateManyMemberInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutMemberInput = {
    create?: XOR<OrderCreateWithoutMemberInput, OrderUncheckedCreateWithoutMemberInput> | OrderCreateWithoutMemberInput[] | OrderUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMemberInput | OrderCreateOrConnectWithoutMemberInput[]
    createMany?: OrderCreateManyMemberInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutMemberInput = {
    create?: XOR<ReviewCreateWithoutMemberInput, ReviewUncheckedCreateWithoutMemberInput> | ReviewCreateWithoutMemberInput[] | ReviewUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMemberInput | ReviewCreateOrConnectWithoutMemberInput[]
    createMany?: ReviewCreateManyMemberInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<SaleCreateWithoutMemberInput, SaleUncheckedCreateWithoutMemberInput> | SaleCreateWithoutMemberInput[] | SaleUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutMemberInput | SaleCreateOrConnectWithoutMemberInput[]
    createMany?: SaleCreateManyMemberInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<OrderCreateWithoutMemberInput, OrderUncheckedCreateWithoutMemberInput> | OrderCreateWithoutMemberInput[] | OrderUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMemberInput | OrderCreateOrConnectWithoutMemberInput[]
    createMany?: OrderCreateManyMemberInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<ReviewCreateWithoutMemberInput, ReviewUncheckedCreateWithoutMemberInput> | ReviewCreateWithoutMemberInput[] | ReviewUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMemberInput | ReviewCreateOrConnectWithoutMemberInput[]
    createMany?: ReviewCreateManyMemberInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SaleUpdateManyWithoutMemberNestedInput = {
    create?: XOR<SaleCreateWithoutMemberInput, SaleUncheckedCreateWithoutMemberInput> | SaleCreateWithoutMemberInput[] | SaleUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutMemberInput | SaleCreateOrConnectWithoutMemberInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutMemberInput | SaleUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: SaleCreateManyMemberInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutMemberInput | SaleUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutMemberInput | SaleUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutMemberNestedInput = {
    create?: XOR<OrderCreateWithoutMemberInput, OrderUncheckedCreateWithoutMemberInput> | OrderCreateWithoutMemberInput[] | OrderUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMemberInput | OrderCreateOrConnectWithoutMemberInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutMemberInput | OrderUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: OrderCreateManyMemberInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutMemberInput | OrderUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutMemberInput | OrderUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutMemberNestedInput = {
    create?: XOR<ReviewCreateWithoutMemberInput, ReviewUncheckedCreateWithoutMemberInput> | ReviewCreateWithoutMemberInput[] | ReviewUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMemberInput | ReviewCreateOrConnectWithoutMemberInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMemberInput | ReviewUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: ReviewCreateManyMemberInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMemberInput | ReviewUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMemberInput | ReviewUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<SaleCreateWithoutMemberInput, SaleUncheckedCreateWithoutMemberInput> | SaleCreateWithoutMemberInput[] | SaleUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutMemberInput | SaleCreateOrConnectWithoutMemberInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutMemberInput | SaleUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: SaleCreateManyMemberInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutMemberInput | SaleUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutMemberInput | SaleUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<OrderCreateWithoutMemberInput, OrderUncheckedCreateWithoutMemberInput> | OrderCreateWithoutMemberInput[] | OrderUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMemberInput | OrderCreateOrConnectWithoutMemberInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutMemberInput | OrderUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: OrderCreateManyMemberInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutMemberInput | OrderUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutMemberInput | OrderUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<ReviewCreateWithoutMemberInput, ReviewUncheckedCreateWithoutMemberInput> | ReviewCreateWithoutMemberInput[] | ReviewUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMemberInput | ReviewCreateOrConnectWithoutMemberInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMemberInput | ReviewUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: ReviewCreateManyMemberInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMemberInput | ReviewUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMemberInput | ReviewUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookCreateNestedOneWithoutCartsInput = {
    create?: XOR<BookCreateWithoutCartsInput, BookUncheckedCreateWithoutCartsInput>
    connectOrCreate?: BookCreateOrConnectWithoutCartsInput
    connect?: BookWhereUniqueInput
  }

  export type BookUpdateOneRequiredWithoutCartsNestedInput = {
    create?: XOR<BookCreateWithoutCartsInput, BookUncheckedCreateWithoutCartsInput>
    connectOrCreate?: BookCreateOrConnectWithoutCartsInput
    upsert?: BookUpsertWithoutCartsInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutCartsInput, BookUpdateWithoutCartsInput>, BookUncheckedUpdateWithoutCartsInput>
  }

  export type MemberCreateNestedOneWithoutOrdersInput = {
    create?: XOR<MemberCreateWithoutOrdersInput, MemberUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: MemberCreateOrConnectWithoutOrdersInput
    connect?: MemberWhereUniqueInput
  }

  export type OrderDetailCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderDetailCreateWithoutOrderInput, OrderDetailUncheckedCreateWithoutOrderInput> | OrderDetailCreateWithoutOrderInput[] | OrderDetailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutOrderInput | OrderDetailCreateOrConnectWithoutOrderInput[]
    createMany?: OrderDetailCreateManyOrderInputEnvelope
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
  }

  export type OrderDetailUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderDetailCreateWithoutOrderInput, OrderDetailUncheckedCreateWithoutOrderInput> | OrderDetailCreateWithoutOrderInput[] | OrderDetailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutOrderInput | OrderDetailCreateOrConnectWithoutOrderInput[]
    createMany?: OrderDetailCreateManyOrderInputEnvelope
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MemberUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<MemberCreateWithoutOrdersInput, MemberUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: MemberCreateOrConnectWithoutOrdersInput
    upsert?: MemberUpsertWithoutOrdersInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutOrdersInput, MemberUpdateWithoutOrdersInput>, MemberUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderDetailUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderDetailCreateWithoutOrderInput, OrderDetailUncheckedCreateWithoutOrderInput> | OrderDetailCreateWithoutOrderInput[] | OrderDetailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutOrderInput | OrderDetailCreateOrConnectWithoutOrderInput[]
    upsert?: OrderDetailUpsertWithWhereUniqueWithoutOrderInput | OrderDetailUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderDetailCreateManyOrderInputEnvelope
    set?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    disconnect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    delete?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    update?: OrderDetailUpdateWithWhereUniqueWithoutOrderInput | OrderDetailUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderDetailUpdateManyWithWhereWithoutOrderInput | OrderDetailUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderDetailScalarWhereInput | OrderDetailScalarWhereInput[]
  }

  export type OrderDetailUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderDetailCreateWithoutOrderInput, OrderDetailUncheckedCreateWithoutOrderInput> | OrderDetailCreateWithoutOrderInput[] | OrderDetailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderDetailCreateOrConnectWithoutOrderInput | OrderDetailCreateOrConnectWithoutOrderInput[]
    upsert?: OrderDetailUpsertWithWhereUniqueWithoutOrderInput | OrderDetailUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderDetailCreateManyOrderInputEnvelope
    set?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    disconnect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    delete?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    connect?: OrderDetailWhereUniqueInput | OrderDetailWhereUniqueInput[]
    update?: OrderDetailUpdateWithWhereUniqueWithoutOrderInput | OrderDetailUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderDetailUpdateManyWithWhereWithoutOrderInput | OrderDetailUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderDetailScalarWhereInput | OrderDetailScalarWhereInput[]
  }

  export type BookCreateNestedOneWithoutOrderDetailsInput = {
    create?: XOR<BookCreateWithoutOrderDetailsInput, BookUncheckedCreateWithoutOrderDetailsInput>
    connectOrCreate?: BookCreateOrConnectWithoutOrderDetailsInput
    connect?: BookWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutOrderDetailInput = {
    create?: XOR<OrderCreateWithoutOrderDetailInput, OrderUncheckedCreateWithoutOrderDetailInput>
    connectOrCreate?: OrderCreateOrConnectWithoutOrderDetailInput
    connect?: OrderWhereUniqueInput
  }

  export type BookUpdateOneRequiredWithoutOrderDetailsNestedInput = {
    create?: XOR<BookCreateWithoutOrderDetailsInput, BookUncheckedCreateWithoutOrderDetailsInput>
    connectOrCreate?: BookCreateOrConnectWithoutOrderDetailsInput
    upsert?: BookUpsertWithoutOrderDetailsInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutOrderDetailsInput, BookUpdateWithoutOrderDetailsInput>, BookUncheckedUpdateWithoutOrderDetailsInput>
  }

  export type OrderUpdateOneRequiredWithoutOrderDetailNestedInput = {
    create?: XOR<OrderCreateWithoutOrderDetailInput, OrderUncheckedCreateWithoutOrderDetailInput>
    connectOrCreate?: OrderCreateOrConnectWithoutOrderDetailInput
    upsert?: OrderUpsertWithoutOrderDetailInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutOrderDetailInput, OrderUpdateWithoutOrderDetailInput>, OrderUncheckedUpdateWithoutOrderDetailInput>
  }

  export type AdminCreateNestedOneWithoutSalesInput = {
    create?: XOR<AdminCreateWithoutSalesInput, AdminUncheckedCreateWithoutSalesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSalesInput
    connect?: AdminWhereUniqueInput
  }

  export type MemberCreateNestedOneWithoutSalesInput = {
    create?: XOR<MemberCreateWithoutSalesInput, MemberUncheckedCreateWithoutSalesInput>
    connectOrCreate?: MemberCreateOrConnectWithoutSalesInput
    connect?: MemberWhereUniqueInput
  }

  export type SaleDetailCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type AdminUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<AdminCreateWithoutSalesInput, AdminUncheckedCreateWithoutSalesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSalesInput
    upsert?: AdminUpsertWithoutSalesInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutSalesInput, AdminUpdateWithoutSalesInput>, AdminUncheckedUpdateWithoutSalesInput>
  }

  export type MemberUpdateOneWithoutSalesNestedInput = {
    create?: XOR<MemberCreateWithoutSalesInput, MemberUncheckedCreateWithoutSalesInput>
    connectOrCreate?: MemberCreateOrConnectWithoutSalesInput
    upsert?: MemberUpsertWithoutSalesInput
    disconnect?: boolean
    delete?: MemberWhereInput | boolean
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutSalesInput, MemberUpdateWithoutSalesInput>, MemberUncheckedUpdateWithoutSalesInput>
  }

  export type SaleDetailUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutSaleInput | SaleDetailUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutSaleInput | SaleDetailUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutSaleInput | SaleDetailUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutSaleInput | SaleDetailUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutSaleInput | SaleDetailUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutSaleInput | SaleDetailUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type SaleCreateNestedOneWithoutDetailsInput = {
    create?: XOR<SaleCreateWithoutDetailsInput, SaleUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutDetailsInput
    connect?: SaleWhereUniqueInput
  }

  export type BookCreateNestedOneWithoutSaleDetailsInput = {
    create?: XOR<BookCreateWithoutSaleDetailsInput, BookUncheckedCreateWithoutSaleDetailsInput>
    connectOrCreate?: BookCreateOrConnectWithoutSaleDetailsInput
    connect?: BookWhereUniqueInput
  }

  export type SaleUpdateOneRequiredWithoutDetailsNestedInput = {
    create?: XOR<SaleCreateWithoutDetailsInput, SaleUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutDetailsInput
    upsert?: SaleUpsertWithoutDetailsInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutDetailsInput, SaleUpdateWithoutDetailsInput>, SaleUncheckedUpdateWithoutDetailsInput>
  }

  export type BookUpdateOneRequiredWithoutSaleDetailsNestedInput = {
    create?: XOR<BookCreateWithoutSaleDetailsInput, BookUncheckedCreateWithoutSaleDetailsInput>
    connectOrCreate?: BookCreateOrConnectWithoutSaleDetailsInput
    upsert?: BookUpsertWithoutSaleDetailsInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutSaleDetailsInput, BookUpdateWithoutSaleDetailsInput>, BookUncheckedUpdateWithoutSaleDetailsInput>
  }

  export type BookCreateNestedOneWithoutReviewInput = {
    create?: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookCreateOrConnectWithoutReviewInput
    connect?: BookWhereUniqueInput
  }

  export type MemberCreateNestedOneWithoutReviewInput = {
    create?: XOR<MemberCreateWithoutReviewInput, MemberUncheckedCreateWithoutReviewInput>
    connectOrCreate?: MemberCreateOrConnectWithoutReviewInput
    connect?: MemberWhereUniqueInput
  }

  export type BookUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookCreateOrConnectWithoutReviewInput
    upsert?: BookUpsertWithoutReviewInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutReviewInput, BookUpdateWithoutReviewInput>, BookUncheckedUpdateWithoutReviewInput>
  }

  export type MemberUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<MemberCreateWithoutReviewInput, MemberUncheckedCreateWithoutReviewInput>
    connectOrCreate?: MemberCreateOrConnectWithoutReviewInput
    upsert?: MemberUpsertWithoutReviewInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutReviewInput, MemberUpdateWithoutReviewInput>, MemberUncheckedUpdateWithoutReviewInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CartCreateWithoutBookInput = {
    id?: string
    memberId: string
    qty: number
  }

  export type CartUncheckedCreateWithoutBookInput = {
    id?: string
    memberId: string
    qty: number
  }

  export type CartCreateOrConnectWithoutBookInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutBookInput, CartUncheckedCreateWithoutBookInput>
  }

  export type CartCreateManyBookInputEnvelope = {
    data: CartCreateManyBookInput | CartCreateManyBookInput[]
  }

  export type OrderDetailCreateWithoutBookInput = {
    id?: string
    price: number
    qty: number
    Order: OrderCreateNestedOneWithoutOrderDetailInput
  }

  export type OrderDetailUncheckedCreateWithoutBookInput = {
    id?: string
    price: number
    qty: number
    orderId: string
  }

  export type OrderDetailCreateOrConnectWithoutBookInput = {
    where: OrderDetailWhereUniqueInput
    create: XOR<OrderDetailCreateWithoutBookInput, OrderDetailUncheckedCreateWithoutBookInput>
  }

  export type OrderDetailCreateManyBookInputEnvelope = {
    data: OrderDetailCreateManyBookInput | OrderDetailCreateManyBookInput[]
  }

  export type ImportToStockCreateWithoutBookInput = {
    id?: string
    qty: number
    createdAt?: Date | string | null
    updateAt?: Date | string | null
  }

  export type ImportToStockUncheckedCreateWithoutBookInput = {
    id?: string
    qty: number
    createdAt?: Date | string | null
    updateAt?: Date | string | null
  }

  export type ImportToStockCreateOrConnectWithoutBookInput = {
    where: ImportToStockWhereUniqueInput
    create: XOR<ImportToStockCreateWithoutBookInput, ImportToStockUncheckedCreateWithoutBookInput>
  }

  export type ImportToStockCreateManyBookInputEnvelope = {
    data: ImportToStockCreateManyBookInput | ImportToStockCreateManyBookInput[]
  }

  export type SaleDetailCreateWithoutBookInput = {
    id?: string
    qty: number
    price: number
    sale: SaleCreateNestedOneWithoutDetailsInput
  }

  export type SaleDetailUncheckedCreateWithoutBookInput = {
    id?: string
    saleId: string
    qty: number
    price: number
  }

  export type SaleDetailCreateOrConnectWithoutBookInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutBookInput, SaleDetailUncheckedCreateWithoutBookInput>
  }

  export type SaleDetailCreateManyBookInputEnvelope = {
    data: SaleDetailCreateManyBookInput | SaleDetailCreateManyBookInput[]
  }

  export type ReviewCreateWithoutBookInput = {
    id?: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    member: MemberCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutBookInput = {
    id?: string
    memberId: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutBookInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput>
  }

  export type ReviewCreateManyBookInputEnvelope = {
    data: ReviewCreateManyBookInput | ReviewCreateManyBookInput[]
  }

  export type CartUpsertWithWhereUniqueWithoutBookInput = {
    where: CartWhereUniqueInput
    update: XOR<CartUpdateWithoutBookInput, CartUncheckedUpdateWithoutBookInput>
    create: XOR<CartCreateWithoutBookInput, CartUncheckedCreateWithoutBookInput>
  }

  export type CartUpdateWithWhereUniqueWithoutBookInput = {
    where: CartWhereUniqueInput
    data: XOR<CartUpdateWithoutBookInput, CartUncheckedUpdateWithoutBookInput>
  }

  export type CartUpdateManyWithWhereWithoutBookInput = {
    where: CartScalarWhereInput
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyWithoutBookInput>
  }

  export type CartScalarWhereInput = {
    AND?: CartScalarWhereInput | CartScalarWhereInput[]
    OR?: CartScalarWhereInput[]
    NOT?: CartScalarWhereInput | CartScalarWhereInput[]
    id?: StringFilter<"Cart"> | string
    bookId?: StringFilter<"Cart"> | string
    memberId?: StringFilter<"Cart"> | string
    qty?: IntFilter<"Cart"> | number
  }

  export type OrderDetailUpsertWithWhereUniqueWithoutBookInput = {
    where: OrderDetailWhereUniqueInput
    update: XOR<OrderDetailUpdateWithoutBookInput, OrderDetailUncheckedUpdateWithoutBookInput>
    create: XOR<OrderDetailCreateWithoutBookInput, OrderDetailUncheckedCreateWithoutBookInput>
  }

  export type OrderDetailUpdateWithWhereUniqueWithoutBookInput = {
    where: OrderDetailWhereUniqueInput
    data: XOR<OrderDetailUpdateWithoutBookInput, OrderDetailUncheckedUpdateWithoutBookInput>
  }

  export type OrderDetailUpdateManyWithWhereWithoutBookInput = {
    where: OrderDetailScalarWhereInput
    data: XOR<OrderDetailUpdateManyMutationInput, OrderDetailUncheckedUpdateManyWithoutBookInput>
  }

  export type OrderDetailScalarWhereInput = {
    AND?: OrderDetailScalarWhereInput | OrderDetailScalarWhereInput[]
    OR?: OrderDetailScalarWhereInput[]
    NOT?: OrderDetailScalarWhereInput | OrderDetailScalarWhereInput[]
    id?: StringFilter<"OrderDetail"> | string
    bookId?: StringFilter<"OrderDetail"> | string
    price?: IntFilter<"OrderDetail"> | number
    qty?: IntFilter<"OrderDetail"> | number
    orderId?: StringFilter<"OrderDetail"> | string
  }

  export type ImportToStockUpsertWithWhereUniqueWithoutBookInput = {
    where: ImportToStockWhereUniqueInput
    update: XOR<ImportToStockUpdateWithoutBookInput, ImportToStockUncheckedUpdateWithoutBookInput>
    create: XOR<ImportToStockCreateWithoutBookInput, ImportToStockUncheckedCreateWithoutBookInput>
  }

  export type ImportToStockUpdateWithWhereUniqueWithoutBookInput = {
    where: ImportToStockWhereUniqueInput
    data: XOR<ImportToStockUpdateWithoutBookInput, ImportToStockUncheckedUpdateWithoutBookInput>
  }

  export type ImportToStockUpdateManyWithWhereWithoutBookInput = {
    where: ImportToStockScalarWhereInput
    data: XOR<ImportToStockUpdateManyMutationInput, ImportToStockUncheckedUpdateManyWithoutBookInput>
  }

  export type ImportToStockScalarWhereInput = {
    AND?: ImportToStockScalarWhereInput | ImportToStockScalarWhereInput[]
    OR?: ImportToStockScalarWhereInput[]
    NOT?: ImportToStockScalarWhereInput | ImportToStockScalarWhereInput[]
    id?: StringFilter<"ImportToStock"> | string
    bookid?: StringFilter<"ImportToStock"> | string
    qty?: IntFilter<"ImportToStock"> | number
    createdAt?: DateTimeNullableFilter<"ImportToStock"> | Date | string | null
    updateAt?: DateTimeNullableFilter<"ImportToStock"> | Date | string | null
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutBookInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutBookInput, SaleDetailUncheckedUpdateWithoutBookInput>
    create: XOR<SaleDetailCreateWithoutBookInput, SaleDetailUncheckedCreateWithoutBookInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutBookInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutBookInput, SaleDetailUncheckedUpdateWithoutBookInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutBookInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutBookInput>
  }

  export type SaleDetailScalarWhereInput = {
    AND?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
    OR?: SaleDetailScalarWhereInput[]
    NOT?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
    id?: StringFilter<"SaleDetail"> | string
    saleId?: StringFilter<"SaleDetail"> | string
    bookId?: StringFilter<"SaleDetail"> | string
    qty?: IntFilter<"SaleDetail"> | number
    price?: IntFilter<"SaleDetail"> | number
  }

  export type ReviewUpsertWithWhereUniqueWithoutBookInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutBookInput, ReviewUncheckedUpdateWithoutBookInput>
    create: XOR<ReviewCreateWithoutBookInput, ReviewUncheckedCreateWithoutBookInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutBookInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutBookInput, ReviewUncheckedUpdateWithoutBookInput>
  }

  export type ReviewUpdateManyWithWhereWithoutBookInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutBookInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    bookId?: StringFilter<"Review"> | string
    memberId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type BookCreateWithoutImportToStockInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailCreateNestedManyWithoutBookInput
    Review?: ReviewCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutImportToStockInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartUncheckedCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailUncheckedCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailUncheckedCreateNestedManyWithoutBookInput
    Review?: ReviewUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutImportToStockInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutImportToStockInput, BookUncheckedCreateWithoutImportToStockInput>
  }

  export type BookUpsertWithoutImportToStockInput = {
    update: XOR<BookUpdateWithoutImportToStockInput, BookUncheckedUpdateWithoutImportToStockInput>
    create: XOR<BookCreateWithoutImportToStockInput, BookUncheckedCreateWithoutImportToStockInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutImportToStockInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutImportToStockInput, BookUncheckedUpdateWithoutImportToStockInput>
  }

  export type BookUpdateWithoutImportToStockInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUpdateManyWithoutBookNestedInput
    Review?: ReviewUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutImportToStockInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUncheckedUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUncheckedUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUncheckedUpdateManyWithoutBookNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
  }

  export type SaleCreateWithoutAdminInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    member?: MemberCreateNestedOneWithoutSalesInput
    details?: SaleDetailCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutAdminInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    memberId?: string | null
    details?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutAdminInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutAdminInput, SaleUncheckedCreateWithoutAdminInput>
  }

  export type SaleCreateManyAdminInputEnvelope = {
    data: SaleCreateManyAdminInput | SaleCreateManyAdminInput[]
  }

  export type SaleUpsertWithWhereUniqueWithoutAdminInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutAdminInput, SaleUncheckedUpdateWithoutAdminInput>
    create: XOR<SaleCreateWithoutAdminInput, SaleUncheckedCreateWithoutAdminInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutAdminInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutAdminInput, SaleUncheckedUpdateWithoutAdminInput>
  }

  export type SaleUpdateManyWithWhereWithoutAdminInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutAdminInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    total?: IntFilter<"Sale"> | number
    cashPaid?: FloatFilter<"Sale"> | number
    change?: FloatFilter<"Sale"> | number
    pointUsed?: IntFilter<"Sale"> | number
    paymentMethod?: StringFilter<"Sale"> | string
    remark?: StringNullableFilter<"Sale"> | string | null
    adminId?: StringFilter<"Sale"> | string
    memberId?: StringNullableFilter<"Sale"> | string | null
  }

  export type SaleCreateWithoutMemberInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    admin: AdminCreateNestedOneWithoutSalesInput
    details?: SaleDetailCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutMemberInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    adminId: string
    details?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutMemberInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutMemberInput, SaleUncheckedCreateWithoutMemberInput>
  }

  export type SaleCreateManyMemberInputEnvelope = {
    data: SaleCreateManyMemberInput | SaleCreateManyMemberInput[]
  }

  export type OrderCreateWithoutMemberInput = {
    id?: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
    OrderDetail?: OrderDetailCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutMemberInput = {
    id?: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
    OrderDetail?: OrderDetailUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutMemberInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutMemberInput, OrderUncheckedCreateWithoutMemberInput>
  }

  export type OrderCreateManyMemberInputEnvelope = {
    data: OrderCreateManyMemberInput | OrderCreateManyMemberInput[]
  }

  export type ReviewCreateWithoutMemberInput = {
    id?: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    book: BookCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutMemberInput = {
    id?: string
    bookId: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutMemberInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutMemberInput, ReviewUncheckedCreateWithoutMemberInput>
  }

  export type ReviewCreateManyMemberInputEnvelope = {
    data: ReviewCreateManyMemberInput | ReviewCreateManyMemberInput[]
  }

  export type SaleUpsertWithWhereUniqueWithoutMemberInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutMemberInput, SaleUncheckedUpdateWithoutMemberInput>
    create: XOR<SaleCreateWithoutMemberInput, SaleUncheckedCreateWithoutMemberInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutMemberInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutMemberInput, SaleUncheckedUpdateWithoutMemberInput>
  }

  export type SaleUpdateManyWithWhereWithoutMemberInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutMemberInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutMemberInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutMemberInput, OrderUncheckedUpdateWithoutMemberInput>
    create: XOR<OrderCreateWithoutMemberInput, OrderUncheckedCreateWithoutMemberInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutMemberInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutMemberInput, OrderUncheckedUpdateWithoutMemberInput>
  }

  export type OrderUpdateManyWithWhereWithoutMemberInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutMemberInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    memberId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    slipImage?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    trackCode?: StringFilter<"Order"> | string
    express?: StringFilter<"Order"> | string
    remark?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerAddress?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    total?: IntFilter<"Order"> | number
  }

  export type ReviewUpsertWithWhereUniqueWithoutMemberInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutMemberInput, ReviewUncheckedUpdateWithoutMemberInput>
    create: XOR<ReviewCreateWithoutMemberInput, ReviewUncheckedCreateWithoutMemberInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutMemberInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutMemberInput, ReviewUncheckedUpdateWithoutMemberInput>
  }

  export type ReviewUpdateManyWithWhereWithoutMemberInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutMemberInput>
  }

  export type BookCreateWithoutCartsInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    OrderDetails?: OrderDetailCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailCreateNestedManyWithoutBookInput
    Review?: ReviewCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutCartsInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    OrderDetails?: OrderDetailUncheckedCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockUncheckedCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailUncheckedCreateNestedManyWithoutBookInput
    Review?: ReviewUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutCartsInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutCartsInput, BookUncheckedCreateWithoutCartsInput>
  }

  export type BookUpsertWithoutCartsInput = {
    update: XOR<BookUpdateWithoutCartsInput, BookUncheckedUpdateWithoutCartsInput>
    create: XOR<BookCreateWithoutCartsInput, BookUncheckedCreateWithoutCartsInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutCartsInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutCartsInput, BookUncheckedUpdateWithoutCartsInput>
  }

  export type BookUpdateWithoutCartsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    OrderDetails?: OrderDetailUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUpdateManyWithoutBookNestedInput
    Review?: ReviewUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutCartsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    OrderDetails?: OrderDetailUncheckedUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUncheckedUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUncheckedUpdateManyWithoutBookNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
  }

  export type MemberCreateWithoutOrdersInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    sales?: SaleCreateNestedManyWithoutMemberInput
    Review?: ReviewCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutOrdersInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    sales?: SaleUncheckedCreateNestedManyWithoutMemberInput
    Review?: ReviewUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutOrdersInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutOrdersInput, MemberUncheckedCreateWithoutOrdersInput>
  }

  export type OrderDetailCreateWithoutOrderInput = {
    id?: string
    price: number
    qty: number
    Book: BookCreateNestedOneWithoutOrderDetailsInput
  }

  export type OrderDetailUncheckedCreateWithoutOrderInput = {
    id?: string
    bookId: string
    price: number
    qty: number
  }

  export type OrderDetailCreateOrConnectWithoutOrderInput = {
    where: OrderDetailWhereUniqueInput
    create: XOR<OrderDetailCreateWithoutOrderInput, OrderDetailUncheckedCreateWithoutOrderInput>
  }

  export type OrderDetailCreateManyOrderInputEnvelope = {
    data: OrderDetailCreateManyOrderInput | OrderDetailCreateManyOrderInput[]
  }

  export type MemberUpsertWithoutOrdersInput = {
    update: XOR<MemberUpdateWithoutOrdersInput, MemberUncheckedUpdateWithoutOrdersInput>
    create: XOR<MemberCreateWithoutOrdersInput, MemberUncheckedCreateWithoutOrdersInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutOrdersInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutOrdersInput, MemberUncheckedUpdateWithoutOrdersInput>
  }

  export type MemberUpdateWithoutOrdersInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    sales?: SaleUpdateManyWithoutMemberNestedInput
    Review?: ReviewUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutOrdersInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutMemberNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type OrderDetailUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderDetailWhereUniqueInput
    update: XOR<OrderDetailUpdateWithoutOrderInput, OrderDetailUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderDetailCreateWithoutOrderInput, OrderDetailUncheckedCreateWithoutOrderInput>
  }

  export type OrderDetailUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderDetailWhereUniqueInput
    data: XOR<OrderDetailUpdateWithoutOrderInput, OrderDetailUncheckedUpdateWithoutOrderInput>
  }

  export type OrderDetailUpdateManyWithWhereWithoutOrderInput = {
    where: OrderDetailScalarWhereInput
    data: XOR<OrderDetailUpdateManyMutationInput, OrderDetailUncheckedUpdateManyWithoutOrderInput>
  }

  export type BookCreateWithoutOrderDetailsInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailCreateNestedManyWithoutBookInput
    Review?: ReviewCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutOrderDetailsInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartUncheckedCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockUncheckedCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailUncheckedCreateNestedManyWithoutBookInput
    Review?: ReviewUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutOrderDetailsInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutOrderDetailsInput, BookUncheckedCreateWithoutOrderDetailsInput>
  }

  export type OrderCreateWithoutOrderDetailInput = {
    id?: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
    Member: MemberCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutOrderDetailInput = {
    id?: string
    memberId: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
  }

  export type OrderCreateOrConnectWithoutOrderDetailInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutOrderDetailInput, OrderUncheckedCreateWithoutOrderDetailInput>
  }

  export type BookUpsertWithoutOrderDetailsInput = {
    update: XOR<BookUpdateWithoutOrderDetailsInput, BookUncheckedUpdateWithoutOrderDetailsInput>
    create: XOR<BookCreateWithoutOrderDetailsInput, BookUncheckedCreateWithoutOrderDetailsInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutOrderDetailsInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutOrderDetailsInput, BookUncheckedUpdateWithoutOrderDetailsInput>
  }

  export type BookUpdateWithoutOrderDetailsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUpdateManyWithoutBookNestedInput
    Review?: ReviewUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutOrderDetailsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUncheckedUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUncheckedUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUncheckedUpdateManyWithoutBookNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
  }

  export type OrderUpsertWithoutOrderDetailInput = {
    update: XOR<OrderUpdateWithoutOrderDetailInput, OrderUncheckedUpdateWithoutOrderDetailInput>
    create: XOR<OrderCreateWithoutOrderDetailInput, OrderUncheckedCreateWithoutOrderDetailInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutOrderDetailInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutOrderDetailInput, OrderUncheckedUpdateWithoutOrderDetailInput>
  }

  export type OrderUpdateWithoutOrderDetailInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    Member?: MemberUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutOrderDetailInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
  }

  export type AdminCreateWithoutSalesInput = {
    id?: string
    name: string
    username: string
    password: string
    level?: string
    status?: string
  }

  export type AdminUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    username: string
    password: string
    level?: string
    status?: string
  }

  export type AdminCreateOrConnectWithoutSalesInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutSalesInput, AdminUncheckedCreateWithoutSalesInput>
  }

  export type MemberCreateWithoutSalesInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    Orders?: OrderCreateNestedManyWithoutMemberInput
    Review?: ReviewCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutSalesInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    Orders?: OrderUncheckedCreateNestedManyWithoutMemberInput
    Review?: ReviewUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutSalesInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutSalesInput, MemberUncheckedCreateWithoutSalesInput>
  }

  export type SaleDetailCreateWithoutSaleInput = {
    id?: string
    qty: number
    price: number
    book: BookCreateNestedOneWithoutSaleDetailsInput
  }

  export type SaleDetailUncheckedCreateWithoutSaleInput = {
    id?: string
    bookId: string
    qty: number
    price: number
  }

  export type SaleDetailCreateOrConnectWithoutSaleInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput>
  }

  export type SaleDetailCreateManySaleInputEnvelope = {
    data: SaleDetailCreateManySaleInput | SaleDetailCreateManySaleInput[]
  }

  export type AdminUpsertWithoutSalesInput = {
    update: XOR<AdminUpdateWithoutSalesInput, AdminUncheckedUpdateWithoutSalesInput>
    create: XOR<AdminCreateWithoutSalesInput, AdminUncheckedCreateWithoutSalesInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutSalesInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutSalesInput, AdminUncheckedUpdateWithoutSalesInput>
  }

  export type AdminUpdateWithoutSalesInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateWithoutSalesInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MemberUpsertWithoutSalesInput = {
    update: XOR<MemberUpdateWithoutSalesInput, MemberUncheckedUpdateWithoutSalesInput>
    create: XOR<MemberCreateWithoutSalesInput, MemberUncheckedCreateWithoutSalesInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutSalesInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutSalesInput, MemberUncheckedUpdateWithoutSalesInput>
  }

  export type MemberUpdateWithoutSalesInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    Orders?: OrderUpdateManyWithoutMemberNestedInput
    Review?: ReviewUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutSalesInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    Orders?: OrderUncheckedUpdateManyWithoutMemberNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutSaleInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutSaleInput, SaleDetailUncheckedUpdateWithoutSaleInput>
    create: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutSaleInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutSaleInput, SaleDetailUncheckedUpdateWithoutSaleInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutSaleInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutSaleInput>
  }

  export type SaleCreateWithoutDetailsInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    admin: AdminCreateNestedOneWithoutSalesInput
    member?: MemberCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutDetailsInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    adminId: string
    memberId?: string | null
  }

  export type SaleCreateOrConnectWithoutDetailsInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutDetailsInput, SaleUncheckedCreateWithoutDetailsInput>
  }

  export type BookCreateWithoutSaleDetailsInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockCreateNestedManyWithoutBookInput
    Review?: ReviewCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutSaleDetailsInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartUncheckedCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailUncheckedCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockUncheckedCreateNestedManyWithoutBookInput
    Review?: ReviewUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutSaleDetailsInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutSaleDetailsInput, BookUncheckedCreateWithoutSaleDetailsInput>
  }

  export type SaleUpsertWithoutDetailsInput = {
    update: XOR<SaleUpdateWithoutDetailsInput, SaleUncheckedUpdateWithoutDetailsInput>
    create: XOR<SaleCreateWithoutDetailsInput, SaleUncheckedCreateWithoutDetailsInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutDetailsInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutDetailsInput, SaleUncheckedUpdateWithoutDetailsInput>
  }

  export type SaleUpdateWithoutDetailsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneRequiredWithoutSalesNestedInput
    member?: MemberUpdateOneWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutDetailsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookUpsertWithoutSaleDetailsInput = {
    update: XOR<BookUpdateWithoutSaleDetailsInput, BookUncheckedUpdateWithoutSaleDetailsInput>
    create: XOR<BookCreateWithoutSaleDetailsInput, BookUncheckedCreateWithoutSaleDetailsInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutSaleDetailsInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutSaleDetailsInput, BookUncheckedUpdateWithoutSaleDetailsInput>
  }

  export type BookUpdateWithoutSaleDetailsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUpdateManyWithoutBookNestedInput
    Review?: ReviewUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutSaleDetailsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUncheckedUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUncheckedUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUncheckedUpdateManyWithoutBookNestedInput
    Review?: ReviewUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookCreateWithoutReviewInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutReviewInput = {
    id?: string
    name: string
    price: number
    description?: string | null
    isbn?: string | null
    createdAt?: Date | string | null
    image?: string | null
    category?: string | null
    qty?: number
    status?: string
    averageRating?: number
    reviewCount?: number
    carts?: CartUncheckedCreateNestedManyWithoutBookInput
    OrderDetails?: OrderDetailUncheckedCreateNestedManyWithoutBookInput
    ImportToStock?: ImportToStockUncheckedCreateNestedManyWithoutBookInput
    saleDetails?: SaleDetailUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutReviewInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
  }

  export type MemberCreateWithoutReviewInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    sales?: SaleCreateNestedManyWithoutMemberInput
    Orders?: OrderCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutReviewInput = {
    id?: string
    phone: string
    username: string
    password: string
    status?: string
    address?: string | null
    name?: string | null
    profileImage?: string | null
    points?: number
    email: string
    sales?: SaleUncheckedCreateNestedManyWithoutMemberInput
    Orders?: OrderUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutReviewInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutReviewInput, MemberUncheckedCreateWithoutReviewInput>
  }

  export type BookUpsertWithoutReviewInput = {
    update: XOR<BookUpdateWithoutReviewInput, BookUncheckedUpdateWithoutReviewInput>
    create: XOR<BookCreateWithoutReviewInput, BookUncheckedCreateWithoutReviewInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutReviewInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutReviewInput, BookUncheckedUpdateWithoutReviewInput>
  }

  export type BookUpdateWithoutReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    averageRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    carts?: CartUncheckedUpdateManyWithoutBookNestedInput
    OrderDetails?: OrderDetailUncheckedUpdateManyWithoutBookNestedInput
    ImportToStock?: ImportToStockUncheckedUpdateManyWithoutBookNestedInput
    saleDetails?: SaleDetailUncheckedUpdateManyWithoutBookNestedInput
  }

  export type MemberUpsertWithoutReviewInput = {
    update: XOR<MemberUpdateWithoutReviewInput, MemberUncheckedUpdateWithoutReviewInput>
    create: XOR<MemberCreateWithoutReviewInput, MemberUncheckedCreateWithoutReviewInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutReviewInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutReviewInput, MemberUncheckedUpdateWithoutReviewInput>
  }

  export type MemberUpdateWithoutReviewInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    sales?: SaleUpdateManyWithoutMemberNestedInput
    Orders?: OrderUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutReviewInput = {
    phone?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutMemberNestedInput
    Orders?: OrderUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CartCreateManyBookInput = {
    id?: string
    memberId: string
    qty: number
  }

  export type OrderDetailCreateManyBookInput = {
    id?: string
    price: number
    qty: number
    orderId: string
  }

  export type ImportToStockCreateManyBookInput = {
    id?: string
    qty: number
    createdAt?: Date | string | null
    updateAt?: Date | string | null
  }

  export type SaleDetailCreateManyBookInput = {
    id?: string
    saleId: string
    qty: number
    price: number
  }

  export type ReviewCreateManyBookInput = {
    id?: string
    memberId: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type CartUpdateWithoutBookInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type CartUncheckedUpdateWithoutBookInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type CartUncheckedUpdateManyWithoutBookInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type OrderDetailUpdateWithoutBookInput = {
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    Order?: OrderUpdateOneRequiredWithoutOrderDetailNestedInput
  }

  export type OrderDetailUncheckedUpdateWithoutBookInput = {
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderDetailUncheckedUpdateManyWithoutBookInput = {
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type ImportToStockUpdateWithoutBookInput = {
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportToStockUncheckedUpdateWithoutBookInput = {
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportToStockUncheckedUpdateManyWithoutBookInput = {
    qty?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SaleDetailUpdateWithoutBookInput = {
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    sale?: SaleUpdateOneRequiredWithoutDetailsNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutBookInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SaleDetailUncheckedUpdateManyWithoutBookInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUpdateWithoutBookInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBookInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutBookInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyAdminInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    memberId?: string | null
  }

  export type SaleUpdateWithoutAdminInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    member?: MemberUpdateOneWithoutSalesNestedInput
    details?: SaleDetailUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutAdminInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutAdminInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SaleCreateManyMemberInput = {
    id?: string
    createdAt?: Date | string
    total: number
    cashPaid?: number
    change?: number
    pointUsed?: number
    paymentMethod: string
    remark?: string | null
    adminId: string
  }

  export type OrderCreateManyMemberInput = {
    id?: string
    createdAt: Date | string
    slipImage: string
    status?: string
    trackCode?: string
    express?: string
    remark?: string
    customerName: string
    customerAddress: string
    customerPhone: string
    total?: number
  }

  export type ReviewCreateManyMemberInput = {
    id?: string
    bookId: string
    rating: number
    comment?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type SaleUpdateWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneRequiredWithoutSalesNestedInput
    details?: SaleDetailUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    details?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    cashPaid?: FloatFieldUpdateOperationsInput | number
    change?: FloatFieldUpdateOperationsInput | number
    pointUsed?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUpdateWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    OrderDetail?: OrderDetailUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    OrderDetail?: OrderDetailUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutMemberInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slipImage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trackCode?: StringFieldUpdateOperationsInput | string
    express?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUpdateWithoutMemberInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    book?: BookUpdateOneRequiredWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutMemberInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutMemberInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderDetailCreateManyOrderInput = {
    id?: string
    bookId: string
    price: number
    qty: number
  }

  export type OrderDetailUpdateWithoutOrderInput = {
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    Book?: BookUpdateOneRequiredWithoutOrderDetailsNestedInput
  }

  export type OrderDetailUncheckedUpdateWithoutOrderInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type OrderDetailUncheckedUpdateManyWithoutOrderInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
  }

  export type SaleDetailCreateManySaleInput = {
    id?: string
    bookId: string
    qty: number
    price: number
  }

  export type SaleDetailUpdateWithoutSaleInput = {
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    book?: BookUpdateOneRequiredWithoutSaleDetailsNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutSaleInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SaleDetailUncheckedUpdateManyWithoutSaleInput = {
    bookId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
import type { ApiResponse } from "../typings/api"

// export async function errorHandler(ctx: Context, next: () => Promise<void>) {
//   try {
//     await next()
//   } catch (error) {
//     const status = error?.status || 500
//     const response: ApiResponse<ErrorResponse> = {
//       error: {
//         code: status,
//         message: error?.message,
//         ...(error?.errors ? { errors: error?.errors } : {}),
//       },
//     }
//     ctx.status = status
//     ctx.body = { ...response }
//   }
// }
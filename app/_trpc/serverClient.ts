import { httpBatchLink } from "@trpc/client";
import { AppRouter, appRouter } from "@/server";

// export const serverClient = appRouter.createCaller({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:3000/api/trpc",
//     }),
//   ],
// });

import { z } from "zod";
import { procedure, router } from "../trpc";
import { instance, provider } from "@/utils/instance";
import { Transaction } from "ethers";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  issue: procedure
    .input(
      z.object({
        id: z.number().nullable(),
        name: z.string(),
        course: z.string(),
        grade: z.string(),
        date: z.string(),
      })
    )
    .mutation(async (req) => {
      const trx: Transaction = await instance.issue(
        req.input.id,
        req.input.name,
        req.input.course,
        req.input.grade,
        req.input.date
      );
      console.log(trx);
      const receipt = await provider.getTransactionReceipt(trx.hash!);
      console.log(receipt);
      if (!!receipt.status) {
        return {
          message: `Certificate for ID: ${req.input.id} is issued`,
        };
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Transaction has failed to commit",
        });
      }
    }),

  fetch: procedure
    .input(
      z.object({
        id: z.number().nullish(),
      })
      .nullish()
    )
    .query((req) => {
      return req.input?.id;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

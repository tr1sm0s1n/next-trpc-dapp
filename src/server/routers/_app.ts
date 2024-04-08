import { z } from 'zod';
import { procedure, router } from '../trpc';
import { getInstance, provider } from '@/utils/instance';
import { Contract, Transaction } from 'ethers';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
  issue: procedure
    .input(
      z.object({
        id: z.number().nullable(),
        name: z.string(),
        course: z.string(),
        grade: z.string(),
        date: z.string(),
      }),
    )
    .mutation(async (req) => {
      console.log(req.input);

      const instance: Contract = await getInstance();
      const trx: Transaction = await instance.issue(
        req.input.id,
        req.input.name,
        req.input.course,
        req.input.grade,
        req.input.date,
      );
      const receipt = await provider.getTransactionReceipt(trx.hash!);
      console.log(receipt);
      if (!!receipt?.status) {
        return {
          message: `Certificate for ID: ${req.input.id} is issued`,
        };
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Transaction has failed to commit',
        });
      }
    }),

  fetch: procedure
    .input(
      z
        .object({
          id: z.number().nullish(),
        })
        .nullish(),
    )
    .output(
      z
        .object({
          id: z.number(),
          name: z.string(),
          course: z.string(),
          grade: z.string(),
          date: z.string(),
        })
        .nullish(),
    )
    .mutation(async (req) => {
      console.log(req);

      if (req.input?.id) {
        const instance: Contract = await getInstance();
        const certificate: string[] = await instance.Certificates(req.input.id);
        console.log('cert', certificate);
        if (certificate[0]) {
          return {
            id: req.input.id,
            name: certificate[0],
            course: certificate[1],
            grade: certificate[2],
            date: certificate[3],
          };
        } else {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No certificate issued for ${req.input.id}`,
          });
        }
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Provide a valid certificate ID',
        });
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

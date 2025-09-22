import { z } from 'zod';

export const IdSchema = z.union([z.string().min(1), z.number().int()]);
export const TimestampSchema = z.string().datetime({ offset: true });

export const PaginationMetaSchema = z.object({
  page: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});

export const makePaginated = <T extends z.ZodTypeAny>(item: T) =>
  z.object({ data: z.array(item), meta: PaginationMetaSchema });

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

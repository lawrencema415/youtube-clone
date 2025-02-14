import { z } from 'zod';
import { db } from "@/db";
import { eq, and, or, lt, desc } from 'drizzle-orm';
import { videos } from "@/db/schema";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure.
  input(
    z.object({
      cursor: z.object({
        id: z.string().uuid(),
        updatedAt: z.date(),
      }).nullish(),
      limit: z.number().min(1).max(100),
    })
  ).
  query(async ({ctx, input}) => {
    const { cursor, limit } = input;
    const { id: userId } = ctx.user;


    const data = await
      db
      .select() // Select all columns
      .from(videos) // From the 'videos' table
      .where(
        and(
          eq(videos.userId, userId), // Filter videos by the specified userId
          cursor
            ? or(
                lt(videos.updatedAt, cursor.updatedAt), // If cursor is provided, select videos updated before the cursor's updatedAt
                and(
                  eq(videos.updatedAt, cursor.updatedAt), // If updatedAt is the same as the cursor's, 
                  lt(videos.id, cursor.id) // then select videos with an id less than the cursor's id
                )
              )
            : undefined // If no cursor, ignore this condition
        )
      ).orderBy(desc(videos.updatedAt), desc(videos.id))
      // Add 1 to the limit to check if there is more data
      .limit(limit + 1);

    const hasMore = data.length > limit;
    // remove the last item if there is more data
    const items = hasMore ? data.slice(0, -1) : data;
    // set next cursor to the last item fi there are more data

    const lastItem = items[items.length - 1];
    const nextCursor = hasMore ? {
      id: lastItem.id,
      updatedAt: lastItem.updatedAt
    } : null;

    return {
      items,
      nextCursor
    };
  })
});

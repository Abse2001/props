import { distance } from "circuit-json"
import { z } from "zod"
import { nine_point_anchor } from "lib/common/nine_point_anchor"

export const schematicBoxProps = z
  .object({
    schX: distance,
    schY: distance,
    width: distance.optional(),
    height: distance.optional(),
    overlay: z.array(z.string()).optional(),

    padding: distance.optional(),
    paddingLeft: distance.optional(),
    paddingRight: distance.optional(),
    paddingTop: distance.optional(),
    paddingBottom: distance.optional(),

    title: z.string().optional(),
    titlePosition: nine_point_anchor.default("top_left"),
    titleColor: z.string().optional(),
    titleFontSize: distance.optional(),
    titleInside: z.boolean().default(false),
    strokeStyle: z.enum(["solid", "dashed"]).default("solid"),
  })
  .superRefine((data, ctx) => {
    const hasFixedSize = data.width !== undefined && data.height !== undefined
    const hasOverlay = Array.isArray(data.overlay) && data.overlay.length > 0

    if (!hasFixedSize && !hasOverlay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Must provide either both `width` and `height`, or a non-empty `overlay` array.",
      })
    }

    if (hasFixedSize && hasOverlay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Cannot provide both `overlay` and (`width` and `height`) — choose one mode.",
      })
    }
  })

export type SchematicBoxProps = z.input<typeof schematicBoxProps>

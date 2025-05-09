import { distance } from "circuit-json"
import { nine_point_anchor } from "lib/common/nine_point_anchor"
import { five_point_anchor } from "lib/common/five_point_anchor"
import { z } from "zod"

export const schematicTextProps = z.object({
  schX: distance,
  schY: distance,
  text: z.string(),
  anchor: z
    .union([five_point_anchor.describe("legacy"), nine_point_anchor])
    .optional(),
  color: z.string().optional(),
})
export type SchematicTextProps = z.input<typeof schematicTextProps>

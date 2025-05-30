import { distance } from "circuit-json"
import { z } from "zod"
import { nine_point_anchor } from "lib/common/nine_point_anchor"

const baseFields = {
  schX: distance,
  schY: distance,
  padding: distance.optional(),
  title: z.string().optional(),
  titlePosition: nine_point_anchor.default("top_left"),
  titleColor: z.string().optional(),
  titleFontSize: distance.optional(),
  titleInside: z.boolean().default(false),
  strokeStyle: z.enum(["solid", "dashed"]).default("solid"),
  paddingLeft: distance.optional(),
  paddingRight: distance.optional(),
  paddingTop: distance.optional(),
  paddingBottom: distance.optional(),
}

const overlayMode = z.object({
  overlay: z.array(z.string()),
  width: z.never().optional(),
  height: z.never().optional(),
  ...baseFields,
})

const fixedSizeMode = z.object({
  width: distance,
  height: distance,
  overlay: z.never().optional(),
  ...baseFields,
})

const schematicBoxPropsType = z
  .union([overlayMode, fixedSizeMode])
  .describe("SchematicBoxProps")

export const schematicBoxProps = schematicBoxPropsType
export type SchematicBoxProps = z.input<typeof schematicBoxProps>

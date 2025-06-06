import { z } from "zod"
import {
  type CommonComponentProps,
  commonComponentProps,
} from "lib/common/layout"
import type { Connections } from "lib/utility-types/connections-and-selectors"

/**
 * Pin labels for fuse component
 */
export const fusePinLabels = ["pin1", "pin2"] as const

export type FusePinLabels = (typeof fusePinLabels)[number]

export interface FuseProps extends CommonComponentProps {
  /**
   * Current rating of the fuse in amperes
   */
  currentRating: number | string

  /**
   * Voltage rating of the fuse
   */
  voltageRating?: number | string

  /**
   * Whether to show ratings on schematic
   */
  schShowRatings?: boolean

  /**
   * Connections to other components
   */
  connections?: Connections<FusePinLabels>
}

/**
 * Schema for validating fuse props
 */
export const fuseProps = commonComponentProps.extend({
  currentRating: z.union([z.number(), z.string()]),
  voltageRating: z.union([z.number(), z.string()]).optional(),
  schShowRatings: z.boolean().optional(),
  connections: z
    .record(
      z.string(),
      z.union([
        z.string(),
        z.array(z.string()).readonly(),
        z.array(z.string()),
      ]),
    )
    .optional(),
})

export type InferredFuseProps = z.input<typeof fuseProps>

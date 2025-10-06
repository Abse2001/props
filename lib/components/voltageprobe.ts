import {
  type CommonComponentProps,
  commonComponentProps,
} from "lib/common/layout"
import { expectTypesMatch } from "lib/typecheck"
import { z } from "zod"

export interface VoltageProbeProps extends Omit<CommonComponentProps, "name"> {
  name?: string
  connectsTo: string | string[]
}

export const voltageProbeProps = commonComponentProps
  .omit({ name: true })
  .extend({
    name: z.string().optional(),
    connectsTo: z.string().or(z.array(z.string())),
  })

expectTypesMatch<VoltageProbeProps, z.input<typeof voltageProbeProps>>(true)

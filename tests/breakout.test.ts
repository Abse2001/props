import { expect, test } from "bun:test"
import { breakoutProps, type BreakoutProps } from "../lib/components/breakout"
import {
  breakoutPointProps,
  type BreakoutPointProps,
} from "../lib/components/breakoutpoint"

test("should parse breakout props with padding", () => {
  const raw: BreakoutProps = {
    name: "bo",
    padding: 1,
    paddingLeft: "2mm",
  }

  const parsed = breakoutProps.parse(raw)
  expect(parsed.padding).toBe(1)
  expect(parsed.paddingLeft).toBe(2)
})

test("should parse breakout point props", () => {
  const raw: BreakoutPointProps = {
    pcbX: 5,
    pcbY: "2mm",
    connection: ".R1 > .pin1",
  }

  const parsed = breakoutPointProps.parse(raw)
  expect(parsed.pcbX).toBe(5)
  expect(parsed.pcbY).toBe(2)
  expect(parsed.connection).toBe(".R1 > .pin1")
})

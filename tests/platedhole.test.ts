import { expect, test } from "bun:test"
import {
  platedHoleProps,
  type PlatedHoleProps,
} from "../lib/components/platedhole"
import { expectTypeOf } from "expect-type"
import type { z } from "zod"

test("should parse CircularHoleWithRectPlatedProps with all required fields", () => {
  const rawProps: PlatedHoleProps = {
    shape: "circular_hole_with_rect_pad",
    holeDiameter: 5,
    rectPadWidth: 10,
    rectPadHeight: 20,
  }

  expectTypeOf(rawProps).toMatchTypeOf<z.input<typeof platedHoleProps>>()

  const parsedProps = platedHoleProps.parse(rawProps)

  if (parsedProps.shape === "circular_hole_with_rect_pad") {
    expect(parsedProps.holeDiameter).toBe(5)
    expect(parsedProps.rectPadWidth).toBe(10)
    expect(parsedProps.rectPadHeight).toBe(20)
  } else {
    throw new Error(
      "Expected CircularHoleWithRectPlatedProps, but got a different shape",
    )
  }
})

test("should parse PillPlatedHoleProps with all required fields", () => {
  const rawProps: PlatedHoleProps = {
    shape: "pill",
    outerHeight: "3mm",
    outerWidth: "2.3mm",
    holeHeight: "2.7mm",
    holeWidth: "1.3mm",
  }

  expectTypeOf(rawProps).toMatchTypeOf<z.input<typeof platedHoleProps>>()

  const parsedProps = platedHoleProps.parse(rawProps)

  if (parsedProps.shape === "pill") {
    expect(parsedProps.holeHeight).toBe(2.7)
    expect(parsedProps.holeWidth).toBe(1.3)
    expect(parsedProps.outerHeight).toBe(3)
    expect(parsedProps.outerWidth).toBe(2.3)
  } else {
    throw new Error("Expected PillPlatedHoleProps, but got a different shape")
  }
})

test("should parse PillPlatedHoleProps with all required fields", () => {
  // @ts-expect-error DEPRECATED fields
  const rawProps: PlatedHoleProps = {
    shape: "pill",
    outerHeight: "3mm",
    outerWidth: "2.3mm",
    innerHeight: "2.7mm",
    innerWidth: "1.3mm",
  }

  expectTypeOf(rawProps).toMatchTypeOf<z.input<typeof platedHoleProps>>()

  const parsedProps = platedHoleProps.parse(rawProps)

  if (parsedProps.shape === "pill") {
    expect(parsedProps.holeHeight).toBe(2.7)
    expect(parsedProps.holeWidth).toBe(1.3)
    expect(parsedProps.outerHeight).toBe(3)
    expect(parsedProps.outerWidth).toBe(2.3)
  } else {
    throw new Error("Expected PillPlatedHoleProps, but got a different shape")
  }
})

test("should parse OvalPlatedHoleProps with all required fields", () => {
  const rawProps: PlatedHoleProps = {
    shape: "oval",
    outerHeight: "3mm",
    outerWidth: "2.3mm",
    holeHeight: "2.7mm",
    holeWidth: "1.3mm",
  }

  expectTypeOf(rawProps).toMatchTypeOf<z.input<typeof platedHoleProps>>()

  const parsedProps = platedHoleProps.parse(rawProps)

  if (parsedProps.shape === "oval") {
    expect(parsedProps.holeHeight).toBe(2.7)
    expect(parsedProps.holeWidth).toBe(1.3)
    expect(parsedProps.outerHeight).toBe(3)
    expect(parsedProps.outerWidth).toBe(2.3)
  } else {
    throw new Error("Expected OvalPlatedHoleProps, but got a different shape")
  }
})

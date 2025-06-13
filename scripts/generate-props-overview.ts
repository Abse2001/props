import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read all TypeScript files in the lib directory recursively
function getAllTypeScriptFiles(dir: string): string[] {
  const files: string[] = []
  const items = fs.readdirSync(dir).sort()

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllTypeScriptFiles(fullPath))
    } else if (item.endsWith(".ts")) {
      files.push(fullPath)
    }
  }

  return files
}

// Extract exported interfaces from file content
function extractInterfaces(content: string): string[] {
  const interfaces: string[] = []
  const lines = content.split("\n")
  let currentInterface = ""
  let isCapturing = false

  for (const line of lines) {
    if (line.startsWith("export interface") && !line.includes("@deprecated")) {
      isCapturing = true
      currentInterface = `${line}\n`
    } else if (isCapturing) {
      currentInterface += `${line}\n`
      if (line === "}") {
        interfaces.push(currentInterface)
        isCapturing = false
        currentInterface = ""
      }
    }
  }

  return interfaces
}

// Main execution
const libDir = path.join(__dirname, "../lib")
const files = getAllTypeScriptFiles(libDir).sort()

const allInterfaces = files
  .flatMap((file) => {
    const content = fs.readFileSync(file, "utf8")
    return extractInterfaces(content)
  })
  .sort((a, b) => {
    const nameA = /export interface\s+(\w+)/.exec(a)?.[1] || ""
    const nameB = /export interface\s+(\w+)/.exec(b)?.[1] || ""
    return nameA.localeCompare(nameB)
  })

// Generate markdown content
const template = `# @tscircuit/props Overview

> Generated at ${new Date().toISOString()}
> Latest version: https://github.com/tscircuit/props/blob/main/generated/PROPS_OVERVIEW.md

This document provides an overview of all the prop types available in @tscircuit/props.
Each interface has a corresponding zod validator that can be imported from the package.

For example, for \`ChipProps\` there is a \`chipProps\` zod validator:

\`\`\`ts
import { chipProps, type ChipProps } from "@tscircuit/props"

// Validate/parse props
const validatedProps = chipProps.parse(unknownProps)
\`\`\`

## Available Props

\`\`\`ts
${allInterfaces.join("\n\n")}
\`\`\`
`

// Write to generated directory
const generatedDir = path.join(__dirname, "../generated")
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir)
}

fs.writeFileSync(path.join(generatedDir, "PROPS_OVERVIEW.md"), template)

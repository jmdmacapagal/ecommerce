import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert prisma object to plain object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: unknown): Promise<string> {
  // Handle Zod errors
  if (error instanceof ZodError) {
    const fieldErrors = error.issues.map((issue) => issue.message);
    return fieldErrors.join(". ");
  }

  // Handle Prisma unique constraint error (P2002)
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    const field = Array.isArray(error.meta?.target)
      ? error.meta?.target[0]
      : "Field";

    return `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } already exists. Please use a different ${field}.`;
  }

  // Generic fallback
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string" ? message : JSON.stringify(message);
  }

  return "An unknown error occurred.";
}

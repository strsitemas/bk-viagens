import "server-only";

type LogLevel = "INFO" | "WARN" | "ERROR";

type LogContext = Record<string, unknown>;

const SENSITIVE_KEYS = [
  "password",
  "senha",
  "senhahash",
  "token",
  "authorization",
  "cookie",
  "auth_secret",
  "database_url",
];

function sanitize(
  value: unknown
): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  if (Array.isArray(value)) {
    return value.map(sanitize);
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const result: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(
      value as Record<string, unknown>
    )) {
      const normalizedKey =
        key.toLowerCase();

      if (
        SENSITIVE_KEYS.some((sensitive) =>
          normalizedKey.includes(sensitive)
        )
      ) {
        result[key] = "[REDACTED]";
        continue;
      }

      result[key] = sanitize(item);
    }

    return result;
  }

  return value;
}

function writeLog(
  level: LogLevel,
  event: string,
  context: LogContext = {}
) {
  const entry = {
    timestamp: new Date().toISOString(),
    service: "buckart-viagens",
    level,
    event,
    ...sanitize(context) as object,
  };

  const serialized = JSON.stringify(entry);

  if (level === "ERROR") {
    console.error(serialized);
    return;
  }

  if (level === "WARN") {
    console.warn(serialized);
    return;
  }

  console.info(serialized);
}

export const logger = {
  info(
    event: string,
    context: LogContext = {}
  ) {
    writeLog("INFO", event, context);
  },

  warn(
    event: string,
    context: LogContext = {}
  ) {
    writeLog("WARN", event, context);
  },

  error(
    event: string,
    error: unknown,
    context: LogContext = {}
  ) {
    writeLog("ERROR", event, {
      ...context,
      error,
    });
  },
};

export function createRequestId() {
  return crypto.randomUUID();
}
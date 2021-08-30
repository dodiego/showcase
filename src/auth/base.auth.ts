import { AnyMongoAbility } from "@casl/ability"

export function checkPermissions<T>(
  permissions: AnyMongoAbility,
  action: string,
  subject: T
) {
  if (permissions.cannot(action, subject)) {
    throw new Error("User not authorized to perform this")
  }
}

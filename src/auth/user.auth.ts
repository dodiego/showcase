import { defineAbility } from "@casl/ability"

export function getUserPermissions(userId: string) {
  const userOwnsNote = { ownerId: userId }
  return defineAbility((can) => {
    can("create", "note")
    can("delete", "note", userOwnsNote)
    can("update", "note", userOwnsNote)
    can("tag", "note", userOwnsNote)
    can("read", "note", userOwnsNote)

    can("create", "tag")
  })
}

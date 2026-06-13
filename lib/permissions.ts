import type { UserRole } from "@/types/database.types";

export const ROLES = {
  ADMIN: "admin" as UserRole,
  EDITOR: "editor" as UserRole,
  STAFF: "staff" as UserRole,
  STUDENT: "student" as UserRole,
} as const;

export const ADMIN_ROLES: UserRole[] = ["admin", "editor", "staff"];
export const CMS_ROLES: UserRole[] = ["admin", "editor"];

export function isAdminRole(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return ADMIN_ROLES.includes(role);
}

export function canManageNews(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return CMS_ROLES.includes(role);
}

export function isStudent(role: UserRole | null | undefined): boolean {
  return role === ROLES.STUDENT;
}

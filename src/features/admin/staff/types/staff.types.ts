export type StaffRole = "kasir" | "admin";

export interface Staff {
  id: string;
  name: string | null;
  email: string;
  role: StaffRole | null;
}

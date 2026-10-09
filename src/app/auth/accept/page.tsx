import { db } from "@/db";
import { invitations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AcceptInvitePage({ searchParams }: { searchParams: Promise<{ token: string }> }) {
  const { token } = await searchParams;
  if (!token) redirect("/auth/login");

  const invite = await db.select().from(invitations).where(eq(invitations.token, token)).then(res => res[0]);

  if (!invite || invite.expiresAt < new Date()) {
    return <div className="p-10 text-center">Undangan kadaluarsa atau tidak valid.</div>;
  }

  // Arahkan ke form registrasi dengan email dan role yang terisi
  redirect(`/auth/register?email=${invite.email}&role=${invite.role}&token=${token}`);
}

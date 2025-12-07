"use client";

import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return <PrivacyPolicyContent onClose={() => router.push("/")} />;
}

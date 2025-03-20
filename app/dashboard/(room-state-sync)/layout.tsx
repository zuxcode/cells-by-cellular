import { createClient } from "@/utils/supabase/server";
import React from "react";
import { StateSync } from "./_state-sync";

export default async function Layout({ children }: React.PropsWithChildren) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hotel_rooms")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div>
      <StateSync serverState={data || []} errorMessage={error} />
      {children}
    </div>
  );
}

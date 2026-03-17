import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [];  // Empty array - koi static page generate nahi hoga
}

export default function CatchAllRedirect() {
  redirect("/");
}
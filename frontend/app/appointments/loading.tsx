import ProgressLoader from "@/components/ui/loading";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111827]">
      <ProgressLoader />
    </main>
  );
}
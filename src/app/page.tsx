import FastestPathSearch from "@/components/fastest_path_search/FastestPathSearch";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 px-6 py-10 text-neutral-900">
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <FastestPathSearch />
      </div>
    </div>
  );
}

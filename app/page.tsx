import Image from "next/image";
import SelectInput from "./ui/SelectInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SelectInput />
    </main>
  );
}

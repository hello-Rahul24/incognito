import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>hi welcome to incognito</h1>
      <h2>here you can chat whatever you want with your friends</h2>
      <Link href="/create">
        <button className="p-7 bg-amber-300">create room</button>
      </Link>
      <br />
      <Link href="/join">
        <button className="p-7 bg-amber-700">join room</button>
      </Link>{" "}
    </div>
  );
}

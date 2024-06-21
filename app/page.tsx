export default function Home() {
  return (
    <div className="container mx-auto px-10 py-20">
      <div className="grid grid-cols-4 gap-5">
        <div className="border border-neutral-800 p-8 rounded-md">
          <div>Total Revenue</div>
          <div className="text-4xl font-bold mt-5">$45,231.89</div>
          <div className="text-sm opacity-60">+20.1% from last month</div>
        </div>
        <div className="border border-neutral-800 p-8 rounded-md">
          <div>Sales</div>
          <div className="text-4xl font-bold mt-5">+12,234</div>
          <div className="text-sm opacity-60">+19% from last month</div>
        </div>
      </div>
    </div>
  );
}
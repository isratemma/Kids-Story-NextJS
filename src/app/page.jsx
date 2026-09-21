import Banner from '@/components/home/Banner';
import Products from '@/components/home/Products';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans text-black">
      <Banner />
      <div id="products" className="w-full">
        <Products />
      </div>
    </div>
  );
}

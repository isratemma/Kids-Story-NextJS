import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="flex flex-col items-center gap-8 px-6 py-12 text-center md:flex-row md:justify-between md:text-left">
      <div className="max-w-xl">
        <h2 className="text-2xl font-bold md:text-6xl text-black">
          Care for your child&apos;s <span className="text-primary">future</span>
        </h2>
        <p className="mt-4 text-lg text-black">
          Buy every toy with up to 15% off
        </p>
        <Link href="/#products" className="btn btn-primary mt-3 inline-flex">
          Explore Products
        </Link>
      </div>
      <div>
        <Image alt="Hero Image" src="/assets/hero.png" width={500} height={400} />
      </div>
    </div>
  );
};

export default Banner;

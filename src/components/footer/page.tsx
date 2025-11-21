import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-accent-primary-light w-full py-6  items-center justify-center mt-10 border-t border-t-accent-orange">
      <div className="flex justify-center mx-auto mt-4 mb-6">
        <Image
          src="/Am.png"
          alt="logo aspect white"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="text-white text-xl">
          Developed by{' '}
          <a
            href="https://tricia-sz.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium  hover:underline dark:text-amber-500"
          >
            Patrícia Souza
          </a>{' '}
          💛2025
        </div>
      </div>
    </footer>
  );
}

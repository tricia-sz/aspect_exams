import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { IoHomeSharp } from 'react-icons/io5';
import { FaUserDoctor } from 'react-icons/fa6';
import { GrSchedule } from 'react-icons/gr';

export default function Header() {
  return (
    <header className="bg-accent-primary w-full mx-auto border-b border-b-accent-purple leading-relaxed">
      <div className="w-full container mx-auto flex items-center justify-between px-6 py-8">
        <div className=" items-center gap-3">
          <Image
            src="/Am.png"
            alt="logo aspect white"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        <nav className="w-full text-white justify-center flex items-center gap-14 px-4 py-2">
          <Link
            href={'/'}
            className="bg-white text-accent-primary gap-6 px-6 py-2  rounded-md hover:bg-accent-purple transition hover:bg-amber-500"
          >
            <div className="flex gap-2">
              <IoHomeSharp className="text-accent-primary" size={24} />
              Home
            </div>
          </Link>
          <Link
            href={'/exam'}
            className="bg-white text-accent-primary px-6 py-2  rounded-md hover:bg-accent-purple transition hover:bg-amber-500"
          >
            <div className="flex gap-3">
              <FaUserDoctor size={24} className="text-accent-primary" />
              Exames
            </div>
          </Link>
          <Link
            href={'/appointment'}
            className="bg-white text-accent-primary gap-6 px-6 py-2  rounded-md hover:bg-accent-purple transition hover:bg-amber-500"
          >
            <div className="flex gap-3">
              <GrSchedule size={24} className="text-accent-primary" />
              Agendamentos
            </div>
          </Link>
        </nav>
        <div className="rounded-full hover:bg-accent-purple-light transition text-accent-orange">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

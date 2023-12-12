import useMultiSteps from '@/hooks/useMultiSteps';
import { cn } from '@/lib/utils';

const sideBar = ['Search Flight', 'Select Flight', 'Passenger Info', 'Summary'];

export default function Sidebar() {
  const { currentIndex } = useMultiSteps(sideBar.length + 1);

  return (
    <aside className="py-8 px-10 bg-purple text-white sm:rounded-md">
      <ul className="flex sm:flex-col gap-8 justify-center">
        {sideBar.map((item, index) => (
          <li key={item} className="flex gap-x-4 items-center">
            <span
              className={cn(
                'font-bold text-lg rounded-full border-2 w-10 h-10 flex justify-center items-center',
                {
                  'bg-sky-blue text-primary border-transparent': currentIndex === index,
                },
              )}>
              {index + 1}
            </span>
            <div className="sm:grid text-sm hidden">
              <span className="text-light-blue">Step {index + 1}</span>
              <span className="uppercase font-bold tracking-wider">{item}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

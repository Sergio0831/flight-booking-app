import { cn } from '@/lib/utils';
import { useSteps } from '@/hooks/useSteps';

const sideBar = ['Search Flight', 'Select Flight', 'Passenger Info', 'Summary'];

export default function Sidebar() {
  const { currentStep } = useSteps();

  return (
    <aside className="sm:py-8 pt-8 pb-16 sm:px-10 bg-sidebar text-white sm:rounded-md bg-sidebar-pattern bg-no-repeat sm:bg-bottom bg-left bg-contain">
      <ul className="flex sm:flex-col gap-8 justify-center">
        {sideBar.map((item, index) => (
          <li key={item} className="flex gap-x-4 items-center">
            <span
              className={cn(
                'font-bold text-lg rounded-full border-2 border-white w-10 h-10 flex justify-center items-center',
                {
                  'bg-sky-blue text-denim border-transparent': currentStep === index,
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

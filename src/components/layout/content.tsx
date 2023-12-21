type ContentProps = {
  children: React.ReactNode;
};

export default function Content({ children }: ContentProps) {
  return (
    <div className="mobile:bg-card mobile:mx-4 mobile:-mt-8 mobile:py-6 sm:px-10 sm:py-3 mobile:px-8 mobile:rounded-sm mobile:shadow-base  mobile:h-fit overflow-scroll">
      {children}
    </div>
  );
}

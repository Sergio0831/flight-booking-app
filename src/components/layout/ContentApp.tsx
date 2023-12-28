type ContentProps = {
  children: React.ReactNode;
};

/**
 * Content component for wrapping content with responsive styling.
 * @param children - The content to be wrapped by the Content component.
 */
export default function Content({ children }: ContentProps) {
  return (
    <div className="mobile:bg-card mobile:mx-4 mobile:-mt-8 mobile:py-6 sm:px-10 sm:py-3 mobile:px-8 mobile:rounded-sm mobile:shadow-base  mobile:h-fit overflow-scroll">
      {children}
    </div>
  );
}

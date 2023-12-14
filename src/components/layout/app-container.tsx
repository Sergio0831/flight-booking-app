type AppContainerProps = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <div className="sm:container">
      <div className="sm:bg-card sm:h-600 sm:rounded-xl sm:shadow-base sm:p-4 grid sm:grid-cols-[auto_1fr]">
        {children}
      </div>
    </div>
  );
};

export default AppContainer;

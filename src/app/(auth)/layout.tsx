interface Ichildren {
  children: React.ReactNode;
}

const layout = ({ children }: Ichildren) => {
  return (
    <div className="bg-gray-700 min-h-svh flex flex-col items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
};

export default layout;

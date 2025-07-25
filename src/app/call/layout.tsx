interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return <div className="h-screen bg-black">{children}</div>;
};

export default Layout;

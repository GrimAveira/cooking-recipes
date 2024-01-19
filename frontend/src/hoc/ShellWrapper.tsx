import Footer from "../components/footer/Footer";
import Shell from "../components/shell/Shell";

const ShellWrapper = (Component: () => JSX.Element) => {
  return (
    <>
      <Shell />
      <Component />
      <Footer />
    </>
  );
};

export default ShellWrapper;

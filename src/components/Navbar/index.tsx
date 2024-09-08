import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <Image
        src="/images/logo-dave-text.png"
        alt="Dodgy Dave's Stock Predictions"
        width={340}
        height={240}
      />
    </header>
  );
};

export default Navbar;

function Footer() {
  return (
    <footer className="w-full h-12 fixed bottom-0 left-0 flex flex-col justify-center items-center text-center bg-gray-900/75 backdrop-blur-xs shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <p className="text-xs">&copy; {new Date().getFullYear()} - Cowabunga</p>
      <p className="text-[8px] font-extralight">All images and trademarks are the property of their respective owners.</p>
    </footer>
  );
}

export default Footer;

function Footer() {
  return (
    <footer className="w-full h-12 fixed bottom-0 left-0 flex flex-col justify-center items-center border-t bg-white">
      <p className="text-sm">&copy; {new Date().getFullYear()} - Cowabunga</p>
      <p className="text-xs">All images and trademarks are the property of their respective owners.</p>
    </footer>
  );
}

export default Footer;

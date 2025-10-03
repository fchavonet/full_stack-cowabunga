function Footer() {
  return (
    <footer className="w-full h-12 fixed bottom-0 left-0 flex justify-center items-center border-t bg-white">
      <p>&copy; {new Date().getFullYear()} - Cowabunga</p>
    </footer>
  );
}

export default Footer;

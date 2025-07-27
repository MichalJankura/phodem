const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full bg-black bg-opacity-90 py-6 border-t border-white/10">
            <div className="w-full max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center">
                    <span className="text-sm text-white/70 mb-4 md:mb-0 text-center">© Phố đêm {currentYear}. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
        
    );
};
export default Footer;

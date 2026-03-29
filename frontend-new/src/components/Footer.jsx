import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#131921] text-white mt-16">
      {/* Back to Top */}
      <div className="bg-[#1f2937] px-6 py-4 text-center hover:bg-[#374151] cursor-pointer">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑ Back to top
        </button>
      </div>

      {/* Footer Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h4 className="font-bold mb-4">Get to Know Us</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Amazon</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press Releases</a></li>
              <li><a href="#" className="hover:text-white">Amazon Science</a></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h4 className="font-bold mb-4">Make Money with Us</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Sell on Amazon</a></li>
              <li><a href="#" className="hover:text-white">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:text-white">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:text-white">Become an Affiliate</a></li>
            </ul>
          </div>

          {/* Amazon Business */}
          <div>
            <h4 className="font-bold mb-4">Amazon Business</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Amazon Business</a></li>
              <li><a href="#" className="hover:text-white">AmazonFresh</a></li>
              <li><a href="#" className="hover:text-white">Amazon Pharmacy</a></li>
              <li><a href="#" className="hover:text-white">Amazon Pay</a></li>
            </ul>
          </div>

          {/* Help & Settings */}
          <div>
            <h4 className="font-bold mb-4">Let Us Help You</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Your Account</a></li>
              <li><a href="#" className="hover:text-white">Returns Centre</a></li>
              <li><a href="#" className="hover:text-white">Recalls and Product Safety</a></li>
              <li><a href="#" className="hover:text-white">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
          <div className="mb-4">
            <a href="#" className="hover:text-white">Conditions of Use</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white">Privacy Notice</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white">Your Ads Privacy Choices</a>
          </div>
          <p>© 1996-2024, Amazon Clone, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

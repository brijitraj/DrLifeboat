import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-gray-50 border-t border-gray-200 mt-16">
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">
      <div className="space-y-2">
        <h3 className="font-bold text-lg">Dr. <span className="text-orange-500">Lifeboat</span></h3>
        <p className="flex items-center gap-2"><Mail size={16} /> info@drlifeboat.com</p>
        <p className="flex items-center gap-2"><Phone size={16} /> +91 9344288749</p>
        <p className="flex items-start gap-2">
          <MapPin size={16} className="mt-1 shrink-0" /> 3rd Floor, Devashree Plaza, Kitthettil Lane, Ulloor Junction, 695011, Trivandrum, Kerala.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1 text-gray-600">
          <li>Benefits</li><li>Our Courses</li><li>Our Testimonials</li><li>Our FAQ</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">About Us</h4>
        <ul className="space-y-1 text-gray-600">
          <li>Company</li><li>Achievements</li><li>Our Goals</li>
        </ul>
      </div>
    </div>
    <p className="text-center text-xs text-gray-500 pb-6">© 2025 DrLifeBoat. All rights reserved.</p>
  </footer>
);

export default Footer;

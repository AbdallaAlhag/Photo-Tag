import React from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md mt-0">
      <div className="container mx-auto px-4 py-4 flex justify-center">
        <a
          href="https://github.com/AbdallaAlhag/Photo-Tag"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

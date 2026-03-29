'use client';

import Link from 'next/link';
import { Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h4 className="mb-3 text-lg font-bold text-blue-600">MyBlog</h4>
            <p className="text-sm text-gray-600">
              A modern blog platform built with React, Redux-Saga, and Tailwind
              CSS.
            </p>
          </div>

          {/* Links */}
          <div>
            <h5 className="mb-3 text-sm font-semibold">Quick Links</h5>

            <nav className="flex flex-col gap-2">
              <Link
                href="/blog"
                className="text-sm text-gray-600 hover:text-black"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-black"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-black"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h5 className="mb-3 text-sm font-semibold">Connect</h5>

            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Globe className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-6 text-center text-xs text-gray-500">
          © 2026 MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

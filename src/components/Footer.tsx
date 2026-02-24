import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "How it Works", href: "/#how-it-works" },
      { label: "Waitlist", href: "/#waitlist" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/blog" },
      { label: "Contact", href: "mailto:hello@patchforge.dev" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/patchforge", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/patchforge", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/patchforge", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-700/50 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 lg:py-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Logo variant="full" size="md" theme="dark" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">
              The autonomous AI software engineer that turns your Jira tickets into pull requests.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-800/50 border border-navy-700/50 text-gray-500 hover:text-electric hover:border-electric/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-display font-semibold text-white mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-700/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} PatchForge. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            patchforge.dev
          </p>
        </div>
      </div>
    </footer>
  );
}

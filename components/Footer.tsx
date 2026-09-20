import { CONTACT, NAV_LINKS, SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cream/[0.06] bg-charcoal pb-28 pt-14 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/50">
              {SITE.tagline} Trusted builders since 2014.
            </p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/40">
              Navigate
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/55 transition hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/40">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-cream/55">
              <li>
                <a href={CONTACT.phoneTel} className="hover:text-cream">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-cream">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.officeShort}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/40">
              Social
            </h4>
            <ul className="space-y-2 text-sm text-cream/55">
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {CONTACT.instagramHandle}
                </a>
              </li>
              <li>
                <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {CONTACT.tiktokHandle}
                </a>
              </li>
              <li>
                <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {CONTACT.youtubeHandle}
                </a>
              </li>
              <li>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/[0.06] pt-6 text-center">
          <p className="text-sm text-cream/40">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

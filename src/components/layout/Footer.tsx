import Image from "next/image";
import Link from "next/link";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Tất cả sản phẩm", href: "#products" },
    { label: "Tinh dầu", href: "#" },
    { label: "Thực phẩm", href: "#" },
    { label: "Chăm sóc da", href: "#" },
  ],
  company: [
    { label: "Về chúng tôi", href: "#about" },
    { label: "Bền vững", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Tuyển dụng", href: "#" },
  ],
  support: [
    { label: "FAQ", href: "#" },
    { label: "Vận chuyển", href: "#" },
    { label: "Đổi trả", href: "#" },
    { label: "Liên hệ", href: "#contact" },
  ],
} as const;

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-forest/10 bg-forest text-page"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="HAGA"
                width={48}
                height={48}
                className="rounded-full object-cover ring-2 ring-sage/50"
              />
              <span className="font-display text-2xl font-semibold">HAGA</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage-light/90">
              Mang tinh hoa thiên nhiên đến gia đình Việt — sản phẩm organic,
              nguồn gốc minh bạch, bền vững từ đất mẹ.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sage-light">
              <Leaf className="h-4 w-4" aria-hidden />
              <span className="text-xs uppercase tracking-widest">
                100% Thiên nhiên
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-sage-light">
              Cửa hàng
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-page/75 transition-colors hover:text-earth-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-sage-light">
              Công ty
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-page/75 transition-colors hover:text-earth-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-sage-light">
              Liên hệ
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-page/75">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />
                <span>123 Đường Xanh, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-sage" aria-hidden />
                <a href="tel:+84901234567" className="hover:text-earth-light">
                  090 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-sage" aria-hidden />
                <a
                  href="mailto:hello@haga.vn"
                  className="hover:text-earth-light"
                >
                  hello@haga.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-page/10 pt-8 text-xs text-page/60 sm:flex-row">
          <p>© {new Date().getFullYear()} HAGA. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-earth-light">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-earth-light">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Heart, Leaf, Shield, Truck } from "lucide-react";
import type { FeatureItem } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<FeatureItem["icon"], LucideIcon> = {
  leaf: Leaf,
  shield: Shield,
  truck: Truck,
  heart: Heart,
};

const features: FeatureItem[] = [
  {
    icon: "leaf",
    title: "100% Thiên Nhiên",
    description:
      "Nguyên liệu organic, không hóa chất độc hại, được chứng nhận nguồn gốc rõ ràng.",
  },
  {
    icon: "shield",
    title: "An Toàn Tuyệt Đối",
    description:
      "Kiểm định chất lượng nghiêm ngặt, phù hợp mọi làn da và cả gia đình có trẻ nhỏ.",
  },
  {
    icon: "truck",
    title: "Giao Hàng Nhanh",
    description:
      "Đóng gói thân thiện môi trường, giao trong 24–48h tại TP.HCM và Hà Nội.",
  },
  {
    icon: "heart",
    title: "Tận Tâm Phục Vụ",
    description:
      "Đội ngũ tư vấn am hiểu thảo mộc, hỗ trợ chọn sản phẩm phù hợp nhu cầu.",
  },
];

export default function Features() {
  return (
    <section id="about" className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
            Vì Sao Chọn HAGA?
          </h2>
          <p className="mt-4 text-forest/70">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm xanh, minh bạch và
            đầy cảm hứng từ thiên nhiên.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-sage/25 bg-white/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/20 text-forest transition-colors group-hover:bg-earth/15 group-hover:text-earth">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-forest">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/65">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

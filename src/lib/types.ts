export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: "leaf" | "shield" | "truck" | "heart";
  title: string;
  description: string;
}

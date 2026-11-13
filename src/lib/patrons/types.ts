import type { LocalizedText } from "../i18n";

export type PatronCategoryKey =
  | "chief"      // প্রধান পৃষ্ঠপোষক (Chief Patron)
  | "founder"    // স্থায়ী / প্রতিষ্ঠাতা পৃষ্ঠপোষক (Permanent / Founder Patron)
  | "special"    // বিশিষ্ট / বিশেষ পৃষ্ঠপোষক (Distinguished / Special Patron)
  | "life"       // আজীবন পৃষ্ঠপোষক (Life Patron)
  | "honorary"   // সম্মানিত পৃষ্ঠপোষক (Honorary Patron)
  | "general";   // সাধারণ / সহযোগী পৃষ্ঠপোষক (General / Associate Patron)

export interface PatronCategoryMeta {
  key: PatronCategoryKey;
  label: LocalizedText;
  shortLabel: LocalizedText;
  description: LocalizedText;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  iconName: "crown" | "shield" | "star" | "heart" | "award" | "users";
  sortOrder: number;
}

export interface PatronMember {
  id: string;
  name: {
    bn: string;
    en?: string | undefined;
    ar?: string | undefined;
  };
  category: PatronCategoryKey;
  designation?: {
    bn: string;
    en?: string | undefined;
    ar?: string | undefined;
  } | undefined;
  address: {
    bn: string;
    en?: string | undefined;
    ar?: string | undefined;
  };
  district: {
    bn: string;
    en?: string | undefined;
    ar?: string | undefined;
  };
  phone: string;
  secondaryPhone?: string | undefined;
  email?: string | undefined;
  avatarUrl?: string | undefined;
  sortOrder?: number | undefined;
  featured?: boolean | undefined;
}

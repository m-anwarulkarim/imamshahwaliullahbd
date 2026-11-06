import { useLanguage } from "@/lib/i18n";
import type { LocalizedText } from "@/lib/i18n";

const words: Record<string, [string, string]> = {
 "Password": ["পাসওয়ার্ড", "كلمة المرور"], "Sign In": ["সাইন ইন", "تسجيل الدخول"],
 "Menu": ["মেনু", "القائمة"], "Slug": ["ঠিকানার নাম", "معرف الرابط"],
 "Order Management": ["অর্ডার ব্যবস্থাপনা", "إدارة الطلبات"], "Total Orders": ["মোট অর্ডার", "إجمالي الطلبات"],
 "Pending": ["অপেক্ষমাণ", "قيد الانتظار"], "Delivered": ["পৌঁছেছে", "تم التسليم"], "Value (filtered)": ["নির্বাচিত মূল্য", "القيمة المحددة"],
 "All Orders": ["সব অর্ডার", "كل الطلبات"], "Book": ["বই", "الكتاب"], "Customer": ["ক্রেতা", "العميل"], "Contact": ["যোগাযোগ", "التواصل"],
 "Address": ["ঠিকানা", "العنوان"], "Qty": ["সংখ্যা", "الكمية"], "Value": ["মূল্য", "القيمة"], "All statuses": ["সব অবস্থা", "كل الحالات"],
 "No orders found.": ["কোনো অর্ডার নেই।", "لا توجد طلبات."], "Order status updated": ["অর্ডারের অবস্থা বদলেছে", "تم تحديث الطلب"],
 "Could not update the order": ["অর্ডার বদলানো যায়নি", "تعذر تحديث الطلب"], "Order deleted": ["অর্ডার মুছে ফেলা হয়েছে", "تم حذف الطلب"],
 "Could not delete the order": ["অর্ডার মোছা যায়নি", "تعذر حذف الطلب"], "Delete this order?": ["অর্ডারটি মুছবেন?", "هل تريد حذف الطلب؟"],
 "Search customer or book": ["ক্রেতা বা বই খুঁজুন", "ابحث عن عميل أو كتاب"],
  "Admin Control Panel": ["অ্যাডমিন নিয়ন্ত্রণ প্যানেল", "لوحة الإدارة"],
  "Total Publications": ["মোট প্রকাশনা", "إجمالي المنشورات"], "Active Orders": ["চলমান অর্ডার", "الطلبات النشطة"],
  "Applications": ["আবেদনসমূহ", "الطلبات"], "Donations": ["অনুদান", "التبرعات"],
  "Recent Activities": ["সাম্প্রতিক কার্যক্রম", "النشاط الأخير"], "Quick Actions": ["দ্রুত কাজ", "إجراءات سريعة"],
  "Manage Publications": ["প্রকাশনা ব্যবস্থাপনা", "إدارة المنشورات"], "Create Event": ["ইভেন্ট তৈরি", "إنشاء فعالية"],
  "View Public Site": ["ওয়েবসাইট দেখুন", "عرض الموقع"], "No recent activities found.": ["সাম্প্রতিক কার্যক্রম নেই।", "لا يوجد نشاط حديث."],
  "Overview": ["সারসংক্ষেপ", "نظرة عامة"], "Admin Home": ["অ্যাডমিন হোম", "الرئيسية"], "Publications": ["প্রকাশনা", "المنشورات"],
  "Books": ["বই", "الكتب"], "Magazine": ["ম্যাগাজিন", "المجلة"], "Community": ["কমিউনিটি", "المجتمع"],
  "Events": ["ইভেন্ট", "الفعاليات"], "News & Media": ["সংবাদ ও মিডিয়া", "الأخبار والإعلام"], "Commerce": ["লেনদেন", "المعاملات"],
  "Orders": ["অর্ডার", "الطلبات"], "Inbox": ["ইনবক্স", "الوارد"], "Messages": ["বার্তা", "الرسائل"],
  "Newsletter": ["নিউজলেটার", "النشرة البريدية"], "Course Applications": ["ভর্তি আবেদন", "طلبات التسجيل"],
  "Short Courses": ["স্বল্পমেয়াদি কোর্স", "الدورات القصيرة"], "Institute Admin": ["ইনস্টিটিউট অ্যাডমিন", "إدارة المعهد"],
  "Sign Out": ["সাইন আউট", "تسجيل الخروج"], "Administrator": ["প্রশাসক", "مسؤول"], "Search": ["খুঁজুন", "بحث"],
  "New": ["নতুন", "جديد"], "Edit": ["সম্পাদনা", "تعديل"], "Save": ["সংরক্ষণ", "حفظ"], "Cancel": ["বাতিল", "إلغاء"],
  "Delete": ["মুছুন", "حذف"], "Title": ["শিরোনাম", "العنوان"], "Author": ["লেখক", "المؤلف"], "Price": ["মূল্য", "السعر"],
  "Category": ["বিভাগ", "الفئة"], "Cover Image": ["প্রচ্ছদ", "الغلاف"], "Description": ["বিবরণ", "الوصف"],
  "Stock": ["স্টক", "المخزون"], "Featured": ["বিশেষ", "مميز"], "Published": ["প্রকাশিত", "منشور"], "Date": ["তারিখ", "التاريخ"],
  "Time": ["সময়", "الوقت"], "Location": ["স্থান", "المكان"], "Image": ["ছবি", "الصورة"],
  "Publish Date": ["প্রকাশের তারিখ", "تاريخ النشر"], "Excerpt": ["সংক্ষিপ্তসার", "المقتطف"], "Full Content": ["পূর্ণ লেখা", "المحتوى الكامل"],
  "Issue Title": ["সংখ্যার নাম", "عنوان العدد"], "Issue Month": ["প্রকাশের মাস", "شهر العدد"], "Magazine PDF": ["ম্যাগাজিন PDF", "ملف المجلة"],
  "Page Count": ["পৃষ্ঠা সংখ্যা", "عدد الصفحات"], "Pages": ["পৃষ্ঠা", "الصفحات"], "Short Description": ["সংক্ষিপ্ত বিবরণ", "وصف مختصر"],
  "Books Management": ["বই ব্যবস্থাপনা", "إدارة الكتب"], "Events Management": ["ইভেন্ট ব্যবস্থাপনা", "إدارة الفعاليات"],
  "Monthly Magazine": ["মাসিক ম্যাগাজিন", "المجلة الشهرية"], "Actions": ["কাজ", "الإجراءات"], "Yes": ["হ্যাঁ", "نعم"], "No": ["না", "لا"],
  "Nothing here yet.": ["এখনো কোনো তথ্য নেই।", "لا توجد بيانات بعد."], "Retry": ["আবার চেষ্টা", "إعادة المحاولة"],
  "Unable to load records.": ["তথ্য আনা যায়নি।", "تعذر تحميل البيانات."], "Updated successfully.": ["হালনাগাদ হয়েছে।", "تم التحديث."],
  "Created successfully.": ["তৈরি হয়েছে।", "تم الإنشاء."], "Deleted.": ["মুছে ফেলা হয়েছে।", "تم الحذف."],
  "Delete this item permanently?": ["স্থায়ীভাবে মুছে ফেলবেন?", "هل تريد الحذف نهائياً؟"],
  "Something went wrong.": ["কাজটি সম্পন্ন হয়নি।", "حدث خطأ."], "Name": ["নাম", "الاسم"], "Email": ["ইমেইল", "البريد الإلكتروني"],
  "Phone": ["ফোন", "الهاتف"], "Status": ["অবস্থা", "الحالة"], "Details": ["বিস্তারিত", "التفاصيل"],
  "Approve": ["অনুমোদন", "موافقة"], "Reject": ["প্রত্যাখ্যান", "رفض"], "Confirm": ["নিশ্চিত করুন", "تأكيد"],
  "pending": ["অপেক্ষমাণ", "قيد الانتظار"], "approved": ["অনুমোদিত", "مقبول"], "rejected": ["প্রত্যাখ্যাত", "مرفوض"],
  "confirmed": ["নিশ্চিত", "مؤكد"], "cancelled": ["বাতিল", "ملغى"], "shipped": ["পাঠানো হয়েছে", "تم الشحن"], "delivered": ["পৌঁছেছে", "تم التسليم"],
  "Admin notes": ["অ্যাডমিন মন্তব্য", "ملاحظات الإدارة"], "Archive": ["আর্কাইভ", "أرشفة"], "Restore": ["ফিরিয়ে আনুন", "استعادة"],
  "Mark read": ["পড়া হয়েছে", "تحديد كمقروء"], "Mark unread": ["অপঠিত করুন", "تحديد كغير مقروء"], "Reply by email": ["ইমেইলে উত্তর", "الرد بالبريد"],
  "All": ["সব", "الكل"], "Unread": ["অপঠিত", "غير مقروء"], "Archived": ["আর্কাইভ", "المؤرشف"],
  "Export CSV": ["CSV রপ্তানি", "تصدير CSV"], "Previous": ["আগের", "السابق"], "Next": ["পরের", "التالي"],
  "Contact Messages": ["যোগাযোগ বার্তা", "رسائل التواصل"], "Membership Applications": ["সদস্যপদের আবেদন", "طلبات العضوية"],
  "Newsletter Subscribers": ["নিউজলেটার গ্রাহক", "مشتركو النشرة"], "Subject": ["বিষয়", "الموضوع"], "Message": ["বার্তা", "الرسالة"],
  "Institution": ["প্রতিষ্ঠান", "المؤسسة"], "Type": ["ধরন", "النوع"], "Statement": ["আবেদন বক্তব্য", "البيان"], "Amount": ["পরিমাণ", "المبلغ"],
  "Course": ["কোর্স", "الدورة"], "Education": ["শিক্ষাগত যোগ্যতা", "التعليم"], "Access Requests": ["প্রবেশের আবেদন", "طلبات الوصول"],
  "Classes & Sheets": ["ক্লাস ও শিট", "الدروس والأوراق"], "Admission fee": ["ভর্তি ফি", "رسوم التسجيل"], "Monthly fee": ["মাসিক ফি", "الرسوم الشهرية"],
  "Payment": ["পেমেন্ট", "الدفع"], "Transaction ID": ["লেনদেন নম্বর", "رقم المعاملة"], "Sort order": ["ক্রম", "الترتيب"],
  "URL": ["লিংক", "الرابط"], "Scheduled at": ["নির্ধারিত সময়", "الموعد"], "video": ["ভিডিও", "فيديو"], "live": ["সরাসরি ক্লাস", "مباشر"], "sheet": ["শিট", "ورقة"],
  "Upload image": ["ছবি আপলোড", "رفع صورة"], "Replace image": ["ছবি বদলান", "استبدال الصورة"], "Uploading…": ["আপলোড হচ্ছে…", "جارٍ الرفع…"],
  "Upload PDF": ["PDF আপলোড", "رفع PDF"], "Replace PDF": ["PDF বদলান", "استبدال PDF"], "Image uploaded.": ["ছবি আপলোড হয়েছে।", "تم رفع الصورة."],
  "PDF uploaded.": ["PDF আপলোড হয়েছে।", "تم رفع PDF."], "Upload failed.": ["আপলোড হয়নি।", "فشل الرفع."],
  "Image must be smaller than 10 MB.": ["ছবি ১০ MB-এর কম হতে হবে।", "يجب أن تكون الصورة أصغر من 10 MB."],
  "PDF must be smaller than 30 MB.": ["PDF ৩০ MB-এর কম হতে হবে।", "يجب أن يكون PDF أصغر من 30 MB."],
  "Selected": ["নির্বাচিত", "المحدد"], "…or paste an image URL": ["…অথবা ছবির লিংক দিন", "…أو أدخل رابط الصورة"],
  "…or type the stored file name": ["…অথবা সংরক্ষিত ফাইলের নাম দিন", "…أو أدخل اسم الملف المحفوظ"],
  "Close": ["বন্ধ", "إغلاق"], "Administrator access required": ["অ্যাডমিন অনুমতি প্রয়োজন", "يلزم وصول المسؤول"],
  "Your account is signed in but does not have administrator rights.": ["আপনি সাইন ইন করেছেন, কিন্তু অ্যাডমিন অনুমতি নেই।", "حسابك مسجل الدخول وليس لديه صلاحيات مسؤول."],
  "Sign out": ["সাইন আউট", "تسجيل الخروج"],
  "Admin Users": ["অ্যাডমিন ব্যবহারকারী", "المشرفون"], "Settings": ["সেটিংস", "الإعدادات"],
  "Add admin by email": ["ইমেইল দিয়ে অ্যাডমিন যোগ করুন", "إضافة مشرف بالبريد الإلكتروني"],
  "Add Admin": ["অ্যাডমিন যোগ", "إضافة مشرف"], "Remove": ["অপসারণ", "إزالة"],
  "Remove this admin?": ["এই অ্যাডমিনকে অপসারণ করবেন?", "هل تريد إزالة هذا المشرف؟"],
  "Admin added.": ["অ্যাডমিন যোগ হয়েছে।", "تمت إضافة المشرف."], "Admin removed.": ["অ্যাডমিন অপসারণ হয়েছে।", "تمت إزالة المشرف."],
  "Role": ["ভূমিকা", "الدور"], "admin": ["অ্যাডমিন", "مشرف"], "editor": ["সম্পাদক", "محرر"], "user": ["ব্যবহারকারী", "مستخدم"],
  "No account found with this email. The person must sign up first.": ["এই ইমেইলে কোনো অ্যাকাউন্ট নেই। আগে সাইন আপ করতে হবে।", "لا يوجد حساب بهذا البريد. يجب التسجيل أولاً."],
  "You cannot remove your own admin access.": ["নিজের অ্যাডমিন অনুমতি অপসারণ করা যাবে না।", "لا يمكنك إزالة صلاحيتك كمشرف."],
};

export function adminText(en: string): LocalizedText {
  const localizedField = en.match(/^(Title|Description|Location) \((en|bn|ar|বাংলা|English|العربية)\)$/);
  if (localizedField) {
    const base = adminText(localizedField[1] ?? "Title");
    return { en, bn: `${base.bn} (${localizedField[2]})`, ar: `${base.ar} (${localizedField[2]})` };
  }
  const pair = words[en];
  return { en, bn: pair?.[0] ?? en, ar: pair?.[1] ?? en };
}
export function useAdminText() {
  const { t } = useLanguage();
  return (en: string) => t(adminText(en));
}
export function adminHead(title: string) {
  const full = `${title} — Imam Shah Waliullah Dehlawi Research Institute`;
  const description = `${title} for the institute administration.`;
  return { meta: [{ title: full }, { name: "description", content: description }, { property: "og:title", content: full }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] };
}

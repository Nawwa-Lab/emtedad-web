export const requestDetail = {
  id: 'motion-1',
  category: 'طلب على النملية · تصميم وموشن',
  title: 'محتاجين تصميم موشن جرافيك لحملة توعية',
  description:
    'بنجهّز حملة عن الحرف اليدوية المهددة بالاندثار، ومحتاجين فيديوهين موشن جرافيك (٤٥–٦٠ ثانية لكل واحد) يبسّطوا حكاية حرفتين: الخيامية والصدف. عندنا السيناريو والتعليق الصوتي جاهزين — محتاجين الرسم والتحريك والمكساج النهائي. أسلوب مستوحى من الزخارف الشعبية يبقى هدية.',
  facts: {
    market: 'نملية — من مؤسسة لمؤسسة',
    timeframe: 'قبل ١٥ سبتمبر',
    replies: '«عندي» × ٢',
  },
  requester: {
    name: 'ملحة',
    profileLabel: 'الملف العام · قيّمها ٣١ عضوًا',
    badge: 'كريم',
  },
}

export const sidebar = [
  {
    id: '1',
    titleKey: 'requesterTitle' as const,
    name: requestDetail.requester.name,
    viewProfileLabel: requestDetail.requester.profileLabel,
    viewProfileBadge: requestDetail.requester.badge,
  },
]

import { getImageUrl } from '@/lib/imageUtils'; // 导入getImageUrl函数

// 图片配置文件，用户可在此替换所有图片链接
export const images = {
  header: {
    logo: getImageUrl("https://s3plus.sankuai.com/nocode-external/nocode_image/default/b5f0a205-e971-4aa3-8212-b9237e4b95fb-lnepk4ba0fwh8tukyqt30pfj850h0d.png"),
  },
  services: {
    repair: getImageUrl("/images/services/repair.png"),
    poster: getImageUrl("/images/services/poster.png"),
  },
  cases: {
    repairBefore: [
      getImageUrl("/images/cases/repair-before-1.jpg"),
      getImageUrl("/images/cases/repair-before-2.jpg"),
      getImageUrl("/images/cases/repair-before-3.jpg"),
      getImageUrl("/images/cases/repair-before-4.jpg"),
      getImageUrl("/images/cases/repair-before-5.jpg"),
      getImageUrl("/images/cases/repair-before-6.jpg")
    ],
    repairAfter: [
      getImageUrl("/images/cases/repair-after-1.jpg"),
      getImageUrl("/images/cases/repair-after-2.jpg"),
      getImageUrl("/images/cases/repair-after-3.jpg"),
      getImageUrl("/images/cases/repair-after-4.jpg"),
      getImageUrl("/images/cases/repair-after-5.jpg"),
      getImageUrl("/images/cases/repair-after-6.jpg")
    ],
    poster: [
      getImageUrl("/images/cases/poster-1.jpg"),
      getImageUrl("/images/cases/poster-2.jpg"),
      getImageUrl("/images/cases/poster-3.jpg"),
      getImageUrl("/images/cases/poster-4.jpg"),
      getImageUrl("/images/cases/poster-5.jpg"),
      getImageUrl("/images/cases/poster-6.jpg")
    ]
  },
  testimonials: {
    avatars: [
      getImageUrl("/images/testimonials/avatar-1.jpg"),
      getImageUrl("/images/testimonials/avatar-2.jpg"),
      getImageUrl("/images/testimonials/avatar-3.jpg"),
      getImageUrl("/images/testimonials/avatar-4.jpg")
    ],
    images: [
      getImageUrl("/images/testimonials/image-1.jpg"),
      getImageUrl("/images/testimonials/image-2.jpg"),
      getImageUrl("/images/testimonials/image-3.jpg"),
      getImageUrl("/images/testimonials/image-4.jpg")
    ]
  },
  pricing: {
    repair: getImageUrl("/images/pricing/repair.png"),
    poster: getImageUrl("/images/pricing/poster.png")
  },
  about: {
    team: getImageUrl("/images/about/team.jpg")
  },
  contact: {
    wechat: getImageUrl("/images/contact/wechat-qrcode.png")
  }
};

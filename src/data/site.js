export const site = {
  domain: 'https://caloriecounterai.app',
  name: 'Calorie Counter AI',
  defaultLocale: 'en',
  appStoreUrl: 'https://apps.apple.com/app/calorie-counter-photo-ai/id6751413883',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.henzerboss.CalorieCounterAI',
  supportEmail: 'support@evsi.store',
  assets: {
    icon: '/assets/icons/app-icon-128.webp',
    iconSmall: '/assets/icons/app-icon-128.webp',
    iconSmallPng: '/assets/icons/app-icon-128.png',
    iconMedium: '/assets/icons/app-icon-256.webp',
    iconMediumPng: '/assets/icons/app-icon-256.png',
    iconLarge: '/assets/icons/app-icon-512.png',
    iconLargeWebp: '/assets/icons/app-icon-512.webp',
    og: '/og-image.png',
    screens: {
      aiPhoto: '/assets/screens/ai-photo.png',
      nutritionBalance: '/assets/screens/nutrition-balance.png',
      barcode: '/assets/screens/barcode-scanner.png',
      goalControl: '/assets/screens/goal-control.png',
      progress: '/assets/screens/visual-progress.png',
      diary: '/assets/screens/food-diary.png',
      goals: '/assets/screens/goals-pace.png',
      health: '/assets/screens/health-connect.png'
    }
  }
};

export const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Calorie Counter AI',
  alternateName: ['AI Calorie Counter by Photo', 'Calorie Counter Photo AI'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  contentRating: '9+',
  description: 'AI calorie counter app by photo for tracking calories, macros, meal weight, barcodes and food diary progress.',
  image: 'https://caloriecounterai.app/og-image.png',
  url: 'https://caloriecounterai.app/',
  sameAs: [
    'https://apps.apple.com/app/calorie-counter-photo-ai/id6751413883',
    'https://play.google.com/store/apps/details?id=com.henzerboss.CalorieCounterAI',
    'https://tiktok.com/@caloriecounter.ai',
    'https://www.instagram.com/caloriecounterai.app'
  ],
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: 'Free download'
    },
    {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'EUR',
      category: 'Monthly subscription'
    }
  ],
  downloadUrl: [
    'https://apps.apple.com/app/calorie-counter-photo-ai/id6751413883',
    'https://play.google.com/store/apps/details?id=com.henzerboss.CalorieCounterAI',
    'https://tiktok.com/@caloriecounter.ai',
    'https://www.instagram.com/caloriecounterai.app'
  ],
  featureList: [
    'Photo food recognition',
    'Barcode calorie scanner',
    'Food diary',
    'Macro tracking',
    'Progress charts',
    'Apple Health and Health Connect integration'
  ]
};

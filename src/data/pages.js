import { foodIndexPage, foodPages } from './foods.js';
export const primaryNav = [
  { label: 'Features', path: '/features/' },
  { label: 'Use cases', path: '/use-cases/' },
  { label: 'Learn', path: '/blog/' },
  { label: 'Calories in foods', path: '/how-many-calories-in/' },
  { label: 'FAQ', path: '/faq/' }
];

export const featurePages = [
  {
    path: '/features/',
    navLabel: 'Features',
    title: 'Features',
    h1: 'Helpful tools for faster food tracking',
    description: 'Explore Calorie Counter AI features for photo logging, barcode scanning, macro tracking, food diary review, goals, reminders and Health Connect sync.',
    kicker: 'Product overview',
    summary: 'The app is built around one practical idea: make nutrition logging fast enough that people can actually keep doing it during a normal day.',
    image: '/assets/screens/ai-photo.png',
    bullets: ['Analyze a meal photo when labels are missing', 'Scan packaged foods when a barcode is available', 'Review calories, macros and portion estimates before saving', 'Use diary history, goals and charts to understand patterns'],
    sections: [
      ['Choose the fastest entry method', 'A homemade dinner, packaged yogurt and restaurant burger should not all require the same workflow. Calorie Counter AI lets users start from a photo, a barcode or a diary entry so logging fits the meal instead of the other way around.'],
      ['Review before you trust the result', 'AI estimates are designed to be useful starting points. The app keeps the result editable, because sauces, oil, serving size and hidden ingredients are often easier for the user to confirm than for any camera to know.'],
      ['Turn single entries into a useful diary', 'The real value appears when meals become a history: daily totals, macro balance, progress charts and recurring patterns. The app is not only for one impressive scan; it is for building a repeatable routine.'],
      ['Built for everyday uncertainty', 'Most people do not eat perfectly labeled meals all day. The feature set focuses on real situations: mixed plates, snacks, grocery products, restaurant meals, busy lunches and repeated homemade dishes.']
    ],
    workflowTitle: 'A practical daily workflow',
    workflow: [
      'Use a photo when the meal has no label, scan a barcode when the product is packaged, and edit the result when you know something the app cannot see. This keeps logging fast while still giving the user control.',
      'At the end of the day, review totals and patterns rather than judging one meal in isolation. A simple habit repeated often is more valuable than a perfect entry that never gets saved.'
    ],
    note: 'Nutrition estimates are informational. They work best when combined with user review, realistic goals and professional guidance when medical or clinical needs are involved.',
    bestFor: ['Busy meals', 'Unlabeled dishes', 'Macro awareness', 'Visual diary habits']
  },
  {
    path: '/food-recognition-ai/',
    navLabel: 'AI Food Recognition',
    title: 'AI Food Recognition App',
    h1: 'AI food recognition from a meal photo',
    description: 'Recognize visible foods from a meal photo and turn them into editable nutrition estimates for daily tracking.',
    kicker: 'Photo analysis',
    summary: 'AI food recognition helps when the question is simple but time-consuming: “What is on this plate, and how should I log it?”',
    image: '/assets/screens/nutrition-balance.png',
    bullets: ['Identify visible foods in the photo', 'Estimate portion weight and macro balance', 'Edit dish name, weight and nutrition before saving', 'Use the result as a fast diary entry, not a final lab measurement'],
    sections: [
      ['Where recognition helps most', 'Food recognition is most useful for meals without a nutrition label: cooked plates, bowls, salads, mixed breakfasts, leftovers, buffets and restaurant dishes. It reduces the time spent searching databases one ingredient at a time.'],
      ['What the camera can and cannot know', 'A photo can show visible foods and rough portion size, but it may not reveal how much oil, butter, sugar, dressing or sauce was used. That is why the app keeps the estimate editable.'],
      ['Better photos improve the starting point', 'For the clearest result, capture the full plate in good light, avoid extreme angles and include the whole portion. If a side dish or drink is not visible, add it separately.'],
      ['Use recognition to stay consistent', 'The goal is not to replace judgement. The goal is to make logging fast enough that users do not skip the hard meals. Even a reviewed estimate is often more useful than a missing diary entry.']
    ],
    workflowTitle: 'How to use AI recognition well',
    workflow: [
      'Take the photo before eating, check the detected meal name, review the portion and macro estimate, then adjust anything you know is missing. Save the entry only after it looks reasonable for the meal.',
      'If the same homemade meal appears often, use the previous entry as a reference. Consistency in how you log repeated foods makes trends easier to interpret later.'
    ],
    note: 'Food recognition works best as an editable first draft. Keep the estimate, portion and hidden ingredients open for review before saving.',
    bestFor: ['Homemade plates', 'Restaurant dishes', 'Mixed bowls', 'Quick review']
  },
  {
    path: '/barcode-calorie-scanner/',
    navLabel: 'Barcode Scanner',
    title: 'Barcode Calorie Scanner',
    h1: 'Barcode scanning for packaged foods',
    description: 'Scan packaged food barcodes, confirm the product and add nutrition values to your daily diary faster.',
    kicker: 'Packaged foods',
    summary: 'When a product has a barcode, scanning is usually faster and more structured than estimating it from a photo.',
    image: '/assets/screens/barcode-scanner.png',
    bullets: ['Scan grocery products, snacks, drinks and prepared foods', 'Confirm the product before adding it', 'Add calories and macros to the diary', 'Use scanning together with photo logging for mixed days'],
    sections: [
      ['Best for foods with labels', 'Barcode scanning is ideal for yogurt, protein bars, drinks, frozen meals, packaged snacks, sauces and other grocery products that already have nutrition information.'],
      ['Still confirm the serving', 'Packaged foods often list values per serving, per container or per 100 g. After scanning, check the serving amount so the diary reflects what you actually ate.'],
      ['Use it alongside photo analysis', 'A normal day often includes both packaged items and cooked meals. Scan the packaged items; use photo analysis for plates, restaurant food and homemade dishes.'],
      ['Fewer forgotten snacks', 'Small packaged snacks are easy to forget. A quick scan makes it more likely they are logged while the wrapper is still nearby.']
    ],
    workflowTitle: 'Barcode workflow',
    workflow: [
      'Open the scanner, point it at the barcode, confirm the matched product and serving, then add it to the diary. If the serving differs from the label, adjust the amount before saving.',
      'For meals that combine a packaged item with cooked food, log each part separately when that gives a clearer result.'
    ],
    note: 'Barcode data can vary by region, brand and package size. The safest habit is to confirm the product and serving before saving.',
    bestFor: ['Grocery products', 'Snacks', 'Drinks', 'Prepared foods']
  },
  {
    path: '/macro-tracker/',
    navLabel: 'Macro Tracker',
    title: 'Macro Tracker App',
    h1: 'Macro tracking for protein, carbs and fats',
    description: 'Track protein, carbohydrates and fats alongside daily energy targets using photos, barcodes and diary entries.',
    kicker: 'Protein, carbs and fats',
    summary: 'Calories show total energy. Macros explain what that energy is made of, which makes daily food choices easier to understand.',
    image: '/assets/screens/goal-control.png',
    bullets: ['See protein, carbs and fats with each logged meal', 'Compare macro totals with daily targets', 'Review macro patterns over time', 'Use photos and barcodes to make macro tracking faster'],
    sections: [
      ['Why macros matter', 'Two meals can have similar calories but very different protein, carbohydrate and fat balance. Tracking macros helps users see whether meals support satiety, training, energy or a specific nutrition goal.'],
      ['Protein visibility during the day', 'Many users only notice low protein at night, when it is hard to fix. A macro view makes protein progress visible earlier, while there is still time to adjust meals.'],
      ['Carbs and fats in context', 'Carbohydrates and fats are not “bad” by default. Seeing the balance helps users understand patterns without turning every food choice into a rule.'],
      ['Use trends instead of perfection', 'Macro tracking is most useful when users review patterns across days and weeks. A single meal is only one data point.']
    ],
    workflowTitle: 'Macro tracking workflow',
    workflow: [
      'Log meals with a photo, barcode or manual entry. After each entry, check how the meal changed protein, carbs and fats for the day. If one macro is far behind or ahead, use the next meal to balance it naturally.',
      'For training or body-composition goals, use macro trends as feedback. The app helps users see the pattern; it does not need to prescribe a rigid diet plan.'
    ],
    note: 'Macro needs vary by body size, activity, medical context and personal goal. The app provides visibility and estimates, not clinical nutrition advice.',
    bestFor: ['Protein awareness', 'Body recomposition', 'Training nutrition', 'Balanced meals']
  },
  {
    path: '/food-diary-app/',
    navLabel: 'Food Diary',
    title: 'Food Diary App',
    h1: 'A visual food diary for daily nutrition habits',
    description: 'Keep a clean food diary with meal photos, daily totals, macro context and simple history review.',
    kicker: 'Daily history',
    summary: 'A useful food diary should make yesterday, last week and repeated habits easy to understand at a glance.',
    image: '/assets/screens/food-diary.png',
    bullets: ['Review meals by day', 'Keep photos attached to entries', 'Compare daily totals and macro balance', 'Use history to spot patterns'],
    sections: [
      ['Photos make entries easier to remember', 'A written meal name can be vague later. A photo quickly reminds the user what the portion looked like, where the meal happened and whether anything was missed.'],
      ['Daily totals keep the routine simple', 'Instead of checking scattered entries, users can open a day and see the big picture: what was eaten, how it affected the target and whether the day feels complete.'],
      ['Patterns appear with time', 'After several days, the diary can reveal skipped breakfasts, high-calorie restaurant meals, repeated snacks or low-protein periods. Those patterns are more useful than judging one isolated entry.'],
      ['A diary should reduce friction', 'The app supports photos and barcodes so the diary can stay complete even when the user is busy, traveling or eating food without labels.']
    ],
    workflowTitle: 'Food diary workflow',
    workflow: [
      'Log meals close to when they happen. Use photos for cooked meals, barcodes for packaged foods and quick edits for details like oil, sauces or serving size.',
      'At the end of the day, review the whole diary rather than each entry in isolation. Look for one simple improvement for tomorrow.'
    ],
    note: 'A food diary becomes more useful as the history grows. Consistency matters more than perfect detail in every entry.',
    bestFor: ['Meal history', 'Habit awareness', 'Visual review', 'Daily totals']
  },
  {
    path: '/nutrition-tracker/',
    navLabel: 'Nutrition Tracker',
    title: 'Nutrition Tracker App',
    h1: 'Nutrition tracking without spreadsheet work',
    description: 'Track nutrition patterns with calories, macros, meal balance, goals and visual progress in one simple workflow.',
    kicker: 'Nutrition awareness',
    summary: 'Nutrition tracking should help users understand meals clearly, not bury them in numbers they never use.',
    image: '/assets/screens/nutrition-balance.png',
    bullets: ['View energy and macro balance together', 'Understand meals when labels are missing', 'Use goals to interpret the day', 'Review trends without manual spreadsheets'],
    sections: [
      ['More useful than a single number', 'Calories are important, but users also need context: protein, carbs, fats, portion size and how the meal fits the rest of the day.'],
      ['Built for mixed real-world meals', 'Many meals do not come from a package. Photo analysis gives users a starting point for cooked dishes, restaurant plates and homemade recipes.'],
      ['Progress should be readable', 'Charts and diary history help users see whether habits are stable, improving or drifting. This is easier to act on than a pile of disconnected entries.'],
      ['Flexible enough for different goals', 'The same tracking workflow can support weight loss, maintenance, muscle gain or general food awareness because the user can interpret the data through their own goal.']
    ],
    workflowTitle: 'Nutrition tracking workflow',
    workflow: [
      'Start with the fastest entry method, then review the result. Use the diary and progress screens to connect individual meals with the daily and weekly picture.',
      'If a number looks unrealistic, edit it. A reviewed estimate is more valuable than blindly trusting automation or skipping the entry completely.'
    ],
    note: 'Nutrition tracking is informational and should be adapted to the user’s health context. Anyone with medical needs should work with a qualified professional.',
    bestFor: ['Food awareness', 'Macro context', 'Goal review', 'Trend tracking']
  },
  {
    path: '/meal-weight-estimator/',
    navLabel: 'Meal Weight Estimator',
    title: 'Meal Weight Estimator',
    h1: 'Meal weight estimates for food photos',
    description: 'Estimate meal weight from a photo and use portion review to make nutrition logging more practical when a scale is not available.',
    kicker: 'Portion size',
    summary: 'Portion size is one of the biggest reasons nutrition entries feel uncertain. A photo estimate gives users a starting point they can review.',
    image: '/assets/screens/nutrition-balance.png',
    bullets: ['Estimate visible portion weight', 'Review weight before saving', 'Adjust for sauces, oil and hidden ingredients', 'Use estimates when weighing is unrealistic'],
    sections: [
      ['Why weight matters', 'Most nutrition values depend on amount. A larger portion of the same food can change the daily picture quickly, so weight estimation helps connect the photo to usable numbers.'],
      ['When a scale is not practical', 'Food scales are useful at home, but many meals happen at work, in restaurants or while traveling. The app helps users keep logging when weighing is not realistic.'],
      ['Use the estimate as a prompt', 'The number should encourage review: Does the portion look too large, too small or about right? Users can adjust before saving.'],
      ['Repeated meals get easier', 'If a user eats similar bowls, salads or breakfasts often, previous entries can help calibrate future estimates and reduce guesswork.']
    ],
    workflowTitle: 'Portion review workflow',
    workflow: [
      'Take a clear photo that shows the full portion. Review the estimated weight, then edit it if the plate, serving size or hidden ingredients suggest a different amount.',
      'Use the weight estimate together with calories and macros. The goal is practical consistency, not laboratory precision.'
    ],
    note: 'Meal weight from a photo is approximate. It can be affected by camera angle, plate size, overlapping foods and ingredients that are not visible.',
    bestFor: ['No food scale', 'Restaurant plates', 'Mixed dishes', 'Quick portion review']
  },
  {
    path: '/progress-statistics/',
    navLabel: 'Progress Statistics',
    title: 'Nutrition Progress and Statistics',
    h1: 'Visual nutrition progress by week, month and year',
    description: 'Review calorie, macro and activity patterns with visual nutrition statistics instead of isolated meal entries.',
    kicker: 'Trends over time',
    summary: 'Progress screens make nutrition less abstract by turning daily entries into patterns that can be compared over time.',
    image: '/assets/screens/visual-progress.png',
    bullets: ['Compare days, weeks and months', 'Review intake against targets', 'Spot macro trends and routine changes', 'Use charts to support consistency'],
    sections: [
      ['Trends are more useful than one day', 'A single day can be unusual. Weekly and monthly views make it easier to understand the average routine and avoid overreacting to one meal.'],
      ['Find the pattern behind the result', 'Charts can reveal weekend changes, restaurant-heavy days, low-protein patterns or inconsistent logging. Those signals help users choose a practical next step.'],
      ['Keep motivation visible', 'Progress often feels slow. Visual feedback can make small improvements more noticeable and help users keep the habit going.'],
      ['Use statistics as feedback, not pressure', 'The charts are meant to support decisions. They should help users adjust calmly rather than chase perfect numbers every day.']
    ],
    workflowTitle: 'Progress review workflow',
    workflow: [
      'Review trends after several days of logging. Look for repeating patterns, then choose one small adjustment for the next week instead of changing everything at once.',
      'Use progress views together with the food diary. The chart tells you what happened; the diary helps explain why.'
    ],
    note: 'Statistics depend on the entries behind them. Fast logging methods help create enough data for the charts to be meaningful.',
    bestFor: ['Weekly review', 'Macro trends', 'Goal comparison', 'Habit feedback']
  },
  {
    path: '/meal-reminders/',
    navLabel: 'Meal Reminders',
    title: 'Meal and Water Reminders',
    h1: 'Meal and water reminders for consistent tracking',
    description: 'Use gentle reminders to log meals while details are fresh and keep daily tracking from slipping during busy routines.',
    kicker: 'Habit support',
    summary: 'Reminders are not about pressure. They are small cues that help users remember the habit at the moment it is easiest to complete.',
    image: '/assets/screens/goal-control.png',
    bullets: ['Add reminders around real meal times', 'Reduce forgotten diary entries', 'Support hydration and meal routines', 'Adjust reminders when they become noisy'],
    sections: [
      ['Timing matters', 'Logging is easier right after a meal than hours later. A reminder near the moment of eating can prevent forgotten details and missing entries.'],
      ['Reminders should feel gentle', 'A good reminder supports the routine without becoming annoying. Users should adjust timing, frequency and use cases to fit their own day.'],
      ['Useful for busy schedules', 'Work meetings, commuting and evening routines can interrupt tracking. A small cue helps bring the habit back before the day is over.'],
      ['Hydration and meals belong together', 'Water reminders can support a simple daily wellness routine alongside meal logging, especially for users who forget to drink during focused work.']
    ],
    workflowTitle: 'Reminder workflow',
    workflow: [
      'Set reminders for the moments you most often forget: after lunch, after dinner or during evening snacks. If the reminder is too early or too late, change the time rather than abandoning the habit.',
      'Use reminders as prompts to log, not as strict rules. The goal is a complete enough diary to understand the day.'
    ],
    note: 'Reminders work best when they reduce mental load. They should be easy to adjust as the user’s routine changes.',
    bestFor: ['Busy days', 'Forgotten meals', 'Routine building', 'Hydration cues']
  },
  {
    path: '/google-health-connect/',
    navLabel: 'Google Health Connect',
    title: 'Google Health Connect Sync',
    h1: 'Sync activity context with Health Connect',
    description: 'Connect supported Android health data to compare food intake with activity context and daily balance.',
    kicker: 'Android activity data',
    summary: 'Food intake is easier to understand when users can also see movement context, permissions and calories burned where supported.',
    image: '/assets/screens/health-connect.png',
    bullets: ['Connect supported Android health data', 'Compare calories eaten and burned where available', 'Use activity context for daily balance', 'Control permissions through device settings'],
    sections: [
      ['Why activity context helps', 'Food tracking shows intake. Activity data adds context for the rest of the day, helping users understand why the remaining allowance may change.'],
      ['Permissions stay important', 'Health data is personal. Users should connect only the data types they want to share and review permissions from Android settings when needed.'],
      ['Use activity estimates carefully', 'Calories burned from devices and apps are estimates. They can help explain the day, but they should not be treated as exact measurements.'],
      ['A clearer daily balance', 'When supported, syncing activity data can make the daily overview more useful: food logged, movement recorded and remaining balance in one place.']
    ],
    workflowTitle: 'Health Connect workflow',
    workflow: [
      'Enable Health Connect on a supported Android device, choose the permissions you want to share and review the daily balance after activity data appears in the app.',
      'If data looks missing or unexpected, check device permissions, data source priority and whether the other app is writing the relevant activity information.'
    ],
    note: 'Health Connect availability, data types and permissions depend on Android version, device settings and connected apps.',
    bestFor: ['Android users', 'Activity context', 'Calories burned', 'Daily balance']
  },
  {
    path: '/data-export/',
    navLabel: 'Data Export',
    title: 'Food Diary Data Export and Import',
    h1: 'Food diary export and data portability',
    description: 'Keep more control over your food diary with export and import support for long-term tracking records.',
    kicker: 'Data control',
    summary: 'A food diary becomes more valuable over time. Export and import support helps users feel safer about keeping long-term records.',
    image: '/assets/screens/food-diary.png',
    bullets: ['Keep a copy of diary records', 'Support long-term tracking history', 'Reduce fear of losing progress', 'Move or restore records when available'],
    sections: [
      ['Why portability matters', 'Users may track meals for months. Knowing that diary records can be exported or restored builds trust and reduces the feeling of being locked in.'],
      ['Useful during device changes', 'Changing phones, reinstalling apps or switching devices is less stressful when users know how to preserve important records.'],
      ['Better for serious self-review', 'Some users want a personal copy of their history for analysis, coaching or long-term habit review. Export support makes that possible.'],
      ['Control builds confidence', 'People are more comfortable tracking personal habits when the product clearly explains how their data can be accessed and managed.']
    ],
    workflowTitle: 'Data portability workflow',
    workflow: [
      'Use export when you want a personal copy of your diary. Use import or restore options when moving records between devices or recovering history, where the app supports it.',
      'Keep exports private. Food diary data can reveal personal routines and should be stored carefully.'
    ],
    note: 'Exact export and import options can depend on the current app version and platform. Review in-app settings for the latest available controls.',
    bestFor: ['Long-term history', 'Device changes', 'Personal backup', 'Data control']
  }
];

export const useCasePages = [
  {
    path: '/weight-loss-calorie-counter/',
    navLabel: 'Weight Loss',
    title: 'AI Food Tracking for Weight Loss',
    h1: 'AI food tracking for weight loss routines',
    description: 'Use meal photos, daily targets and food diary review to build a practical weight loss tracking routine.',
    kicker: 'Weight loss habits',
    summary: 'Weight loss tracking works best when it creates awareness without making every meal feel like homework.',
    image: '/assets/screens/goal-control.png',
    bullets: ['See what is left for the day', 'Log meals before details are forgotten', 'Review high-impact foods and patterns', 'Build consistent habits instead of extreme rules'],
    sections: [
      ['Start with awareness', 'Before changing everything, it helps to understand a normal day. Photo logging can reveal portion sizes, forgotten snacks, high-calorie drinks and meals that are hard to estimate manually.'],
      ['Use the remaining allowance wisely', 'A visible daily target helps users make decisions during the day. If lunch is larger than expected, dinner can be planned with that context.'],
      ['Focus on the weekly pattern', 'One day rarely tells the full story. Sustainable weight loss depends on repeated behavior, realistic targets and a routine that can continue.'],
      ['Avoid all-or-nothing tracking', 'The app is designed to make approximate logging easier. An edited estimate is usually more useful than skipping a meal because it was hard to measure perfectly.']
    ],
    workflowTitle: 'Weight loss tracking workflow',
    workflow: [
      'Set a goal, log meals as they happen and review the daily balance. Use the information to make small adjustments such as changing a snack, adding protein or reducing forgotten extras.',
      'If weight loss involves a medical condition, medication, pregnancy, eating disorder history or other health concern, users should work with a qualified professional.'
    ],
    note: 'Healthy weight management is broader than calories alone. Sleep, physical activity, stress and sustainable eating patterns also matter.',
    bestFor: ['Daily awareness', 'Portion review', 'Consistency', 'Small adjustments']
  },
  {
    path: '/calorie-deficit-app/',
    navLabel: 'Calorie Deficit',
    title: 'Daily Deficit Tracking App',
    h1: 'Daily deficit tracking with meal photos and activity context',
    description: 'Track intake, remaining allowance and activity context while following a realistic deficit goal.',
    kicker: 'Daily balance',
    summary: 'A deficit is not a single perfect day. It is a pattern that becomes easier to understand when food and activity context are visible.',
    image: '/assets/screens/goal-control.png',
    bullets: ['Compare intake with a daily goal', 'Use activity context when available', 'Review the average pattern over time', 'Avoid chasing exact numbers from every device'],
    sections: [
      ['Deficit is about the average', 'A higher or lower day can happen. What matters is whether the routine, over time, matches the user’s goal and feels sustainable.'],
      ['Activity estimates are context, not permission slips', 'Calories burned from wearables and apps can help explain the day, but they are still estimates. Users should avoid treating them as exact “extra food” numbers.'],
      ['Meal timing affects decisions', 'Knowing what remains after breakfast or lunch can help the user make a calmer choice later, instead of trying to reconstruct the day at night.'],
      ['Manual edits matter', 'Hidden ingredients such as oil, sauces and sweet drinks can change the deficit picture. The app lets users edit entries when they know more than the camera.']
    ],
    workflowTitle: 'Deficit tracking workflow',
    workflow: [
      'Log meals throughout the day, review what remains and use the next meal to adjust naturally. The goal is a realistic routine, not a perfect number after every bite.',
      'Review weekly trends to avoid overreacting to one unusually high or low day.'
    ],
    note: 'Aggressive calorie targets may be unsafe for some people. Users should seek professional advice when unsure.',
    bestFor: ['Daily allowance', 'Weekly averages', 'Activity context', 'Weight-loss planning']
  },
  {
    path: '/muscle-gain-calorie-tracker/',
    navLabel: 'Muscle Gain',
    title: 'Macro and Protein Tracking for Muscle Gain',
    h1: 'Macro and protein tracking for muscle gain',
    description: 'Keep protein, calories and macro balance visible while working toward muscle gain or a lean bulk routine.',
    kicker: 'Training nutrition',
    summary: 'For muscle gain, users often need enough food and enough protein. Tracking makes both visible during the day.',
    image: '/assets/screens/goal-control.png',
    bullets: ['Track protein progress during the day', 'Keep calories visible for gain-oriented goals', 'Use barcodes for packaged protein foods', 'Review weekly consistency'],
    sections: [
      ['Protein is easier to fix early', 'If protein is low at the end of the day, it can be hard to catch up comfortably. A macro view helps users notice the gap earlier.'],
      ['Calories still matter', 'Training hard does not automatically mean eating enough. Tracking helps users see whether meals support a gain-oriented routine.'],
      ['Packaged foods are quick wins', 'Protein shakes, bars, yogurt and prepared meals often have barcodes. Scanning them can make training nutrition easier to log.'],
      ['Review trends with training context', 'Progress depends on training, recovery and nutrition together. Food tracking gives one part of the picture, especially when viewed across weeks.']
    ],
    workflowTitle: 'Muscle gain workflow',
    workflow: [
      'Set a gain-oriented goal, log meals and check protein progress before the day is almost over. If protein or calories are behind, plan the next meal around that gap.',
      'Use photo analysis for cooked meals and barcode scanning for packaged foods so the routine stays fast.'
    ],
    note: 'Muscle gain goals vary by body size, training status, program and health context. The app supports awareness rather than prescribing a training plan.',
    bestFor: ['Protein targets', 'Lean bulk', 'Workout nutrition', 'Macro review']
  },
  {
    path: '/maintenance-calorie-tracker/',
    navLabel: 'Maintenance',
    title: 'Weight Maintenance Tracker',
    h1: 'Weight maintenance tracking for steady routines',
    description: 'Use food diary history, macro context and weekly trends to support weight maintenance without strict dieting.',
    kicker: 'Steady habits',
    summary: 'Maintenance is about noticing drift early while keeping tracking calm enough to live with.',
    image: '/assets/screens/visual-progress.png',
    bullets: ['Review weekly intake patterns', 'Notice changes in portions and snacks', 'Keep routines visible without strict dieting', 'Use the diary when habits start drifting'],
    sections: [
      ['Maintenance is a different goal', 'After losing, gaining or stabilizing weight, users may not want an intense diet phase. They need enough awareness to stay steady.'],
      ['Drift happens quietly', 'Restaurant frequency, snack portions, drinks or weekend meals can slowly change the average. A diary helps users catch the change before it feels confusing.'],
      ['Use partial tracking if needed', 'Some maintenance users may track every day; others may track during busy weeks, travel or after routine changes. The app supports flexible awareness.'],
      ['Macros can still help', 'Protein and macro balance can make maintenance feel more predictable, especially for users who also train or manage hunger.']
    ],
    workflowTitle: 'Maintenance workflow',
    workflow: [
      'Log enough meals to understand the current routine. Review weekly trends, then adjust one habit if the pattern starts moving away from the user’s goal.',
      'Use the app more during routine changes—travel, holidays, new jobs or new training schedules—when old habits may no longer apply.'
    ],
    note: 'Maintenance tracking should reduce uncertainty, not create pressure. The app is most useful when it supports a calm routine.',
    bestFor: ['Stable routines', 'Post-diet awareness', 'Trend review', 'Flexible tracking']
  },
  {
    path: '/homemade-food-calorie-counter/',
    navLabel: 'Homemade Food',
    title: 'Homemade Meal Tracking',
    h1: 'Homemade meal tracking for mixed dishes',
    description: 'Estimate and review nutrition for homemade meals, leftovers and recipes that do not come with labels.',
    kicker: 'Unlabeled meals',
    summary: 'Homemade food is often the hardest to log because recipes, portions and hidden ingredients change from meal to meal.',
    image: '/assets/screens/nutrition-balance.png',
    bullets: ['Estimate meals without labels', 'Review oils, sauces and hidden ingredients', 'Save repeated dishes for later', 'Use photos when ingredient logging is too slow'],
    sections: [
      ['Why homemade meals are difficult', 'A bowl of pasta, soup, curry, salad or stir-fry can contain several ingredients and a serving size that changes every time. Manual entry may be accurate, but it can also be slow.'],
      ['Use AI for a fast first draft', 'A food photo can identify visible ingredients and estimate the portion. Users can then adjust what the photo cannot know, such as oil, dressing or recipe details.'],
      ['Repeated dishes deserve shortcuts', 'If a user often eats the same breakfast, salad or family recipe, saving and reusing entries can make future logging faster and more consistent.'],
      ['Choose the right level of detail', 'For a one-time meal, a reviewed estimate may be enough. For a meal prep recipe eaten all week, ingredient-level detail may be worth the extra time.']
    ],
    workflowTitle: 'Homemade meal workflow',
    workflow: [
      'Take a clear photo, review the meal name and portion estimate, then add known extras such as oil, cheese, dressing or sauce. Save the meal if you expect to eat it again.',
      'When cooking a repeated recipe, compare the app estimate with ingredient totals once. That can improve confidence for future servings.'
    ],
    note: 'Homemade estimates depend on recipe and serving size. The app is a practical logging aid, not a recipe database substitute for every situation.',
    bestFor: ['Leftovers', 'Family meals', 'Meal prep', 'Mixed dishes']
  },
  {
    path: '/restaurant-calorie-tracker/',
    navLabel: 'Restaurant Meals',
    title: 'Restaurant Meal Tracker',
    h1: 'Restaurant meal tracking when eating out',
    description: 'Log restaurant meals with photo estimates, portion review and practical adjustments for hidden ingredients.',
    kicker: 'Eating out',
    summary: 'Restaurant tracking should help users stay aware while still living normally, traveling and eating with other people.',
    image: '/assets/screens/ai-photo.png',
    bullets: ['Log before the meal is forgotten', 'Adjust for sauces and cooking fats', 'Keep travel and social meals visible', 'Use estimates without avoiding restaurants'],
    sections: [
      ['Take the photo before eating', 'The full portion is easiest to review before the meal changes. A quick photo at the table can prevent trying to remember details hours later.'],
      ['Hidden ingredients are common', 'Restaurant dishes may include butter, oil, sugar, dressings and sauces that are not visible. The estimate should be reviewed with that uncertainty in mind.'],
      ['Use a range mindset', 'Restaurant numbers are rarely exact. The value of tracking is keeping the day visible and learning patterns, not pretending every recipe is known.'],
      ['Stay consistent during travel', 'Travel and social meals often break tracking habits. Photo logging keeps the routine lightweight enough to continue.']
    ],
    workflowTitle: 'Eating out workflow',
    workflow: [
      'Photograph the meal, review the estimate, adjust for visible sides or known sauces, and save it before leaving the table. If the restaurant provides nutrition data, use it to refine the entry.',
      'Do not let uncertainty become a reason to skip the meal. A reasonable estimate keeps the diary more complete than a blank day.'
    ],
    note: 'Restaurant preparation and portions vary widely. Treat estimates as practical awareness tools and edit when more information is available.',
    bestFor: ['Restaurants', 'Travel days', 'Social meals', 'Unknown recipes']
  },
  {
    path: '/meal-tracker/',
    navLabel: 'Meal Tracker',
    title: 'Meal Tracker App',
    h1: 'Meal tracking for breakfast, lunch, dinner and snacks',
    description: 'Organize daily meals with photos, quick entries, totals and reviewable history.',
    kicker: 'Meal structure',
    summary: 'A meal tracker helps users understand which part of the day affects their goals most.',
    image: '/assets/screens/food-diary.png',
    bullets: ['Separate breakfast, lunch, dinner and snacks', 'Review which meals drive daily totals', 'Log quickly with photos or barcodes', 'Use history to improve routines'],
    sections: [
      ['Organize the day clearly', 'When meals are separated, users can see whether breakfast, lunch, dinner, snacks or drinks are changing the daily picture.'],
      ['Find the high-impact moment', 'Some people struggle with evening snacks; others with restaurant lunches or low-protein breakfasts. Meal tracking makes the pattern easier to spot.'],
      ['Use the right input for each meal', 'A barcode may be best for a packaged breakfast. A photo may be best for a restaurant lunch. A repeated favorite may be best for dinner.'],
      ['Review without overthinking', 'The goal is to make the day readable. Users do not need to analyze every bite if the overall pattern is clear.']
    ],
    workflowTitle: 'Meal tracking workflow',
    workflow: [
      'Add each meal close to when it happens. At the end of the day, review which meal had the biggest effect and choose one small improvement for tomorrow.',
      'If a meal repeats often, save it or reuse a previous entry so the habit becomes faster over time.'
    ],
    note: 'Meal tracking works best when it is simple enough to repeat on ordinary days, not only on days when everything is planned.',
    bestFor: ['Daily structure', 'Snacks', 'Meal timing', 'Routine review']
  },
  {
    path: '/photo-food-journal/',
    navLabel: 'Photo Food Journal',
    title: 'Photo Food Journal',
    h1: 'A photo food journal with nutrition context',
    description: 'Keep a visual record of meals and add nutrition estimates when you want more than a simple photo log.',
    kicker: 'Visual awareness',
    summary: 'Some users prefer to start with photos before they focus on numbers. A photo journal makes food patterns visible with less pressure.',
    image: '/assets/screens/food-diary.png',
    bullets: ['Capture meals visually', 'Add estimates when useful', 'Review portions and patterns later', 'Use photos as a gentler tracking habit'],
    sections: [
      ['A softer starting point', 'Not everyone wants strict tracking from day one. Taking photos can build awareness first, while nutrition estimates can be added when the user is ready.'],
      ['Photos reveal what text hides', 'Portion size, plate balance, restaurant frequency and snack habits are often easier to notice visually than in a list of meal names.'],
      ['Turn photos into useful feedback', 'AI estimates add calories, macros and portion context, turning a simple photo record into something more actionable.'],
      ['Good for reflection', 'A visual history can help users notice patterns without needing to remember every detail from memory.']
    ],
    workflowTitle: 'Photo journal workflow',
    workflow: [
      'Take a meal photo, save it to the diary and review the visual history later. Add or edit nutrition estimates when the user wants more detail.',
      'Use this approach when strict logging feels too heavy, but a visual habit still feels realistic.'
    ],
    note: 'A photo food journal supports awareness. Nutrition estimates remain approximate and should be reviewed when accuracy matters.',
    bestFor: ['Beginners', 'Visual memory', 'Gentle tracking', 'Habit reflection']
  },
  {
    path: '/healthy-eating-tracker/',
    navLabel: 'Healthy Eating',
    title: 'Healthy Eating Tracker',
    h1: 'Healthy eating tracking for everyday awareness',
    description: 'Use meal history, macro context and small habit changes to support healthier eating without rigid rules.',
    kicker: 'Balanced habits',
    summary: 'Healthy eating is easier to improve when users can see patterns clearly and choose one realistic change at a time.',
    image: '/assets/screens/nutrition-balance.png',
    bullets: ['Observe habits before changing everything', 'Review balance without labeling foods as bad', 'Use macros and photos for context', 'Make small improvements that can last'],
    sections: [
      ['Start with observation', 'Many users benefit from seeing what they already do before trying to change it. A diary can reveal meal timing, protein gaps, snack patterns and restaurant frequency.'],
      ['Avoid moral labels', 'The app should help users understand food choices, not shame them. Calories and macros are context, not a judgement of whether a meal is “good” or “bad.”'],
      ['One change is easier to keep', 'A user may choose to add protein to breakfast, plan a better lunch or log restaurant meals more consistently. Small changes are easier to repeat.'],
      ['Useful across different lifestyles', 'Healthy eating looks different for different bodies, cultures, schedules and goals. Flexible tracking supports personal routines rather than forcing one diet template.']
    ],
    workflowTitle: 'Healthy eating workflow',
    workflow: [
      'Log meals for a few days without trying to be perfect. Review the pattern, choose one realistic improvement and use the diary to see whether it becomes easier over time.',
      'Use food photos and macros as feedback. The app gives visibility; the user chooses the habit that fits their life.'
    ],
    note: 'Healthy eating guidance should remain informational. People with medical conditions or special nutrition needs should consult a qualified professional.',
    bestFor: ['Balanced habits', 'Food awareness', 'Non-restrictive tracking', 'Long-term routines']
  }
];

export const useCaseIndex = {
  path: '/use-cases/',
  title: 'Use Cases',
  h1: 'Real-life ways to use Calorie Counter AI',
  description: 'Explore practical nutrition tracking workflows for weight loss, homemade food, restaurant meals, muscle gain, maintenance and everyday awareness.',
  kicker: 'Use cases'
};

export const blogIndex = {
  path: '/blog/',
  title: 'Calorie Counting and AI Food Tracking Guide',
  h1: 'Calorie counting and AI food tracking guide',
  description: 'Practical guides for food photos, macros, portion estimates, homemade meals, restaurant tracking and sustainable nutrition habits.',
  kicker: 'Learn'
};

export const blogArticles = [
  {
    path: '/blog/how-to-count-calories-from-a-photo/',
    title: 'How to Count Calories from a Photo',
    h1: 'How to count calories from a photo',
    description: 'Learn how photo-based food logging works, when it helps and how to review AI nutrition estimates before saving them.',
    category: 'Photo tracking',
    readTime: '6 min read',
    image: '/assets/screens/ai-photo.png',
    intro: 'Photo logging is useful when manual search would take too long. The best workflow combines a clear picture, AI estimate and quick human review.',
    sections: [
      ['Start with a clear photo', 'Capture the full plate in good light. Try to include sides, sauces and drinks separately if they are part of the meal.'],
      ['Review the detected food', 'Check whether the dish name and visible ingredients make sense. If the app misses a side or adds something that is not there, edit before saving.'],
      ['Check portion size', 'A photo can estimate visible portion size, but camera angle and plate size can change perception. Adjust the portion if it looks off.'],
      ['Save the entry and learn from patterns', 'The value grows as entries become a diary. Review repeated meals, restaurant days and macro patterns over time.']
    ],
    takeaway: 'Photo calorie estimates are fastest when users treat AI as a first draft and keep the final review in their own hands.'
  },
  {
    path: '/blog/how-accurate-are-ai-calorie-counters/',
    title: 'How Accurate Are AI Calorie Counters?',
    h1: 'How accurate are AI food estimates?',
    description: 'Understand what affects AI nutrition estimate accuracy, including photo quality, hidden ingredients, portion size and manual review.',
    category: 'Accuracy',
    readTime: '7 min read',
    image: '/assets/screens/nutrition-balance.png',
    intro: 'AI estimates can make food logging faster, but they should not be treated as laboratory measurements. Accuracy depends on what the photo can show and what the user can confirm.',
    sections: [
      ['Visible food is easier than hidden ingredients', 'A camera can see a salad, burger or bowl, but it may not know how much oil, butter, sugar, dressing or sauce was used.'],
      ['Portion size is the biggest variable', 'The same food can change nutrition totals dramatically when the serving changes. Review weight and portion estimates before saving.'],
      ['Use better photos for better estimates', 'Good lighting, a clear angle and the full plate help the model create a more useful first draft.'],
      ['Manual edits improve the diary', 'The strongest workflow is AI plus review: accept what looks reasonable, correct what you know, and save the meal.']
    ],
    takeaway: 'AI should reduce logging friction, not remove common sense. Reviewed estimates are the most practical path.'
  },
  {
    path: '/blog/ai-calorie-counter-vs-manual-logging/',
    title: 'AI Food Logging vs Manual Food Logging',
    h1: 'AI food logging vs manual food logging',
    description: 'Compare AI photo logging with manual food search and learn when each method is more useful.',
    category: 'Workflow',
    readTime: '5 min read',
    image: '/assets/screens/food-diary.png',
    intro: 'Manual logging can be detailed, but it is often slow. AI logging is faster, but it still needs review. Most users benefit from using both.',
    sections: [
      ['Manual logging is useful for known foods', 'Repeated recipes, weighed portions and exact labels can be logged manually when precision matters.'],
      ['AI helps with unlabeled meals', 'Restaurant food, mixed plates and homemade meals are often easier to start from a photo.'],
      ['The best workflow is flexible', 'Use barcode scanning for packaged items, photos for plates and manual edits for details the camera cannot know.'],
      ['Consistency beats abandoned precision', 'A perfect method that feels too slow may lead to missing entries. A fast reviewed method is often more sustainable.']
    ],
    takeaway: 'AI and manual logging are not enemies. Use the method that fits the meal.'
  },
  {
    path: '/blog/food-calorie-scanner/',
    title: 'What Is a Food Scanner App?',
    h1: 'What is a food scanner app?',
    description: 'Learn the difference between photo food scanning, barcode scanning and manual nutrition logging.',
    category: 'Scanning',
    readTime: '5 min read',
    image: '/assets/screens/barcode-scanner.png',
    intro: 'Food scanning can mean two different things: analyzing a meal photo or scanning a packaged product barcode. Each solves a different problem.',
    sections: [
      ['Photo scanning is for plates', 'Use a photo when the meal has no label, such as homemade food, restaurant meals or mixed dishes.'],
      ['Barcode scanning is for packages', 'Use a barcode when the product has a nutrition label and the serving can be confirmed.'],
      ['Manual review still matters', 'Both methods should leave room for serving adjustments and corrections.'],
      ['A complete diary uses multiple inputs', 'A normal day may include all three: photos, barcodes and manual edits.']
    ],
    takeaway: 'The right scanner depends on the food: photos for plates, barcodes for packages.'
  },
  {
    path: '/blog/how-to-track-macros-for-beginners/',
    title: 'How to Track Macros for Beginners',
    h1: 'How to track macros for beginners',
    description: 'A beginner-friendly guide to protein, carbohydrates and fats, and how to track them without making food logging too complicated.',
    category: 'Macros',
    readTime: '7 min read',
    image: '/assets/screens/goal-control.png',
    intro: 'Macro tracking helps users understand what their food is made of. The goal is awareness, not turning every meal into math homework.',
    sections: [
      ['Know the three macros', 'Protein, carbohydrates and fats make up most of the energy in food. Each can matter differently depending on the user’s goal.'],
      ['Start with protein visibility', 'For many users, protein is the macro they most want to keep visible during the day.'],
      ['Use photos and barcodes to reduce work', 'Fast logging makes macro tracking more realistic on busy days.'],
      ['Review patterns, not perfection', 'Beginners should look for trends: low protein breakfasts, high-fat restaurant meals or snack-heavy evenings.']
    ],
    takeaway: 'Macro tracking works best when it helps users make one better decision, not when it creates pressure.'
  },
  {
    path: '/blog/calories-vs-macros/',
    title: 'Calories vs Macros: What Should You Track?',
    h1: 'Calories vs macros: what should you track?',
    description: 'Understand the difference between total energy and macro balance, and when each view is useful.',
    category: 'Macros',
    readTime: '6 min read',
    image: '/assets/screens/visual-progress.png',
    intro: 'Calories and macros answer different questions. One shows how much energy you ate; the other shows the composition of that energy.',
    sections: [
      ['Calories answer “how much”', 'Calories summarize energy intake and are useful for weight-related goals.'],
      ['Macros answer “what kind”', 'Protein, carbs and fats help explain satiety, training support and meal balance.'],
      ['Most users benefit from both', 'A meal can fit the energy target but still leave protein low or macros unbalanced.'],
      ['Use the level of detail that fits your goal', 'Some users need only calories; others benefit from macro targets and trend review.']
    ],
    takeaway: 'Calories are the headline; macros are the context.'
  },
  {
    path: '/blog/how-to-count-calories-in-homemade-food/',
    title: 'How to Count Calories in Homemade Food',
    h1: 'How to count calories in homemade food',
    description: 'Practical ways to log homemade meals using ingredients, portion review, saved recipes and AI photo estimates.',
    category: 'Homemade food',
    readTime: '7 min read',
    image: '/assets/screens/nutrition-balance.png',
    intro: 'Homemade meals are difficult because recipes and portions change. A practical workflow uses the right level of detail for the meal.',
    sections: [
      ['Use ingredients for repeated recipes', 'If you cook the same meal often, ingredient logging can create a reusable reference.'],
      ['Use photo estimates for one-off meals', 'When the meal is not repeated or weighing is unrealistic, a photo estimate can keep the diary complete.'],
      ['Adjust hidden ingredients', 'Oil, butter, dressing, cheese and sauces often need manual review.'],
      ['Save useful entries', 'Repeated homemade meals become easier when the previous entry is available.']
    ],
    takeaway: 'Homemade food does not need one method. Use detailed logging for recipes and photo estimates for everyday speed.'
  },
  {
    path: '/blog/how-to-estimate-portion-size/',
    title: 'How to Estimate Portion Size Without a Food Scale',
    h1: 'How to estimate portion size without a food scale',
    description: 'Learn practical portion review tips for meals that cannot be weighed, including photo estimates and consistency checks.',
    category: 'Portions',
    readTime: '5 min read',
    image: '/assets/screens/nutrition-balance.png',
    intro: 'A food scale can be useful, but it is not always realistic. Portion estimation keeps tracking possible in normal life.',
    sections: [
      ['Capture the full portion', 'A clear photo of the whole plate gives a better starting point than a cropped or angled image.'],
      ['Compare with familiar servings', 'Think about whether the portion is closer to a small, medium or large serving you have logged before.'],
      ['Adjust instead of guessing blindly', 'If the estimate looks too high or low, edit the portion before saving.'],
      ['Be consistent over time', 'Consistent estimates can still reveal useful patterns even when individual meals are approximate.']
    ],
    takeaway: 'Portion estimation is not perfect, but it helps users keep the diary complete when weighing is not possible.'
  },
  {
    path: '/blog/how-many-calories-should-i-eat-a-day/',
    title: 'How Many Calories Should I Eat a Day?',
    h1: 'How many calories should I eat a day?',
    description: 'Understand the main factors that influence daily energy needs and how a food diary makes a target useful.',
    category: 'Goals',
    readTime: '6 min read',
    image: '/assets/screens/goals-pace.png',
    intro: 'Daily energy needs depend on body size, age, activity and goal. A target becomes useful only when users can compare it with what they actually eat.',
    sections: [
      ['Personal details matter', 'Age, sex, height, weight and activity level all influence estimated daily needs.'],
      ['Goals change the number', 'Losing, maintaining and gaining weight require different target ranges.'],
      ['Activity changes the day', 'Movement and workouts can change energy needs, but activity estimates should still be treated as estimates.'],
      ['Tracking turns a target into feedback', 'The app helps users see how meals fit the day instead of leaving the target as an abstract number.']
    ],
    takeaway: 'A daily target is only helpful when it becomes visible during real meals.'
  },
  {
    path: '/blog/what-is-a-calorie-deficit/',
    title: 'What Is a Calorie Deficit?',
    h1: 'What is a calorie deficit?',
    description: 'Learn what a calorie deficit means, why weekly patterns matter and how food tracking can support awareness.',
    category: 'Weight loss',
    readTime: '5 min read',
    image: '/assets/screens/goal-control.png',
    intro: 'A calorie deficit means intake is lower than energy used over time. Tracking helps users see the pattern rather than guess.',
    sections: [
      ['Think in averages', 'One day is less important than the average pattern across days and weeks.'],
      ['Avoid extreme targets', 'A realistic routine is more sustainable than aggressive restriction for most users.'],
      ['Use the diary to find changes', 'The food diary can reveal which meals, snacks or drinks are most worth adjusting.'],
      ['Remember the bigger picture', 'Sleep, activity, stress and overall eating patterns also matter for healthy weight management.']
    ],
    takeaway: 'A deficit is a pattern, not a single perfect day.'
  },
  {
    path: '/blog/calorie-counting-mistakes/',
    title: 'Common Calorie Counting Mistakes',
    h1: 'Common calorie counting mistakes',
    description: 'Avoid common logging mistakes such as missing oils, sauces, drinks, snacks and portion-size differences.',
    category: 'Tips',
    readTime: '6 min read',
    image: '/assets/screens/food-diary.png',
    intro: 'Food tracking gets more useful when users know where mistakes usually happen and build a workflow that catches them.',
    sections: [
      ['Forgetting oils and sauces', 'Cooking fats, dressing and sauces can be hard to see but meaningful to the total.'],
      ['Skipping drinks and small snacks', 'Coffee drinks, juices, alcohol, bites and snacks can disappear from memory quickly.'],
      ['Underestimating portions', 'Portion size is one of the most common sources of uncertainty. Review the serving before saving.'],
      ['Trying to be perfect', 'Perfection can make users quit. A consistent reviewed estimate is often more useful than an abandoned diary.']
    ],
    takeaway: 'The best tracking habit is accurate enough to be useful and easy enough to repeat.'
  },
  {
    path: '/blog/how-to-log-restaurant-food/',
    title: 'How to Track Calories When Eating Out',
    h1: 'How to track meals when eating out',
    description: 'Practical tips for logging restaurant meals with photos, portion review and realistic adjustments.',
    category: 'Restaurants',
    readTime: '5 min read',
    image: '/assets/screens/ai-photo.png',
    intro: 'Restaurant meals are harder to log because recipes and portions are not always visible. A photo estimate helps keep the day from going blank.',
    sections: [
      ['Take the photo first', 'The whole portion is easiest to review before eating.'],
      ['Look for hidden additions', 'Butter, oil, sugar, sauces and dressings can affect the estimate.'],
      ['Use available menu information', 'If the restaurant provides nutrition data, use it to improve the entry.'],
      ['Do not let uncertainty stop the habit', 'A reasonable estimate keeps the diary more useful than skipping the meal.']
    ],
    takeaway: 'Restaurant tracking is about practical awareness, not perfect knowledge of the kitchen.'
  },
  {
    path: '/blog/how-to-track-protein/',
    title: 'How to Track Protein Intake',
    h1: 'How to track protein intake',
    description: 'Learn how to keep protein visible across meals using macro tracking, photos and barcode scanning.',
    category: 'Protein',
    readTime: '5 min read',
    image: '/assets/screens/goal-control.png',
    intro: 'Protein tracking is easier when progress is visible throughout the day instead of discovered at night.',
    sections: [
      ['Set a target that fits your goal', 'Protein needs depend on body size, activity and purpose. The app helps keep the chosen target visible.'],
      ['Check protein per meal', 'Looking only at the daily total can make it harder to plan. Meal-level visibility helps users adjust earlier.'],
      ['Use barcodes for packaged protein foods', 'Yogurt, shakes, bars and prepared foods are often quick to scan.'],
      ['Use photos for cooked meals', 'Photo analysis helps estimate protein in restaurant or homemade dishes when labels are unavailable.']
    ],
    takeaway: 'Protein is easier to manage when it is visible before the day is almost over.'
  },
  {
    path: '/blog/what-is-a-food-diary/',
    title: 'What Is a Food Diary and How Does It Help?',
    h1: 'What is a food diary and how does it help?',
    description: 'Learn how a food diary can support nutrition awareness, visual meal history and daily habit review.',
    category: 'Food diary',
    readTime: '5 min read',
    image: '/assets/screens/food-diary.png',
    intro: 'A food diary is a record of what a user eats. When it includes photos and nutrition context, it becomes a practical habit-awareness tool.',
    sections: [
      ['It improves memory', 'Food details are easy to forget. A diary keeps the day from being reconstructed from guesswork.'],
      ['It reveals patterns', 'Repeated snacks, restaurant days, low-protein meals and skipped breakfasts become easier to notice.'],
      ['Photos add context', 'A photo can show portion size and meal composition more clearly than a short text label.'],
      ['Consistency is the benefit', 'The diary becomes more useful as history grows. The best system is one the user can repeat.']
    ],
    takeaway: 'A food diary is not just a log. It is a mirror for everyday habits.'
  }
];

export const utilityPages = [
  { path: '/download/', title: 'Download Calorie Counter AI', h1: 'Download Calorie Counter AI', description: 'Download Calorie Counter AI for iPhone or Android and start tracking food with photos, barcodes and a simple diary.', type: 'download' },
  { path: '/faq/', title: 'FAQ', h1: 'Frequently asked questions', description: 'Answers about Calorie Counter AI, photo food estimates, free daily analyses, macros, barcodes, privacy and supported platforms.', type: 'faq' },
  { path: '/pricing/', title: 'Pricing', h1: 'Pricing', description: 'Learn how free daily AI analyses and premium options work in Calorie Counter AI.', type: 'pricing' },
  { path: '/support/', title: 'Support', h1: 'Support', description: 'Get help with Calorie Counter AI, subscriptions, account access, food diary and app setup.', type: 'support' },
  { path: '/contact/', title: 'Contact Us', h1: 'Contact Calorie Counter AI', description: 'Contact the Calorie Counter AI team for support, partnerships or press inquiries.', type: 'contact' },
  { path: '/privacy-policy/', title: 'Privacy Policy', h1: 'Privacy Policy', description: 'Privacy Policy for Calorie Counter AI: how the app handles local data, photos, analytics, subscriptions and optional Health integrations.', type: 'privacy' },
  { path: '/terms/', title: 'Terms of Use', h1: 'Terms of Use', description: 'Terms of Use for Calorie Counter AI covering app access, subscriptions, acceptable use, health disclaimers and contact information.', type: 'terms' },
  { path: '/health-disclaimer/', title: 'Health Disclaimer', h1: 'Health Disclaimer', description: 'Health and nutrition disclaimer for Calorie Counter AI estimates and app content.', type: 'disclaimer' },
  { path: '/delete-account/', title: 'Delete Account', h1: 'Delete account and data', description: 'How to request account and data deletion for Calorie Counter AI.', type: 'delete' },
  { path: '/press/', title: 'Press Kit', h1: 'Press Kit', description: 'Press resources, app description, screenshots and store links for Calorie Counter AI.', type: 'press' }
];

export const allPages = [
  ...featurePages,
  ...useCasePages,
  useCaseIndex,
  blogIndex,
  ...blogArticles,
  foodIndexPage,
  ...foodPages,
  ...utilityPages
];

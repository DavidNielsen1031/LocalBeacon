export type { IndustryFAQ, IndustryData } from './types'

import { homeServices } from './home-services'
import { healthcare } from './healthcare'
import { beautyWellness } from './beauty-wellness'
import { automotive } from './automotive'
import { professionalServices } from './professional-services'
import { fitnessRecreation } from './fitness-recreation'
import { petServices } from './pet-services'
import { outdoorProperty } from './outdoor-property'
import { eventsCreative } from './events-creative'
import { foodLocal } from './food-local'
import { otherLocal } from './other-local'

import type { IndustryData } from './types'

export const industries: Record<string, IndustryData> = {
  ...homeServices,
  ...healthcare,
  ...beautyWellness,
  ...automotive,
  ...professionalServices,
  ...fitnessRecreation,
  ...petServices,
  ...outdoorProperty,
  ...eventsCreative,
  ...foodLocal,
  ...otherLocal,
}

export const industryList = Object.values(industries)
export const industrySlugs = Object.keys(industries)

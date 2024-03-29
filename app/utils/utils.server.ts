import { json } from "@remix-run/node"

import type { Store, StoreHasItems } from "@prisma/client"

import {
  getStoresByCategory,
  getStoresByKind,
  getStoresKinds,
  getStoresWithDiscount,
  getStoresWithFreeShipment,
} from "../queries.server/store.query.server"

import { LoginFieldErrors } from "../routes/login"

import {
  AllowedStoresFeatures,
  SCORE_ROUNDING,
  VERIFICATION_CODE_EXPIRY_MINS,
} from "../constants"

export const badRequest = <T>(data: T) => json<T>(data, { status: 400 })

export function generateRandomCode(figures: number) {
  const mins = [1] // leat signifcant possible figure
  const maxs = [9] // most signifcant possible figure

  for (let index = 0; index < figures - 1; index++) {
    mins.push(0)
    maxs.push(9)
  }

  let min = Number(mins.join(""))
  let max = Number(maxs.join(""))

  min = Math.ceil(min)
  max = Math.floor(max)

  return String(Math.floor(Math.random() * (max - min) + min))
}

export function generateVerificationExpiry(duration: number): Date {
  duration = duration ?? VERIFICATION_CODE_EXPIRY_MINS

  return new Date(
    new Date(Date.now()).setMinutes(
      new Date(Date.now()).getMinutes() + duration,
    ),
  )
}

export function checkFieldsErrors(
  fieldErrors: LoginFieldErrors,
  state?: string,
) {
  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
      state,
    }
  }
}

type Features = {
  name: AllowedStoresFeatures
  getStores: ({ kind, stores }: any) => Promise<Store[]>
  title?: string
}[]
export const features: Features = [
  {
    name: "kind",
    getStores: async ({ kind, stores }: { kind?: string; stores: Store[] }) => {
      const kinds = await getStoresKinds()

      if (!kind || !kinds.find(storeKind => storeKind.name === kind))
        throw new Response("این نوع وجود ندارد.", { status: 404 })

      const featureStores = await getStoresByKind({ kind })

      let kindFeature = features.find(feat => feat.name === "kind")

      if (kindFeature) kindFeature.title = kind

      return featureStores
    },
  },

  {
    name: "discount",
    title: "دارای تخفیف",
    getStores: async ({ stores }: { stores: Store[] }) => {
      const featureStores = await getStoresWithDiscount({ stores })

      if (!featureStores) {
        throw new Response("این نوع وجود ندارد.", { status: 404 })
      }

      return featureStores
    },
  },

  {
    name: "category",
    title: "نوع خاص",
    getStores: async ({
      stores,
      category,
    }: {
      stores: Store[]
      category: string
    }) => {
      const featureStores = await getStoresByCategory({ stores, category })

      if (!featureStores) {
        throw new Response("این نوع وجود ندارد.", { status: 404 })
      }

      return featureStores
    },
  },

  {
    name: "freeShipment",
    title: "دارای ارسال رایگان",
    getStores: async ({ stores }: { stores: Store[] }) => {
      const featureStores = await getStoresWithFreeShipment({ stores })
      if (!featureStores) {
        throw new Response("این نوع وجود ندارد.", { status: 404 })
      }

      return featureStores
    },
  },

  {
    name: "all",
    title: "همه فروشگاه ها",
    getStores: async ({ stores }: { stores: Store[] }) => {
      return stores
    },
  },
]

export function calculateScore({
  newScore,
  store,
}: {
  newScore: number
  store: Store | StoreHasItems
}) {
  try {
    const score = Number(
      (
        (store.score * store.scoreCount + newScore) /
        (store.scoreCount + 1)
      ).toFixed(SCORE_ROUNDING),
    )

    if (isNaN(score)) {
      throw new Response("محاسبه امتیاز ممکن نیست", { status: 404 })
    }

    return score
  } catch (error) {
    throw error
  }
}

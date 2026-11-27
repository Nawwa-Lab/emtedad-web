import type {
  Organization,
  OrganizationCatalogData,
  OrganizationCatalogItem,
  OrganizationCatalogKind,
  OrganizationCatalogOffer,
  OrganizationCatalogRequest,
} from '@/services/organizations'
import type { Market, OrganizationListing } from './data'

type ListingProvider = NonNullable<OrganizationListing['provider']>
type Catalog = OrganizationCatalogData<OrganizationCatalogKind>
type CatalogItem = OrganizationCatalogItem<OrganizationCatalogKind>

const MARKET_BY_API_VALUE: Record<string, Market> = {
  namlya: 'namliya',
  khalli_khales: 'khalli',
}

function isOffer(item: CatalogItem): item is OrganizationCatalogOffer<OrganizationCatalogKind> {
  return 'offerId' in item
}

function catalogItems(catalog: Catalog): CatalogItem[] {
  if ('items' in catalog) return catalog.items
  return [...catalog.namlya.items, ...catalog.khalli.items, ...catalog.requestBoard.items]
}

function offerToListing(
  offer: OrganizationCatalogOffer<OrganizationCatalogKind>,
  organization: Organization,
  provider: ListingProvider,
): OrganizationListing {
  const worker = offer.assignedWorker
  const rating = offer.assignedWorkerRating
  return {
    title: offer.title,
    category: offer.tags[0]?.name ?? '',
    description: offer.description ?? '',
    owner: worker?.name ?? organization.legalName,
    ownerAvatarUrl: (worker ? worker.imageUrl : organization.logoUrl) ?? undefined,
    market: MARKET_BY_API_VALUE[offer.market] ?? 'namliya',
    price: offer.shahamhamValue,
    kind: offer.kind === 'human_service' ? 'service' : 'resource',
    badge: rating?.status === 'rated' && rating.badge ? rating.badge : undefined,
    provider,
  }
}

function requestToListing(
  request: OrganizationCatalogRequest<OrganizationCatalogKind>,
  organization: Organization,
  category: string,
  provider: ListingProvider,
): OrganizationListing {
  const author = request.author
  return {
    title: request.title,
    category,
    description: request.description ?? '',
    owner: author?.name ?? organization.legalName,
    ownerAvatarUrl: (author ? author.imageUrl : organization.logoUrl) ?? undefined,
    market: 'alaesh',
    kind: 'request',
    provider,
  }
}

export function toCatalogListings(
  catalog: Catalog,
  organization: Organization,
  provider: ListingProvider,
  requestCategory: string,
): OrganizationListing[] {
  return catalogItems(catalog).map((item) =>
    isOffer(item)
      ? offerToListing(item, organization, provider)
      : requestToListing(item, organization, requestCategory, provider),
  )
}

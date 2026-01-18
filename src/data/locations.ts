export interface Hotel {
  name: string
  distance?: string
  price?: string
  description?: string
  link: string
  isHotelLincoln?: boolean
  lat: number
  lng: number
}

export interface Restaurant {
  name: string
  cuisine: string
  price: string
  description: string
  link: string
  asSeenOnBear?: boolean
  michelinStars?: number
  lat: number
  lng: number
}

export interface Activity {
  name: string
  description: string
  link: string
  lat: number
  lng: number
}

export interface Venue {
  name: string
  lat: number
  lng: number
  link: string
}

export interface Event {
  id: string
  day: string
  date: string
  time: string
  name: string
  venue: string
  address: string
  description: string
  lat: number
  lng: number
}

export const VENUE: Venue = {
  name: 'Cafe Brauer',
  lat: 41.9204,
  lng: -87.6341,
  link: 'https://cafebrauer.com/',
}

export const HOTELS: Hotel[] = [
  {
    name: 'The Viceroy',
    distance: '1.6 miles from venue',
    price: '$$$',
    description: 'Historic hotel nearby in Gold Coast with elegant rooms.',
    link: 'https://www.viceroyhotelsandresorts.com/chicago#/booking/step-1?arrive=10%2F16%2F2026&depart=10%2F18%2F2026&group=KAUF101626',
    lat: 41.9088,
    lng: -87.6289,
  },
  {
    name: 'Hotel Lincoln*',
    distance: '0.3 miles from venue',
    price: '$$',
    description: 'Modern boutique hotel with rooftop bar overlooking the park.',
    link: 'https://www.hyatt.com/events/en-US/group-booking/CHIJL/G-FFZZ',
    isHotelLincoln: true,
    lat: 41.9231,
    lng: -87.6389,
  },
  {
    name: 'voco Chicago Downtown - Riverwalk',
    distance: '2.5 miles from venue',
    price: '$',
    description: 'Centrally located on the river, nearby to plenty of Chicago sightseeing.',
    link: 'https://www.ihg.com/voco/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=CHIWP&qCiD=16&qCiMy=092026&qCoD=18&qCoMy=092026&qGrpCd=KPW&qAAR=6CBARC&qRtP=6CBARC&setPMCookies=true&qSHBrC=VX&qDest=350%20W.%20Wolf%20Point%20Plaza,%20Chicago,%20IL,%20US&showApp=true&adjustMonth=false&srb_u=1',
    lat: 41.8874,
    lng: -87.6386,
  },
]

export const RESTAURANTS: Restaurant[] = [
  {
    name: 'Cafe Ba-Ba-Reeba!',
    cuisine: 'Tapas',
    price: '$$',
    description: 'Fun upscale tapas place with a relaxed vibe.',
    link: 'https://www.cafebabareeba.com/',
    lat: 41.9265,
    lng: -87.6489,
  },
  {
    name: `Pequod's Pizza`,
    cuisine: 'Deep Dish',
    price: '$',
    description: 'Mecca for Chicago Deep Dish pizza',
    link: 'https://pequodspizza.com/',
    asSeenOnBear: true,
    lat: 41.9218,
    lng: -87.6642,
  },
  {
    name: `The Wiener's Circle`,
    cuisine: 'Chicago Hot Dogs',
    price: '$',
    description: 'Old school Chicago Hot Dog spot.',
    link: 'https://www.wienerscirclechicago.com/',
    lat: 41.9199,
    lng: -87.6493,
  },
  {
    name: `John's Food and Wine`,
    cuisine: 'American Fine Dining',
    price: '$$$',
    description: 'Upscale counter service and seasonal menus.',
    link: 'https://www.johnsfoodandwine.com/',
    lat: 41.9243,
    lng: -87.6516,
  },
  {
    name: 'Del Seoul',
    cuisine: 'Korean Fusion',
    price: '$',
    description: 'Korean tacos and street food classics',
    link: 'https://delseoul.com/',
    lat: 41.9296,
    lng: -87.6543,
  },
  {
    name: 'Mr. Beef',
    cuisine: 'Italian Beef',
    price: '$',
    description: 'Original spot for Chicago Italian Beef sandwiches',
    link: 'https://www.theoriginalmrbeef.com/',
    asSeenOnBear: true,
    lat: 41.8906,
    lng: -87.6359,
  },
  {
    name: 'Girl & The Goat',
    cuisine: 'New American',
    price: '$$$',
    description: 'James Beard Award-winning restaurant with creative small plates.',
    link: 'https://girlandthegoat.com/',
    lat: 41.8851,
    lng: -87.6485,
  },
  {
    name: 'Au Cheval',
    cuisine: 'American Diner',
    price: '$$',
    description: 'Famous for their legendary burger - worth the wait!',
    link: 'https://aucheval.com/',
    lat: 41.884,
    lng: -87.6478,
  },
  {
    name: 'The Purple Pig',
    cuisine: 'Mediterranean',
    price: '$$',
    description: 'Wine bar with Mediterranean small plates on the Magnificent Mile.',
    link: 'https://thepurplepigchicago.com/',
    lat: 41.8903,
    lng: -87.6248,
  },
  {
    name: "Portillo's",
    cuisine: 'Chicago Classics',
    price: '$',
    description: 'Chicago institution for hot dogs, Italian beef, and chocolate cake shakes.',
    link: 'https://www.portillos.com/',
    lat: 41.9192,
    lng: -87.6348,
  },
  {
    name: "Rubi's Tacos",
    cuisine: 'Mexican',
    price: '$',
    description: 'Authentic Mexican tacos in Pilsen - local favorite.',
    link: 'https://rubischicago.square.site/',
    lat: 41.858,
    lng: -87.6627,
  },
  {
    name: 'Cariño',
    cuisine: 'Latin Fine Dining',
    price: '$$$',
    description: 'One Michelin star. Latin-inspired tasting menu and taco Omakase.',
    link: 'https://www.carinochicago.com/',
    michelinStars: 1,
    lat: 41.9656,
    lng: -87.6497,
  },
  {
    name: 'Flo & Santos',
    cuisine: 'Tavern-Style Pizza',
    price: '$',
    description: 'The real Chicago-style pizza - thin crust tavern style, plus Polish classics.',
    link: 'https://floandsantos.com/',
    lat: 41.8642,
    lng: -87.6263,
  },
  {
    name: 'Indienne',
    cuisine: 'Modern Indian',
    price: '$$$',
    description: "One Michelin star. Chicago's first Michelin-starred Indian restaurant.",
    link: 'https://www.indiennechicago.com/',
    michelinStars: 1,
    lat: 41.8947,
    lng: -87.636,
  },
  {
    name: 'Taquerías Atotonilco',
    cuisine: 'Mexican',
    price: '$',
    description: 'Authentic Mexican tacos and comfort food in Pilsen.',
    link: 'https://www.atotonilcochicago.com/',
    lat: 41.8586,
    lng: -87.659,
  },
  {
    name: 'QXY Dumplings',
    cuisine: 'Chinese Dumplings',
    price: '$',
    description: 'Hand-pulled noodles and authentic Chinese dumplings in Chinatown.',
    link: 'https://www.qxydumplings.com/',
    lat: 41.8526,
    lng: -87.632,
  },
  {
    name: 'MingHin',
    cuisine: 'Dim Sum',
    price: '$$',
    description: 'Upscale dim sum and Cantonese cuisine in Chinatown.',
    link: 'https://www.minghin.com/',
    lat: 41.8519,
    lng: -87.6315,
  },
  {
    name: "Xi'An Cuisine",
    cuisine: "Xi'an Chinese",
    price: '$',
    description:
      "Traditional Xi'an street food including hand-pulled noodles and lamb dishes in Chinatown.",
    link: 'https://www.xiancuisinechicago.com/',
    lat: 41.8548,
    lng: -87.6318,
  },
]

export const ACTIVITIES: Activity[] = [
  {
    name: 'Lincoln Park Zoo',
    description: 'Free admission zoo in the heart of the park.',
    link: 'https://www.lpzoo.org/',
    lat: 41.9212,
    lng: -87.6336,
  },
  {
    name: 'Lake Michigan Beaches',
    description: 'Beautiful beaches and lakefront trails.',
    link: 'https://www.choosechicago.com/things-to-do/outdoor-activities/beaches/',
    lat: 41.9266,
    lng: -87.6267,
  },
  {
    name: 'Art Institute of Chicago',
    description: 'World-class art museum with incredible collections.',
    link: 'https://www.artic.edu/',
    lat: 41.8796,
    lng: -87.6237,
  },
  {
    name: 'Millennium Park',
    description: 'See The Bean and Crown Fountain.',
    link: 'https://www.millenniumpark.org/',
    lat: 41.8826,
    lng: -87.6226,
  },
  {
    name: 'Museum of Contemporary Art',
    description: 'Non-traditional and modern exhibits close by to Lincoln Park.',
    link: 'https://mcachicago.org/',
    lat: 41.8976,
    lng: -87.6205,
  },
  {
    name: 'United Center',
    description:
      'Check out a Bulls or Blackhawks game! Stay tuned for the 2026 season schedules and see a game in a historic venue!',
    link: 'https://www.unitedcenter.com/',
    lat: 41.8807,
    lng: -87.6742,
  },
  {
    name: 'Chicago Riverwalk',
    description: 'Scenic walkway along the Chicago River with restaurants, bars, and boat tours.',
    link: 'https://www.chicagoriverwalk.us/',
    lat: 41.8876,
    lng: -87.6229,
  },
  {
    name: '360 Chicago Observation Deck',
    description: 'Stunning views from the 94th floor of the John Hancock Center.',
    link: 'https://360chicago.com/',
    lat: 41.8989,
    lng: -87.6231,
  },
  {
    name: 'Navy Pier',
    description: 'Iconic pier with rides, restaurants, and lakefront entertainment.',
    link: 'https://navypier.org/',
    lat: 41.8917,
    lng: -87.605,
  },
  {
    name: 'Second City Comedy Club',
    description: 'Legendary improv comedy venue that launched many SNL careers.',
    link: 'https://www.secondcity.com/',
    lat: 41.9157,
    lng: -87.639,
  },
  {
    name: 'Chicago Architecture River Cruise',
    description: "Learn about Chicago's famous architecture on a guided boat tour.",
    link: 'https://www.architecture.org/tours/detail/chicago-architecture-foundation-center-river-cruise-aboard-chicagos-first-lady/',
    lat: 41.8879,
    lng: -87.6233,
  },
  {
    name: 'Wrigley Field',
    description: 'Historic Cubs ballpark in Wrigleyville - catch a game or tour the stadium!',
    link: 'https://www.mlb.com/cubs/ballpark',
    lat: 41.9484,
    lng: -87.6553,
  },
]

export const EVENTS: Event[] = [
  {
    id: 'welcome',
    day: 'Friday',
    date: 'October 16th, 2026',
    time: '6:00 PM CST',
    name: 'Welcome Party',
    venue: 'Cafe Ba-Ba-Reeba!',
    address: '2404 N Halsted St, Chicago, IL 60614',
    description: 'Join us for tapas and drinks to kick off the weekend!',
    lat: 41.9265,
    lng: -87.6489,
  },
  {
    id: 'wedding',
    day: 'Saturday',
    date: 'October 17th, 2026',
    time: '5:00 PM CST',
    name: 'Wedding Ceremony & Reception',
    venue: 'Cafe Brauer',
    address: '2021 N Stockton Dr, Chicago, IL 60614',
    description: 'Our ceremony and reception in beautiful Lincoln Park.',
    lat: 41.9204,
    lng: -87.6341,
  },
  {
    id: 'afterparty',
    day: 'Saturday',
    date: 'October 17th, 2026',
    time: '12:00 AM CST',
    name: 'After Party',
    venue: "Ranalli's Pizza Bar",
    address: '1925 N Lincoln Ave, Chicago, IL 60614',
    description: 'Keep the party going with late-night pizza!',
    lat: 41.9204,
    lng: -87.6497,
  },
]

// Real per-destination categories, extracted from each
// city's own category slider on tiqets.com — the cards
// carry the city's curated picture for every category,
// the category's URL slug and Tiqets' own experience
// count. Countries aggregate the categories of the
// cities Tiqets lists for them (without counts, which
// are per city). Destinations without an entry fall
// back to DEFAULT_CATEGORIES.

export type CategoryItem = {
  name: string;
  slug: string;
  image: string;
  count?: number;
};

export type DestinationCategories = {
  categories: CategoryItem[];
  interests: CategoryItem[];
};

export const CITY_CATEGORIES: Record<string, DestinationCategories> = {
    "barcelona": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 82
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 91
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 75
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "typeId": "1048",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 24
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 62
            },
            {
                "name": "City Cards & Passes",
                "slug": "city-cards-passes",
                "typeId": "1032",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b9a4067e64b649b99be6d2efea8ae1b4.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 20
            }
        ],
        "interests": []
    },
    "rome": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e2e6d4fc79fd42f5a4c05319fad8cc3a.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 164
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1687cf3cd6244beeb5e9594ea24c2dd4.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 61
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d2f5c812aa374c3285776a123cf400b6.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 60
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "typeId": "1840",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 16
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0272ed851da549cab621677ad018a0bc.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 29
            },
            {
                "name": "Concerts & Live Music",
                "slug": "concerts-live-music",
                "typeId": "2595",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8fba35ebe3b949d498cf576996ab1bd2.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 15
            }
        ],
        "interests": []
    },
    "amsterdam": {
        "categories": [
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0295ece6627e4d019880db97b8b78bfd.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 108
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "typeId": "1048",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 18
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2785ff95bacf4f44a294dc4b01eff695.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 40
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/802e5020f2114657b4dfeab4a7610eee.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 44
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "typeId": "1840",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f35deb63739d488ea7aa2b5b1e2e2248.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 18
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e4c3fcaac51744a0b9d26935252e06c0.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 42
            }
        ],
        "interests": []
    },
    "florence": {
        "categories": [
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0c5a45f647444ae590b164e5ab364bf7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 46
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d8ce6a06f5bf41f9b4e7ef3306cf28f3.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 54
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c6b6108ca0ad49be9ce5e47dca00722f.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 28
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/972c0b5191eb4a7582d6a407dd4c43db.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 41
            },
            {
                "name": "Concerts & Live Music",
                "slug": "concerts-live-music",
                "typeId": "2595",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a196df20966d49d682183e5b4c71e4d7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Trips & Excursions",
                "slug": "trips-excursions",
                "typeId": "1042",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9af0c9c4882d430cabdf4f7d0a985797.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 52
            }
        ],
        "interests": []
    },
    "new york": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/00031dc6c695440d9012586cce8aefd7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 81
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d45e041ad1a647b38b3c30a9776c63c3.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 69
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 34
            },
            {
                "name": "Food & Drinks",
                "slug": "food-drinks",
                "typeId": "1034",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a45bc1fdf9d448c9613475edf9758f0.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "City Cards & Passes",
                "slug": "city-cards-passes",
                "typeId": "1032",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/677216f7d3d04eb88ded410cd8020936.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4fb8fedb08374b3dac99c1fa10c8ca6d.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 27
            }
        ],
        "interests": []
    },
    "venice": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4b6b874872fd41c7b096560a7092d3f8.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 47
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "typeId": "1840",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/abbf63ca9bcd4ed289ace6165d72298b.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 27
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/abc56348b77c467ea20a90375e729518.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 26
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f40cc68ac15b495b8b338cdafef81b4e.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 28
            },
            {
                "name": "Concerts & Live Music",
                "slug": "concerts-live-music",
                "typeId": "2595",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89a70880e25d4495a28a1997acb0ae43.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "City Cards & Passes",
                "slug": "city-cards-passes",
                "typeId": "1032",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7fd5185ef6c84a9ea94d5c11b4df6355.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            }
        ],
        "interests": []
    },
    "dubai": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/72cb5b4472864135825bb96274b97c52.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 80
            },
            {
                "name": "Food & Drinks",
                "slug": "food-drinks",
                "typeId": "1034",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 48
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bfcd448fc29544c6b99c8ea83664e712.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 56
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7186f1c028ef424f9998f8d0d195ea71.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 30
            },
            {
                "name": "Nature & Wildlife",
                "slug": "nature-wildlife",
                "typeId": "2745",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3ec8f672e5834b09a6c75c0e886f48cd.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 30
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 28
            }
        ],
        "interests": []
    },
    "milan": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bff1f116bfdf4d7ab2bbeadd82b0a679.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 30
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7dd09b9aeb5846538d44815c5748bb06.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 36
            },
            {
                "name": "Shows & Theatres",
                "slug": "shows-theatres",
                "typeId": "2596",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3c0a286454624b79a169011e7262b659.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "typeId": "1840",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2209e49d2d484affa7929442c3e68b4e.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 30
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9a315802096e4ed993c5278b16bbe70a.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 22
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/739fbb400b204efb8e0f1892dcb678ab.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            }
        ],
        "interests": []
    },
    "abu dhabi": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f88ebb9eebec43a392f7614b43c2a407.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 33
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 18
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 19
            },
            {
                "name": "Trips & Excursions",
                "slug": "trips-excursions",
                "typeId": "1042",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/aa40cf84f36e44d1a9b962c668200ea7.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 22
            },
            {
                "name": "Wellness",
                "slug": "wellness",
                "typeId": "1985",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b5b397e636f84e36b1b750f5c2b51351.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ce5d8deb7cb24eeea0540c43144f161a.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            }
        ],
        "interests": []
    },
    "buenos aires": {
        "categories": [
            {
                "name": "Shows & Theatres",
                "slug": "shows-theatres",
                "typeId": "2596",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60830e45a1324dffa76b61fcf085ca32.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 13
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e7be19d6bbbb4fb7a29e3a0b75f97250.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Food & Drinks",
                "slug": "food-drinks",
                "typeId": "1034",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cd0606347a5d40a7ad9ebd08b57ce562.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "Concerts & Live Music",
                "slug": "concerts-live-music",
                "typeId": "2595",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3d4f13ee0df543bd978ba8bf41505723.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/474a838409ca47f8829f78c0f8d042a7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e23c09ff41d4a93ae42f9a8d2aaec77.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ],
        "interests": []
    },
    "kuala lumpur": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4de8a12ecbcd48579e8573ab931237c7.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 33
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/10e995685254ca4bfe7b4e7817d688ad5a4be70aae00cac2918bd5417f9c3962.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/498744a444f44ad7b72b750c365a5ee9.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Games & Entertainment",
                "slug": "games-entertainment",
                "typeId": "1038",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/feec2b70dc38ab4706b125175e5b413425ea39d32ec59d19977deb9f6fbbef5d.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            }
        ],
        "interests": []
    },
    "singapore": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/280201d787a345218a00f93ba1d36ede.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 45
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ccbd7a07adf846a0b8f6c1cbbc755c78.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 23
            },
            {
                "name": "Shows & Theatres",
                "slug": "shows-theatres",
                "typeId": "2596",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7d6ccffa1eec43c199df358fca728a42.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cf4add3cd1fe442c8bfdbe2ce1243a56.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 31
            },
            {
                "name": "Nature & Wildlife",
                "slug": "nature-wildlife",
                "typeId": "2745",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3a617c0f6f944ad7b0fc5666bababb3a.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/63cd16d7d66e413e9bd6b913356aa42c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            }
        ],
        "interests": []
    },
    "london": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/da7c88f4663045828351d5f644df7d37.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 54
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6a5dca1870f94e1dbb030ca079d63577.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 92
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/47c381022a514dbca374eade342710f3.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 61
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ef361003b6dc4c4cb0b2e5d2327f5184.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 168
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/99878ba711a440a5bec368d37f306bfc.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 20
            },
            {
                "name": "City Cards & Passes",
                "slug": "city-cards-passes",
                "typeId": "1032",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/45887f65c8544ad398fa32c74014ffbe.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            }
        ],
        "interests": []
    },
    "bangkok": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7278ab05aa654443ade45102d6f55e40.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 31
            },
            {
                "name": "Historical & Archaeological Sites",
                "slug": "historical-archaeological-sites",
                "typeId": "2967",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/28e75de8bb0a4e0caf177379707a513c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 25
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f299deb6e52e4d33ad291209b4d30fd9.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 38
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/813634a6af7346a5b5c294434795affa.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "Trips & Excursions",
                "slug": "trips-excursions",
                "typeId": "1042",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b0a9a7eeeae44fb4a2fb5a8495944ddf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Food & Drinks",
                "slug": "food-drinks",
                "typeId": "1034",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8127879203ebb410c4679416fc9109b91350ca97818f2b55dc90439874f1b847.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 45
            }
        ],
        "interests": []
    },
    "toronto": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e5ef80f78a654008bd874e230ceab848.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 36
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3b425234f0fa45c3b42a4a617fa7d53f.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 15
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e31b32d4f0974117a55b745bc968a5e4.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 22
            },
            {
                "name": "Trips & Excursions",
                "slug": "trips-excursions",
                "typeId": "1042",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/323c64bf402246c4b816603a6511ac5b.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/642299edb8854cf198b7c28c0d8d2218.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 16
            }
        ],
        "interests": []
    },
    "montreal": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/01ce2acd3b8c40798cd6951d8e9d5397.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a12e3eda4690466ca833a0f8754c0927.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Adventure Activities",
                "slug": "adventure-activities",
                "typeId": "2747",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4701e39c4fa347f19d5985fef603b54f.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/128a1818dfb8408b891781f95e0d1497.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/df0e1dcc9e0e418da053a82c9a040c3e.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            }
        ],
        "interests": []
    },
    "niagara falls": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9a1d2af1e31a4460945a3c0941cb052f.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 44
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ab5a376ebe9d42c8b7d18b1c5b83aca0.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 22
            },
            {
                "name": "Shows & Theatres",
                "slug": "shows-theatres",
                "typeId": "2596",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/635b16ff5dd94f379fdce0f8e5ec0aa7.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6c6e93c175c94f3487d2f882fd2df974.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Trips & Excursions",
                "slug": "trips-excursions",
                "typeId": "1042",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/323c64bf402246c4b816603a6511ac5b.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            }
        ],
        "interests": []
    },
    "vancouver": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "typeId": "2966",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60150239a1bc45e2ac007c393b40003c.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 30
            },
            {
                "name": "Museums",
                "slug": "museums",
                "typeId": "2968",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5daf6ad8b22d4607abea948c59613fd1.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 9
            },
            {
                "name": "Nature & Wildlife",
                "slug": "nature-wildlife",
                "typeId": "2745",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cbb29fcf33cc46c49e361604241cd4b4.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 21
            },
            {
                "name": "Aviation Activities",
                "slug": "aviation-activities",
                "typeId": "1037",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96813dcdd5d24ca18a0ab7ae3e462980.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 9
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "typeId": "1040",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22e3c62e4a5548faa93d645bf91a4192.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 34
            },
            {
                "name": "Cruises & Boat Tours",
                "slug": "cruises-boat-tours",
                "typeId": "1035",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ef124566e48a4b218512ac9256466888.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 16
            }
        ],
        "interests": []
    }
};

export const COUNTRY_CATEGORIES: Record<string, DestinationCategories> = {
    "peru": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "mexico": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "costa rica": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "aruba": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "argentina": {
        "categories": [
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "colombia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "united states": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "canada": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Aviation Activities",
                "slug": "aviation-activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96813dcdd5d24ca18a0ab7ae3e462980.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Adventure Activities",
                "slug": "adventure-activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4701e39c4fa347f19d5985fef603b54f.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "brazil": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "dominican republic": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "bahamas": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "puerto rico": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "jamaica": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "italy": {
        "categories": [
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "spain": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "france": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "the netherlands": {
        "categories": [
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "netherlands": {
        "categories": [
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "united arab emirates": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Aviation Activities",
                "slug": "aviation-activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96813dcdd5d24ca18a0ab7ae3e462980.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Wellness",
                "slug": "wellness",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b5b397e636f84e36b1b750f5c2b51351.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "turkey": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "qatar": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "croatia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "germany": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "hungary": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "estonia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "belgium": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "iceland": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "ireland": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "greece": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "monaco": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "malta": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "slovenia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "latvia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "portugal": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "lithuania": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "romania": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "norway": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "czech republic": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "denmark": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "finland": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "poland": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "switzerland": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "egypt": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "sweden": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "kenya": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "united kingdom": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "austria": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "luxembourg": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "jordan": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "morocco": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "slovakia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "serbia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "tanzania": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "south africa": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "india": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "singapore": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "indonesia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "japan": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "south korea": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "australia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "taiwan": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "china": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "thailand": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "vietnam": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "malaysia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    },
    "cambodia": {
        "categories": [
            {
                "name": "Attractions",
                "slug": "attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "City Tours",
                "slug": "city-tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cc0d930eb5ad4c529f77ef2bd22bb352.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Public Transport",
                "slug": "public-transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb857cc602fc487a85ff93088fda2aee.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Museums",
                "slug": "museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            },
            {
                "name": "Transfers",
                "slug": "transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150"
            }
        ],
        "interests": []
    }
};

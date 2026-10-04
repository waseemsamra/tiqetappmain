// Real per-destination categories, extracted from each
// city's page on tiqets.com (the "category sections" the
// site itself lists, each with its own picture from that
// city's category page). Countries aggregate the categories
// of the cities Tiqets lists for them. Destinations without
// an entry fall back to DEFAULT_CATEGORIES.

export type CategoryItem = { name: string; image: string };

export type DestinationCategories = {
  categories: CategoryItem[];
  interests: CategoryItem[];
};

export const CITY_CATEGORIES: Record<string, DestinationCategories> = {
    "barcelona": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "paris": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c8451e00437e47dbbcae5954a1a86e65.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6489325e04c9449fa643d30933d6939d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8cf0c01981d248dc8161a3b7029dc5f2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6c6d7ef36fe44c9bbfe92537ace25291.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/306f1e6c81084a0899e8a611ce929290.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8bd418152fb34191972f3570a52f20ee.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fb5e352ffa72496884830112c3a1aa50.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/278a3e8ccc4545a2ab3dc973fd156853.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0375fa329c4e4ebba48bc924cf18eeca.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3d52e25e9bd4b14a429af4077eb96f8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/203968d5ab5844a7967f8967df8ce9e9.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ce2ef89723cd41ccaccd77364c3005d7.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ab2be14dcb154a0a86636f447c504e5a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Groups",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Family-friendly",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Adults",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6489325e04c9449fa643d30933d6939d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Foodies",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/278a3e8ccc4545a2ab3dc973fd156853.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Local culture explorers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/532d6fa1a61e4b34939a6473fbc06b96.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Entertainment enthusiasts",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/07a0e378a5f2482cba764828ee27012d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": [
            {
                "name": "Nightlife seekers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8cf0c01981d248dc8161a3b7029dc5f2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Adventure seekers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Hidden Gems",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4d2a5c048f1944589b7289745930b5e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ]
    },
    "milan": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bff1f116bfdf4d7ab2bbeadd82b0a679.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d416358bb0dc47469e8142fb75aa9885.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cb6e095708704b85bb9edc15d07175c3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2209e49d2d484affa7929442c3e68b4e.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7633505f8f1d41d2838c00c41fd02ba2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ab61fe81071d4027b9b4d8d33e665b9f.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7633505f8f1d41d2838c00c41fd02ba2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/09fe6b43402c4f7b8eeb391c2e1a3b12.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b89e15303fd9451bb06b78c6d79737cb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "rome": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e2e6d4fc79fd42f5a4c05319fad8cc3a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1687cf3cd6244beeb5e9594ea24c2dd4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2671c26d765a4e98a1637c98d2dd53ba.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8376d89036e6404ea380ad9afffd6f23.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9cad58ebe5d84e9f9575f047c126cb53.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/875b4ae54a84482bab24d52acd268b00.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0d905bcfbd8349bd9221e2bef40f2781.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4418807b791f4cae97f27344351840cc.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4418807b791f4cae97f27344351840cc.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e48b417ec2fb425bbfcd32b14724a96f.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2095ba1ea9fe4f47b100460c9ab473f2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a4a7b92052f449dbd1f2440a70aaf61.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/67cd84d454f2445fae78bf03a4586713.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "florence": {
        "categories": [
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0c5a45f647444ae590b164e5ab364bf7.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d8ce6a06f5bf41f9b4e7ef3306cf28f3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c6b6108ca0ad49be9ce5e47dca00722f.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9af0c9c4882d430cabdf4f7d0a985797.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a196df20966d49d682183e5b4c71e4d7.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9af0c9c4882d430cabdf4f7d0a985797.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/92c527f143b8472289abe7f0f602593a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/005f6c81d1bf41e0be768f0a66b2f915.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9af0c9c4882d430cabdf4f7d0a985797.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "amsterdam": {
        "categories": [
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0295ece6627e4d019880db97b8b78bfd.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/17b373e031d64b83a6571821f5395b5b.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9117853253ce4a1194971535dfb23af4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7f50594e97264d2ba10e304ff868764a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4c6b8bfe6e114d0c98bf68020e000b86.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/39905caea8bd4b4991484af8358f95a9.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a839e75881d0465f81cd79865f227fad.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/aa02317866f24eec89cc2666d66c73c8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bcbff43468fb4e69a8c77b2a93e5c156.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/84e9ad9019884f749863f3f070374444.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Family-friendly",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/802e5020f2114657b4dfeab4a7610eee.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2785ff95bacf4f44a294dc4b01eff695.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b856b88d590b45bf8b4ff35bd2466301.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a28a4f1da32a4721a399dae0b047d80b.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "venice": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4b6b874872fd41c7b096560a7092d3f8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4315d319feda4b87bf005cde2b8263f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4315d319feda4b87bf005cde2b8263f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7b52afd9f4b241eea060eab7e05c7721.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f799921d98e044dd96639ecdae760014.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/48f09420c93d4968a5504a76c15ff187.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b288c378c87847a68666d06ce533409d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/eec4c1c75ef14e8aa72feecf8964bdb2.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1e533c7f82104c65b233a471116a9681.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6fe397de4b7141ec8da80eb8ee5b622e.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b4f447e587224fc1b2f077d30a932b71.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/48f09420c93d4968a5504a76c15ff187.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "new york": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/00031dc6c695440d9012586cce8aefd7.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a45bc1fdf9d448c9613475edf9758f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/677216f7d3d04eb88ded410cd8020936.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3bfdac3ba8304cec981a5828a17000f8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5643bc09629d474f9bda8870d2783f8e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d3563abcf17a445b8904fd7f505d65c6.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2282ceb44d02482883404a4999cc22ff.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a45bc1fdf9d448c9613475edf9758f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "dubai": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3ec8f672e5834b09a6c75c0e886f48cd.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d6290b681e41497f9def7d336f0e3c96.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/49595216c3244181be239a8ed95c4b22.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/75d36cbea6fd4bc38e120b48237fe989.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Aviation Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ff4a8718addf4f8fa41232fa692c4cf3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e385cd4548ec4a58b6b5fbb03a30fb75.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/be51fd2612954d13a1fae1a18207496d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3c0bdffcf5754c0eb0108c6c470a8c4c.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/be51fd2612954d13a1fae1a18207496d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": [
            {
                "name": "Adventure seekers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nightlife seekers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3ec8f672e5834b09a6c75c0e886f48cd.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Architecture admirers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f358175515ed4f94b0c71c1943c0f7f6.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature lovers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Hidden Gems",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/75d36cbea6fd4bc38e120b48237fe989.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Sport fanatics",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7ab005638e1f4596a0c149076d8b38cf.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ]
    },
    "abu dhabi": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4915894d35d04b9fa128385931eb4bda.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Wellness",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b5b397e636f84e36b1b750f5c2b51351.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ce5d8deb7cb24eeea0540c43144f161a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ab316cdfdfd34b66bd63910163a1cf9f.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bbdd91ef3bde477c8f325bd6b6f03f4b.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "london": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/522cb36928544e6d9607d4c69068c4ee.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/da7c88f4663045828351d5f644df7d37.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8f5f1aa4a8a743a599b266d5f65257ab.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/47c381022a514dbca374eade342710f3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/99878ba711a440a5bec368d37f306bfc.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7c6cddb18ff4d7bba1bfaa7a26c00f7.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a83f4264b42e4d2d9073273cb8253650.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/79de587d364b44c2af081f62a754cd2f.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca0f855c84f64455b75e8e5fd6839715.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4537beefab2b4f2590ec822db34fc2c6.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/47c381022a514dbca374eade342710f3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/dbd28f89cab94bef9265355512ed3832.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "buenos aires": {
        "categories": [
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60830e45a1324dffa76b61fcf085ca32.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e7be19d6bbbb4fb7a29e3a0b75f97250.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cd0606347a5d40a7ad9ebd08b57ce562.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60830e45a1324dffa76b61fcf085ca32.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/474a838409ca47f8829f78c0f8d042a7.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e23c09ff41d4a93ae42f9a8d2aaec77.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "kuala lumpur": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4de8a12ecbcd48579e8573ab931237c7.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/10e995685254ca4bfe7b4e7817d688ad5a4be70aae00cac2918bd5417f9c3962.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/498744a444f44ad7b72b750c365a5ee9.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1b4b415faf4243797e551d156179af3b7af5970a108fdf0b72e0e03848556cfb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "singapore": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a859ac474066424fb569ddf66bfb5940.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ccbd7a07adf846a0b8f6c1cbbc755c78.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cf7a3ab526564eb08160820e877f5303.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/357d76ea2ca94061942dea078e50ad07.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7d6ccffa1eec43c199df358fca728a42.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/63cd16d7d66e413e9bd6b913356aa42c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/30408666a1c44bb39beddecb75525491.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/164866cad9b44d68a25d5bfab3fc4a75.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e760cc09297561b8fbe4634c2799e2c7cbd1d925561f870da3f44ea43002297d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "bangkok": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7278ab05aa654443ade45102d6f55e40.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/28e75de8bb0a4e0caf177379707a513c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96191990e54a4f5abc0847aee81ddc45.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e11eb9eb0aad47289841da7ee84c216e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ef549e1938bd47f5915e0a84c85221d1.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d9aa4f1be1fcc4cafa9ca728debce74e593f93e42301c6eef3c5f9b76816ac33.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/060b6ac89f0b4443a634744de6ee98e1.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fa38c081149640558e22af7a8e669ce2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "toronto": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6fd46d6167494671b96da8eb9ad2764e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3b425234f0fa45c3b42a4a617fa7d53f.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c086328b0a644bb1ad595727087f6a8d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/323c64bf402246c4b816603a6511ac5b.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/642299edb8854cf198b7c28c0d8d2218.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "vancouver": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60150239a1bc45e2ac007c393b40003c.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5daf6ad8b22d4607abea948c59613fd1.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60150239a1bc45e2ac007c393b40003c.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Aviation Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96813dcdd5d24ca18a0ab7ae3e462980.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0c3dd5dbd8f8498993010868b55e96ff.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ef124566e48a4b218512ac9256466888.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f01681f4590945958c4f0629ab42f31e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3209ab67a52742faa37cc32127b5a4aa.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "niagara falls": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7f118dc07266480289cee2341613b39e.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2c1940cdf41c4d46a55254b968de6d2f.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/635b16ff5dd94f379fdce0f8e5ec0aa7.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6c6e93c175c94f3487d2f882fd2df974.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/323c64bf402246c4b816603a6511ac5b.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "montreal": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/01ce2acd3b8c40798cd6951d8e9d5397.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a12e3eda4690466ca833a0f8754c0927.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Adventure Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/01ce2acd3b8c40798cd6951d8e9d5397.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/128a1818dfb8408b891781f95e0d1497.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/df0e1dcc9e0e418da053a82c9a040c3e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    }
};

export const COUNTRY_CATEGORIES: Record<string, DestinationCategories> = {
    "peru": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "mexico": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "costa rica": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "aruba": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "argentina": {
        "categories": [
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60830e45a1324dffa76b61fcf085ca32.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e7be19d6bbbb4fb7a29e3a0b75f97250.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cd0606347a5d40a7ad9ebd08b57ce562.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60830e45a1324dffa76b61fcf085ca32.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/474a838409ca47f8829f78c0f8d042a7.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e23c09ff41d4a93ae42f9a8d2aaec77.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "colombia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "united states": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/00031dc6c695440d9012586cce8aefd7.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a45bc1fdf9d448c9613475edf9758f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/677216f7d3d04eb88ded410cd8020936.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3bfdac3ba8304cec981a5828a17000f8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5643bc09629d474f9bda8870d2783f8e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d3563abcf17a445b8904fd7f505d65c6.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2282ceb44d02482883404a4999cc22ff.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a45bc1fdf9d448c9613475edf9758f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "canada": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60150239a1bc45e2ac007c393b40003c.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5daf6ad8b22d4607abea948c59613fd1.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60150239a1bc45e2ac007c393b40003c.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Aviation Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96813dcdd5d24ca18a0ab7ae3e462980.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0c3dd5dbd8f8498993010868b55e96ff.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ef124566e48a4b218512ac9256466888.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f01681f4590945958c4f0629ab42f31e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3209ab67a52742faa37cc32127b5a4aa.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/635b16ff5dd94f379fdce0f8e5ec0aa7.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Adventure Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/01ce2acd3b8c40798cd6951d8e9d5397.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "brazil": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "dominican republic": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "bahamas": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "puerto rico": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "jamaica": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "italy": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4b6b874872fd41c7b096560a7092d3f8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4315d319feda4b87bf005cde2b8263f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4315d319feda4b87bf005cde2b8263f0.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7b52afd9f4b241eea060eab7e05c7721.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f799921d98e044dd96639ecdae760014.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/48f09420c93d4968a5504a76c15ff187.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b288c378c87847a68666d06ce533409d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/eec4c1c75ef14e8aa72feecf8964bdb2.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1e533c7f82104c65b233a471116a9681.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6fe397de4b7141ec8da80eb8ee5b622e.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b4f447e587224fc1b2f077d30a932b71.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/48f09420c93d4968a5504a76c15ff187.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9af0c9c4882d430cabdf4f7d0a985797.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2095ba1ea9fe4f47b100460c9ab473f2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a4a7b92052f449dbd1f2440a70aaf61.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/67cd84d454f2445fae78bf03a4586713.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "spain": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "france": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "the netherlands": {
        "categories": [
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0295ece6627e4d019880db97b8b78bfd.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/17b373e031d64b83a6571821f5395b5b.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9117853253ce4a1194971535dfb23af4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7f50594e97264d2ba10e304ff868764a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4c6b8bfe6e114d0c98bf68020e000b86.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/39905caea8bd4b4991484af8358f95a9.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a839e75881d0465f81cd79865f227fad.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/aa02317866f24eec89cc2666d66c73c8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bcbff43468fb4e69a8c77b2a93e5c156.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/84e9ad9019884f749863f3f070374444.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Family-friendly",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/802e5020f2114657b4dfeab4a7610eee.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2785ff95bacf4f44a294dc4b01eff695.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b856b88d590b45bf8b4ff35bd2466301.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a28a4f1da32a4721a399dae0b047d80b.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "netherlands": {
        "categories": [
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0295ece6627e4d019880db97b8b78bfd.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/17b373e031d64b83a6571821f5395b5b.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9117853253ce4a1194971535dfb23af4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7f50594e97264d2ba10e304ff868764a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4c6b8bfe6e114d0c98bf68020e000b86.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/39905caea8bd4b4991484af8358f95a9.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a839e75881d0465f81cd79865f227fad.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/aa02317866f24eec89cc2666d66c73c8.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2d0f944bb20f42228f49d60fe3bfd680.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bcbff43468fb4e69a8c77b2a93e5c156.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/84e9ad9019884f749863f3f070374444.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Family-friendly",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/802e5020f2114657b4dfeab4a7610eee.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2785ff95bacf4f44a294dc4b01eff695.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b856b88d590b45bf8b4ff35bd2466301.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a28a4f1da32a4721a399dae0b047d80b.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "united arab emirates": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fef37e0205e54715b0eadb1833583875.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3ec8f672e5834b09a6c75c0e886f48cd.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d6290b681e41497f9def7d336f0e3c96.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/49595216c3244181be239a8ed95c4b22.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/75d36cbea6fd4bc38e120b48237fe989.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Aviation Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ff4a8718addf4f8fa41232fa692c4cf3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e385cd4548ec4a58b6b5fbb03a30fb75.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/be51fd2612954d13a1fae1a18207496d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3c0bdffcf5754c0eb0108c6c470a8c4c.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/be51fd2612954d13a1fae1a18207496d.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Wellness",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b5b397e636f84e36b1b750f5c2b51351.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": [
            {
                "name": "Adventure seekers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nightlife seekers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3ec8f672e5834b09a6c75c0e886f48cd.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Architecture admirers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f358175515ed4f94b0c71c1943c0f7f6.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature lovers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Hidden Gems",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/75d36cbea6fd4bc38e120b48237fe989.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Sport fanatics",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7ab005638e1f4596a0c149076d8b38cf.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ]
    },
    "turkey": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "qatar": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "croatia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "germany": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "hungary": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "estonia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "belgium": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "iceland": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "ireland": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "greece": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "monaco": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "malta": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "slovenia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "latvia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "portugal": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "lithuania": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "romania": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "norway": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "czech republic": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "denmark": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "finland": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "poland": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "switzerland": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "egypt": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "sweden": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "kenya": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "united kingdom": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/522cb36928544e6d9607d4c69068c4ee.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/da7c88f4663045828351d5f644df7d37.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8f5f1aa4a8a743a599b266d5f65257ab.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/47c381022a514dbca374eade342710f3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/99878ba711a440a5bec368d37f306bfc.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7c6cddb18ff4d7bba1bfaa7a26c00f7.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a83f4264b42e4d2d9073273cb8253650.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/79de587d364b44c2af081f62a754cd2f.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca0f855c84f64455b75e8e5fd6839715.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4537beefab2b4f2590ec822db34fc2c6.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/47c381022a514dbca374eade342710f3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/dbd28f89cab94bef9265355512ed3832.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "austria": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "luxembourg": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "jordan": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "morocco": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "slovakia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "serbia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "tanzania": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "south africa": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "india": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "singapore": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a859ac474066424fb569ddf66bfb5940.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ccbd7a07adf846a0b8f6c1cbbc755c78.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/cf7a3ab526564eb08160820e877f5303.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/357d76ea2ca94061942dea078e50ad07.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Nature & Wildlife",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7d6ccffa1eec43c199df358fca728a42.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/63cd16d7d66e413e9bd6b913356aa42c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/30408666a1c44bb39beddecb75525491.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/164866cad9b44d68a25d5bfab3fc4a75.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e760cc09297561b8fbe4634c2799e2c7cbd1d925561f870da3f44ea43002297d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "indonesia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "japan": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "south korea": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "australia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "taiwan": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "china": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "thailand": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7278ab05aa654443ade45102d6f55e40.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/28e75de8bb0a4e0caf177379707a513c.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96191990e54a4f5abc0847aee81ddc45.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e11eb9eb0aad47289841da7ee84c216e.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ef549e1938bd47f5915e0a84c85221d1.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d9aa4f1be1fcc4cafa9ca728debce74e593f93e42301c6eef3c5f9b76816ac33.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/060b6ac89f0b4443a634744de6ee98e1.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/fa38c081149640558e22af7a8e669ce2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "vietnam": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "malaysia": {
        "categories": [
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4de8a12ecbcd48579e8573ab931237c7.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/10e995685254ca4bfe7b4e7817d688ad5a4be70aae00cac2918bd5417f9c3962.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/498744a444f44ad7b72b750c365a5ee9.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1b4b415faf4243797e551d156179af3b7af5970a108fdf0b72e0e03848556cfb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    },
    "cambodia": {
        "categories": [
            {
                "name": "Historical & Archaeological Sites",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Attractions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9b53eddebf94d63883bb28c730c5a2a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Public Transport",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Museums",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "City Cards & Passes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bb2b72feb085492aba58136a55a292e6.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Transfers",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3c31163b8434f52b944b865768b4e99.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Concerts & Live Music",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3cabd3ab96254383a93876e35421116a.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Water Activities",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Shows & Theatres",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8e63fa10a47c456bba7a7991426c37f3.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Trips & Excursions",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/59ebd319b94649b992f8f2942e9c5bbe.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Cruises & Boat Tours",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e702d03c7551453784dcd5ec7a5df7c3.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Food & Drinks",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ecf5f595dc034c59aaa954b103cc46ca.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Halloween",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Christmas",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca03301932fe403c80dffe4ba0b5ef6a.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Games & Entertainment",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/127d1a5bf7b64ec2baf7300d084a9860.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Travel Services",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c7fe7d43a96a4781818ac9ecb2fa4cd2.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Rentals",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22dc52a063fe4f1fa7ab47d76f233dda.png?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            },
            {
                "name": "Workshops & Classes",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9d193936873a4a7eaa008f78bc92f0bb.jpeg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200"
            }
        ],
        "interests": []
    }
};

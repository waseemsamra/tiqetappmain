// Per-city subcategory pills, extracted from each
// city+category page on tiqets.com. Tiqets shows a
// different set of subcategories (with their own
// pictures and experience counts) for every city and
// category, so this is keyed [city][category-slug].
// Used by the category pages for the pill row.

export type SubcategoryItem = {
  name: string;
  slug: string;
  typeId: string;
  image: string;
  count: number;
};

export const CITY_SUBCATEGORIES: Record<string, Record<string, SubcategoryItem[]>> = {
    "barcelona": {
        "historical-archaeological-sites": [
            {
                "name": "Monuments",
                "slug": "monuments",
                "typeId": "707",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8323f3ff248e49ebad90b9a17ea0e354.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 37
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/89e308fba4dc46d481cbb5c841cacd1f.PNG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 31
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/015cad4ce1c948cb81fe8314b947ec19.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 25
            },
            {
                "name": "Castles",
                "slug": "castles",
                "typeId": "705",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8b7c100e08f14c4b84ddb4d48074d21c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a1d37c3edfa24c5b8789bafaf88db602.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ],
        "attractions": [
            {
                "name": "Wineries",
                "slug": "wineries",
                "typeId": "720",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9c1d3f4fcba64a2ea37b8e7ca8c71130.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 18
            },
            {
                "name": "Cable Cars",
                "slug": "cable-cars",
                "typeId": "962",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8b7c100e08f14c4b84ddb4d48074d21c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/53e59472bb1b4cc1a665167f290db40d.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            },
            {
                "name": "Water Parks",
                "slug": "water-parks",
                "typeId": "713",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/13555bd29fa640ce9fdb3b7f60acfbce.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a9691b63d6649158cc5e3ed85c20b61.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            },
            {
                "name": "Stadiums &amp; Arenas",
                "slug": "stadiums-arenas",
                "typeId": "711",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b0b6e6a40437463ba4ad0f400c3bb23b.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            }
        ],
        "museums": [
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1c8eb790e5e4cbf93bb1a1cde0fa7bf.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 27
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0a9691b63d6649158cc5e3ed85c20b61.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 18
            },
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b0b6e6a40437463ba4ad0f400c3bb23b.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 12
            }
        ]
    },
    "paris": {
        "historical-archaeological-sites": [
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c8451e00437e47dbbcae5954a1a86e65.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 33
            },
            {
                "name": "Monuments",
                "slug": "monuments",
                "typeId": "707",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b27cdf8a6e2b4bc7b9c3bfee9508da35.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 31
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/3fde4937ae4644b1b9b296ef9dbb23b1.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 24
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ed5db9b88ecb4c449bc1805bf652c602.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 15
            },
            {
                "name": "Castles",
                "slug": "castles",
                "typeId": "705",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5c52466c4b49437fb255eb332a43e2d6.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            }
        ],
        "museums": [
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6489325e04c9449fa643d30933d6939d.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 52
            },
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b27cdf8a6e2b4bc7b9c3bfee9508da35.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 29
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2e4d91454c4f455bb7dde6ca32097df2.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 12
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/12801db2f5fe4e55961db49f3dc7ca43.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            }
        ],
        "attractions": [
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/162ad8eec99a4267b3da6bc0bf70e0e4.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Adventure Parks",
                "slug": "adventure-parks",
                "typeId": "722",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b3d52e25e9bd4b14a429af4077eb96f8.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Wineries",
                "slug": "wineries",
                "typeId": "720",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a310a0a3520548ecad1e2efcdebf0490.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Observation Decks",
                "slug": "observation-decks",
                "typeId": "716",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/30390951a1044095a8749ef668dd0a2a.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1844b2b86e234c0498be10b3beb09084.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Stadiums &amp; Arenas",
                "slug": "stadiums-arenas",
                "typeId": "711",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5a14d634b1464f5587ff81e77cd89b80.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ]
    },
    "milan": {
        "historical-archaeological-sites": [
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bff1f116bfdf4d7ab2bbeadd82b0a679.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 20
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4e7d6ffa660f4f908415354764baf383.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9a315802096e4ed993c5278b16bbe70a.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            }
        ],
        "museums": [
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d416358bb0dc47469e8142fb75aa9885.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 21
            },
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7dd09b9aeb5846538d44815c5748bb06.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c116ea3be7d844dc986f19a534cb83d8.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/22d0139fa7eb4c98aa5fddb39f0b6412.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ]
    },
    "rome": {
        "historical-archaeological-sites": [
            {
                "name": "Archaeological Sites",
                "slug": "archaeological-sites",
                "typeId": "709",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e2e6d4fc79fd42f5a4c05319fad8cc3a.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 78
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/00b14adf18bd4114a60f66f0d79f7cf8.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 45
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/96fe373cddf6495d9723057b6dfdb359.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 39
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0f513fc3348f4960ba2b4d034e04519f.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 21
            },
            {
                "name": "Castles",
                "slug": "castles",
                "typeId": "705",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4989d1dd3c804075bb2b18e60e2c2c93.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 9
            }
        ],
        "museums": [
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1687cf3cd6244beeb5e9594ea24c2dd4.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 41
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b897ea28215740d8b80040998b51016c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 35
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/49eca1622fc8419fa9962c605227a414.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/06911120f786464a82a04d74dd332a1d.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            }
        ],
        "attractions": [
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9cad58ebe5d84e9f9575f047c126cb53.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "Zoos",
                "slug": "zoos",
                "typeId": "723",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0272ed851da549cab621677ad018a0bc.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Water Parks",
                "slug": "water-parks",
                "typeId": "713",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/319f1cc948fa4017a9c49ffd582a0602.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            }
        ]
    },
    "florence": {
        "museums": [
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/10de381a76b34272bbe1b2cff9c37de6.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 38
            },
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c6b6108ca0ad49be9ce5e47dca00722f.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 25
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0d60230e31e340fc91582331c7a60e83.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            }
        ],
        "attractions": [
            {
                "name": "Wineries",
                "slug": "wineries",
                "typeId": "720",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9af0c9c4882d430cabdf4f7d0a985797.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 16
            },
            {
                "name": "Botanical Gardens",
                "slug": "botanical-gardens",
                "typeId": "725",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/972c0b5191eb4a7582d6a407dd4c43db.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ],
        "historical-archaeological-sites": [
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d8ce6a06f5bf41f9b4e7ef3306cf28f3.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 36
            },
            {
                "name": "Monuments",
                "slug": "monuments",
                "typeId": "707",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5f79ff621e094701ae9b1dfbd3269964.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 20
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bd9b43643f32430fa0264b42a5a2c289.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 19
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/972c0b5191eb4a7582d6a407dd4c43db.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 17
            }
        ]
    },
    "amsterdam": {
        "museums": [
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0295ece6627e4d019880db97b8b78bfd.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 36
            },
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a28a4f1da32a4721a399dae0b047d80b.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 24
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c4f2d658550347c18e2059d9b41f5638.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 23
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9117853253ce4a1194971535dfb23af4.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            }
        ],
        "attractions": [
            {
                "name": "Botanical Gardens",
                "slug": "botanical-gardens",
                "typeId": "725",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9117853253ce4a1194971535dfb23af4.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/802e5020f2114657b4dfeab4a7610eee.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Zoos",
                "slug": "zoos",
                "typeId": "723",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/45a0a2184f404b0794cbb1d0fee235f1.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ],
        "historical-archaeological-sites": [
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7f50594e97264d2ba10e304ff868764a.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 15
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7979c4450c6f4bd19a6da58efcbae743.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            }
        ]
    },
    "venice": {
        "historical-archaeological-sites": [
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4b6b874872fd41c7b096560a7092d3f8.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 23
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d1e48ac2868b4b76a909ac99845b1752.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 17
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7b52afd9f4b241eea060eab7e05c7721.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 9
            }
        ],
        "museums": [
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7b52afd9f4b241eea060eab7e05c7721.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f40cc68ac15b495b8b338cdafef81b4e.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 12
            }
        ]
    },
    "new york": {
        "attractions": [
            {
                "name": "Observation Decks",
                "slug": "observation-decks",
                "typeId": "716",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/00031dc6c695440d9012586cce8aefd7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 46
            },
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/15479f3edee441b69715a71406cc14a6.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            },
            {
                "name": "Zoos",
                "slug": "zoos",
                "typeId": "723",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/af61c27380a14cc09aff54ed942e1e77.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a4da0cf2b6bd44e1aa25fb18080ba3e3.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Botanical Gardens",
                "slug": "botanical-gardens",
                "typeId": "725",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5b263e69cbc147a290dae0914f623f1b.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Stadiums &amp; Arenas",
                "slug": "stadiums-arenas",
                "typeId": "711",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ca75b1725bf54cba884ad430234eb6f9.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            }
        ],
        "historical-archaeological-sites": [
            {
                "name": "Monuments",
                "slug": "monuments",
                "typeId": "707",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 52
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8cdec42879164565a8e19c1d32a15f4b.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 30
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/781c099294804972807383c1326168a5.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            }
        ],
        "museums": [
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1d6d32dd603a4703a6d5e256f5d44d92.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 37
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d45e041ad1a647b38b3c30a9776c63c3.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 29
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/47699899ccf341aa9e841c6b9434d348.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 26
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/667c464bff7441c583213bab09dd08f0.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            }
        ]
    },
    "dubai": {
        "attractions": [
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 31
            },
            {
                "name": "Observation Decks",
                "slug": "observation-decks",
                "typeId": "716",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/72cb5b4472864135825bb96274b97c52.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 20
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/49595216c3244181be239a8ed95c4b22.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 17
            },
            {
                "name": "Water Parks",
                "slug": "water-parks",
                "typeId": "713",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7a390ec1da4149a087eec6ed38fa2f9e.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 12
            },
            {
                "name": "Zoos",
                "slug": "zoos",
                "typeId": "723",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c8059ddf01574d468ab7097dbea0008b.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Adventure Parks",
                "slug": "adventure-parks",
                "typeId": "722",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4b5b54b4c7884e339aef0ad626741615.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ],
        "museums": [
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/d6290b681e41497f9def7d336f0e3c96.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 13
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1fd1114eb5024a01a34aac0ae6183399.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            }
        ],
        "historical-archaeological-sites": [
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0b290c3f06b34d0e8e4a0b518d1cbed4.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 24
            },
            {
                "name": "Monuments",
                "slug": "monuments",
                "typeId": "707",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/72cb5b4472864135825bb96274b97c52.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 16
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2e4d7d9fae9849d89e4b9e000a8ae976.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ]
    },
    "abu dhabi": {
        "attractions": [
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e8e6088ba9854ec9b0683128e84cb57c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c0d7294349fa47c6a20f9b17ab523392.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Observation Decks",
                "slug": "observation-decks",
                "typeId": "716",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f88ebb9eebec43a392f7614b43c2a407.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Water Parks",
                "slug": "water-parks",
                "typeId": "713",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/bdd10e7fc90548eb907ca2b989c43e99.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            },
            {
                "name": "Stadiums &amp; Arenas",
                "slug": "stadiums-arenas",
                "typeId": "711",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/f1b206a81ce74e0cbfc9a3cadedab403.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            }
        ],
        "museums": [
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/4915894d35d04b9fa128385931eb4bda.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/42d2d745fa874bc2aa267ad076391208.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ]
    },
    "london": {
        "attractions": [
            {
                "name": "Ferris Wheels",
                "slug": "ferris-wheels",
                "typeId": "1086",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/522cb36928544e6d9607d4c69068c4ee.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 17
            },
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/14a3b74d342a4e92a41c2a9474621fd1.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 10
            },
            {
                "name": "Botanical Gardens",
                "slug": "botanical-gardens",
                "typeId": "725",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/da7c88f4663045828351d5f644df7d37.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Observation Decks",
                "slug": "observation-decks",
                "typeId": "716",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1343424cc25743389f116a60dde2312d.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Stadiums &amp; Arenas",
                "slug": "stadiums-arenas",
                "typeId": "711",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/702540ba227d449e95d8638bec9ab9c3.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 13
            }
        ],
        "museums": [
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8f5f1aa4a8a743a599b266d5f65257ab.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 27
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ab9d6db79b7c406bb5c0b1c6f5414397.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 17
            },
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/2c3bb12bc762425ba8d555f374d3265b.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/702540ba227d449e95d8638bec9ab9c3.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            }
        ],
        "historical-archaeological-sites": [
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/da7c88f4663045828351d5f644df7d37.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 83
            },
            {
                "name": "Monuments",
                "slug": "monuments",
                "typeId": "707",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/6a5dca1870f94e1dbb030ca079d63577.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 52
            },
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/dbd28f89cab94bef9265355512ed3832.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 28
            },
            {
                "name": "Castles",
                "slug": "castles",
                "typeId": "705",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c9606c583657429198d8b31e40243b36.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 26
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9993ece6927b453a8480aec334cbe4a7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 23
            },
            {
                "name": "Archaeological Sites",
                "slug": "archaeological-sites",
                "typeId": "709",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/79de587d364b44c2af081f62a754cd2f.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 11
            }
        ]
    },
    "singapore": {
        "attractions": [
            {
                "name": "Theme Parks",
                "slug": "theme-parks",
                "typeId": "712",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/a859ac474066424fb569ddf66bfb5940.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 8
            },
            {
                "name": "Botanical Gardens",
                "slug": "botanical-gardens",
                "typeId": "725",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/280201d787a345218a00f93ba1d36ede.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 7
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8eb4e76e01a842dba57f245cf517ff09.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Cable Cars",
                "slug": "cable-cars",
                "typeId": "962",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/575f4c8b223b41298548c279872579b4.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Water Parks",
                "slug": "water-parks",
                "typeId": "713",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b4300b92f0904e369e329a845a579521.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Adventure Parks",
                "slug": "adventure-parks",
                "typeId": "722",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1670b0f37f2546ce88cfb0455de14679.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            }
        ],
        "museums": [
            {
                "name": "Interactive Museums",
                "slug": "interactive-museums",
                "typeId": "701",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/ccbd7a07adf846a0b8f6c1cbbc755c78.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9e6b921930d442b597bf629fbdf9bf66.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 9
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/b9e9fe65154d45118b64eaed557b7d00.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            },
            {
                "name": "Science &amp; Technology Museums",
                "slug": "science-technology-museums",
                "typeId": "703",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/0ebd3891d76d44dfb16342efe1052769.JPG?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ]
    },
    "bangkok": {
        "attractions": [
            {
                "name": "Observation Decks",
                "slug": "observation-decks",
                "typeId": "716",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/7278ab05aa654443ade45102d6f55e40.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 14
            },
            {
                "name": "Water Parks",
                "slug": "water-parks",
                "typeId": "713",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/e1556351e86b4d45b77f654dcca6771f.png?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            },
            {
                "name": "Aquariums",
                "slug": "aquariums",
                "typeId": "724",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/8be213d0a9704e5c971d1b87581b9357.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 2
            },
            {
                "name": "Stadiums &amp; Arenas",
                "slug": "stadiums-arenas",
                "typeId": "711",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/67601937592d4bac9e06aba8cf7ff580.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            }
        ],
        "historical-archaeological-sites": [
            {
                "name": "Places of Worship",
                "slug": "places-of-worship",
                "typeId": "710",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/28e75de8bb0a4e0caf177379707a513c.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 23
            },
            {
                "name": "Palaces",
                "slug": "palaces",
                "typeId": "706",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/9acfded4e7854eaaadfcf5e5f583b12d.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Historical Sites",
                "slug": "historical-sites",
                "typeId": "708",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/c4c982ee41e74653b0aaaff3c2aae362.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 4
            }
        ]
    },
    "vancouver": {
        "attractions": [
            {
                "name": "Adventure Parks",
                "slug": "adventure-parks",
                "typeId": "722",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/60150239a1bc45e2ac007c393b40003c.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 5
            },
            {
                "name": "Botanical Gardens",
                "slug": "botanical-gardens",
                "typeId": "725",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/1106cd7968164d719711349e3d1dd6c5.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ],
        "museums": [
            {
                "name": "History Museums",
                "slug": "history-museums",
                "typeId": "702",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/5daf6ad8b22d4607abea948c59613fd1.jpeg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 6
            },
            {
                "name": "Art Museums",
                "slug": "art-museums",
                "typeId": "700",
                "image": "https://aws-tiqets-cdn.imgix.net/images/content/933dc23028bb41cebe1cd20d056e8da7.jpg?auto=format%2Ccompress&fit=crop&h=100&q=40&w=150",
                "count": 3
            }
        ]
    }
};

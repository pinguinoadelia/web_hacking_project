// These objects exist so the interface can be developed independently.
// During integration they will be replaced by data returned by the PHP/MySQL modules.

window.MockDB = {
    users: [
        { id: 1, username: 'mario', password: 'user1234', isPremium: false, isAdmin: false},
        { id: 2, username: 'anna', password: 'user12345', isPremium: true, isAdmin: false},
        { id: 3, username: 'admin', password: 'admin1234', isPremium: true, isAdmin: true},
        { id: 4, username: 'luca', password: 'user123456', isPremium: false, isAdmin: false}

    ],
    
    media: [
      {
        id: 101,
        uploaderId: 2,
        uploader: 'anna',
        title: 'Quiet coast',
        description: 'A calm shoreline photographed just before sunrise.',
        premium: false,
        createdAt: '2026-10-18',
        src: 'https://picsum.photos/seed/coast-101/1400/1000'
      },
      {
        id: 102,
        uploaderId: 1,
        uploader: 'mario',
        title: 'City after rain',
        description: 'Reflections, passing lights and wet pavement.',
        premium: false,
        createdAt: '2026-10-20',
        src: 'https://picsum.photos/seed/city-102/1400/1000'
      },
      {
        id: 103,
        uploaderId: 2,
        uploader: 'anna',
        title: 'Northern silence',
        description: 'A landscape focused on fog.',
        premium: true,
        createdAt: '2026-10-22',
        src: 'https://picsum.photos/seed/north-103/1400/1000'
      },
      {
        id: 104, 
        uploaderId: 4,
        uploader: 'luca',
        title: 'Afternoon geometry',
        description: 'Architectural lines and warm afternoon light.',
        premium: false,
        createdAt: '2026-10-23',
        src: 'https://picsum.photos/seed/geometry-104/1400/1000',
      },
      {
        id: 105,
        uploaderId: 3,
        uploader: 'admin',
        title: 'Studio study',
        description: 'still-life image built around texture and contrast.',
        premium: true,
        createdAt: '2026-10-24',
        src: 'https://picsum.photos/seed/studio-105/1400/1000'
      },
      {
        id: 106,
        uploaderId: 1,
        uploader: 'mario',
        title: 'road to nowhere',
        description: 'A road scene photographed during a quiet trip',
        premium: false,
        createdAt: '2026-10-25',
        src: 'https://picsum.photos/seed/road-106/1400/1000'
      }
    ]
};
export interface Car {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    specs: {
        hp: string;
        zeroToSixty: string;
        engine: string;
    };
}

export const cars: Car[] = [
    {
        id: 'ferrari-sf90',
        name: 'Ferrari SF90 Stradale',
        category: 'Hybrid Hypercar',
        price: 3200,
        image: '/assets/ferrari.png',
        specs: {
            hp: '986 HP',
            zeroToSixty: '2.5s',
            engine: 'V8 Hybrid'
        }
    },
    {
        id: 'porsche-911',
        name: 'Porsche 911 Carrera',
        category: 'Performance',
        price: 1200,
        image: '/assets/porsche.png',
        specs: {
            hp: '443 HP',
            zeroToSixty: '3.2s',
            engine: 'Flat-6 Turbo'
        }
    },
    {
        id: 'lamborghini-huracan',
        name: 'Lamborghini Huracán',
        category: 'Supercar',
        price: 2400,
        image: '/assets/lamborghini.png',
        specs: {
            hp: '631 HP',
            zeroToSixty: '2.9s',
            engine: 'V10 Natural'
        }
    },
    {
        id: 'aston-valkyrie',
        name: 'Aston Martin Valkyrie',
        category: 'Hypercar',
        price: 8500,
        image: '/assets/aston.png',
        specs: {
            hp: '1160 HP',
            zeroToSixty: '2.3s',
            engine: 'V12 Hybrid'
        }
    },
    {
        id: 'mclaren-720s',
        name: 'McLaren 720S Spider',
        category: 'Supercar',
        price: 1800,
        image: '/assets/mclaren.png',
        specs: {
            hp: '710 HP',
            zeroToSixty: '2.8s',
            engine: 'V8 Twin Turbo'
        }
    },
    {
        id: 'bugatti-chiron',
        name: 'Bugatti Chiron Pure Sport',
        category: 'Hypercar',
        price: 12000,
        image: '/assets/bugatti.png',
        specs: {
            hp: '1479 HP',
            zeroToSixty: '2.4s',
            engine: 'W16 Quad-Turbo'
        }
    }
];

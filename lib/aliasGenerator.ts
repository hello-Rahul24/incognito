
const ADJECTIVES = ['Neon', 'Thunder', 'Crimson', 'Silent', 'Cosmic', 'Rogue', 'Mystic', 'Blazing', 'Hollow', 'Velvet', 'Shadow', 'Lunar', 'Phantom', 'Frozen', 'Amber', 'Savage', 'Glitch', 'Venom', 'Chaos', 'Void']
const NOUNS = ['Fox', 'Moose', 'Volt', 'Ghost', 'Wolf', 'Crow', 'Viper', 'Hawk', 'Storm', 'Nova', 'Raven', 'Titan', 'Golem', 'Drake', 'Specter', 'Lynx', 'Comet', 'Echo', 'Blaze', 'Dusk']

export const generateName = ()=> {
   let name;
   const adjective = ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)];
   const nouns = NOUNS[Math.floor(Math.floor(Math.random()*NOUNS.length))]
   name = `${adjective}${nouns}`
    return name;
}
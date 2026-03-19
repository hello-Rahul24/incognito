const WORDS = ['WOLF', 'RAIN', 'ECHO', 'NOVA', 'VOID', 'DUSK', 'FIRE', 'MIST', 'APEX', 'FLUX', 'IRON', 'DARK', 'WILD', 'CROW', 'GLOW']

export const roomCodeGen = () => {
    let roomId;
    const word1= WORDS[Math.floor(Math.random()*WORDS.length)];
    const word2= WORDS[Math.floor(Math.random()*WORDS.length)];
    const word3= WORDS[Math.floor(Math.random()*WORDS.length)];
    const word4= WORDS[Math.floor(Math.random()*WORDS.length)];
    roomId = `${word1}-${word2}-${word3}-${word4}`;
    return roomId;
}
// const random = require('random');
// import { shuffle } from 'random';
const colors = require('./color_list.js').colors;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function getColors(num_colors){
    if (num_colors > colors.length){
        throw new Error('Not enough colors in color_list.js');
    }
    const shuffled_colors = shuffle(colors);
    return shuffled_colors.slice(0, num_colors);
}

export function parseColors(color_list){
    let color_map = [];
    color_list.forEach((color, index) => {
        color_map.push({color: color, next: color_list[index + 1], added: false});
    });
    return color_map;
}
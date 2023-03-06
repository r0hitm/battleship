import {presets} from '../js/availableShips.js';

test('presets are arrays of objects', () => {
    expect(presets).toBeInstanceOf(Array);
    presets.forEach(preset => {
        expect(preset).toBeInstanceOf(Array);
        preset.forEach(ship => {
            expect(ship).toBeInstanceOf(Object);
        });
    });
});

test('Each preset has 10 ships', () => {
    presets.forEach(preset => {
        expect(preset.length).toBe(10);
    });
});
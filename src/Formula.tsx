import React from 'react';

export function bmi(weight: number, height: number, precision: number = 2) {
    return parseFloat((weight / Math.pow(height, 2)).toFixed(precision));
}

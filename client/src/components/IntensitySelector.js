import React from "react";
import SelectableButtonGroup from "../common/SelectableButtonGroup";

const Intensity = Object.freeze({
    VeryLow: 'Not at all',
    Low: 'Not so',
    Average: 'Somewhat',
    High: 'Very',
    VeryHigh: 'Extremely',
})
export function IntensitySelector({
    id,
    handleSelect,
    label
}) {
    return <div>
        <strong> {label}</strong>
        <SelectableButtonGroup
            id={id}
            handleSelect={handleSelect}
            values={[Intensity.VeryLow, Intensity.Low, Intensity.Average, Intensity.High, Intensity.VeryHigh]} />
    </div>
}
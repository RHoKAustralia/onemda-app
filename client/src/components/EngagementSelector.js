import React from "react";
import SelectableButtonGroup from "../common/SelectableButtonGroup";
const Engagement = Object.freeze({
    Low: 'Low',
    Minimal: 'Minimal',
    Average: 'Average',
    High: 'High',
})
export function EngagmentSelector({
    id,
    handleSelect,
    label
}) {
    return <div>
        <strong> {label}</strong>
        <SelectableButtonGroup
            id={id}
            handleSelect={handleSelect}
            values={[Engagement.Low, Engagement.Minimal, Engagement.Average, Engagement.High]} />
    </div>
}
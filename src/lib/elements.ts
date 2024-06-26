import { get, writable, type Writable } from "svelte/store"
import Rect from "./components/Rect.svelte"
import Ellipse from "./components/Ellipse.svelte"
import Text from "./components/Text.svelte"

export type BaseElement = {
    name: string,
    position: [x: number, y: number],

    fill: string,
    outline: [size: number, color: string],
    lockedRatio: boolean,
    blendMode: BlendMode,
    opacity: number,
    hidden: boolean
}

export const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'] as const
export type BlendMode = typeof blendModes[number];

export type RectElement = BaseElement & {
    type: "rect",
    size: [length: number, width: number], // this maps to x and y
    roundness: [tl: string, tr: string, br: string, bl: string],
}

export type EllipseElement = BaseElement & {
    type: "ellipse",
    size: [length: number, width: number], // this maps to x and y
}

export type TextElement = BaseElement & {
    type: "text",
    text: string,
    size: number,
}

export type PhotoElement = BaseElement & {
    type: "file", // don't know if this makes sense
    test: string,
    size: number,
}

export type Elements = RectElement | EllipseElement | TextElement | PhotoElement

let doc = localStorage.getItem('doc');
if (!doc) {
    doc = JSON.stringify([])
    localStorage.setItem('doc', JSON.stringify([]))
}

export const elements = deserialize(JSON.parse(doc))
export const selected = writable<Writable<Elements> | null>(null)

export function serialize(e: typeof elements) {
    return get(e).map(x => get(x))
}

export function deserialize(e: Elements[]) {
    return writable(e.map(x => writable<Elements>(x)))
}

// idk why these show up as types lol
export const ComponentMap = {
    'rect': Rect,
    'ellipse': Ellipse,
    'text': Text
}

// use:element action; does everything <Box /> does but can be applied to elements directly and partially
// important for making bounding boxes better, adding more types like paths, etc. while still being able to share logic between them
export function element() {
    // todo
}

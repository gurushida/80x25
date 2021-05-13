export enum ZIndex {
    // Second level background
    FAR_BACKGROUND = -20,

    // Background images
    BACKGROUND = -10,

    // Where to place sprites that the guy can walk in front of
    BEHIND_GUY = -5,

    // Where to draw the guy
    GUY = 0,

    // Thing that must be rendered in front of the guy
    FRONT = 10,

    // Text should always be rendered on top of everything
    TEXT = 100,
}

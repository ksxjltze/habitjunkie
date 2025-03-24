export interface Hero {
    name: string;
    color: string;
    hp?: number;
    maxHP?: number;
}

// You might also want a type for your schema definition
export const heroSchema = {
    title: 'hero schema',
    description: 'describes a simple hero',
    version: 0,
    primaryKey: 'name',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 100
        },
        color: {
            type: 'string',
            maxLength: 100
        },
        hp: {
            type: 'number'
        },
        maxHP: {
            type: 'number'
        }
    },
    required: [
        'name',
        'color'
    ]
};
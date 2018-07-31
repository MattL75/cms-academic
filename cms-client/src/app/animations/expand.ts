import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { Options } from './common';

export interface SizeOptions extends Options {
    start?: string;
    end?: string;
    ease?: string;
}

export function expandX(options: SizeOptions = {}): AnimationTriggerMetadata {
    return trigger(
        (options.trigger) || 'expandX',
        [
            transition(
                ':enter', [
                    style({width: 0,  overflow: 'hidden'}),
                    animate(((options.time) || 400) + 'ms ' + ((options.ease) || 'ease-in-out'), style({width: '*'}))
                ]
            ),
            transition(
                ':leave', [
                    style({width: '*', overflow: 'hidden'}),
                    animate(((options.time) || 400) + 'ms ' + ((options.ease) || 'ease-in-out'), style({width: 0}))
                ]
            )
        ]
    );
}

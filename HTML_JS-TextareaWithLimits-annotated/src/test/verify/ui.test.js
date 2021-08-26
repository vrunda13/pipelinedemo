import '@testing-library/jest-dom';
import { getQueriesForElement, fireEvent } from '@testing-library/dom';

import { init } from '../../js';
import * as Templates from '../templates/textarea.template';

function render( tplName ) {
    const _wrapper = document.createElement( 'div' );
    _wrapper.innerHTML = Templates[tplName]();
    
    init( _wrapper );
    
    return _wrapper;
};

describe('TEST THE TEXTAREA UI UNDER DIFFERENT CIRCUMSTANCES', () => {
    test('WHEN WARN LIMIT IS 100, LIMIT IS 120, AND THE LIMIT TYPE IS HARD, THE WARN LIMIT IS TRIGGERED at 100 CHARACTERS (CORRECT CLASSES EXIST WITH CORRECT REMAINING CHARACTERS)', () => {
        const _wrapper = render( 'sample_100_120' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );
        
        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqr'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "21" );
        expect( _limitEl.className ).toContain( 'bg-ok' );
        expect( _limitEl.className ).not.toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );

        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrs'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "20" );
        expect( _limitEl.className ).not.toContain( 'bg-ok' );
        expect( _limitEl.className ).toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );
    });

    test('WHEN WARN LIMIT IS 100, LIMIT IS 120, AND THE LIMIT TYPE IS HARD, THE STOP LIMIT IS TRIGGERED at 120 CHARACTERS (CORRECT CLASSES EXIST AND CORRECT REMAINING CHARACTERS)', () => {
        const _wrapper = render( 'sample_100_120' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );
        
        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijk'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "1" );
        expect( _limitEl.className ).not.toContain( 'bg-ok' );
        expect( _limitEl.className ).toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );

        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijkl'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "0" );
        expect( _limitEl.className ).not.toContain( 'bg-ok' );
        expect( _limitEl.className ).not.toContain( 'bg-warn' );
        expect( _limitEl.className ).toContain( 'bg-stop' );
    });

    test('WHEN LIMIT IS NOT SPECIFIED, maxlength IS SET TO THE LIMIT', () => {
        const _wrapper = render( 'sample_100_120' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );

        expect( _input.getAttribute( 'maxlength' ) ).toBe( "120" );
    });
    
    test('WHEN LIMIT IS NOT SPECIFIED AS soft, maxlength IS NOT SET', () => {
        const _wrapper = render( 'sample_100_120_soft' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );

        expect( _input.getAttribute( 'maxlength' ) ).toBeFalsy();
    });
    
    test('WHEN LIMIT TYPE IS SPECIFIED AS soft, USER CAN TYPE BEYOND THE LIMIT, AND REMAINING CHARACTERS SHOWS A CORRECT NEGATIVE VALUE', () => {
        const _wrapper = render( 'sample_100_120_soft' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );
        
        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklm'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "-1" );
        expect( _limitEl.className ).not.toContain( 'bg-ok' );
        expect( _limitEl.className ).not.toContain( 'bg-warn' );
        expect( _limitEl.className ).toContain( 'bg-stop' );
    });
    
    test('WHEN WARN LIMIT IS GREATER THAN LIMIT, THE WARN LIMIT IS TRIGGERED WHEN 10 CHARACTERS REMAIN AS PER LIMIT (CORRECT CLASSES EXIST WITH CORRECT REMAINING CHARACTERS)', () => {
        const _wrapper = render( 'sample_140_120' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );
        
        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_a'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "11" );
        expect( _limitEl.className ).toContain( 'bg-ok' );
        expect( _limitEl.className ).not.toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );

        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_ab'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "10" );
        expect( _limitEl.className ).not.toContain( 'bg-ok' );
        expect( _limitEl.className ).toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );
    });
    
    test('WHEN WARN LIMIT IS NOT SPECIFIED, THE WARN LIMIT IS TRIGGERED WHEN 10 CHARACTERS REMAIN AS PER LIMIT (CORRECT CLASSES EXIST WITH CORRECT REMAINING CHARACTERS)', () => {
        const _wrapper = render( 'sample_120' ); // Render the template.

        const { queryByTestId } = getQueriesForElement( _wrapper );

        const _input = queryByTestId( 'tweet-input' );
        const _limitEl = queryByTestId( 'tweet-input-limit' );
        
        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_a'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "11" );
        expect( _limitEl.className ).toContain( 'bg-ok' );
        expect( _limitEl.className ).not.toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );

        fireEvent.input(
            _input,
            {
                target: {
                    value: 'abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_ab'
                }
            }
        );

        expect( _limitEl.textContent ).toBe( "10" );
        expect( _limitEl.className ).not.toContain( 'bg-ok' );
        expect( _limitEl.className ).toContain( 'bg-warn' );
        expect( _limitEl.className ).not.toContain( 'bg-stop' );
    });
});
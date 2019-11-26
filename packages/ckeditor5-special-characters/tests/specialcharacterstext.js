/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals document */

import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import SpecialCharacters from '../src/specialcharacters';
import SpecialCharactersText from '../src/specialcharacterstext';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';

describe( 'SpecialCharactersText', () => {
	testUtils.createSinonSandbox();

	let addItemsSpy, addItemsFirstCallArgs;

	beforeEach( () => {
		const editorElement = document.createElement( 'div' );

		addItemsSpy = sinon.spy( SpecialCharacters.prototype, 'addItems' );

		document.body.appendChild( editorElement );
		return ClassicTestEditor
			.create( editorElement, {
				plugins: [ SpecialCharacters, SpecialCharactersText ]
			} )
			.then( () => {
				addItemsFirstCallArgs = addItemsSpy.args[ 0 ];
			} );
	} );

	afterEach( () => {
		addItemsSpy.restore();
	} );

	it( 'adds new items', () => {
		expect( addItemsSpy.callCount ).to.equal( 1 );
	} );

	it( 'properly names the category', () => {
		expect( addItemsFirstCallArgs[ 0 ] ).to.be.equal( 'Text' );
	} );

	it( 'adds proper characters', () => {
		expect( addItemsFirstCallArgs[ 1 ] ).to.deep.include( {
			character: '…',
			title: 'Horizontal ellipsis'
		} );

		expect( addItemsFirstCallArgs[ 1 ] ).to.deep.include( {
			character: '“',
			title: 'Left double quotation mark'
		} );
	} );
} );

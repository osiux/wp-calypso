/**
 * External dependencies
 */
import { createBlobURL } from '@wordpress/blob';
import { createBlock } from '@wordpress/blocks';
import { mediaUpload } from '@wordpress/editor';
import { addFilter } from '@wordpress/hooks';
import { every } from 'lodash';

/**
 * Internal dependencies
 */
import withVideoPressEdit from './edit';
import withVideoPressSave from './save';
import isJetpackExtensionAvailable from 'gutenberg/extensions/presets/jetpack/utils/is-jetpack-extension-available';

const addVideoPressSupport = ( settings, name ) => {
	if ( 'core/video' !== name ) {
		return settings;
	}

	return {
		...settings,

		attributes: {
			...settings.attributes,
			guid: {
				type: 'string',
			},
			autoplay: {
				type: 'boolean',
			},
			controls: {
				type: 'boolean',
				default: true,
			},
			loop: {
				type: 'boolean',
			},
			muted: {
				type: 'boolean',
			},
			poster: {
				type: 'string',
			},
			preload: {
				type: 'string',
				default: 'metadata',
			},
		},

		transforms: {
			...settings.transforms,
			from: [
				{
					type: 'files',
					isMatch: files => every( files, file => file.type.indexOf( 'video/' ) === 0 ),
					// We define a higher priority (lower number) than the default of 10. This ensures that this
					// transformation prevails over the core video block default transformations.
					priority: 9,
					transform: ( files, onChange ) => {
						const blocks = [];
						files.forEach( file => {
							const block = createBlock( 'core/video', {
								src: createBlobURL( file ),
							} );
							mediaUpload( {
								filesList: [ file ],
								onFileChange: ( [ { id, url } ] ) => {
									onChange( block.clientId, { id, src: url } );
								},
								allowedTypes: [ 'video' ],
							} );
							blocks.push( block );
						} );
						return blocks;
					},
				},
			],
		},

		edit: withVideoPressEdit( settings.edit ),

		save: withVideoPressSave( settings.save ),

		deprecated: [
			{
				attributes: settings.attributes,
				save: settings.save,
			},
		],
	};
};

if ( isJetpackExtensionAvailable( 'videopress' ) ) {
	addFilter( 'blocks.registerBlockType', 'gutenberg/extensions/videopress', addVideoPressSupport );
}

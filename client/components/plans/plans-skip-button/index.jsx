/** @format */
/**
 * External dependencies
 */
import React from 'react';
import { identity } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Gridicon from 'gridicons';

export const PlansSkipButton = ( { onClick, translate = identity } ) => (
	<div className="plans-skip-button">
		<Button onClick={ onClick }>
			{ translate( 'Start with free' ) }
			<Gridicon icon="arrow-right" size={ 18 } />
		</Button>
	</div>
);

export default localize( PlansSkipButton );

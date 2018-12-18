/** @format */
/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, flow, includes, noop } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import InlineSupportLink from 'components/inline-support-link';
import FormButton from 'components/forms/form-button';
import TextInput from 'components/forms/form-text-input';
import { jpTestSubmitUrl } from 'state/jetpack-importer-test/actions';
import { getSelectedSite } from 'state/ui/selectors';
import SiteImporterSitePreview from 'my-sites/importer/site-importer/site-importer-site-preview';

import FileUploader from '../file-uploader';

export const WixLogo = () => (
	<svg
		/*eslint-disable wpcalypso/jsx-classname-namespace */
		className="site-importer social-logo importer__service-icon"
		/*eslint-enable wpcalypso/jsx-classname-namespace */
		xmlns="http://www.w3.org/2000/svg"
		width="48"
		height="48"
		viewBox="0 0 48 48"
	>
		<path
			fill="#FFF"
			fillRule="nonzero"
			d="M28.3 28.88v-1.02h.54v1.02h-.53zm5.72-3.5a1.41 1.41 0 0 0-.56-1.02c-.17-.12-.36-.2-.55-.26a2.5 2.5 0 0 0-.68-.09 1.92 1.92 0 0 0-1.52.71c-.18.22-.31.47-.4.73a3.46 3.46 0 0 0-.01 1.8c.08.27.21.52.39.75.17.21.39.38.64.5.28.12.59.18.9.18a1.94 1.94 0 0 0 1.24-.45c.17-.14.3-.31.4-.5.1-.2.17-.42.2-.64h.4a2.09 2.09 0 0 1-1.42 1.78c-.26.09-.54.13-.82.13-.38 0-.76-.07-1.1-.22a2.1 2.1 0 0 1-.76-.6c-.2-.25-.35-.55-.43-.86a3.7 3.7 0 0 1 .02-2.03c.1-.3.26-.58.47-.83.2-.24.47-.43.76-.57a2.5 2.5 0 0 1 1.03-.2c.28 0 .55.03.81.1.24.06.47.17.67.3.2.15.37.33.48.53.14.24.22.5.24.76h-.4zm1.12.96c0-.35.06-.7.17-1.02.1-.3.26-.6.47-.85.2-.24.47-.44.77-.57a2.7 2.7 0 0 1 2.08 0c.3.13.56.33.77.57.2.26.37.54.47.85a3.24 3.24 0 0 1 0 2.05 2.25 2.25 0 0 1-1.23 1.42c-.67.28-1.43.28-2.1 0a2.25 2.25 0 0 1-1.23-1.42 3.24 3.24 0 0 1-.17-1.03zm.4 0c0 .3.04.6.13.88.08.26.21.52.4.74.16.22.38.4.63.52.56.26 1.2.26 1.76 0 .25-.13.47-.3.64-.52.18-.22.3-.48.4-.74.17-.57.17-1.18 0-1.75a2.35 2.35 0 0 0-.4-.75 1.9 1.9 0 0 0-.64-.52 2.1 2.1 0 0 0-1.76 0c-.25.12-.47.3-.64.51-.18.23-.3.48-.4.75-.08.29-.13.58-.13.88zm5.4-2.54h.4v1.04h.02c.04-.16.12-.31.22-.45s.23-.26.38-.37a1.83 1.83 0 0 1 1.07-.33c.22 0 .44.03.66.1.17.05.33.13.48.24a1.32 1.32 0 0 1 .47.74h.01c.14-.32.36-.6.64-.8.3-.2.68-.3 1.05-.28.23 0 .45.03.66.1a1.4 1.4 0 0 1 .88.85c.08.25.13.51.12.77v3.47h-.4V25.4c.02-.26-.03-.52-.15-.76a1.2 1.2 0 0 0-.37-.42 1.02 1.02 0 0 0-.4-.17 1.83 1.83 0 0 0-1 .08c-.2.08-.38.2-.53.35-.15.18-.27.38-.34.6-.09.26-.13.53-.13.8v3h-.39V25.4a1.6 1.6 0 0 0-.15-.75 1.08 1.08 0 0 0-.76-.6 1.69 1.69 0 0 0-1.47.4c-.18.17-.32.37-.4.6-.12.26-.17.55-.17.83v3h-.39V23.8zM16.2 19.2c-.52.26-.72.7-.72 1.93.2-.16.42-.3.67-.38.24-.09.46-.2.67-.35.45-.31.51-.71.51-1.38 0 0-.72-.03-1.13.18zm-3.12.28a1.9 1.9 0 0 0-.56.94l-1.41 5.27-1.18-4.31c-.11-.51-.34-.99-.65-1.41-.42-.49-1.27-.52-1.35-.52-.08 0-.94.03-1.36.52-.32.42-.54.9-.65 1.4l-1.2 4.32L3.3 20.4a1.9 1.9 0 0 0-.55-.94c-.7-.59-1.74-.46-1.74-.46l2.72 9.84s.9.06 1.35-.16c.59-.29.87-.5 1.23-1.85.31-1.19 1.2-4.7 1.29-4.94.04-.13.09-.42.32-.42.22 0 .28.3.32.42.08.25.97 3.75 1.29 4.94.35 1.34.64 1.56 1.23 1.85.45.22 1.35.16 1.35.16L14.81 19s-1.04-.13-1.74.46zm4.25 1.15c-.14.19-.33.35-.55.46-.25.13-.48.22-.74.34-.43.2-.55.42-.55.75v6.68s.68.07 1.13-.14c.58-.28.7-.55.71-1.77V20.62zm6.79 3.33l3.45-4.9s-1.46-.24-2.18.39a8 8 0 0 0-.99 1.12l-1.27 1.75a.28.28 0 0 1-.27.19.28.28 0 0 1-.27-.19l-1.27-1.75c-.29-.4-.62-.78-.98-1.12-.72-.63-2.17-.4-2.17-.4l3.45 4.91-3.44 4.9s1.52.18 2.24-.45c.34-.32.65-.67.9-1.05l1.28-1.75a.28.28 0 0 1 .27-.2c.12 0 .23.08.27.2l1.26 1.75c.28.38.6.73.94 1.05.72.63 2.21.45 2.21.45l-3.43-4.9z"
		/>
	</svg>
);

class WordPressService extends Component {
	render() {
		const { jetpackImporterTest: { requesting = false, detectedService = null } = {} } = this.props;

		const siteURL = 'https://smt593.wixsite.com/wowz/static-page';

		return (
			<div className="site-importer__site-importer-pane">
				<WixLogo />
				<p>Wix</p>
				<SiteImporterSitePreview siteURL={ siteURL } site={ this.props.site } />
			</div>
		);
	}
}

export default flow(
	connect( state => ( {
		site: getSelectedSite( state ),
		jetpackImporterTest: get( state, 'jetpackImporterTest' ),
	} ) ),
	localize
)( WordPressService );
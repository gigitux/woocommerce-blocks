/**
 * External dependencies
 */
import { useArgs } from '@storybook/client-api';
import { Story, Meta } from '@storybook/react';
import { ValidationContextProvider } from '@woocommerce/base-context';
import { INTERACTION_TIMEOUT } from '@woocommerce/storybook-controls';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TotalsCoupon, TotalsCouponProps } from '..';
import { VALIDATION_STORE_KEY } from '../../../../../../../../packages/checkout/validation';

export default {
	title: 'WooCommerce Blocks/@base-components/cart-checkout/totals/Coupon',
	component: TotalsCoupon,
	args: {
		initialOpen: true,
	},
} as Meta< TotalsCouponProps >;

const INVALID_COUPON_ERROR = {
	hidden: false,
	message: 'Invalid coupon code',
};

const Template: Story< TotalsCouponProps > = ( args ) => {
	const [ {}, setArgs ] = useArgs();

	const onSubmit = ( code: string ) => {
		args.onSubmit?.( code );
		setArgs( { isLoading: true } );

		setTimeout(
			() => setArgs( { isLoading: false } ),
			INTERACTION_TIMEOUT
		);
	};

	return <TotalsCoupon { ...args } onSubmit={ onSubmit } />;
};

export const Default = Template.bind( {} );
Default.args = {};

export const LoadingState = Template.bind( {} );
LoadingState.args = {
	isLoading: true,
};

export const ErrorState: Story< TotalsCouponProps > = ( args ) => {
	const { setValidationErrors } = useDispatch( VALIDATION_STORE_KEY );
	setValidationErrors( { coupon: INVALID_COUPON_ERROR } );

	return <TotalsCoupon { ...args } />;
};

ErrorState.decorators = [
	( StoryComponent ) => {
		return (
			<ValidationContextProvider>
				<StoryComponent />
			</ValidationContextProvider>
		);
	},
];

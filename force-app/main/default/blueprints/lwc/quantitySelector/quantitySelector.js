import { LightningElement, api } from 'lwc';

import getProductQuantityRule from '@salesforce/apex/QuantitySelectorController.getProductQuantityRule';

export default class QuantitySelector extends LightningElement {
	@api productId;
	@api quantity = 1;
	increment = 1;
	min = 1;
	max = 1000;

	helpTextQuantity = '';

	connectedCallback() {
		getProductQuantityRule({ productId: this.productId }).then(result => {
			if (result != null) {
				this.increment = result.Increment;
				this.min = result.Minimum;
				this.max = result.Maximum;

				this.quantity = this.min;

				this.dispatchEvent(
					new CustomEvent('changequantity', {
						detail: { quantity: this.quantity },
					})
				);
			}
			this.helpTextQuantity = `La minima quantità è ${this.min} \n- La massima quantità è ${this.max} - L'incremento è di ${this.increment}`;
		});
	}

	handleIncrementQuantity(event) {
		if (
			event.target.name === 'add' &&
			this.quantity + this.increment <= this.max
		) {
			this.quantity += this.increment;
		} else if (
			this.quantity >= this.increment &&
			this.quantity - this.increment >= this.min
		) {
			this.quantity -= this.increment;
		} else {
			this.quantity = this.min;
		}

		this.dispatchEvent(
			new CustomEvent('changequantity', {
				detail: { quantity: this.quantity },
			})
		);
	}

	checkQuantity(qnty) {
		return (
			qnty % this.increment == 0 && qnty >= this.min && qnty <= this.max
		);
	}
}

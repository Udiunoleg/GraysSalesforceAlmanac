import { LightningElement, api } from 'lwc';

export default class HfarmDisplayRecordFields extends LightningElement {
	@api recordId;
	@api objectApiName;
	@api fieldList;

	get selectedFields() {
		return this.fieldList.split(',');
	}
}
